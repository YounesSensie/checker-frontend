"use client";

import { Star } from "lucide-react";

import { useState } from "react";
import { CheckerReview } from "./types-checker";

interface ReviewsSectionProps {
  reviews: CheckerReview[];
  totalReviews: number;
  averageRating: number;
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const starSize = size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${starSize} ${
            i <= rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
}

const avatarColors = [
  "bg-indigo-100 text-indigo-700",
  "bg-emerald-100 text-emerald-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
  "bg-purple-100 text-purple-700",
];

export function ReviewsSection({ reviews, totalReviews, averageRating }: ReviewsSectionProps) {
  const [sortBy, setSortBy] = useState<"newest" | "highest">("newest");

  const sorted = [...reviews].sort((a, b) => {
    if (sortBy === "highest") return b.rating - a.rating;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Client Reviews</h2>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={Math.round(averageRating)} />
            <span className="text-sm font-bold text-slate-700">{averageRating.toFixed(1)}</span>
            <span className="text-sm text-slate-500">· {totalReviews} verified bookings</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "newest" | "highest")}
            className="text-sm border border-slate-200 rounded-lg py-1.5 pl-3 pr-7 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white"
          >
            <option value="newest">Newest First</option>
            <option value="highest">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="space-y-8">
        {sorted.map((review, idx) => (
          <div
            key={review.id}
            className="border-b border-slate-50 pb-8 last:border-0 last:pb-0"
          >
            <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    avatarColors[idx % avatarColors.length]
                  }`}
                >
                  {review.reviewer.avatar ? (
                    <img
                      src={review.reviewer.avatar}
                      alt=""
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    getInitials(review.reviewer.firstName, review.reviewer.lastName)
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {review.reviewer.firstName} {review.reviewer.lastName}
                  </p>
                  <p className="text-xs text-slate-400">
                    {review.serviceType && `${review.serviceType} · `}
                    {formatDate(review.createdAt)}
                  </p>
                </div>
              </div>
              <StarRating rating={review.rating} />
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">{review.comment}</p>

            {/* Sub-ratings */}
            {(review.communication || review.quality) && (
              <div className="mt-3 flex flex-wrap gap-4">
                {review.communication && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span>Communication</span>
                    <StarRating rating={review.communication} />
                  </div>
                )}
                {review.quality && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span>Quality</span>
                    <StarRating rating={review.quality} />
                  </div>
                )}
                {review.punctuality && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span>Punctuality</span>
                    <StarRating rating={review.punctuality} />
                  </div>
                )}
              </div>
            )}

            {/* Checker Response */}
            {review.response && (
              <div className="mt-4 pl-4 border-l-2 border-primary/20 bg-primary/5 rounded-r-lg p-3">
                <p className="text-xs font-bold text-primary mb-1">Response from checker</p>
                <p className="text-sm text-slate-600">{review.response}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {totalReviews > reviews.length && (
        <button className="mt-8 w-full py-3 text-sm font-bold text-primary hover:text-primary-light hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
          View all {totalReviews} reviews
        </button>
      )}
    </section>
  );
}