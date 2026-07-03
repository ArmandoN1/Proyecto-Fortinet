import { AlertTriangle, BrainCircuit, ChevronRight, Info, ShieldAlert } from "lucide-react";
import { aiRecommendations } from "../data/mock";

const levelStyle = {
  critical: { color: "#ff3b5c", icon: ShieldAlert },
  warning: { color: "#ffd60a", icon: AlertTriangle },
  info: { color: "#00e5ff", icon: Info },
} as const;

export default function AIPanel() {
  return (
    <div
      className="glass hud-panel rounded-xl p-4 glow-purple relative overflow-hidden rise-r"
      style={{ ["--hud-color" as string]: "#b45bff", animationDelay: "0.35s" }}
    >
      <div className="scanline" style={{ animationDuration: "9s" }} />
      <h2 className="font-display text-sm font-bold text-white tracking-[0.15em] mb-3">
        ANÁLISIS Y RECOMENDACIONES CON IA
      </h2>

      <div className="flex gap-4">
        {/* Cerebro IA */}
        <div className="hidden sm:flex flex-col items-center gap-2 shrink-0 pt-1">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full bg-neon-purple/25 blur-xl pulse-soft" />
            <div className="relative w-full h-full rounded-full border border-neon-purple/40 grid place-items-center bg-neon-purple/10 shadow-[inset_0_0_20px_rgba(180,91,255,0.2)]">
              <BrainCircuit size={30} className="text-neon-purple drop-shadow-[0_0_10px_rgba(180,91,255,0.9)] flicker" />
            </div>
            <svg viewBox="0 0 64 64" className="absolute inset-0 radar-sweep" style={{ animationDuration: "8s" }}>
              <circle cx="32" cy="32" r="30" fill="none" stroke="#b45bff" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="8 40" />
            </svg>
          </div>
          <p className="font-tech text-[9px] text-neon-purple tracking-[0.2em]">FORTI-AI</p>
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="w-0.5 rounded bg-neon-purple pulse-soft" style={{ height: 6 + (i % 3) * 4, animationDelay: `${i * 0.18}s` }} />
            ))}
          </div>
        </div>

        {/* Recomendaciones */}
        <div className="flex-1 space-y-2 min-w-0">
          {aiRecommendations.map((r, i) => {
            const { color, icon: Icon } = levelStyle[r.level];
            return (
              <div
                key={r.text}
                className="flex gap-2.5 px-3 py-2 rounded-lg bg-cyber-800/50 border border-white/5 hover:border-neon-purple/30 transition-colors rise"
                style={{ animationDelay: `${0.45 + i * 0.12}s` }}
              >
                <div className="w-6 h-6 rounded-md grid place-items-center shrink-0 mt-0.5" style={{ background: color + "15", border: `1px solid ${color}35` }}>
                  <Icon size={12} style={{ color, filter: `drop-shadow(0 0 4px ${color})` }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-slate-200 leading-snug">{r.text}</p>
                  <p className="text-[11px] text-slate-500 leading-snug">{r.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button className="mt-3 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-neon-purple/30 text-neon-purple font-tech text-[11px] tracking-[0.2em] hover:bg-neon-purple/10 hover:shadow-[0_0_16px_rgba(180,91,255,0.25)] transition-all">
        VER MÁS RECOMENDACIONES <ChevronRight size={12} />
      </button>
    </div>
  );
}
