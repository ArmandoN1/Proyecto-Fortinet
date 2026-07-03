import { Target, Trophy, TrendingDown, FlaskConical, ShieldCheck, Clock } from "lucide-react";
import { Panel, NeonBadge, Bar, Ring, StatChip } from "../components/ui";

const kpis = [
  { l: "MTTD — Tiempo medio de detección", meta: "< 60 s", actual: "38 s", pct: 100, c: "#2bff88", ok: true },
  { l: "MTTR — Tiempo medio de respuesta", meta: "< 5 min", actual: "2m 14s", pct: 100, c: "#2bff88", ok: true },
  { l: "Cobertura EDR en endpoints", meta: "100%", actual: "93%", pct: 93, c: "#00e5ff", ok: false },
  { l: "Simulaciones mensuales completadas", meta: "40", actual: "36", pct: 90, c: "#b45bff", ok: false },
  { l: "Usuarios formados en phishing", meta: "100%", actual: "87%", pct: 87, c: "#ffd60a", ok: false },
  { l: "Parcheo de CVEs críticos < 48h", meta: "100%", actual: "96%", pct: 96, c: "#2f7bff", ok: false },
  { l: "Reducción del riesgo trimestral", meta: "-30%", actual: "-42%", pct: 100, c: "#2bff88", ok: true },
  { l: "Disponibilidad del Security Fabric", meta: "99.9%", actual: "99.97%", pct: 100, c: "#2bff88", ok: true },
];

const quarters = [
  { q: "Q1", riesgo: 68, sims: 96 },
  { q: "Q2", riesgo: 55, sims: 118 },
  { q: "Q3", riesgo: 46, sims: 127 },
  { q: "Q4", riesgo: 34, sims: 142 },
];

export default function Objectives() {
  const completed = kpis.filter((k) => k.ok).length;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <StatChip label="OBJETIVOS TOTALES" value={String(kpis.length)} color="#00e5ff" icon={<Target size={16} className="text-neon-cyan" />} />
        <StatChip label="CUMPLIDOS" value={`${completed}/${kpis.length}`} color="#2bff88" icon={<Trophy size={16} className="text-neon-green" />} />
        <StatChip label="RIESGO REDUCIDO" value="-42%" color="#b45bff" icon={<TrendingDown size={16} className="text-neon-purple" />} />
        <StatChip label="SIMULACIONES 2024" value="483" color="#ffd60a" icon={<FlaskConical size={16} className="text-neon-yellow" />} />
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-4">
        {/* KPIs */}
        <Panel color="#00e5ff" delay={0.1} className="2xl:col-span-2"
          title="KPIs DE SEGURIDAD"
          right={<NeonBadge color="#2bff88">{Math.round((completed / kpis.length) * 100)}% CUMPLIMIENTO GLOBAL</NeonBadge>}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {kpis.map((k, i) => (
              <div key={k.l} className="rise" style={{ animationDelay: `${0.15 + i * 0.05}s` }}>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11.5px] text-slate-300 truncate">{k.l}</span>
                  <span className="flex items-center gap-2 shrink-0">
                    <span className="font-tech text-[10px] text-slate-500">META {k.meta}</span>
                    <span className="font-tech text-[11px]" style={{ color: k.c }}>{k.actual}</span>
                    {k.ok
                      ? <NeonBadge color="#2bff88">✓</NeonBadge>
                      : <NeonBadge color="#ffd60a">EN CURSO</NeonBadge>}
                  </span>
                </div>
                <Bar value={k.pct} color={k.c} height={6} delay={0.2 + i * 0.05} />
              </div>
            ))}
          </div>
        </Panel>

        {/* Progreso global */}
        <Panel color="#2bff88" title="PROGRESO ANUAL" delay={0.2}>
          <div className="flex flex-col items-center gap-2 py-1">
            <div className="relative">
              <Ring value={Math.round((completed / kpis.length) * 100)} color="#2bff88" size={120} />
              <div className="absolute inset-0 grid place-items-center pointer-events-none">
                <div className="text-center">
                  <p className="font-display font-black text-2xl text-neon-green text-glow leading-none">
                    {Math.round((completed / kpis.length) * 100)}%
                  </p>
                  <p className="font-tech text-[8px] text-slate-500 tracking-widest mt-0.5">COMPLETADO</p>
                </div>
              </div>
            </div>
            <p className="font-tech text-[10px] text-slate-400 tracking-widest flex items-center gap-1">
              <Clock size={10} /> CIERRE DE PERÍODO: 41 DÍAS
            </p>
          </div>

          <div className="mt-3 space-y-3">
            <p className="font-tech text-[10px] text-slate-400 tracking-[0.2em]">EVOLUCIÓN TRIMESTRAL</p>
            {quarters.map((q, i) => (
              <div key={q.q} className="flex items-center gap-3">
                <span className="font-display font-bold text-[11px] text-white w-6">{q.q}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-[9px] font-tech mb-0.5">
                    <span className="text-neon-red">RIESGO {q.riesgo}</span>
                    <span className="text-neon-purple">{q.sims} SIMS</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="flex-1"><Bar value={q.riesgo} color="#ff3b5c" height={4} delay={0.3 + i * 0.08} /></div>
                    <div className="flex-1"><Bar value={(q.sims / 150) * 100} color="#b45bff" height={4} delay={0.35 + i * 0.08} /></div>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-white/5 flex items-center gap-2">
              <ShieldCheck size={14} className="text-neon-green" />
              <p className="text-[11px] text-slate-300 leading-snug">
                El riesgo se redujo un <span className="text-neon-green font-bold">50%</span> desde Q1 mientras las simulaciones
                aumentaron un <span className="text-neon-purple font-bold">48%</span>.
              </p>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
