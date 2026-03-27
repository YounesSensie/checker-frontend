"use client";

import React, { useState, useRef, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Plus,
  Trash2,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

// ── Validation (mirrors service.ts schema without zod import) ────────────────
interface ServiceFormValues {
  checkerId: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  includes: string[];
  requirements: string[];
}

function validate(data: ServiceFormValues): string | null {
  if (!data.checkerId) return "Checker ID is required";
  if (data.name.trim().length < 3) return "Name must be at least 3 characters";
  if (data.description.trim().length < 10) return "Description is too short (min 10 chars)";
  if (data.price <= 0) return "Price must be positive";
  if (!Number.isInteger(data.duration) || data.duration <= 0)
    return "Duration must be a positive whole number";
  const cleanIncludes = data.includes.filter((i) => i.trim() !== "");
  if (cleanIncludes.length === 0) return "Add at least one included item";
  return null;
}

// ── Types ────────────────────────────────────────────────────────────────────

interface Toast {
  id: number;
  type: "success" | "error";
  message: string;
}

interface Props {
  checkerId: string;
}

// ── Sub-components ───────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
      {children}
    </span>
  );
}

const InputField = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
  <input
    ref={ref}
    {...props}
    className={`w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900
      placeholder:text-slate-400 outline-none
      focus:border-[#1313ec] focus:ring-2 focus:ring-[#1313ec]/10 focus:bg-white
      transition-all duration-150 ${props.className ?? ""}`}
  />
));
InputField.displayName = "InputField";

