import {
  Bar as RBar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis, Legend,
} from "recharts";
import { TrendingUp, TrendingDown, ShieldCheck, DollarSign, Users, Award } from "lucide-react";
import { Panel, NeonBadge } from "../components/ui";

const monthly = [
  { m: "Dic", amenazas: 1420, bloqueadas: 1310 },
  { m: "Ene", amenazas: 1580, bloqueadas: 1490 },
  { m: "Feb", amenazas: 1310, bloqueadas: 1262 },
  { m: "Mar", amenazas: 1690, bloqueadas: 1640 },
  { m: "Abr", amenazas: 1240, bloqueadas: 1214 },
  { m: "May", amenazas: 1089, bloqueadas: 1058 },
];

const trend = [
  { m: "Dic", postura: 71, industria: 68 },
  { m: "Ene", postura: 74, industria: 68 },
  { m: "Feb", postura: 78, industria: 69 },
  { m: "Mar", postura: 81, industria: 70 },
  { m: "Abr", postura: 88, industria: 70 },
  { m: "May", postura: 92, industria: 71 },
];

const invest = [
  { name: "Prevención", value: 42, color: "#2bff88" },
  { name: "Detección", value: 28, color: "#00e5ff" },
  { name: "Respuesta", value: 18, color: "#b45bff" },
  { name: "Formación", value: 12, color: "#ffd60a" },
];

const execKpis = [
  { l: "POSTURA DE SEGURIDAD", v: "92/100", d: "+4 pts vs. abril", up: true, c: "#2bff88", icon: ShieldCheck },
  { l: "PÉRDIDAS EVITADAS (EST.)", v: "$1.24M", d: "+18% vs. abril", up: true, c: "#00e5ff", icon: DollarSign },
  { l: "INCIDENTES CON IMPACTO", v: "2", d: "-60% vs. abril", up: false, c: "#b45bff", icon: TrendingDown },
  { l: "MADUREZ NIST CSF", v: "4.1/5", d: "Nivel: Gestionado", up: true, c: "#ffd60a", icon: Award },
  { l: "USUARIOS FORMADOS", v: "87%", d: "+9% vs. abril", up: true, c: "#ff4dd8", icon: Users },
];

const tooltipStyle = {
  background: "rgba(10, 18, 38, 0.95)", border: "1px solid rgba(0,229,255,0.3)",
  borderRadius: 8, fontSize: 11, fontFamily: "'Share Tech Mono', monospace", color: "#d7e4ff",
};

