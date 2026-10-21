import { useMemo, useState } from 'react';
import { ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { Header } from '@/components/Header';
import { QuizCard } from '@/components/QuizCard';
import { StudyBuddy } from '@/components/StudyBuddy';
import { Dashboard } from '@/components/Dashboard';
import { Footer } from '@/components/Footer';
import { questions, type DomainId } from '@/data/questions';
import { shuffle } from '@/lib/quiz';

type DomainFilter = 'all' | DomainId;

interface Result {
  correct: boolean;
  domain: DomainId;
}

function App() {
  const [activeDomain, setActiveDomain] = useState<DomainFilter>('all');
  const [seed, setSeed] = useState(0);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Result[]>([]);

  const deck = useMemo(() => {
    const list = activeDomain === 'all' ? questions : questions.filter((q) => q.domain === activeDomain);
    return shuffle(list);
    // re-shuffle when domain changes or reset is pressed
  }, [activeDomain, seed]);

  const question = deck[current];
  const total = deck.length;

  const score = results.filter((r) => r.correct).length;
  const answered = results.length;
  const accuracy = answered === 0 ? 0 : Math.round((score / answered) * 100);

  const handleDomainChange = (d: string) => {
    setActiveDomain(d as DomainFilter);
    setCurrent(0);
    setSelected(null);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (selected === null || !question) return;
    const correct = selected === question.correctIndex;
    setResults((prev) => [...prev, { correct, domain: question.domain }]);
    setSubmitted(true);
  };

  const handleNext = () => {
    if (current + 1 >= total) return;
    setCurrent((c) => c + 1);
    setSelected(null);
    setSubmitted(false);
  };

  const handleReset = () => {
    setSeed((s) => s + 1);
    setCurrent(0);
    setSelected(null);
    setSubmitted(false);
    setResults([]);
  };

  const allDone = total > 0 && current + 1 >= total && submitted;

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <Header
        score={score}
        answered={answered}
        accuracy={accuracy}
        activeDomain={activeDomain}
        onDomainChange={handleDomainChange}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-5">
            {question ? (
              <>
                <QuizCard
                  question={question}
                  index={current}
                  total={total}
                  selected={selected}
                  submitted={submitted}
                  onSelect={setSelected}
                  onSubmit={handleSubmit}
                />

                {submitted && <StudyBuddy question={question} correct={selected === question.correctIndex} />}

                {submitted && (
                  <div className="flex flex-wrap gap-3">
                    {!allDone ? (
                      <button
                        onClick={handleNext}
                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:from-indigo-400 hover:to-sky-400"
                      >
                        Next Question <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <div className="flex w-full items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-3.5">
                        <Trophy className="h-5 w-5 text-amber-400" />
                        <span className="text-sm font-medium text-amber-200">
                          You finished this set — check your readiness on the right.
                        </span>
                      </div>
                    )}
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
                    >
                      <RotateCcw className="h-4 w-4" /> Reset
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="grid place-items-center rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
                <p className="text-slate-400">No questions in this domain yet.</p>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <Dashboard results={results} answered={answered} />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
