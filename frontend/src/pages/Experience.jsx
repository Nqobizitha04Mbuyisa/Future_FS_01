import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, ArrowRight, Calendar } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { experience } from "../data/portfolioData";

const Experience = () => {
  return (
    <div className="reveal">
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-12">
        <SectionHeading
          index="04"
          eyebrow="Experience"
          title="The track so far"
          description="Academic projects, personal builds, and group work — each one a step closer to writing software that real people depend on."
        />
      </section>

      {/* TIMELINE */}
      <section className="max-w-4xl mx-auto px-6 lg:px-10 pb-20">
        <div className="relative">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-10">
            {experience.map((e, i) => (
              <div key={i} className="relative pl-12 sm:pl-16">
                <div className="absolute left-0 top-1">
                  <div className="flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary text-primary-foreground border-4 border-background">
                    <Briefcase size={16} />
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge
                      variant="outline"
                      className="font-mono text-[10px] border-primary/40 text-primary"
                    >
                      {e.type}
                    </Badge>
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground">
                      <Calendar size={12} /> {e.period}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl sm:text-2xl font-semibold">
                    {e.role}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{e.org}</p>
                  <ul className="mt-5 space-y-2">
                    {e.bullets.map((b) => (
                      <li
                        key={b}
                        className="text-sm text-foreground/85 flex gap-2.5 leading-relaxed"
                      >
                        <span className="font-mono text-primary mt-0.5">›</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-2xl border border-dashed border-border p-8 text-center">
          <h3 className="font-display text-xl font-semibold">
            The next entry on this timeline?
          </h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
            Hopefully your team. I'm ready to learn fast, write disciplined
            code, and own real backend work.
          </p>
          <Link to="/contact" className="inline-block mt-5">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Let's talk <ArrowRight size={14} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Experience;
