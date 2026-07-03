import { preventionMetrics } from "../data/mock";
import { Bar } from "./ui";

function Gauge({ value }: { value: number }) {
  const r = 52;
  const circumference = Math.PI * r; // semicírculo
  const filled = (value / 100) * circumference;
  return (
    <div className="relative w-36 shrink-0">
      <svg viewBox="0 0 130 78" className="w-full">
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2f7bff" />
            <stop offset="60%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#2bff88" />
          </linearGradient>
        </defs>
        <path d={`M 13 70 A ${r} ${r} 0 0 1 117 70`} fill="none" stroke="#1a2f55" strokeWidth="9" strokeLinecap="round" />
        <path
          d={`M 13 70 A ${r} ${r} 0 0 1 117 70`}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={circumference}
          className="ring-draw"
          style={{
            strokeDashoffset: circumference - filled,
            ["--ring-from" as string]: `${circumference}`,
            animationDelay: "0.4s",
            animationDuration: "1.6s",
            filter: "drop-shadow(0 0 6px rgba(0,229,255,0.6))",
          }}
        />
        {/* ticks */}
        {Array.from({ length: 11 }, (_, i) => {
          const a = Math.PI - (i / 10) * Math.PI;
          const x1 = 65 + Math.cos(a) * 40;
          const y1 = 70 - Math.sin(a) * 40;
          const x2 = 65 + Math.cos(a) * 44;
          const y2 = 70 - Math.sin(a) * 44;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2f7bff" strokeOpacity={0.4} strokeWidth={1} />;
        })}
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <p className="font-display font-black text-3xl text-white text-glow tabular-nums leading-none">{value}</p>
        <p className="font-tech text-[9px] text-slate-400 tracking-widest">/100</p>
        <p className="font-tech text-[10px] text-neon-green tracking-[0.25em] mt-0.5">EXCELENTE</p>
      </div>
    </div>
  );
}

export default function PreventionIndex() {
  return (
    <div
      className="glass hud-panel rounded-xl p-4 glow-cyan rise-r"
      style={{ ["--hud-color" as string]: "#00e5ff", animationDelay: "0.3s" }}
    >
      <h2 className="font-display text-sm font-bold text-white tracking-[0.15em] mb-3">
        ÍNDICE DE PREVENCIÓN
      </h2>
      <div className="flex items-center gap-4">
        <Gauge value={92} />
        <div className="flex-1 space-y-2 min-w-0">
          {preventionMetrics.map((m, i) => (
            <div key={m.label}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[11px] text-slate-300 truncate pr-2">{m.label}</span>
                <span className="font-tech text-[11px] tabular-nums" style={{ color: m.color }}>{m.value}%</span>
              </div>
              <Bar value={m.value} color={m.color} delay={0.4 + i * 0.1} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
