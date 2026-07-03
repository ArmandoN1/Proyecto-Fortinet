import { ChevronRight } from "lucide-react";
import { severityColor, topThreats } from "../data/mock";

export default function ThreatList() {
  return (
    <div
      className="glass hud-panel rounded-xl p-4 glow-red rise-r"
      style={{ ["--hud-color" as string]: "#ff3b5c", animationDelay: "0.2s" }}
    >
      <h2 className="font-display text-sm font-bold text-white tracking-[0.15em] mb-3">
        AMENAZAS MÁS ACTIVAS
      </h2>
      <div className="space-y-2">
        {topThreats.map((t, i) => {
          const Icon = t.icon;
          const color = severityColor[t.severity];
          return (
            <div
              key={t.name}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-cyber-800/50 border border-white/5 hover:border-neon-red/30 hover:translate-x-1 transition-all cursor-pointer group rise-r"
              style={{ animationDelay: `${0.28 + i * 0.08}s` }}
            >
              <div
                className="w-7 h-7 rounded-md grid place-items-center shrink-0"
                style={{ background: color + "15", border: `1px solid ${color}35` }}
              >
                <Icon size={13} style={{ color, filter: `drop-shadow(0 0 4px ${color})` }} />
              </div>
              <span className="text-[12px] font-semibold text-slate-200 flex-1 truncate font-tech">{t.name}</span>
              <span
                className="font-tech text-[9px] px-1.5 py-0.5 rounded tracking-wider shrink-0"
                style={{ color, background: color + "15", border: `1px solid ${color}40`, textShadow: `0 0 8px ${color}` }}
              >
                {t.severity}
              </span>
              <span className="font-display text-sm font-bold text-white tabular-nums w-9 text-right">{t.count}</span>
            </div>
          );
        })}
      </div>
      <button className="mt-3 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-neon-red/25 text-neon-red font-tech text-[11px] tracking-[0.2em] hover:bg-neon-red/10 transition-colors">
        VER TODAS <ChevronRight size={12} />
      </button>
    </div>
  );
}
