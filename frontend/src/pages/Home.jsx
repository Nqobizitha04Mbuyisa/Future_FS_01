import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Database,
  Server,
  Sparkles,
  Github,
  Mail,
  Download,
  CircleCheck,
} from "lucide-react";
import Avatar from "../components/Avatar";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { profile, summary, languages, projects } from "../data/portfolioData";

const tickerItems = [
  "Java",
  "Spring",
  "REST APIs",
  "SQL",
  "MySQL",
  "MongoDB",
  "C#",
  ".NET",
  "Python",
  "C++",
  "OOP",
  "Data Structures",
  "System Design",
  "Git",
  "AWS",
];

const stats = [
  { value: "7+", label: "Languages used" },
  { value: "4+", label: "Shipped projects" },
  { value: "AWS", label: "Cloud certified" },
  { value: "100%", label: "Curiosity" },
];

const Home = () => {
  const featured = projects.slice(0, 3);

  return (
    <div className="reveal">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-12 sm:pt-16 pb-14">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-mono text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Available for junior backend roles
              </div>
              <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[64px] font-semibold tracking-tight leading-[1.05]">
                Building <span className="text-primary">backend systems</span>
                <br /> that quietly do the
                <br /> heavy lifting.
              </h1>
              <p className="mt-5 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                I'm <span className="text-foreground font-medium">{profile.name}</span>{" "}
                — a Junior Software Engineer focused on Java, SQL and clean,
                database-driven REST systems. I turn fuzzy ideas into
                well-modeled, maintainable code.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link to="/projects">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                  >
                    See my work
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border text-foreground hover:border-primary hover:text-primary"
                  >
                    <Mail size={16} className="mr-2" /> Get in touch
                  </Button>
                </Link>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <Github size={16} /> @{profile.githubHandle}
                  <ArrowUpRight size={12} />
                </a>
                {profile.resumeUrl && profile.resumeUrl !== "#" && (
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-primary"
                  >
                    <Download size={16} /> Download CV
                  </a>
                )}
              </div>

              <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-2xl">
                {stats.map((s) => (
                  <div key={s.label} className="border-l-2 border-primary/40 pl-3">
                    <dt className="font-display text-2xl font-semibold text-foreground">
                      {s.value}
                    </dt>
                    <dd className="text-xs font-mono text-muted-foreground mt-1">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-4 bg-primary/5 rounded-3xl rotate-2" />
                <div className="relative rounded-3xl border border-border bg-card p-7">
                  <div className="flex justify-center pb-4">
                    <Avatar size="lg" />
                  </div>
                  <div className="mt-7 text-center">
                    <h3 className="font-display text-xl font-semibold">
                      {profile.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {profile.title}
                    </p>
                  </div>

                  <div className="mt-6 space-y-2.5">
                    {[
                      "Java / SQL backend focus",
                      "BSc Computer Science & IT",
                      "AWS Cloud Practitioner",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2.5 text-sm text-foreground/85"
                      >
                        <CircleCheck size={15} className="text-primary flex-none" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative border-y border-border bg-secondary/20 py-4 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...tickerItems, ...tickerItems].map((t, i) => (
              <span
                key={i}
                className="mx-6 font-display text-2xl sm:text-3xl font-semibold text-muted-foreground"
              >
                {t} <span className="text-primary mx-2">/</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT I DO */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Server,
              title: "Backend APIs",
              copy: "Designing REST endpoints in Java and .NET with clean separation of concerns and predictable error handling.",
            },
            {
              icon: Database,
              title: "Databases",
              copy: "Modeling normalized schemas (ERD), writing optimized SQL, and choosing between MySQL and MongoDB based on the actual problem.",
            },
            {
              icon: Code2,
              title: "Clean Code",
              copy: "OOP done right \u2014 modular, testable, documented. The code I leave behind shouldn't haunt the next dev.",
            },
          ].map((c, i) => (
            <div
              key={c.title}
              className="group relative p-7 rounded-2xl border border-border bg-card hover:border-primary/60"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary border border-border group-hover:bg-primary group-hover:text-primary-foreground">
                <c.icon size={20} />
              </div>
              <p className="mt-5 font-mono text-xs text-primary">0{i + 1}</p>
              <h3 className="mt-1 font-display text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {c.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* INTRO + LANGUAGES SNAPSHOT */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
              01. About
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              Backend-leaning, fundamentals-obsessed.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              {summary}
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:gap-3"
            >
              Read the full story <ArrowRight size={14} />
            </Link>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
              02. Languages
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              Languages I reach for.
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {languages.map((l) => (
                <Badge
                  key={l.name}
                  variant="outline"
                  className="border-border text-foreground bg-secondary/40 font-mono text-xs py-1.5"
                >
                  {l.name}
                </Badge>
              ))}
            </div>
            <Link
              to="/skills"
              className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:gap-3"
            >
              Why each one — and what I built with it <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
              03. Selected work
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              Things I've built.
            </h2>
          </div>
          <Link
            to="/projects"
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            All projects <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {featured.map((p) => (
            <Link
              key={p.id}
              to="/projects"
              className="group block rounded-2xl border border-border bg-card p-6 hover:border-primary/60"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
                <ArrowUpRight
                  size={16}
                  className="text-muted-foreground group-hover:text-primary"
                />
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold leading-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {p.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 sm:p-14">
          <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
          <div className="relative grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <Sparkles size={20} className="text-primary" />
              <h3 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
                Got a backend that needs a careful builder?
              </h3>
              <p className="mt-3 text-muted-foreground max-w-xl">
                I'm hunting for a junior role where I can write real code,
                review real PRs, and grow alongside a team that ships.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                >
                  Start a conversation
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
