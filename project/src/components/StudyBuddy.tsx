import { useState } from 'react';
import { Brain, MessageCircle, Sparkles, Send, Lightbulb } from 'lucide-react';
import type { Question } from '@/data/questions';

interface StudyBuddyProps {
  question: Question;
  correct: boolean;
}

export function StudyBuddy({ question, correct }: StudyBuddyProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const [followUpOpen, setFollowUpOpen] = useState(false);

  if (correct) {
    return (
      <div className="animate-[fadeIn_0.4s_ease] rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5">
        <div className="flex items-center gap-2 text-emerald-300">
          <Sparkles className="h-4 w-4 animate-pulse" />
          <span className="text-sm font-semibold">Reinforcement Tip</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          {question.buddy.trap}
        </p>
      </div>
    );
  }

  return (
    <div className="animate-[fadeIn_0.4s_ease] overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.07] to-slate-900/40">
      <div className="flex items-center gap-2.5 border-b border-indigo-500/15 px-5 py-3.5">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-500/20">
          <Brain className="h-4 w-4 text-indigo-300" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">AI Study Buddy</h3>
          <p className="text-[11px] text-slate-400">Let's make this stick.</p>
        </div>
      </div>

      <div className="space-y-3 p-5">
        <BuddyBlock title="Why that choice didn't fit" body={question.buddy.whyWrong} />
        <BuddyBlock title="Everyday Analogy" body={question.buddy.analogy} icon="analogy" />
        <BuddyBlock title="Exam Trap / Keyword Trigger" body={question.buddy.trap} icon="trap" />

        <button
          onClick={() => setChatOpen((v) => !v)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-4 py-2.5 text-sm font-medium text-indigo-200 transition hover:bg-indigo-500/20"
        >
          <MessageCircle className="h-4 w-4" />
          {chatOpen ? 'Hide Follow-up' : 'Ask Buddy a Follow-up'}
        </button>

        {chatOpen && (
          <div className="animate-[fadeIn_0.3s_ease] rounded-xl border border-slate-700 bg-slate-900/70 p-4">
            <div className="flex gap-3">
              <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-indigo-500/25">
                <Brain className="h-3.5 w-3.5 text-indigo-300" />
              </div>
              <p className="text-sm leading-relaxed text-slate-200">
                {question.buddy.followUp}
              </p>
            </div>

            {!followUpOpen && (
              <button
                onClick={() => setFollowUpOpen(true)}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-xs text-slate-300 transition hover:bg-slate-800"
              >
                <Send className="h-3 w-3" /> "Can you give me another example?"
              </button>
            )}
            {followUpOpen && (
              <div className="mt-3 flex gap-3 animate-[fadeIn_0.3s_ease]">
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-700">
                  <Send className="h-3.5 w-3.5 text-slate-300" />
                </div>
                <div className="rounded-xl rounded-tl-sm bg-slate-800/60 px-3.5 py-2.5 text-sm text-slate-200">
                  Sure! The key idea is recognizing which responsibility boundary the service sits on. Whenever you see a
                  scenario, ask yourself: "Who owns this layer?" That single question unlocks most shared-responsibility,
                  IaaS/PaaS/SaaS, and governance questions on the exam.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function BuddyBlock({ title, body, icon }: { title: string; body: string; icon?: 'analogy' | 'trap' }) {
  return (
    <div className="rounded-xl bg-slate-900/50 p-3.5">
      <div className="mb-1 flex items-center gap-1.5">
        {icon === 'analogy' ? (
          <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
        ) : icon === 'trap' ? (
          <Sparkles className="h-3.5 w-3.5 text-rose-400" />
        ) : null}
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</h4>
      </div>
      <p className="text-sm leading-relaxed text-slate-200">{body}</p>
    </div>
  );
}
