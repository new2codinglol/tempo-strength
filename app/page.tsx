import Image from "next/image";
import { IntervalTimer, PlanToggle, Reveal } from "./_c/Bits";

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

const STEPS = [
  {
    n: "01",
    colour: "var(--color-lemon)",
    title: "Tell it what you have",
    body: "A barbell, two dumbbells, or a doorway and a backpack. Tempo builds the session around the equipment in the room, not the equipment in the video.",
  },
  {
    n: "02",
    colour: "var(--color-rose)",
    title: "Four blocks, twenty minutes",
    body: "One push, one pull, one hinge, one carry. Three rounds each at 45 on and 15 off. The clock runs the session so you are not doing arithmetic between sets.",
  },
  {
    n: "03",
    colour: "var(--color-cyan)",
    title: "It moves the weight, not you",
    body: "Log the reps you actually finished. Next week's load comes from that number. Miss a week and it steps back rather than pretending you did not.",
  },
];

const SESSIONS = [
  { name: "Ground Floor", tag: "Week 1–4", mins: 20, kit: "Two dumbbells", photo: PHOTO.hex, shade: "blk-lemon" },
  { name: "Long Lever", tag: "Hinge focus", mins: 22, kit: "Barbell", photo: PHOTO.rackMono, shade: "blk-rose" },
  { name: "Carry Home", tag: "Grip and trunk", mins: 18, kit: "Anything heavy", photo: PHOTO.rackWide, shade: "blk-cyan" },
  { name: "Hotel Room", tag: "No kit", mins: 16, kit: "Bodyweight", photo: PHOTO.bright, shade: "blk-lemon" },
  { name: "Top Set", tag: "Week 9+", mins: 24, kit: "Barbell", photo: PHOTO.spotlight, shade: "blk-cyan" },
  { name: "Deload", tag: "Every 5th week", mins: 14, kit: "Two dumbbells", photo: PHOTO.hero, shade: "blk-rose" },
];

