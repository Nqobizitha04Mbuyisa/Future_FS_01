import React from "react";
import { Link } from "react-router-dom";
import { Github, Mail, Phone, ArrowUpRight } from "lucide-react";
import { profile, navLinks } from "../data/portfolioData";

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-border mt-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground font-display font-bold">
                N
              </span>
              <span className="font-display text-xl font-semibold">
                {profile.name}
                <span className="text-primary">.</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
              {profile.tagline} Currently open to junior backend roles — let's build something that actually matters.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="p-2.5 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                className="p-2.5 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary"
                aria-label="Phone"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold mb-4 text-foreground">Navigate</h4>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold mb-4 text-foreground">Direct</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-muted-foreground hover:text-primary break-all inline-flex items-start gap-1"
                >
                  <span>{profile.email}</span>
                  <ArrowUpRight size={12} className="mt-0.5 flex-none" />
                </a>
              </li>
              <li className="text-muted-foreground">{profile.phone}</li>
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary inline-flex items-start gap-1"
                >
                  <span>github.com/{profile.githubHandle}</span>
                  <ArrowUpRight size={12} className="mt-0.5 flex-none" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs font-mono text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. Built with React + Tailwind.
          </p>
          <p className="text-xs font-mono text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-primary mr-2 align-middle" />
            {profile.available ? "Available for opportunities" : "Currently engaged"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
