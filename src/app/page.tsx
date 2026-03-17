"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import styles from "./page.module.css";

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
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.kicker}>Awareness Memory Recovery</p>
          <h1>
            Restore OpenClaw Memory with
            <span> One API Key + Memory Select</span>
          </h1>

          <div className={styles.switcher} role="tablist" aria-label="User mode">
            <button
              className={mode === "human" ? styles.activeMode : ""}
              onClick={() => setMode("human")}
              type="button"
            >
              I&#39;m Human
            </button>
            <button
              className={mode === "agent" ? styles.activeMode : ""}
              onClick={() => setMode("agent")}
              type="button"
            >
              I&#39;m Agent
            </button>
          </div>
        </section>

        <section className={styles.card}>
          <header className={styles.cardHeader}>
            <div className={styles.cardTitleWrap}>
              <span className={styles.codeBadge}>&lt;/&gt;</span>
              <h2>Already have OpenClaw</h2>
            </div>
            <a href="https://awareness.market/" target="_blank" rel="noreferrer">
              Get API Key
            </a>
          </header>

          <div className={styles.connectionStrip}>
            <div className={styles.systemLabel}>OPENCLAW</div>
            <span className={styles.connector} aria-hidden="true" />
            <div className={styles.awarenessWrap}>
              <Image
                src="/awareness-logo.svg"
                alt="Awareness logo"
                width={22}
                height={22}
              />
              <strong>Awareness</strong>
            </div>
            <span className={styles.status}>Connected</span>
          </div>

          <div className={styles.guide}>
            <h3>Awareness Recovery Guide</h3>
            <p>
              Copy the prompt below and send it to your OpenClaw agent. It will
              connect Awareness, ask you to choose an existing memory, and
              recover prior session context.
            </p>

            <div className={styles.promptBox}>
              <code>{PROMPT_TEMPLATE}</code>
              <button
                onClick={() => copyText(PROMPT_TEMPLATE, setCopyHint, "Copy")}
                type="button"
              >
                {copyHint}
              </button>
            </div>

            <button
              className={styles.primaryBtn}
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