function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 40" className={className} aria-hidden fill="none">
      <path
        d="M2 22C22 2 42 2 62 22s40 20 60 0 40-20 60 0 36 20 36 20"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div>
      {/* ------------------------------------------------------- ticker */}
      <div className="overflow-hidden border-b-4 border-ink bg-ink py-2.5">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
              {TICKER.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-6 whitespace-nowrap px-6 font-display text-sm font-extrabold tracking-wide text-cyan"
                >
                  {t}
                  <span className="h-2 w-2 rotate-45 bg-lemon" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------- nav */}
      <header className="sticky top-0 z-50 border-b-4 border-ink bg-paper">
        <nav className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
          <a href="#top" className="font-display text-2xl font-extrabold tracking-tight">
            Tempo<span className="text-rose">.</span>
          </a>
          <div className="ml-auto hidden gap-5 font-display text-sm font-extrabold sm:flex">
            <a href="#how" className="hover:text-rose">How it works</a>
            <a href="#try" className="hover:text-rose">Try the clock</a>
            <a href="#sessions" className="hover:text-rose">Sessions</a>
          </div>
          <a
            href="#price"
            className="btn ml-auto bg-cyan px-4 py-2 font-display text-sm font-extrabold sm:ml-0"
          >
            Start free
          </a>
        </nav>
      </header>

      {/* --------------------------------------------------------- hero */}
      <section id="top" className="mx-auto grid max-w-6xl gap-12 px-5 py-14 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
        <div>
          <p className="inline-block border-4 border-ink bg-lemon px-3 py-1 font-display text-sm font-extrabold">
            Strength for people with a job
          </p>

          <h1 className="mt-6 font-display text-[3.1rem] font-extrabold leading-[0.92] tracking-[-0.035em] sm:text-7xl">
            Twenty minutes.
            <br />
            Three times
            <br />
            <span className="relative inline-block">
              a week.
              <Squiggle className="wobble absolute -bottom-5 left-0 h-8 w-[86%] text-rose" />
            </span>
          </h1>

          <p className="mt-12 max-w-md text-lg leading-relaxed">
            Not a programme you have to keep up with. Four blocks, a clock that runs itself, and a
            weight that moves when your reps say it should.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#try" className="btn bg-ink px-7 py-4 font-display text-base font-extrabold text-white">
              Run a block now
            </a>
            <a href="#how" className="btn bg-white px-7 py-4 font-display text-base font-extrabold">
              How it works
            </a>
          </div>

          <p className="mt-6 font-display text-sm font-bold">
            No streaks. No leaderboard. No 6am inspirational push notification.
          </p>
        </div>

        {/* stacked photo blocks — Memphis composition, not a hero banner */}
        <div className="relative min-h-[420px]">
          <div className="blk absolute left-0 top-0 w-[64%] overflow-hidden">
            <Image
              src={U(PHOTO.hero, 720)}
              alt="Lifting a dumbbell in a dimly lit gym"
              width={720}
              height={1080}
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <div className="blk blk-cyan absolute bottom-0 right-0 w-[56%] overflow-hidden">
            <Image
              src={U(PHOTO.bright, 640)}
              alt="Pulling on a hooded top beside a rack of dumbbells"
              width={640}
              height={960}
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className="stripe absolute right-[8%] top-[6%] h-16 w-16 opacity-80"
            aria-hidden
          />
        </div>
      </section>

      {/* ---------------------------------------------------------- how */}
      <section id="how" className="border-y-4 border-ink bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              Three decisions, then the app has it.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <div className="lift h-full border-4 border-ink bg-paper p-6"
                     style={{ boxShadow: `8px 8px 0 ${s.colour}, 16px 16px 0 var(--color-ink)` }}>
                  <p className="font-display text-5xl font-extrabold leading-none">{s.n}</p>
                  <h3 className="mt-4 font-display text-xl font-extrabold">{s.title}</h3>
                  <p className="mt-2 leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- try */}
      <section id="try" className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              The clock is the product.
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed">
              So it is on the page rather than in a screenshot. Press start and run the first block
              of Ground Floor — the real intervals, the real cadence.
            </p>
            <p className="mt-4 max-w-md">
              In the app the same clock speaks the phase change out loud, so you never look at the
              screen mid-set. Here you get the bar.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <IntervalTimer />
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------- sessions */}
      <section id="sessions" className="border-y-4 border-ink bg-cyan">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              Six sessions. That is the library.
            </h2>
            <p className="mt-3 max-w-lg text-lg">
              A bigger catalogue would be a content problem pretending to be a training problem.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SESSIONS.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.05}>
                <article className={`lift blk ${s.shade} h-full`}>
                  <div className="relative h-44 overflow-hidden border-b-4 border-ink">
                    <Image
                      src={U(s.photo, 560)}
                      alt=""
                      width={560}
                      height={340}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute left-0 top-0 border-b-4 border-r-4 border-ink bg-paper px-3 py-1 font-display text-xs font-extrabold">
                      {s.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-2xl font-extrabold">{s.name}</h3>
                    <p className="mt-2 font-display text-sm font-bold">
                      {s.mins} min · {s.kit}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- price */}
      <section id="price" className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              One plan. It does everything.
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed">
              There is no tier that unlocks the weights. Two weeks free, no card, and the export
              button works whether you are paying or not.
            </p>
            <ul className="mt-6 space-y-2 font-display font-bold">
              {[
                "All six sessions and every progression",
                "Voice cues for phase changes",
                "Apple Health and Google Fit sync",
                "CSV export of every set you have logged",
              ].map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="mt-2 h-3 w-3 shrink-0 rotate-45 bg-rose" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="blk blk-rose p-8">
              <PlanToggle />
              <a
                href="#top"
                className="btn mt-8 inline-block bg-ink px-7 py-4 font-display text-base font-extrabold text-white"
              >
                Start two weeks free
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- footer */}
      <footer className="border-t-4 border-ink bg-ink px-5 py-12 text-paper">
        <div className="mx-auto max-w-6xl">
          <p className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            Twenty minutes.
            <br />
            You have twenty minutes.
          </p>
          <div className="mt-10 grid gap-6 border-t-4 border-paper/25 pt-6 text-sm sm:grid-cols-2">
            <p>
              Tempo is a fictional product. This page is a design-engineering portfolio piece by
              Jason Low — the app does not exist, but the interval clock above really runs.
            </p>
            <p className="sm:text-right">
              Photography from Unsplash: Michael DeMoya, Subtle Cinematics, Tejj, Samuel Girven,
              Delaney Van, Ramy Mamdouh.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
