import React from "react";
import { Link } from "react-router-dom";
import {
  Award,
  GraduationCap,
  Compass,
  Coffee,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import Avatar from "../components/Avatar";
import { Button } from "../components/ui/button";
import {
  profile,
  aboutLong,
  education,
  certifications,
} from "../data/portfolioData";

const principles = [
  {
    icon: Compass,
    title: "Model first, code second",
    body: "A clean ERD and a UML sketch beat 200 lines of confused code. I plan, then build.",
  },
  {
    icon: Lightbulb,
    title: "Boring code is great code",
    body: "Predictable, well-named, well-structured. The reader is the audience, not the compiler.",
  },
  {
    icon: Coffee,
    title: "Always learning",
    body: "New language, new concept, new tool — every week. Compounding curiosity is the only real moat.",
  },
];

const About = () => {
  return (
    <div className="reveal">
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-12">
        <SectionHeading
          index="01"
          eyebrow="About"
          title="A backend engineer who cares about the boring 80%"
          description="The part of an app users never see is usually the part that decides whether they stay. That's where I want to live."
        />
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <aside className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border bg-card p-6">
              <Avatar size="md" />
              <h3 className="mt-5 font-display text-xl font-semibold">{profile.name}</h3>
              <p className="text-sm text-muted-foreground">{profile.title}</p>
              <dl className="mt-5 space-y-2 text-sm font-mono">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Location</dt>
                  <dd className="text-foreground">{profile.location}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Focus</dt>
                  <dd className="text-foreground">Java / SQL</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Status</dt>
                  <dd className="text-primary">Open to work</dd>
                </div>
              </dl>
              <Link to="/contact">
                <Button className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
                  Hire me <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
            </div>
          </aside>

          <div className="lg:col-span-8 space-y-6">
            {aboutLong.map((p, i) => (
              <p key={i} className="text-base sm:text-lg text-foreground/85 leading-relaxed">
                {p}
              </p>
            ))}

            <div className="pt-6 grid sm:grid-cols-3 gap-4">
              {principles.map((p) => (
                <div
                  key={p.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary border border-border text-primary">
                    <p.icon size={18} />
                  </div>
                  <h4 className="mt-4 font-display font-semibold">{p.title}</h4>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education + Certifications */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-border bg-card p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap size={18} />
              </div>
              <h3 className="font-display text-xl font-semibold">Education</h3>
            </div>
            <div className="mt-6 space-y-5">
              {education.map((e) => (
                <div key={e.degree} className="border-l-2 border-primary/50 pl-4">
                  <p className="font-mono text-xs text-muted-foreground">{e.period}</p>
                  <h4 className="mt-1 font-display font-semibold">{e.degree}</h4>
                  <p className="text-sm text-muted-foreground">{e.school}</p>
                  <p className="text-sm text-foreground/80 mt-2">{e.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Award size={18} />
              </div>
              <h3 className="font-display text-xl font-semibold">Certifications</h3>
            </div>
            <div className="mt-6 space-y-4">
              {certifications.map((c) => (
                <div
                  key={c.name}
                  className="flex items-start justify-between gap-4 border border-border rounded-lg p-4"
                >
                  <div>
                    <h4 className="font-display font-semibold">{c.name}</h4>
                    <p className="text-sm text-muted-foreground">{c.issuer}</p>
                  </div>
                  <span className="font-mono text-xs text-primary">{c.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
