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

const NAV: [string, string][] = [
  ["How it works", "#how"],
  ["Sessions", "#sessions"],
  ["Pricing", "#price"],
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
    <div>
      {/* ------------------------------------------------------------ nav */}
      <header className="rule sticky top-0 z-50 border-t-0 bg-floor/90 backdrop-blur-sm">
        <nav className="wrap flex items-center gap-6 py-4">
          <a href="#top" className="h3">
            Tempo
          </a>
          <ul className="ml-auto hidden gap-7 sm:flex">
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="lab ul-hover text-ink-2">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#price" className="btn btn-solid ml-auto px-5 py-2.5 text-[13px] sm:ml-0">
            Start free
          </a>
        </nav>
      </header>

      {/* ----------------------------------------------------------- hero */}
      {/* The clock is the product, so it is the hero rather than a section
          five screens down. Claim on the left, the real thing on the right,
          one press from running. */}
      <section id="top" className="wrap py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <p className="lab text-ink-2">Strength for people with a job</p>
            <h1 className="display mt-5">
              Twenty minutes.
              <br />
              Three times a week.
            </h1>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ink-2">
              Not a programme you have to keep up with. Four blocks, a clock that runs itself, and
              a weight that moves when your reps say it should.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#price" className="btn btn-solid px-7 py-3.5 text-[15px]">
                Start two weeks free
              </a>
              <span className="text-[14px] text-ink-2">No card. Cancel any time.</span>
            </div>
            <p className="lab mt-8 text-ink-2">
              No streaks · No leaderboard · No 6am push notification
            </p>
          </div>

          {/* On a phone the clock comes first — it is the argument, and
              burying it under the claim loses it. */}
          <div className="order-1 lg:order-2">
            <IntervalTimer />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ how */}
      <section id="how" className="rule border-t">
        <div className="wrap py-16">
          <Reveal>
            <h2 className="h2 max-w-[18ch]">Three decisions, then the app has it.</h2>
          </Reveal>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <div className="rule border-t pt-5">
                  <p className="lab text-ink-2">{s.n}</p>
                  <h3 className="h3 mt-4">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- sessions */}
      <section id="sessions" className="rule border-t">
        <div className="wrap py-16">
          <Reveal>
            <h2 className="h2">Six sessions. That is the library.</h2>
            <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-ink-2">
              A bigger catalogue would be a content problem pretending to be a training problem.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SESSIONS.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.05}>
                <article className="card overflow-hidden">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={U(s.photo, 560)}
                      alt=""
                      width={560}
                      height={374}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="h3">{s.name}</h3>
                      <span className="fig text-[15px]">{s.mins} min</span>
                    </div>
                    <p className="lab mt-3 text-ink-2">
                      {s.tag} · {s.kit}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- price */}
      <section id="price" className="rule border-t">
        <div className="wrap grid gap-12 py-16 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <h2 className="h2">One plan. It does everything.</h2>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink-2">
              There is no tier that unlocks the weights. Two weeks free, no card, and the export
              button works whether you are paying or not.
            </p>
            <ul className="mt-8 max-w-[42ch]">
              {[
                "All six sessions and every progression",
                "Voice cues for phase changes",
                "Apple Health and Google Fit sync",
                "CSV export of every set you have logged",
              ].map((f) => (
                <li key={f} className="rule flex gap-4 border-t py-3 text-[15px]">
                  <span className="text-ink-2">—</span>
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="card p-8">
              <PlanToggle />
              <a href="#top" className="btn btn-solid mt-8 inline-block px-7 py-3.5 text-[15px]">
                Start two weeks free
              </a>
            </div>
            <p className="mt-5 text-[14px] text-ink-2">
              Tempo is not real.{" "}
              <a
                href="https://github.com/new2codinglol/tempo-strength"
                className="text-ink underline underline-offset-[3px]"
              >
                Read the source
              </a>{" "}
              instead.
            </p>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- footer */}
      <footer className="rule border-t">
        <div className="wrap py-12">
          <p className="h2 max-w-[16ch]">Twenty minutes. You have twenty minutes.</p>
          <div className="rule mt-10 grid gap-6 border-t pt-6 text-[13px] leading-relaxed text-ink-2 sm:grid-cols-2">
            <p>
              Tempo is a fictional product. This page is a design-engineering portfolio piece by
              Jason Low — the app does not exist, but the interval clock at the top really runs.
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
