import { Cloud } from 'lucide-react';

interface HeaderProps {
  score: number;
  answered: number;
  accuracy: number;
  activeDomain: string;
  onDomainChange: (domain: string) => void;
}

const tabs = [
  { id: 'all', label: 'All Domains' },
  { id: 'cloud-concepts', label: '1. Cloud Concepts' },
  { id: 'architecture', label: '2. Architecture & Services' },
  { id: 'management', label: '3. Management & Governance' },
];

export function Header({ score, answered, accuracy, activeDomain, onDomainChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 shadow-lg shadow-indigo-500/30">
              <Cloud className="h-5 w-5 text-white" strokeWidth={2.2} />
              <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-amber-400 text-[8px] font-bold text-slate-900">
                ✦
              </span>
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-white">
                Azure<span className="text-indigo-400">Clarity</span>
              </h1>
              <p className="text-xs text-slate-400">AI-powered AZ-900 study companion</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Stat label="Score" value={score} accent="text-sky-400" />
            <Divider />
            <Stat label="Answered" value={answered} accent="text-indigo-300" />
            <Divider />
            <Stat label="Accuracy" value={`${accuracy}%`} accent="text-emerald-400" />
          </div>
        </div>

        <nav className="flex flex-nowrap gap-1.5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const active = activeDomain === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onDomainChange(tab.id)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 sm:text-sm ${
                  active
                    ? 'bg-indigo-500/15 text-indigo-300 ring-1 ring-inset ring-indigo-500/40'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function Stat({ label, value, accent }: { label: string; value: string | number; accent: string }) {
  return (
    <div className="flex flex-col items-end leading-tight">
      <span className={`text-base font-bold tabular-nums sm:text-lg ${accent}`}>{value}</span>
      <span className="text-[10px] uppercase tracking-wider text-slate-500 sm:text-[11px]">{label}</span>
    </div>
  );
}

function Divider() {
  return <div className="h-8 w-px bg-slate-800" />;
}
