import React, { useState } from "react";
import { ArrowUpRight, Github, ExternalLink, Filter } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { projects } from "../data/portfolioData";

const allTags = [
  "All",
  ...Array.from(new Set(projects.flatMap((p) => p.stack))),
];

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(null);

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.stack.includes(filter));

  return (
    <div className="reveal">
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-12">
        <SectionHeading
          index="03"
          eyebrow="Projects"
          title="Things I've built, broken, fixed, and shipped"
          description="Each one taught me something concrete — about architecture, about discipline, or about why writing tests early would have saved me a long evening."
        />
      </section>

      {/* FILTERS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground mr-2">
            <Filter size={12} /> Filter
          </span>
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`text-xs font-mono px-3 py-1.5 rounded-full border ${
                filter === t
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-foreground/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((p, i) => (
            <article
              key={p.id}
              className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/60"
            >
              {/* PROJECT IMAGE PLACEHOLDER */}
              <div className="relative aspect-[16/9] bg-secondary border-b border-border overflow-hidden">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-grid">
                    <div className="text-center px-4">
                      <p className="font-display text-4xl font-semibold text-foreground/30">
                        {p.title.split(" ").map((w) => w[0]).join("").slice(0, 3)}
                      </p>
                      <p className="mt-2 text-[10px] font-mono text-muted-foreground/70">
                        {`// add image at projects[${i}].image`}
                      </p>
                    </div>
                  </div>
                )}
                <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded bg-background/80 backdrop-blur text-foreground border border-border">
                  {p.label}
                </span>
                <span className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded bg-background/80 backdrop-blur text-primary border border-border">
                  {p.year}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold leading-tight">
                    {p.title}
                  </h3>
                  <button
                    onClick={() => setOpen(p)}
                    className="flex-none p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary"
                    aria-label="View details"
                  >
                    <ArrowUpRight size={18} />
                  </button>
                </div>
                <p className="text-xs font-mono text-muted-foreground mt-1">{p.role}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {p.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <Badge
                      key={s}
                      variant="outline"
                      className="font-mono text-[10px] border-border bg-secondary/40 text-muted-foreground"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setOpen(p)}
                    className="border-border hover:border-primary hover:text-primary"
                  >
                    Case study
                  </Button>
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary px-2 py-1"
                    >
                      <Github size={14} /> Code
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary px-2 py-1"
                    >
                      <ExternalLink size={14} /> Live
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground font-mono">
            No projects with that tag yet.
          </p>
        )}
      </section>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-2xl bg-card border-border">
          {open && (
            <>
              <DialogHeader>
                <p className="font-mono text-xs text-primary">
                  {open.label} · {open.year}
                </p>
                <DialogTitle className="font-display text-2xl">
                  {open.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {open.role}
                </DialogDescription>
              </DialogHeader>
              <p className="text-foreground/85 leading-relaxed">{open.description}</p>
              <div>
                <p className="font-mono text-[11px] text-primary uppercase tracking-wider">
                  Highlights
                </p>
                <ul className="mt-2 space-y-1.5">
                  {open.highlights.map((h) => (
                    <li key={h} className="text-sm text-foreground/85 flex gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {open.stack.map((s) => (
                  <Badge
                    key={s}
                    variant="outline"
                    className="font-mono text-[10px] border-border"
                  >
                    {s}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                {open.repo && (
                  <a href={open.repo} target="_blank" rel="noreferrer">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border"
                    >
                      <Github size={14} className="mr-1.5" /> Code
                    </Button>
                  </a>
                )}
                {open.demo && (
                  <a href={open.demo} target="_blank" rel="noreferrer">
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <ExternalLink size={14} className="mr-1.5" /> Live
                    </Button>
                  </a>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;
