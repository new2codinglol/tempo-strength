"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/* --------------------------------------------------------------------- */

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.4, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------------------- */
/* The preloader. The reference's own loading state is a counter running to  */
/* 100 over ghosted type, then a curtain lifting off the composition — so    */
/* it is the page's first animation and the reason the hero lines can be     */
/* uncovered rather than faded in.                                          */

export function Curtain({ words }: { words: string[] }) {
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);
  const [gone, setGone] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (reduced) {
      setGone(true);
      document.documentElement.dataset.loaded = "1";
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const DUR = 1100;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / DUR);
      setN(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(step);
      else {
        setLeaving(true);
        document.documentElement.dataset.loaded = "1";
        // matches the curtain keyframe, so the hero is uncovered as it lifts
        setTimeout(() => setGone(true), 800);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  if (gone) return null;

  return (
    <div className={`curtain ${leaving ? "curtain-out" : ""}`} aria-hidden>
      <div className="relative h-full w-full overflow-hidden px-6 py-6">
        <p className="micro text-dim">Tempo — strength app</p>

        {/* the ghosted composition underneath, exactly as the source shows it */}
        <div className="absolute inset-x-6 bottom-16 opacity-[0.06]">
          <div className="stack">
            {words.map((w) => (
              <span key={w} className="disp line text-[13vw]">
                {w}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="disp text-[13vw] tabular-nums text-ink/25">{n}</span>
        </div>
        <p className="micro absolute bottom-6 right-6 text-dim tabular-nums">{n}%</p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* The circular badge from the reference, set on a rotating ring.          */

export function Badge({ className = "" }: { className?: string }) {
  return (
    <div className={`relative grid h-[190px] w-[190px] place-items-center ${className}`} aria-hidden>
      <svg viewBox="0 0 190 190" className="badge-ring absolute inset-0 h-full w-full">
        <circle cx="95" cy="95" r="94" fill="none" stroke="var(--color-hair)" strokeWidth="1" />
        <circle cx="95" cy="95" r="80" fill="none" stroke="var(--color-hair)" strokeWidth="1" strokeDasharray="2 7" />
      </svg>
      <div className="micro text-center leading-[1.7] text-dim">
        Strength
        <br />
        for
        <br />
        <span className="text-ink">people with</span>
        <br />
        a job
        <br />
        <span className="text-[9px] tracking-[0.18em]">since &rsquo;26</span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* The radial burst. Drawn once, on view.                                  */

export function Burst({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const rays = Array.from({ length: 26 }, (_, i) => (i / 26) * Math.PI * 2);

  return (
    <svg
      ref={ref}
      viewBox="-100 -100 200 200"
      className={`burst ${inView ? "drawn" : ""} ${className}`}
      aria-hidden
    >
      {rays.map((a, i) => (
        <line
          key={a}
          x1={Math.cos(a) * 12}
          y1={Math.sin(a) * 12}
          x2={Math.cos(a) * 92}
          y2={Math.sin(a) * 92}
          stroke="var(--color-dim)"
          strokeWidth="0.6"
          style={{ animationDelay: `${i * 14}ms` }}
        />
      ))}
      <circle cx="0" cy="0" r="9" fill="var(--color-ink)" />
    </svg>
  );
}

/* --------------------------------------------------------------------- */
/* The interval timer, running for real. This is the product's core loop,  */
/* so the page lets you press it rather than describing it. The reference   */
/* is monochrome, so the work phase is an inversion, not a colour.          */

const WORK = 45;
const REST = 15;
const ROUNDS = 3;

function mmss(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/* One state object and one pure updater: phase changes happen inside the
   tick rather than in a chain of setters, so a double-invoked updater in
   development cannot skip a round. */
type Clock = { round: number; resting: boolean; left: number; done: boolean };
const START: Clock = { round: 1, resting: false, left: WORK, done: false };

function tick(c: Clock): Clock {
  if (c.left > 1) return { ...c, left: c.left - 1 };
  if (!c.resting) return { ...c, resting: true, left: REST };
  if (c.round >= ROUNDS) return { ...START, done: true };
  return { ...c, round: c.round + 1, resting: false, left: WORK };
}

export function IntervalTimer() {
  const [running, setRunning] = useState(false);
  const [{ round, resting, left, done }, setClock] = useState<Clock>(START);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setClock(tick), 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (done) setRunning(false);
  }, [done]);

  function reset() {
    setRunning(false);
    setClock(START);
  }

  const atStart = round === 1 && !resting && left === WORK;
  const total = resting ? REST : WORK;
  const pct = Math.max(0, Math.min(1, left / total));

  return (
    <div className="dash pt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="micro text-dim">Block 01 — goblet squat</p>
        <p className="micro tabular-nums text-dim">
          Round {round} / {ROUNDS}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-end gap-6">
        <p className="disp text-[6.5rem] tabular-nums leading-[0.8] sm:text-[8.5rem]">
          {mmss(Math.max(0, left))}
        </p>
        <p
          className={`micro mb-4 px-3 py-1.5 ${
            resting ? "border border-ink text-ink" : "bg-bone text-void"
          }`}
        >
          {resting ? "Rest" : "Work"}
        </p>
      </div>

      {/* Linear on purpose: it maps to elapsed time, and easing a clock makes
          it lie about where you are. */}
      <div className="mt-6 h-px w-full bg-hair">
        <div
          className="h-px bg-bone transition-[width] duration-1000 ease-linear"
          style={{ width: `${pct * 100}%` }}
        />
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            if (done) setClock(START);
            setRunning((r) => !r);
          }}
          className="btn btn-solid px-7 py-3 text-[12px]"
        >
          {running ? "Pause" : atStart ? "Start block" : "Resume"}
        </button>
        <button type="button" onClick={reset} className="btn px-7 py-3 text-[12px]">
          Reset
        </button>
      </div>

      <p className="mt-6 max-w-sm text-[13px] leading-relaxed text-dim">
        {done
          ? "Block done. Three more like it and you are out the door."
          : "45 on, 15 off, three rounds. Four blocks like this is the whole session."}
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------- */

export function PlanToggle() {
  const [annual, setAnnual] = useState(false);
  const price = annual ? 69 : 7;

  return (
    <div>
      <div className="inline-flex">
        {(["Monthly", "Yearly"] as const).map((label, i) => {
          const active = (i === 1) === annual;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setAnnual(i === 1)}
              aria-pressed={active}
              className={`btn px-6 py-2.5 text-[11px] ${active ? "btn-solid" : ""} ${
                i === 0 ? "border-r-0" : ""
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <p className="disp mt-8 text-[5rem] leading-none tabular-nums sm:text-[7rem]">
        ${price}
        <span className="micro ml-3 align-top text-dim">/ {annual ? "year" : "month"}</span>
      </p>
      <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-dim">
        {annual
          ? "Two months off, billed once. Cancel and the plans stay readable."
          : "Cancel any time. Your logged sessions export as CSV on the way out."}
      </p>
    </div>
  );
}