export default function Executive() {
  return (
    <div className="space-y-4">
      {/* KPIs ejecutivos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {execKpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <div
              key={k.l}
              className="glass hud-panel rounded-xl p-4 relative overflow-hidden group rise hover:-translate-y-1 transition-transform duration-200"
              style={{ ["--hud-color" as string]: k.c, animationDelay: `${i * 0.07}s` }}
            >
              <div className="absolute -top-8 right-0 w-24 h-20 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity" style={{ background: k.c }} />
              <div className="w-9 h-9 rounded-lg grid place-items-center border mb-2.5" style={{ borderColor: k.c + "45", background: k.c + "12" }}>
                <Icon size={16} style={{ color: k.c, filter: `drop-shadow(0 0 6px ${k.c})` }} />
              </div>
              <p className="font-tech text-[9px] text-slate-400 tracking-[0.18em]">{k.l}</p>
              <p className="font-display font-black text-2xl text-white mt-1 leading-none">{k.v}</p>
              <p className="flex items-center gap-1 text-[10.5px] font-tech mt-1.5" style={{ color: k.c }}>
                {k.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />} {k.d}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
        {/* Comparación mensual */}
        <Panel color="#00e5ff" title="COMPARACIÓN MENSUAL — AMENAZAS VS. BLOQUEADAS" delay={0.2}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly} margin={{ top: 8, right: 8, left: -18, bottom: 0 }} barGap={3}>
                <CartesianGrid stroke="#1a2f55" strokeDasharray="3 6" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: "#5a719c", fontSize: 10, fontFamily: "'Share Tech Mono', monospace" }} axisLine={{ stroke: "#1a2f55" }} tickLine={false} />
                <YAxis tick={{ fill: "#5a719c", fontSize: 10, fontFamily: "'Share Tech Mono', monospace" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(0,229,255,0.05)" }} />
                <Legend wrapperStyle={{ fontSize: 10, fontFamily: "'Share Tech Mono', monospace" }} />
                <RBar dataKey="amenazas" name="Amenazas" fill="#ff3b5c" radius={[4, 4, 0, 0]} style={{ filter: "drop-shadow(0 0 4px rgba(255,59,92,0.5))" }} />
                <RBar dataKey="bloqueadas" name="Bloqueadas" fill="#2bff88" radius={[4, 4, 0, 0]} style={{ filter: "drop-shadow(0 0 4px rgba(43,255,136,0.5))" }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        {/* Tendencia postura */}
        <Panel color="#2bff88" title="TENDENCIA DE POSTURA DE SEGURIDAD" delay={0.25}
          right={<NeonBadge color="#2bff88">+21 PTS EN 6 MESES</NeonBadge>}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid stroke="#1a2f55" strokeDasharray="3 6" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: "#5a719c", fontSize: 10, fontFamily: "'Share Tech Mono', monospace" }} axisLine={{ stroke: "#1a2f55" }} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fill: "#5a719c", fontSize: 10, fontFamily: "'Share Tech Mono', monospace" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 10, fontFamily: "'Share Tech Mono', monospace" }} />
                <Line type="monotone" dataKey="postura" name="Nuestra organización" stroke="#2bff88" strokeWidth={2.5}
                  dot={{ r: 4, fill: "#2bff88", strokeWidth: 0 }} style={{ filter: "drop-shadow(0 0 5px rgba(43,255,136,0.6))" }} />
                <Line type="monotone" dataKey="industria" name="Media del sector" stroke="#5a719c" strokeWidth={1.5} strokeDasharray="6 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-4">
        {/* Inversión */}
        <Panel color="#b45bff" title="DISTRIBUCIÓN DE INVERSIÓN" delay={0.3}>
          <div className="flex items-center gap-3">
            <div className="relative w-36 h-36 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={invest} dataKey="value" innerRadius={44} outerRadius={62} paddingAngle={3} startAngle={90} endAngle={-270} stroke="none">
                    {invest.map((d) => (
                      <Cell key={d.name} fill={d.color} style={{ filter: `drop-shadow(0 0 5px ${d.color}90)` }} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 grid place-items-center pointer-events-none">
                <div className="text-center">
                  <p className="font-display font-black text-lg text-white leading-none">$820K</p>
                  <p className="font-tech text-[8px] text-slate-500 tracking-widest mt-0.5">ANUAL</p>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              {invest.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-[2px]" style={{ background: d.color, boxShadow: `0 0 6px ${d.color}` }} />
                  <span className="text-[11px] text-slate-300 flex-1">{d.name}</span>
                  <span className="font-tech text-[11px] text-white tabular-nums">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        {/* Resumen gerencial */}
        <Panel color="#ffd60a" title="RESUMEN PARA GERENCIA" delay={0.35} className="2xl:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { t: "Retorno de la inversión", d: "Cada $1 invertido en prevención evitó $1.51 en pérdidas potenciales durante el último semestre.", c: "#2bff88" },
              { t: "Riesgo empresarial", d: "El riesgo global descendió a nivel BAJO (34/100), mejor registro histórico de la organización.", c: "#00e5ff" },
              { t: "Próximo trimestre", d: "Prioridades: cobertura EDR al 100%, certificación ISO 27001 y ampliación del programa de simulaciones.", c: "#b45bff" },
            ].map((b, i) => (
              <div key={b.t} className="rounded-xl p-3.5 bg-cyber-800/50 border-l-2 border border-white/5 rise"
                style={{ borderLeftColor: b.c, animationDelay: `${0.4 + i * 0.1}s` }}>
                <p className="font-display text-[11px] font-bold tracking-[0.1em] mb-1.5" style={{ color: b.c, textShadow: `0 0 10px ${b.c}` }}>
                  {b.t.toUpperCase()}
                </p>
                <p className="text-[11.5px] text-slate-300 leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap items-center gap-x-6 gap-y-1 font-tech text-[10px] text-slate-500 tracking-widest">
            <span>INFORME GENERADO: 20 MAY 2024 · 11:24</span>
            <span>PERÍODO: DIC 2023 — MAY 2024</span>
            <span className="text-neon-yellow">CLASIFICACIÓN: CONFIDENCIAL — SOLO DIRECCIÓN</span>
          </div>
        </Panel>
      </div>
    </div>
  );
}
