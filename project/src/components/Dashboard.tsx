import { questions, domains, type DomainId } from '@/data/questions';

interface Result {
  correct: boolean;
  domain: DomainId;
}

interface DashboardProps {
  results: Result[];
  answered: number;
}

export function Dashboard({ results, answered }: DashboardProps) {
  const total = questions.length;
  const perDomain = domains.map((d) => {
    const domainQs = questions.filter((q) => q.domain === d.id);
    const domainResults = results.filter((r) => r.domain === d.id);
    const correct = domainResults.filter((r) => r.correct).length;
    const pct = domainQs.length > 0 ? Math.round((correct / domainQs.length) * 100) : 0;
    return { ...d, correct, total: domainQs.length, pct, attempted: domainResults.length };
  });

  const overallCorrect = results.filter((r) => r.correct).length;
  const overallPct = total > 0 ? Math.round((overallCorrect / total) * 100) : 0;
  const readiness = getReadiness(overallPct, answered);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">Exam Readiness</h2>
          <p className="text-xs text-slate-400">{answered} of {total} questions answered</p>
        </div>
        <div className="flex items-center gap-4">
          <CircularProgress pct={overallPct} />
          <div className={`rounded-xl px-3.5 py-2 text-sm font-semibold ${readiness.cls}`}>
            {readiness.label}
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3.5">
        {perDomain.map((d) => (
          <div key={d.id}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-300">{d.label}</span>
              <span className="tabular-nums text-slate-500">
                {d.correct}/{d.total} {d.attempted === 0 && <span className="text-slate-600">· not started</span>}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 transition-all duration-500"
                style={{ width: `${d.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CircularProgress({ pct }: { pct: number }) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const color = pct >= 80 ? '#34d399' : pct >= 70 ? '#38bdf8' : '#fb7185';
  return (
    <div className="relative h-16 w-16">
      <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={r} fill="none" stroke="#1e293b" strokeWidth="5" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="text-sm font-bold text-white tabular-nums">{pct}%</span>
      </div>
    </div>
  );
}

function getReadiness(pct: number, answered: number) {
  if (answered === 0) return { label: 'Not started yet', cls: 'bg-slate-800 text-slate-400' };
  if (pct >= 80) return { label: 'Ready for Exam Day', cls: 'bg-emerald-500/15 text-emerald-300' };
  if (pct >= 70) return { label: 'Almost There', cls: 'bg-sky-500/15 text-sky-300' };
  return { label: 'Needs Review', cls: 'bg-rose-500/15 text-rose-300' };
}
