import React, { useState, useEffect } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  Github,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";
import { profile } from "../data/portfolioData";
import { mockContactSubmit } from "../mock/mock";

const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const isEmailJSConfigured = Boolean(
  EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY
);

// Fire-and-forget log to backend. Never throws — never blocks the UX.
const logToBackend = async (form, dispatched) => {
  try {
    await axios.post(
      `${API}/contact`,
      {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        email_dispatched: dispatched,
      },
      { timeout: 8000 }
    );
    return true;
  } catch (err) {
    // Swallow errors — backend log is a backup, not the primary delivery path.
    // eslint-disable-next-line no-console
    console.warn("Contact backend log failed:", err && err.message);
    return false;
  }
};

const initialForm = { name: "", email: "", subject: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isEmailJSConfigured) {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "That email doesn't look right.";
    if (!form.subject.trim()) e.subject = "Add a quick subject.";
    if (!form.message.trim()) e.message = "Don't leave the message empty.";
    else if (form.message.trim().length < 12)
      e.message = "A little more context, please.";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setLoading(true);
    let emailSent = false;
    try {
      if (isEmailJSConfigured) {
        try {
          await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject,
            message: form.message,
            to_email: profile.email,
          });
          emailSent = true;
        } catch (sendErr) {
          // EmailJS failed — keep going so we can at least log to backend
          // eslint-disable-next-line no-console
          console.warn("EmailJS send failed:", sendErr && sendErr.text);
        }
      }

      // Always try to log to backend (fire-and-forget, won't block)
      const loggedToBackend = await logToBackend(form, emailSent);

      if (emailSent) {
        setSent(true);
        toast({
          title: "Message sent",
          description: "Thanks — your note just landed in my inbox.",
        });
        setForm(initialForm);
      } else if (loggedToBackend) {
        // EmailJS failed but the message is safely stored on the server
        setSent(true);
        toast({
          title: "Message received",
          description:
            "I got your message — I'll get back to you within 24–48 hours.",
        });
        setForm(initialForm);
      } else {
        // Last-resort: stash locally so nothing is lost
        await mockContactSubmit(form);
        toast({
          title: "Couldn't reach the server",
          description:
            "Your message is saved locally. Please email me directly while I sort this out.",
          variant: "destructive",
        });
      }
    } catch (e) {
      toast({
        title: "Something went wrong",
        description: "Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const channels = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
    },
    {
      icon: Github,
      label: "GitHub",
      value: `@${profile.githubHandle}`,
      href: profile.github,
    },
    {
      icon: MapPin,
      label: "Based in",
      value: profile.location,
      href: null,
    },
  ];

  return (
    <div className="reveal">
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-12">
        <SectionHeading
          index="05"
          eyebrow="Contact"
          title="Send a message — land it in my inbox"
          description="Hiring, collaborating, or just curious? Drop a note below. The form will email me directly once EmailJS is connected."
        />
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* CHANNELS */}
          <aside className="lg:col-span-4 space-y-3">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href || "#"}
                target={c.href && c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className={`flex items-center gap-4 p-4 rounded-xl border border-border bg-card ${
                  c.href ? "hover:border-primary/60" : "cursor-default"
                }`}
              >
                <div className="h-11 w-11 rounded-lg bg-secondary border border-border flex items-center justify-center text-primary">
                  <c.icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {c.label}
                  </p>
                  <p className="text-sm text-foreground truncate">{c.value}</p>
                </div>
              </a>
            ))}
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-primary">
                Response time
              </p>
              <p className="mt-2 text-sm text-foreground/85">
                I check email daily. Expect a reply within{" "}
                <span className="text-primary">24–48 hours</span>.
              </p>
            </div>
          </aside>

          {/* FORM */}
          <div className="lg:col-span-8">
            <div className="relative rounded-2xl border border-border bg-card p-6 sm:p-8">
              {sent ? (
                <div className="py-12 text-center">
                  <div className="mx-auto h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold">
                    Message received.
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                    {isEmailJSConfigured
                      ? "Thanks — your message just landed in my Gmail. I'll reply within 24–48 hours."
                      : "Thank you — your note is queued (currently saved locally as a mock). Add your EmailJS keys to .env and it'll send for real."}
                  </p>
                  <Button
                    onClick={() => setSent(false)}
                    variant="outline"
                    className="mt-6 border-border hover:border-primary hover:text-primary"
                  >
                    Send another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="font-mono text-xs text-muted-foreground">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nqobizitha Mbuyisa"
                        className="bg-secondary/40 border-border focus-visible:ring-primary"
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive font-mono">{errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="font-mono text-xs text-muted-foreground">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="you@company.com"
                        className="bg-secondary/40 border-border focus-visible:ring-primary"
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive font-mono">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="subject" className="font-mono text-xs text-muted-foreground">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Junior backend role at companyName."
                      className="bg-secondary/40 border-border focus-visible:ring-primary"
                    />
                    {errors.subject && (
                      <p className="text-xs text-destructive font-mono">{errors.subject}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="font-mono text-xs text-muted-foreground">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="role, the team, or the problem you'd like me to help solve..."
                      className="bg-secondary/40 border-border focus-visible:ring-primary resize-none"
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive font-mono">{errors.message}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-4 flex-wrap pt-2">
                    <p className="text-xs font-mono text-muted-foreground">
                      <span className="text-primary">// </span>
                      {isEmailJSConfigured
                        ? "live mode — email + secure backup log"
                        : "mock mode — saved to localStorage until EmailJS keys are added"}
                    </p>
                    <Button
                      type="submit"
                      disabled={loading}
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="mr-2 animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          Send message <Send size={14} className="ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
