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
/* The interval timer, running for real. This is the product's core loop,  */
/* so the page lets you press it rather than describing it.                */

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
  const phase = resting ? "Rest" : "Work";
  // Rest is ice, work is the accent — the accent's one job on this page.
  const colour = resting ? "var(--color-ice)" : "var(--color-accent)";

  return (
    <div className="blk blk-lemon p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-display text-xl font-extrabold">Block 1 · Goblet squat</p>
        <p className="font-display text-sm font-bold">
          Round {round} of {ROUNDS}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-5">
        <p
          className="font-display text-[4.5rem] leading-none tabular-nums sm:text-[6rem]"
          aria-live="off"
        >
          {mmss(Math.max(0, left))}
        </p>
        <p
          className="px-3 py-1 font-display text-lg font-extrabold uppercase"
          style={{ background: colour, border: "2px solid var(--color-rim)" }}
        >
          {phase}
        </p>
      </div>

      {/* Bar is linear on purpose: it maps to elapsed time, and easing a  */}
      {/* clock makes it lie about where you are.                          */}
      <div className="mt-5 h-5 border-4 border-ink bg-white">
        <div
          className="h-full transition-[width] duration-1000 ease-linear"
          style={{ width: `${pct * 100}%`, background: colour }}
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            if (done) setClock(START); // clear the finished flag before restarting
            setRunning((r) => !r);
          }}
          className="btn bg-ink px-6 py-3 font-display text-base font-extrabold text-white"
        >
          {running ? "Pause" : atStart ? "Start block" : "Resume"}
        </button>
        <button
          type="button"
          onClick={reset}
          className="btn bg-white px-6 py-3 font-display text-base font-extrabold"
        >
          Reset
        </button>
      </div>

      <p className="mt-4 text-sm">
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
      <div className="inline-flex border-4 border-ink bg-white">
        {(["Monthly", "Yearly"] as const).map((label, i) => {
          const active = (i === 1) === annual;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setAnnual(i === 1)}
              aria-pressed={active}
              className="px-5 py-2.5 font-display text-sm font-extrabold transition-colors duration-200"
              style={{
                background: active ? "var(--color-ink)" : "transparent",
                color: active ? "#fff" : "var(--color-ink)",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <p className="mt-6 font-display text-6xl leading-none tabular-nums sm:text-7xl">
        ${price}
        <span className="font-sans text-lg font-bold"> / {annual ? "year" : "month"}</span>
      </p>
      <p className="mt-2 text-sm">
        {annual
          ? "Two months off, billed once. Cancel and the plans stay readable."
          : "Cancel any time. Your logged sessions export as CSV on the way out."}
      </p>
    </div>
  );
}
