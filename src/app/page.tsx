"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [mode, setMode] = useState<"human" | "agent">("human");
  const [skillText, setSkillText] = useState("");
  const [skillStatus, setSkillStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [copyHint, setCopyHint] = useState("Copy");
  const [copyAllHint, setCopyAllHint] = useState("Copy Prompt & Key");
  const skillFile = "/skill/instruct.md";

  useEffect(() => {
    let active = true;
    setSkillStatus("loading");

    const loadSkillFile = async () => {
      try {
        const response = await fetch(skillFile, { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to load skill file");
        }
        const content = await response.text();
        if (!active) return;
        setSkillText(content.trim());
        setSkillStatus("ready");
      } catch {
        if (!active) return;
        setSkillText("");
        setSkillStatus("error");
      }
    };

    loadSkillFile();

    return () => {
      active = false;
    };
  }, [skillFile]);

  const fullCopyText = useMemo(() => {
    if (skillText) {
      return `${skillText}\n\nAWARENESS_API_KEY=<your-api-key>`;
    }
    return "AWARENESS_API_KEY=<your-api-key>";
  }, [skillText]);

  const copyText = async (
    text: string,
    setHint: (value: string) => void,
    defaultHint: string
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setHint("Copied");
      window.setTimeout(() => setHint(defaultHint), 1600);
    } catch {
      setHint("Copy failed");
      window.setTimeout(() => setHint(defaultHint), 1800);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_16%_-8%,#d9f9e3_0%,#f2f6f3_40%,#f1f3f2_100%)] px-4 py-10 text-slate-900 sm:px-6 sm:py-14">
      <div className="pointer-events-none absolute -left-12 top-8 h-56 w-56 rounded-full bg-safe-300/40 blur-3xl motion-safe:animate-aurora-x" />
      <div className="pointer-events-none absolute -right-12 top-24 h-64 w-64 rounded-full bg-safe-500/25 blur-3xl motion-safe:animate-float-soft" />
      <div className="pointer-events-none absolute bottom-8 left-1/3 h-40 w-40 rounded-full bg-emerald-200/35 blur-3xl motion-safe:animate-float-soft [animation-delay:700ms]" />
      <main className="mx-auto w-full max-w-[920px]">
        <section className="relative z-10 text-center">
          <p className="mb-4 inline-flex rounded-full border border-safe-300 bg-green-50 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-safe-700 motion-safe:animate-fade-up sm:text-xs">
            Awareness Memory Recovery
          </p>
          <h1 className="mx-auto max-w-[760px] text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] motion-safe:animate-fade-up [animation-delay:120ms] sm:text-5xl md:text-6xl">
            Restore OpenClaw Memory with
            <span className="text-safe-600"> One API Key + Memory Select</span>
          </h1>

          <div
            className="relative mx-auto mt-8 grid w-full max-w-[420px] grid-cols-2 gap-1.5 rounded-full border border-slate-200 bg-slate-50 p-1.5 motion-safe:animate-fade-up [animation-delay:220ms]"
            role="tablist"
            aria-label="User mode"
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute left-1.5 top-1.5 h-11 w-[calc(50%-0.375rem)] rounded-full bg-gradient-to-r from-safe-600 to-safe-500 shadow-[0_10px_20px_rgba(24,166,75,0.28)] transition-transform duration-300 ${
                mode === "agent"
                  ? "translate-x-[calc(100%+0.375rem)]"
                  : "translate-x-0"
              }`}
            />
            <button
              className={`relative z-10 h-11 rounded-full text-sm font-semibold transition ${
                mode === "human"
                  ? "text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => setMode("human")}
              type="button"
            >
              I&#39;m Human
            </button>
            <button
              className={`relative z-10 h-11 rounded-full text-sm font-semibold transition ${
                mode === "agent"
                  ? "text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => setMode("agent")}
              type="button"
            >
              I&#39;m Agent
            </button>
          </div>
        </section>

        <section className="relative z-10 mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_45px_rgba(18,36,27,0.1)] transition-transform duration-300 hover:-translate-y-0.5 motion-safe:animate-card-in sm:mt-12">
          <header className="flex flex-col gap-4 px-4 pb-4 pt-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-green-50 text-sm font-extrabold text-safe-700">
                &lt;/&gt;
              </span>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Already have OpenClaw
              </h2>
            </div>
            <a
              className="text-sm font-semibold text-safe-600 hover:text-safe-700"
              href="https://awareness.market/"
              target="_blank"
              rel="noreferrer"
            >
              Get API Key
            </a>
          </header>

          <div className="mx-4 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:mx-6 sm:justify-center sm:gap-4 sm:p-5">
            <Image
              src="/openclaw-logo.svg"
              alt="OpenClaw logo"
              width={154}
              height={32}
              className="h-7 w-auto object-contain sm:h-8"
            />
            <span className="motion-safe:animate-pulse-link relative h-[2px] w-20 overflow-hidden bg-gradient-to-r from-green-300 to-safe-500 sm:w-28">
              <span className="absolute -left-1 -top-[3px] h-2 w-2 rounded-full border border-safe-500 bg-green-50" />
              <span className="absolute -right-1 -top-[3px] h-2 w-2 rounded-full border border-safe-500 bg-green-50" />
              <span className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-safe-500 shadow-[0_0_10px_rgba(36,194,90,0.8)] motion-safe:animate-link-dot" />
            </span>
            <div className="flex items-center gap-2.5">
              <Image
                src="/awareness-logo.svg"
                alt="Awareness logo"
                width={22}
                height={22}
              />
              <strong className="text-lg tracking-tight">Awareness</strong>
            </div>
            <span className="rounded-full border border-green-300 bg-green-50 px-2.5 py-1 text-xs font-bold text-safe-700">
              Connected
            </span>
          </div>

          <div className="mt-6 border-t border-slate-100 px-4 pb-6 pt-6 sm:px-6 sm:pb-7">
            <h3 className="text-2xl font-bold tracking-tight sm:text-[1.7rem]">
              Awareness Recovery Guide
            </h3>
            <p className="mt-2.5 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
              Copy the prompt below and send it to your AI agent.
            </p>

            <div className="mt-4 flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-100 p-4 sm:flex-row sm:items-start sm:gap-4">
              <code className="flex-1 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                {skillStatus === "loading" && "Loading selected skill file..."}
                {skillStatus === "error" &&
                  "Skill file load failed. Please check /public/skills path."}
                {skillStatus === "ready" && skillText}
              </code>
              <button
                className="w-fit rounded-lg bg-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-300"
                onClick={() =>
                  copyText(
                    skillText || "Skill file load failed.",
                    setCopyHint,
                    "Copy"
                  )
                }
                type="button"
              >
                {copyHint}
              </button>
            </div>

            <button
              className="hero-glow cta-sweep mt-4 w-full rounded-xl bg-gradient-to-r from-safe-600 to-safe-500 px-4 py-3.5 text-sm font-bold text-white sm:text-base"
              onClick={() =>
                copyText(fullCopyText, setCopyAllHint, "Copy Prompt & Key")
              }
              type="button"
            >
              {copyAllHint}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
