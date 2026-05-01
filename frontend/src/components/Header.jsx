import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, Github, Mail, Download } from "lucide-react";
import { navLinks, profile } from "../data/portfolioData";
import { Button } from "./ui/button";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur transition-colors ${
        scrolled ? "bg-background/85 border-b border-border" : "bg-background/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-display font-bold">
            N
          </span>
          <span className="font-display font-semibold tracking-tight text-foreground">
            {profile.shortName}
            <span className="text-primary">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              <span className="font-mono text-[11px] text-primary mr-1">0{i + 1}.</span>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          {profile.resumeUrl && profile.resumeUrl !== "#" && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              download
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md"
            >
              <Download size={14} /> CV
            </a>
          )}
          <Link to="/contact">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
            >
              <Mail size={14} className="mr-1.5" /> Hire me
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95">
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm ${
                    isActive
                      ? "text-primary bg-secondary"
                      : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                <span className="font-mono text-[11px] text-primary mr-2">0{i + 1}.</span>
                {l.label}
              </NavLink>
            ))}
            <Link to="/contact" className="mt-2">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Mail size={14} className="mr-1.5" /> Hire me
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
