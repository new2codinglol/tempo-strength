import Image from "next/image";
import { Badge, Burst, Curtain, IntervalTimer, PlanToggle, Reveal } from "./_c/Bits";

const U = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=72&auto=format&fit=crop`;

const PHOTO = {
  hero: "1600026453249-24a43274d65a",
  bright: "1584863431255-3997371dcc01",
  spotlight: "1759300642292-ffe3cb347548",
  rackMono: "1612099197070-4db4ab9abcd4",
  rackWide: "1576678927484-cc907957088c",
  hex: "1584827387150-8ae4caebe906",
};

const TICKER = [
  "20 MINUTES",
  "3× A WEEK",
  "NO STREAKS",
  "NO LEADERBOARD",
  "THE APP PICKS THE WEIGHT",
  "YOU SHOW UP",
];

const NAV: [string, string][] = [
  ["How it works", "#how"],
  ["Try the clock", "#try"],
  ["Sessions", "#sessions"],
  ["Pricing", "#price"],
];

/* The four hero lines, each with its own indent and its own size. In the
   reference no two lines share a left edge and no two are the same length,
   which is what stops the block reading as a centred stack. */
const HERO_LINES = [
  { t: "Twenty", indent: "21%", size: "13vw" },
  { t: "minutes.", indent: "2%", size: "13vw" },
  { t: "Three times", indent: "28%", size: "9.5vw" },
  { t: "a week.", indent: "31%", size: "13vw" },
];

const STEPS = [
  {
    n: "01",
    title: "Tell it what you have",
    body: "A barbell, two dumbbells, or a doorway and a backpack. Tempo builds the session around the equipment in the room, not the equipment in the video.",
  },
  {
    n: "02",
    title: "Four blocks, twenty minutes",
    body: "One push, one pull, one hinge, one carry. Three rounds each at 45 on and 15 off. The clock runs the session so you are not doing arithmetic between sets.",
  },
  {
    n: "03",
    title: "It moves the weight, not you",
    body: "Log the reps you actually finished. Next week's load comes from that number. Miss a week and it steps back rather than pretending you did not.",
  },
];

const SESSIONS = [
  { name: "Ground Floor", tag: "Week 1–4", mins: 20, kit: "Two dumbbells", photo: PHOTO.hex },
  { name: "Long Lever", tag: "Hinge focus", mins: 22, kit: "Barbell", photo: PHOTO.rackMono },
  { name: "Carry Home", tag: "Grip and trunk", mins: 18, kit: "Anything heavy", photo: PHOTO.rackWide },
  { name: "Hotel Room", tag: "No kit", mins: 16, kit: "Bodyweight", photo: PHOTO.bright },
  { name: "Top Set", tag: "Week 9+", mins: 24, kit: "Barbell", photo: PHOTO.spotlight },
  { name: "Deload", tag: "Every 5th week", mins: 14, kit: "Two dumbbells", photo: PHOTO.hero },
];

export default function Home() {
  return (
    <div className="crush relative overflow-x-clip">
      <Curtain words={HERO_LINES.map((l) => l.t)} />

      <div className="relative z-10">
        {/* ----------------------------------------------------- marquee */}
        <div className="overflow-hidden border-b border-hair py-2.5">
          <div className="ticker-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
                {TICKER.map((t) => (
                  <span
                    key={t}
                    className="micro flex items-center gap-8 whitespace-nowrap px-8 text-ink"
                  >
                    {t}
                    <span className="h-[3px] w-[3px] rounded-full bg-dim" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* -------------------------------------------------------- hero */}
        <section id="top" className="relative overflow-hidden px-6 pb-24 pt-7">
          {/* the hairlines that cut the composition, slightly off vertical */}
          <span className="rule-v left-[21%] rotate-[1.4deg]" aria-hidden />
          <span className="rule-v left-[47%] -rotate-[0.9deg]" aria-hidden />
          <span className="rule-v left-[72%] rotate-[1.1deg]" aria-hidden />

          <header className="relative z-20 flex items-start justify-between gap-8">
            <a href="#top" className="flex items-start gap-3">
              <svg viewBox="0 0 44 44" className="h-11 w-11 shrink-0" aria-hidden fill="none">
                <path
                  d="M8 30 L30 8 M14 36 L36 14"
                  stroke="var(--color-dim)"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <rect
                  x="7"
                  y="7"
                  width="30"
                  height="30"
                  rx="15"
                  stroke="var(--color-hair)"
                  strokeWidth="1"
                />
              </svg>
              <span className="micro text-ink">
                Tempo
                <br />
                Strength app
              </span>
            </a>

            <nav className="flex flex-col items-end">
              <ul className="micro flex flex-col items-end gap-0.5 text-ink">
                {NAV.map(([label, href]) => (
                  <li key={href}>
                    <a href={href} className="ul-hover">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#price" className="micro ul-hover mt-4 text-bone">
                Start free ↘
              </a>
            </nav>
          </header>

          {/* the display block */}
          <h1 className="stack relative z-10 mt-10 sm:mt-6">
            {HERO_LINES.map((l, i) => (
              <span
                key={l.t}
                className="veil lift disp line"
                style={{
                  marginLeft: l.indent,
                  fontSize: l.size,
                  animationDelay: `${900 + i * 110}ms`,
                }}
              >
                {l.t}
              </span>
            ))}
          </h1>

          {/* the copy block, nested inside the type rather than beside it */}
          <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
            <div className="pointer-events-auto absolute right-[7%] top-[24%] max-w-[17ch]">
              <p className="micro text-bone">Tempo is a strength app for people with a job.</p>
              <p className="mt-4 text-[13px] leading-[1.5] text-dim">
                Not a programme you have to keep up with. Four blocks, a clock that runs itself,
                and a weight that moves when your reps say it should.
              </p>
            </div>

            <div className="pointer-events-auto absolute right-[4%] top-[57%] text-right">
              <a href="#try" className="micro text-ink">
                Run
                <br />
                <span className="disp text-[22px] italic underline underline-offset-4">
                  a block now
                </span>
              </a>
            </div>

            <Burst className="absolute left-[62%] top-[57%] h-[190px] w-[190px]" />
            <Badge className="absolute left-[30%] top-[74%]" />
          </div>

          {/* Stacked rather than nested below lg. The composition does not
              survive at 390px, and pretending otherwise costs legibility. */}
          <div className="relative z-20 mt-12 lg:hidden">
            <p className="micro text-bone">Tempo is a strength app for people with a job.</p>
            <p className="mt-4 max-w-[42ch] text-[14px] leading-relaxed text-dim">
              Not a programme you have to keep up with. Four blocks, a clock that runs itself, and
              a weight that moves when your reps say it should.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-8">
              <a href="#try" className="btn btn-solid px-7 py-3 text-[12px]">
                Run a block now
              </a>
              <Burst className="h-20 w-20" />
            </div>
          </div>

          <p className="micro relative z-20 mt-16 text-dim lg:mt-[15rem]">
            No streaks · No leaderboard · No 6am inspirational push notification
          </p>
        </section>

        {/* --------------------------------------------------------- how */}
        <section id="how" className="border-t border-hair px-6 py-24">
          <Reveal>
            <p className="micro text-dim">01 — How it works</p>
            <h2 className="disp mt-5 text-[13vw] leading-[0.82] sm:text-[7rem]">
              Three decisions,
              <br />
              then it has it.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <div className="dash pt-5">
                  <p className="micro text-dim">{s.n}</p>
                  <h3 className="disp mt-4 text-[2rem] leading-[0.95]">{s.title}</h3>
                  <p className="mt-4 text-[14px] leading-relaxed text-dim">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* --------------------------------------------------------- try */}
        <section id="try" className="border-t border-hair px-6 py-24">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <Reveal>
              <p className="micro text-dim">02 — The clock</p>
              <h2 className="disp mt-5 text-[13vw] leading-[0.82] sm:text-[6.5rem]">
                The clock is
                <br />
                the product.
              </h2>
              <p className="mt-8 max-w-[38ch] text-[14px] leading-relaxed text-dim">
                So it is on the page rather than in a screenshot. Press start and run the first
                block of Ground Floor — the real intervals, the real cadence. In the app the same
                clock speaks the phase change out loud, so you never look at the screen mid-set.
                Here you get the bar.
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <IntervalTimer />
            </Reveal>
          </div>
        </section>

        {/* ---------------------------------------------------- sessions */}
        <section id="sessions" className="border-t border-hair px-6 py-24">
          <Reveal>
            <p className="micro text-dim">03 — The library</p>
            <h2 className="disp mt-5 text-[13vw] leading-[0.82] sm:text-[7rem]">
              Six sessions.
              <br />
              That is all of it.
            </h2>
            <p className="mt-8 max-w-[46ch] text-[14px] leading-relaxed text-dim">
              A bigger catalogue would be a content problem pretending to be a training problem.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {SESSIONS.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.05}>
                <article className="group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={U(s.photo, 560)}
                      alt=""
                      width={560}
                      height={420}
                      className="h-full w-full object-cover grayscale brightness-[0.72] contrast-[1.15] transition-[filter,transform] duration-500 ease-out group-hover:scale-[1.02] group-hover:brightness-90"
                    />
                  </div>
                  <div className="dash mt-5 flex items-baseline justify-between gap-4 pt-4">
                    <h3 className="disp text-[1.7rem] leading-none">{s.name}</h3>
                    <span className="micro tabular-nums text-dim">{s.mins} min</span>
                  </div>
                  <p className="micro mt-3 text-dim">
                    {s.tag} · {s.kit}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------- price */}
        <section id="price" className="border-t border-hair px-6 py-24">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <p className="micro text-dim">04 — Pricing</p>
              <h2 className="disp mt-5 text-[13vw] leading-[0.82] sm:text-[6.5rem]">
                One plan.
                <br />
                It does everything.
              </h2>
              <p className="mt-8 max-w-[38ch] text-[14px] leading-relaxed text-dim">
                There is no tier that unlocks the weights. Two weeks free, no card, and the export
                button works whether you are paying or not.
              </p>
              <ul className="mt-9 max-w-[40ch]">
                {[
                  "All six sessions and every progression",
                  "Voice cues for phase changes",
                  "Apple Health and Google Fit sync",
                  "CSV export of every set you have logged",
                ].map((f) => (
                  <li key={f} className="dash micro flex gap-5 py-3 text-ink">
                    <span className="text-dim">—</span>
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.06}>
              <PlanToggle />
              <a href="#top" className="btn btn-solid mt-10 inline-block px-8 py-3.5 text-[12px]">
                Start two weeks free
              </a>
              <p className="mt-5 text-[13px] text-dim">
                Tempo is not real.{" "}
                <a
                  href="https://github.com/new2codinglol/tempo-strength"
                  className="ul-hover text-ink"
                >
                  Read the source
                </a>{" "}
                instead.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------------ footer */}
        <footer className="border-t border-hair px-6 pb-14 pt-20">
          <p className="disp text-[13vw] leading-[0.82] sm:text-[8rem]">
            Twenty minutes.
            <br />
            You have twenty minutes.
          </p>
          <div className="dash mt-16 grid gap-8 pt-6 text-[12px] leading-relaxed text-dim sm:grid-cols-2">
            <p>
              Tempo is a fictional product. This page is a design-engineering portfolio piece by
              Jason Low — the app does not exist, but the interval clock above really runs.
            </p>
            <p className="sm:text-right">
              Photography from Unsplash: Michael DeMoya, Subtle Cinematics, Tejj, Samuel Girven,
              Delaney Van, Ramy Mamdouh.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
