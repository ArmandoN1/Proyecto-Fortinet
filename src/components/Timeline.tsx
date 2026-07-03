import { FlaskConical, Link2Off, Lock, ShieldBan, Skull } from "lucide-react";
import { useLiveTimeline } from "../hooks/useLive";
import type { TimelineEvent } from "../data/mock";

const icons: Record<TimelineEvent["iconKey"], typeof Skull> = {
  sim: FlaskConical,
  block: ShieldBan,
  malware: Skull,
  url: Link2Off,
  ransom: Lock,
};

export default function Timeline() {
  const events = useLiveTimeline(6);

  return (
    <div
      className="glass hud-panel rounded-xl p-4 glow-cyan h-full rise"
      style={{ ["--hud-color" as string]: "#00e5ff", animationDelay: "0.35s" }}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-sm font-bold text-white tracking-[0.15em]">
          LÍNEA DE TIEMPO DE EVENTOS
        </h2>
        <span className="flex items-center gap-1.5 font-tech text-[10px] text-neon-green tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green pulse-soft" /> STREAMING
        </span>
      </div>

      <div className="relative pl-5">
        <div className="absolute left-[9px] top-1 bottom-1 w-px bg-gradient-to-b from-neon-cyan/60 via-neon-cyan/20 to-transparent" />
        {events.map((e) => {
          const Icon = icons[e.iconKey];
          return (
            <div key={e.time + e.title} className="relative pb-3 rise-l">
              <span
                className="absolute -left-5 top-1 w-[19px] h-[19px] rounded-full grid place-items-center border"
                style={{ borderColor: e.color + "60", background: "#0a1226", boxShadow: `0 0 10px ${e.color}50` }}
              >
                <Icon size={9} style={{ color: e.color }} />
              </span>
              <div className="ml-2">
                <p className="font-tech text-[10px] text-slate-500">{e.time}</p>
                <p className="text-[12.5px] font-bold leading-tight" style={{ color: e.color, textShadow: `0 0 10px ${e.color}55` }}>
                  {e.title}
                </p>
                <p className="text-[11px] text-slate-400 leading-tight">{e.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
