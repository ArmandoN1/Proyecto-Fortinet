import { useState } from "react";
import { Play, TrendingUp, Loader2 } from "lucide-react";
import { simulationTypes } from "../data/mock";
import { useAnimatedNumber } from "../hooks/useLive";

function SimCard({ sim, index }: { sim: (typeof simulationTypes)[number]; index: number }) {
  const [count, setCount] = useState(sim.count);
  const [running, setRunning] = useState(false);
  const display = useAnimatedNumber(count, 900);
  const Icon = sim.icon;

  const run = () => {
    if (running) return;
    setRunning(true);
    setTimeout(() => {
      setCount((c) => c + 1 + Math.floor(Math.random() * 3));
      setRunning(false);
    }, 2200);
  };

  return (
    <div
      className="glass hud-panel rounded-xl p-4 text-center relative overflow-hidden group pop hover:-translate-y-1 transition-transform duration-200"
      style={{ ["--hud-color" as string]: sim.color, animationDelay: `${0.3 + index * 0.08}s` }}
    >
      {/* glow superior */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-20 rounded-full blur-2xl opacity-25 group-hover:opacity-50 transition-opacity"
        style={{ background: sim.color }}
      />
      <p className="font-display text-[12px] font-bold tracking-[0.12em]" style={{ color: sim.color, textShadow: `0 0 12px ${sim.color}` }}>
        {sim.label}
      </p>
      {sim.sub && <p className="font-tech text-[9px] text-slate-500 tracking-widest">{sim.sub}</p>}

      {/* holograma con icono */}
      <div className="relative mx-auto my-3 w-20 h-20">
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-30 float-y"
          style={{ background: sim.color }}
        />
        <div
          className="relative w-full h-full rounded-xl border grid place-items-center float-y"
          style={{
            borderColor: sim.color + "50",
            background: `linear-gradient(160deg, ${sim.color}18, transparent)`,
            boxShadow: `0 0 24px ${sim.color}30, inset 0 0 20px ${sim.color}15`,
            animationDelay: `${index * 0.4}s`,
          }}
        >
          {running ? (
            <Loader2 size={30} className="animate-spin" style={{ color: sim.color }} />
          ) : (
            <Icon size={30} style={{ color: sim.color, filter: `drop-shadow(0 0 10px ${sim.color})` }} />
          )}
        </div>
        {/* base holográfica */}
        <div
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-[50%] opacity-50 pulse-soft"
          style={{ background: `radial-gradient(ellipse, ${sim.color}, transparent 70%)` }}
        />
      </div>

      <p className="font-display font-black text-2xl text-white tabular-nums">{display}</p>
      <p className="flex items-center justify-center gap-1 font-tech text-[11px] mt-0.5" style={{ color: sim.color }}>
        <TrendingUp size={11} /> {sim.delta}%
      </p>
      <button
        onClick={run}
        disabled={running}
        className="mt-3 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg font-tech text-[10px] tracking-[0.2em] transition-all disabled:opacity-60"
        style={{
          color: sim.color,
          border: `1px solid ${sim.color}40`,
          background: sim.color + "0d",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 16px ${sim.color}40`)}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        {running ? "EJECUTANDO..." : (<><Play size={10} /> SIMULAR</>)}
      </button>
    </div>
  );
}

export default function SimulationCards() {
  return (
    <div className="glass rounded-xl p-4 border-run rise" style={{ animationDelay: "0.25s" }}>
      <h2 className="font-display text-sm font-bold text-white tracking-[0.15em] mb-4">
        SIMULACIONES POR TIPO DE ATAQUE
        <span className="ml-2 font-tech text-[10px] text-slate-500 tracking-widest font-normal">// ENTORNO AISLADO · SIN EJECUCIÓN REAL</span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
        {simulationTypes.map((s, i) => (
          <SimCard key={s.id} sim={s} index={i} />
        ))}
      </div>
    </div>
  );
}