function TextAreaField(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900
        placeholder:text-slate-400 outline-none resize-none
        focus:border-[#1313ec] focus:ring-2 focus:ring-[#1313ec]/10 focus:bg-white
        transition-all duration-150 ${props.className ?? ""}`}
    />
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export function DialogServiceAdd({ checkerId }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [fieldError, setFieldError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [includes, setIncludes] = useState<string[]>([""]);
  const [requirements, setRequirements] = useState<string[]>([""]);

  const overlayRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus first input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => firstInputRef.current?.focus(), 50);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function pushToast(type: "success" | "error", message: string) {
    const id = Date.now();
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }

  function handleClose() {
    if (loading) return;
    setOpen(false);
    resetForm();
  }

  function resetForm() {
    setName("");
    setDescription("");
    setPrice("");
    setDuration("");
    setIncludes([""]);
    setRequirements([""]);
    setFieldError(null);
  }

  // ── List helpers ────────────────────────────────────────────────────────

  function updateList(
    idx: number,
    val: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) {
    const next = [...list];
    next[idx] = val;
    setList(next);
  }

  function removeFromList(
    idx: number,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) {
    setList(list.filter((_, i) => i !== idx));
  }

  // ── Submit ──────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldError(null);

    const data: ServiceFormValues = {
      checkerId,
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      duration: parseInt(duration, 10),
      includes: includes.filter((i) => i.trim() !== ""),
      requirements: requirements.filter((r) => r.trim() !== ""),
    };
    
    const error = validate(data);
    if (error) {
      setFieldError(error);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/services/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let result: unknown = {};
      try { result = await response.json(); } catch { /* non-JSON */ }

      if (!response.ok) {
        const msg =
          result && typeof result === "object" && "error" in (result as object)
            ? String((result as Record<string, unknown>).error)
            : "Something went wrong";
        pushToast("error", msg);
        return;
      }

      pushToast("success", "Service created successfully!");
      setOpen(false);
      resetForm();
      startTransition(() => router.refresh());
    } catch {
      pushToast("error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Trigger button ──────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-[320px] flex-shrink-0 flex-col items-center justify-center gap-4
          rounded-xl border-2 border-dashed border-slate-300 bg-transparent p-5
          hover:border-[#1313ec] hover:bg-[#1313ec]/5 transition-all group min-h-[340px]"
      >
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100
            text-slate-400 group-hover:bg-[#1313ec] group-hover:text-white transition-colors"
        >
          <Plus className="w-7 h-7" />
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-slate-900 group-hover:text-[#1313ec] transition-colors">
            Add New Service
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Create a custom inspection offering
          </p>
        </div>
      </button>

      {/* ── Dialog ──────────────────────────────────────────────────────── */}
      {open && (
        <>
          {/* Overlay */}
          <div
            ref={overlayRef}
            onClick={handleClose}
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-200"
          />

          {/* Panel */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2
              max-h-[90vh] flex flex-col
              rounded-2xl bg-white shadow-[0_24px_60px_-12px_rgba(0,0,0,0.22)]
              animate-in fade-in zoom-in-95 duration-200"
          >
            {/* ── Dialog header ─────────────────────────────────────────── */}
            <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1313ec]/10">
                  <Sparkles className="w-5 h-5 text-[#1313ec]" />
                </div>
                <div>
                  <h2 id="dialog-title" className="text-lg font-bold text-slate-900 leading-tight">
                    New Inspection Service
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fill in the details to publish your offering
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400
                  hover:bg-slate-100 hover:text-slate-600 transition-colors disabled:opacity-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ── Scrollable form body ───────────────────────────────────── */}
            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto flex-1 px-6 py-5 space-y-5"
            >
              {/* Error banner */}
              {fieldError && (
                <div className="flex items-center gap-2.5 rounded-lg bg-red-50 border border-red-100 px-3.5 py-3 text-sm text-red-600">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  {fieldError}
                </div>
              )}

              {/* Service Name */}
              <div>
                <FieldLabel>Service Name</FieldLabel>
                <InputField
                  ref={firstInputRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Luxury Villa Inspection"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <FieldLabel>Description</FieldLabel>
                <TextAreaField
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what this service covers…"
                  rows={3}
                  required
                />
              </div>

              {/* Price + Duration */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FieldLabel>Price (USD)</FieldLabel>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                      $
                    </span>
                    <InputField
                      type="number"
                      min="1"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="150"
                      className="pl-7"
                      required
                    />
                  </div>
                </div>
                <div>
                  <FieldLabel>Duration (min)</FieldLabel>
                  <div className="relative">
                    <InputField
                      type="number"
                      min="1"
                      step="1"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="90"
                      className="pr-10"
                      required
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                      min
                    </span>
                  </div>
                </div>
              </div>

              {/* Includes */}
              <div>
                <FieldLabel>What&apos;s Included</FieldLabel>
                <div className="space-y-2">
                  {includes.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <InputField
                        value={item}
                        onChange={(e) =>
                          updateList(idx, e.target.value, includes, setIncludes)
                        }
                        placeholder={`Included item ${idx + 1}`}
                      />
                      {includes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFromList(idx, includes, setIncludes)}
                          className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg
                            text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setIncludes([...includes, ""])}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#1313ec]
                      hover:text-[#1313ec]/80 transition-colors mt-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add item
                  </button>
                </div>
              </div>

              {/* Requirements */}
              <div>
                <FieldLabel>
                  Requirements{" "}
                  <span className="normal-case font-normal text-slate-400">(optional)</span>
                </FieldLabel>
                <div className="space-y-2">
                  {requirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <InputField
                        value={req}
                        onChange={(e) =>
                          updateList(idx, e.target.value, requirements, setRequirements)
                        }
                        placeholder={`e.g. Drone License`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeFromList(idx, requirements, setRequirements)
                        }
                        className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg
                          text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setRequirements([...requirements, ""])}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#1313ec]
                      hover:text-[#1313ec]/80 transition-colors mt-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add requirement
                  </button>
                </div>
              </div>
            </form>

            {/* ── Dialog footer ─────────────────────────────────────────── */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm
                  font-semibold text-slate-700 hover:bg-slate-50 transition-colors
                  disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                form=""
                disabled={loading}
                onClick={(e) => {
                  // Programmatically submit the form inside the dialog
                  const form = (e.currentTarget.closest('[role="dialog"]') as HTMLElement)
                    ?.querySelector("form");
                  if (form) form.requestSubmit();
                }}
                className="flex items-center gap-2 rounded-lg bg-[#1313ec] px-5 py-2.5 text-sm
                  font-bold text-white shadow-sm hover:bg-[#1313ec]/90 transition-colors
                  disabled:opacity-60 disabled:cursor-not-allowed min-w-[120px] justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  "Save Service"
                )}
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Toast stack ─────────────────────────────────────────────────── */}
      <div className="fixed bottom-5 right-5 z-[60] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium shadow-lg
              pointer-events-auto animate-in slide-in-from-right-4 fade-in duration-300
              ${t.type === "success"
                ? "bg-white border border-emerald-100 text-emerald-700"
                : "bg-white border border-red-100 text-red-600"
              }`}
          >
            {t.type === "success" ? (
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
            )}
            {t.message}
          </div>
        ))}
      </div>
    </>
  );
}