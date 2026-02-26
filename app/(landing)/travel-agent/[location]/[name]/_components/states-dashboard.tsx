
import { ClipboardCheck, Star, GraduationCap, Zap } from "lucide-react";
import { CheckerProfile } from "./types-checker";


interface StatsDashboardProps {
  checker: CheckerProfile;
}

const responseTimeLabel: Record<string, string> = {
  "within-1-hour": "1 hr",
  "same-day": "Same day",
  "within-24-hours": "24 hrs",
};

export function StatsDashboard({ checker }: StatsDashboardProps) {
  const stats = [
    {
      icon: <ClipboardCheck className="w-6 h-6" />,
      value: `${checker.completedBookings}+`,
      label: "Inspections",
      color: "text-primary",
      bg: "bg-primary/5",
    },
    {
      icon: <Star className="w-6 h-6 fill-current" />,
      value: checker.averageRating.toFixed(1),
      label: "Avg. Rating",
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      value: `${checker.yearsOfExperience} Yrs`,
      label: "Experience",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      value: checker.responseTime ? responseTimeLabel[checker.responseTime] ?? checker.responseTime : "Fast",
      label: "Response",
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <section aria-label="Statistics">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`inline-flex p-2 rounded-lg ${stat.bg} ${stat.color} mb-3`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}