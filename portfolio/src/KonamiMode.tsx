import React, { useEffect, useRef, useState } from "react";

type KonamiModeProps = {
  active: boolean;
  onActiveChange: (state: boolean) => void;
};

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const matchesSequence = (buffer: string[]) => {
  return KONAMI_SEQUENCE.every((key, idx) => buffer[idx]?.toLowerCase() === key.toLowerCase());
};

const ChiptuneLoop: React.FC = () => {
  const ctxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const AudioCtx = (window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext) as
      | typeof AudioContext
      | undefined;
    if (!AudioCtx) return undefined;

    const ctx = new AudioCtx();
    ctxRef.current = ctx;

    const playNote = (freq: number, durationMs: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationMs / 1000);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + durationMs / 1000);
    };

    const sequence = [440, 660, 880, 660, 523.25, 392];
    let step = 0;

    const tick = () => {
      const freq = sequence[step % sequence.length];
      playNote(freq, 220);
      step += 1;
    };

    tick();
    intervalRef.current = window.setInterval(tick, 260);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      if (ctxRef.current) {
        ctxRef.current.close();
      }
    };
  }, []);

  return null;
};

const KonamiMode: React.FC<KonamiModeProps> = ({ active, onActiveChange }) => {
  const bufferRef = useRef<string[]>([]);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (active) {
      document.body.classList.add("konami-mode");
    } else {
      document.body.classList.remove("konami-mode");
    }

    return () => {
      document.body.classList.remove("konami-mode");
    };
  }, [active]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onActiveChange(false);
        bufferRef.current = [];
        return;
      }

      const updated = [...bufferRef.current.slice(-(KONAMI_SEQUENCE.length - 1)), e.key];
      bufferRef.current = updated;

      if (updated.length === KONAMI_SEQUENCE.length && matchesSequence(updated)) {
        onActiveChange(true);
        setShowBanner(true);
        window.setTimeout(() => setShowBanner(false), 1400);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onActiveChange]);

  useEffect(() => {
    if (!active) return undefined;
    const timer = window.setTimeout(() => onActiveChange(false), 14000);
    return () => window.clearTimeout(timer);
  }, [active, onActiveChange]);

  return (
    <>
      {active && <ChiptuneLoop />}
      {active && <div className="konami-overlay" aria-hidden="true" />}
      <div className={`konami-banner ${showBanner ? "konami-banner-visible" : ""} ${active ? "konami-banner-active" : ""}`}>
        <span>Konami Mode Engaged</span>
      </div>
    </>
  );
};

export default KonamiMode;
