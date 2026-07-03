import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { AlertTriangle, Crosshair, FlaskConical, ShieldCheck, TrendingDown, TrendingUp } from "lucide-react";
import { useAnimatedNumber, useLiveSeries, type LiveStats } from "../hooks/useLive";

function Spark({ color, base }: { color: string; base: number }) {
  const data = useLiveSeries(20, base, 18);
  return (
    <div className="h-9 -mx-1">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, bottom: 0, left: 0, right: 0 }}>
          <defs>
            <linearGradient id={`spark-${color.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.5} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill={`url(#spark-${color.slice(1)})`} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function RiskRing({ score }: { score: number }) {
  const pct = 100 - score; // score bajo = más seguro
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 64 64" className="w-16 h-16 -rotate-90">
      <circle cx="32" cy="32" r={r} fill="none" stroke="#1a2f55" strokeWidth="5" />
      <circle
        cx="32" cy="32" r={r} fill="none"
        stroke="#2bff88" strokeWidth="5" strokeLinecap="round"
        strokeDasharray={c}
        className="ring-draw"
        style={{
          strokeDashoffset: c - (c * pct) / 100,
          ["--ring-from" as string]: `${c}`,
          filter: "drop-shadow(0 0 6px rgba(43,255,136,0.7))",
          transition: "stroke-dashoffset 0.8s ease",
        }}
      />
    </svg>
  );
}

interface CardProps {
  stats: LiveStats;
}

export default function StatusCards({ stats }: CardProps) {
  const sims = useAnimatedNumber(stats.simulations);
  const atks = useAnimatedNumber(stats.attacks);
  const thrs = useAnimatedNumber(stats.threats);

  const cards = [
    {
      label: "SIMULACIONES EJECUTADAS",
      value: sims.toLocaleString("es-ES"),
      delta: "32% vs. últimos 7 días",
      color: "#b45bff",
      glow: "glow-purple",
      icon: FlaskConical,
      spark: 60,
    },
    {
      label: "ATAQUES SIMULADOS",
      value: atks.toLocaleString("es-ES"),
      delta: "28% vs. últimos 7 días",
      color: "#ff3b5c",
      glow: "glow-red",
      icon: Crosshair,
      spark: 45,
    },
    {
      label: "AMENAZAS DETECTADAS",
      value: thrs.toLocaleString("es-ES"),
      delta: "18% vs. últimos 7 días",
      color: "#ffd60a",
      glow: "glow-yellow",
      icon: AlertTriangle,
      spark: 55,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <div
            key={c.label}
            className={`glass hud-panel rounded-xl p-4 ${c.glow} relative overflow-hidden rise hover:-translate-y-1 transition-transform duration-200`}
            style={{ ["--hud-color" as string]: c.color, animationDelay: `${0.08 * i}s` }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-11 h-11 rounded-lg grid place-items-center shrink-0 border"
                style={{ borderColor: c.color + "44", background: c.color + "14", boxShadow: `0 0 16px ${c.color}33` }}
              >
                <Icon size={20} style={{ color: c.color, filter: `drop-shadow(0 0 6px ${c.color})` }} />
              </div>
              <div className="min-w-0">
                <p className="font-tech text-[10px] tracking-[0.18em] truncate" style={{ color: c.color }}>
                  {c.label}
                </p>
                <p className="font-display font-black text-3xl text-white mt-1 tabular-nums leading-none">{c.value}</p>
                <p className="flex items-center gap-1 text-[11px] font-tech mt-1.5" style={{ color: c.color }}>
                  <TrendingUp size={11} /> {c.delta}
                </p>
              </div>
            </div>
            <Spark color={c.color} base={c.spark} />
          </div>
        );
      })}

      {/* Riesgo general */}
      <div
        className="glass hud-panel rounded-xl p-4 glow-green relative overflow-hidden rise hover:-translate-y-1 transition-transform duration-200"
        style={{ ["--hud-color" as string]: "#2bff88", animationDelay: "0.24s" }}
      >
        <div className="flex items-start justify-between gap-2 h-full">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-lg grid place-items-center shrink-0 border border-neon-green/30 bg-neon-green/10 shadow-[0_0_16px_rgba(43,255,136,0.2)]">
              <ShieldCheck size={20} className="text-neon-green drop-shadow-[0_0_6px_rgba(43,255,136,0.9)]" />
            </div>
            <div>
              <p className="font-tech text-[10px] tracking-[0.18em] text-neon-green">RIESGO GENERAL</p>
              <p className="font-display font-black text-3xl text-neon-green mt-1 leading-none text-glow">
                {stats.riskScore < 40 ? "BAJO" : stats.riskScore < 55 ? "MEDIO" : "ALTO"}
              </p>
              <p className="flex items-center gap-1 text-[11px] font-tech mt-1.5 text-neon-green">
                <TrendingDown size={11} /> 42% riesgo vs. últimos 7 días
              </p>
            </div>
          </div>
          <div className="relative shrink-0">
            <RiskRing score={stats.riskScore} />
            <span className="absolute inset-0 grid place-items-center font-tech text-xs text-neon-green rotate-0">
              {100 - stats.riskScore}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
