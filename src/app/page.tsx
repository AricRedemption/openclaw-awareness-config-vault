"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const PROMPT_TEMPLATE =
  "Install Awareness OpenClaw memory integration, connect with AWARENESS_API_KEY=<your-api-key>, then list my memories and let me select one MEMORY_ID to restore history.";

export default function Home() {
  const [mode, setMode] = useState<"human" | "agent">("human");
  const [copyHint, setCopyHint] = useState("Copy");
  const [copyAllHint, setCopyAllHint] = useState("Copy Prompt & Key");

  const fullCopyText = useMemo(() => {
    return `${PROMPT_TEMPLATE}\n\nAWARENESS_API_KEY=<your-api-key>`;
  }, []);

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
    <div className="min-h-screen bg-[radial-gradient(circle_at_16%_-8%,#d9f9e3_0%,#f2f6f3_40%,#f1f3f2_100%)] px-4 py-10 text-slate-900 sm:px-6 sm:py-14">
      <main className="mx-auto w-full max-w-[920px]">
        <section className="text-center motion-safe:animate-fade-up">
          <p className="mb-4 inline-flex rounded-full border border-safe-300 bg-green-50 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-safe-700 sm:text-xs">
            Awareness Memory Recovery
          </p>
          <h1 className="mx-auto max-w-[760px] text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-5xl md:text-6xl">
            Restore OpenClaw Memory with
            <span className="text-safe-600"> One API Key + Memory Select</span>
          </h1>

          <div
            className="mx-auto mt-8 grid w-full max-w-[420px] grid-cols-2 gap-1.5 rounded-full border border-slate-200 bg-slate-50 p-1.5"
            role="tablist"
            aria-label="User mode"
          >
            <button
              className={`h-11 rounded-full text-sm font-semibold transition ${
                mode === "human"
                  ? "bg-gradient-to-r from-safe-600 to-safe-500 text-white shadow-[0_10px_20px_rgba(24,166,75,0.28)]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => setMode("human")}
              type="button"
            >
              I&#39;m Human
            </button>
            <button
              className={`h-11 rounded-full text-sm font-semibold transition ${
                mode === "agent"
                  ? "bg-gradient-to-r from-safe-600 to-safe-500 text-white shadow-[0_10px_20px_rgba(24,166,75,0.28)]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => setMode("agent")}
              type="button"
            >
              I&#39;m Agent
            </button>
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_45px_rgba(18,36,27,0.1)] motion-safe:animate-card-in sm:mt-12">
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
            <div className="text-sm font-extrabold tracking-[0.06em]">OPENCLAW</div>
            <span className="motion-safe:animate-pulse-link relative h-[2px] w-20 bg-gradient-to-r from-green-300 to-safe-500 sm:w-28">
              <span className="absolute -left-1 -top-[3px] h-2 w-2 rounded-full border border-safe-500 bg-green-50" />
              <span className="absolute -right-1 -top-[3px] h-2 w-2 rounded-full border border-safe-500 bg-green-50" />
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
              Copy the prompt below and send it to your OpenClaw agent. It will
              connect Awareness, ask you to choose an existing memory, and
              recover prior session context.
            </p>

            <div className="mt-4 flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-100 p-4 sm:flex-row sm:items-start sm:gap-4">
              <code className="flex-1 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                {PROMPT_TEMPLATE}
              </code>
              <button
                className="w-fit rounded-lg bg-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-300"
                onClick={() => copyText(PROMPT_TEMPLATE, setCopyHint, "Copy")}
                type="button"
              >
                {copyHint}
              </button>
            </div>

            <button
              className="hero-glow mt-4 w-full rounded-xl bg-gradient-to-r from-safe-600 to-safe-500 px-4 py-3.5 text-sm font-bold text-white sm:text-base"
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
