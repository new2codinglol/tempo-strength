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
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.38, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------------------- */
/* The interval timer. It is the product, so it is the hero rather than a   */
/* section — the page opens on it at rest, one press from running.          */

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
    <div className="card p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="lab">Block 01 — goblet squat</p>
        <p className="lab text-ink-2">
          Round {round} of {ROUNDS}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-5">
        <p className="fig text-[5.5rem] leading-[0.8] sm:text-[7.5rem]">
          {mmss(Math.max(0, left))}
        </p>
        {/* The one place the accent appears on this page. Work is a filled
            block, rest is an outline — the state is legible from across a
            room, which is the actual use. */}
        <p
          className={`lab px-4 py-2 ${
            resting ? "border border-ink" : "bg-work"
          }`}
        >
          {resting ? "Rest" : "Work"}
        </p>
      </div>

      {/* Linear on purpose: it maps to elapsed time, and easing a clock makes
          it lie about where you are. */}
      <div className="mt-7 h-2 w-full bg-floor">
        <div
          className={`h-2 transition-[width] duration-1000 ease-linear ${
            resting ? "bg-ink" : "bg-work"
          }`}
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
          className="btn btn-solid px-7 py-3.5 text-[15px]"
        >
          {running ? "Pause" : atStart ? "Start block" : "Resume"}
        </button>
        <button type="button" onClick={reset} className="btn btn-ghost px-7 py-3.5 text-[15px]">
          Reset
        </button>
      </div>

      <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-ink-2">
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
      <div className="inline-flex rounded border border-ink p-1">
        {(["Monthly", "Yearly"] as const).map((label, i) => {
          const active = (i === 1) === annual;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setAnnual(i === 1)}
              aria-pressed={active}
              className={`lab rounded-[2px] px-5 py-2.5 transition-colors duration-150 ${
                active ? "bg-ink text-card" : "text-ink"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <p className="fig mt-7 text-[4.5rem] leading-none sm:text-[6rem]">
        ${price}
        <span className="lab ml-3 align-top text-ink-2">/ {annual ? "year" : "month"}</span>
      </p>
      <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-ink-2">
        {annual
          ? "Two months off, billed once. Cancel and the plans stay readable."
          : "Cancel any time. Your logged sessions export as CSV on the way out."}
      </p>
    </div>
  );
}
