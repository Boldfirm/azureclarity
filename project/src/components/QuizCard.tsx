import { CheckCircle2, XCircle } from 'lucide-react';
import type { Question } from '@/data/questions';
import { domainLabel } from '@/lib/quiz';

interface QuizCardProps {
  question: Question;
  index: number;
  total: number;
  selected: number | null;
  submitted: boolean;
  onSelect: (i: number) => void;
  onSubmit: () => void;
}

export function QuizCard({ question, index, total, selected, submitted, onSelect, onSubmit }: QuizCardProps) {
  const letters = ['A', 'B', 'C', 'D'];
  const isCorrect = submitted && selected === question.correctIndex;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl shadow-black/20 sm:p-7">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-300 ring-1 ring-inset ring-indigo-500/25">
          {domainLabel(question.domain)}
        </span>
        <span className="text-xs font-medium text-slate-500">
          Question <span className="text-slate-300">{index + 1}</span> / {total}
        </span>
      </div>

      <p className="text-base font-medium leading-relaxed text-slate-100 sm:text-lg">{question.prompt}</p>

      <div className="mt-5 grid gap-2.5">
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          const isAnswer = i === question.correctIndex;
          let cls = 'border-slate-700 bg-slate-800/40 hover:border-slate-600 hover:bg-slate-800/70 text-slate-200';
          if (submitted) {
            if (isAnswer) cls = 'border-emerald-500/70 bg-emerald-500/10 text-emerald-100';
            else if (isSelected) cls = 'border-rose-500/70 bg-rose-500/10 text-rose-100';
            else cls = 'border-slate-800 bg-slate-800/20 text-slate-400';
          } else if (isSelected) {
            cls = 'border-indigo-500 bg-indigo-500/10 text-indigo-50 ring-1 ring-indigo-500/40';
          }

          return (
            <button
              key={i}
              disabled={submitted}
              onClick={() => onSelect(i)}
              className={`group flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200 ${cls} ${
                submitted ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold ${
                  submitted && isAnswer
                    ? 'bg-emerald-500 text-white'
                    : submitted && isSelected
                    ? 'bg-rose-500 text-white'
                    : isSelected
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-700 text-slate-300 group-hover:bg-slate-600'
                }`}
              >
                {submitted && isAnswer ? <CheckCircle2 className="h-4 w-4" /> : submitted && isSelected ? <XCircle className="h-4 w-4" /> : letters[i]}
              </span>
              <span className="leading-snug">{opt}</span>
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <button
          onClick={onSubmit}
          disabled={selected === null}
          className={`mt-5 w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
            selected === null
              ? 'cursor-not-allowed bg-slate-800 text-slate-500'
              : 'bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-400 hover:to-sky-400 active:scale-[0.99]'
          }`}
        >
          Submit Answer
        </button>
      ) : (
        <div
          className={`mt-5 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${
            isCorrect ? 'bg-emerald-500/10 text-emerald-300' : 'bg-rose-500/10 text-rose-300'
          }`}
        >
          {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          {isCorrect ? 'Correct! Nice work.' : 'Not quite — see the Study Buddy breakdown below.'}
        </div>
      )}
    </div>
  );
}
