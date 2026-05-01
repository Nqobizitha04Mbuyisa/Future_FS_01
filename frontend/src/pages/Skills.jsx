import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Layers, Wrench, Boxes } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { languages, skillGroups } from "../data/portfolioData";

const groupIcons = {
  "Backend & Frameworks": Layers,
  Databases: Boxes,
  "Tools & Workflow": Wrench,
  "Core Concepts": Cpu,
};

const Skills = () => {
  const [active, setActive] = useState(languages[0].name);
  const current = languages.find((l) => l.name === active) || languages[0];

  return (
    <div className="reveal">
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-12">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="Languages, logic, and the why behind each pick"
          description="This is the full breakdown — every language I work with, what it's good at, and the kind of problem I reach for it to solve."
        />
      </section>

      {/* LANGUAGES INTERACTIVE */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-16">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
              Programming languages
            </p>
            <h3 className="mt-2 font-display text-2xl sm:text-3xl font-semibold">
              Click any language — I'll tell you exactly why I use it.
            </h3>
            <ul className="mt-6 space-y-2">
              {languages.map((l, i) => (
                <li key={l.name}>
                  <button
                    onClick={() => setActive(l.name)}
                    className={`w-full text-left rounded-xl border p-4 hover:border-primary/60 ${
                      active === l.name
                        ? "border-primary bg-secondary"
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-muted-foreground">
                          0{i + 1}
                        </span>
                        <span className="font-display text-lg font-semibold">
                          {l.name}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
                          {l.category}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-primary">{l.level}%</span>
                    </div>
                    <div className="mt-3 h-1 w-full rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${l.level}%` }}
                      />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-xs text-primary">
                    {current.category} · {current.level}% confidence
                  </p>
                  <h3 className="mt-1 font-display text-3xl font-semibold">
                    {current.name}
                  </h3>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  // why this one
                </span>
              </div>

              <p className="mt-5 text-foreground/85 leading-relaxed">
                {current.summary}
              </p>
              <div className="mt-5 rounded-xl border border-border bg-secondary/40 p-4">
                <p className="font-mono text-[11px] text-primary uppercase tracking-wider">
                  Logic / why I reach for it
                </p>
                <p className="mt-2 text-sm text-foreground/85 leading-relaxed">
                  {current.why}
                </p>
              </div>
              <div className="mt-5">
                <p className="font-mono text-[11px] text-primary uppercase tracking-wider">
                  What I've built with it
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {current.usedFor.map((u) => (
                    <span
                      key={u}
                      className="text-xs font-mono px-2.5 py-1 rounded-md border border-border bg-secondary text-foreground"
                    >
                      {u}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILL GROUPS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
          Beyond the languages
        </p>
        <h3 className="mt-2 font-display text-2xl sm:text-3xl font-semibold">
          The rest of the toolbox.
        </h3>

        <Tabs defaultValue={skillGroups[0].title} className="mt-8">
          <TabsList className="flex flex-wrap h-auto bg-secondary/40 p-1 rounded-xl border border-border">
            {skillGroups.map((g) => (
              <TabsTrigger
                key={g.title}
                value={g.title}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono text-xs"
              >
                {g.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {skillGroups.map((g) => {
            const Icon = groupIcons[g.title] || Cpu;
            return (
              <TabsContent key={g.title} value={g.title} className="mt-6">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-secondary border border-border flex items-center justify-center text-primary">
                      <Icon size={18} />
                    </div>
                    <h4 className="font-display text-xl font-semibold">{g.title}</h4>
                  </div>
                  <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {g.items.map((it) => (
                      <div
                        key={it}
                        className="rounded-lg border border-border bg-secondary/40 p-3 text-sm font-mono text-foreground"
                      >
                        <span className="text-primary mr-2">›</span>
                        {it}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <div className="rounded-2xl border border-border bg-card p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-semibold">
              See how these skills come together
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Walk through the projects where I actually applied them.
            </p>
          </div>
          <Link to="/projects">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              View Projects <ArrowRight size={14} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Skills;
