import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  Bug, Mail, Lock, Waves, Database, Code2, KeyRound, Bot,
  Play, Loader2, CheckCircle2, Activity, FlaskConical, Trophy, Timer,
} from "lucide-react";
import { Panel, NeonBadge, NeonButton, Bar, StatChip, thCls, tdCls } from "../components/ui";

interface SimDef {
  id: string;
  name: string;
  desc: string;
  icon: typeof Bug;
  color: string;
  difficulty: "BÁSICO" | "MEDIO" | "AVANZADO";
  duration: string;
}

const catalog: SimDef[] = [
  { id: "malware", name: "MALWARE", desc: "Inyección de muestra EICAR y binarios simulados en endpoints.", icon: Bug, color: "#ff3b5c", difficulty: "MEDIO", duration: "4 min" },
  { id: "phishing", name: "PHISHING", desc: "Campaña de correos con credenciales falsas a usuarios internos.", icon: Mail, color: "#2bff88", difficulty: "BÁSICO", duration: "6 min" },
  { id: "ransomware", name: "RANSOMWARE", desc: "Cifrado controlado de honeypots y detección de comportamiento.", icon: Lock, color: "#b45bff", difficulty: "AVANZADO", duration: "8 min" },
  { id: "ddos", name: "DDoS", desc: "Inundación SYN/UDP sintética contra el perímetro virtual.", icon: Waves, color: "#00e5ff", difficulty: "MEDIO", duration: "5 min" },
  { id: "sqli", name: "SQL INJECTION", desc: "Payloads UNION/Blind contra la aplicación web de pruebas.", icon: Database, color: "#ffd60a", difficulty: "MEDIO", duration: "3 min" },
  { id: "xss", name: "XSS", desc: "Scripts reflejados y persistentes en formularios de laboratorio.", icon: Code2, color: "#ff9f1c", difficulty: "BÁSICO", duration: "3 min" },
  { id: "brute", name: "FUERZA BRUTA", desc: "Diccionario contra SSH/RDP con bloqueo por umbral.", icon: KeyRound, color: "#2f7bff", difficulty: "BÁSICO", duration: "5 min" },
  { id: "botnet", name: "BOTNET", desc: "Beaconing C2 simulado y detección de tráfico anómalo.", icon: Bot, color: "#ff4dd8", difficulty: "AVANZADO", duration: "7 min" },
];

const diffColor = { BÁSICO: "#2bff88", MEDIO: "#ffd60a", AVANZADO: "#ff3b5c" } as const;

const history = [
  { id: "SIM-1248", tipo: "Ransomware", fecha: "20 MAY 11:24", duracion: "7m 42s", detectado: "100%", resultado: "CONTENIDO", color: "#2bff88" },
  { id: "SIM-1247", tipo: "Phishing", fecha: "20 MAY 10:51", duracion: "5m 12s", detectado: "94%", resultado: "CONTENIDO", color: "#2bff88" },
  { id: "SIM-1246", tipo: "DDoS", fecha: "20 MAY 09:33", duracion: "4m 58s", detectado: "100%", resultado: "MITIGADO", color: "#00e5ff" },
  { id: "SIM-1245", tipo: "SQL Injection", fecha: "19 MAY 17:02", duracion: "2m 44s", detectado: "88%", resultado: "PARCIAL", color: "#ffd60a" },
  { id: "SIM-1244", tipo: "Fuerza Bruta", fecha: "19 MAY 15:20", duracion: "5m 05s", detectado: "100%", resultado: "BLOQUEADO", color: "#2bff88" },
  { id: "SIM-1243", tipo: "Botnet", fecha: "19 MAY 12:11", duracion: "6m 51s", detectado: "91%", resultado: "CONTENIDO", color: "#2bff88" },
  { id: "SIM-1242", tipo: "XSS", fecha: "18 MAY 16:44", duracion: "3m 02s", detectado: "79%", resultado: "PARCIAL", color: "#ffd60a" },
];

const effData = [
  { m: "Ene", v: 74 }, { m: "Feb", v: 78 }, { m: "Mar", v: 81 }, { m: "Abr", v: 85 }, { m: "May", v: 92 },
];

function SimCatalogCard({ sim, index, running, progress, onRun }: {
  sim: SimDef; index: number; running: boolean; progress: number; onRun: () => void;
}) {
  const Icon = sim.icon;
  return (
    <div
      className="glass hud-panel rounded-xl p-4 relative overflow-hidden group pop hover:-translate-y-1 transition-transform duration-200"
      style={{ ["--hud-color" as string]: sim.color, animationDelay: `${0.06 * index}s` }}
    >
      <div className="absolute -top-10 right-0 w-28 h-24 rounded-full blur-2xl opacity-15 group-hover:opacity-40 transition-opacity" style={{ background: sim.color }} />
      <div className="flex items-start gap-3">
        <div
          className="w-11 h-11 rounded-xl border grid place-items-center shrink-0 float-y"
          style={{ borderColor: sim.color + "50", background: sim.color + "14", boxShadow: `0 0 18px ${sim.color}30`, animationDelay: `${index * 0.3}s` }}
        >
          {running
            ? <Loader2 size={20} className="animate-spin" style={{ color: sim.color }} />
            : <Icon size={20} style={{ color: sim.color, filter: `drop-shadow(0 0 8px ${sim.color})` }} />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-display text-[12px] font-bold tracking-[0.1em]" style={{ color: sim.color, textShadow: `0 0 10px ${sim.color}` }}>
              {sim.name}
            </p>
            <NeonBadge color={diffColor[sim.difficulty]}>{sim.difficulty}</NeonBadge>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug mt-1">{sim.desc}</p>
          <p className="font-tech text-[9px] text-slate-500 tracking-widest mt-1 flex items-center gap-1">
            <Timer size={9} /> DURACIÓN EST.: {sim.duration}
          </p>
        </div>
      </div>

      {running ? (
        <div className="mt-3">
          <div className="flex justify-between font-tech text-[10px] mb-1" style={{ color: sim.color }}>
            <span className="pulse-soft">EJECUTANDO…</span><span>{progress}%</span>
          </div>
          <Bar value={progress} color={sim.color} height={6} />
        </div>
      ) : (
        <NeonButton color={sim.color} onClick={onRun} className="mt-3 w-full">
          <Play size={10} /> INICIAR SIMULACIÓN
        </NeonButton>
      )}
    </div>
  );
}

export default function Simulations() {
  const [runs, setRuns] = useState<Record<string, number>>({});

  const start = (id: string) => {
    if (runs[id] !== undefined) return;
    setRuns((r) => ({ ...r, [id]: 0 }));
    const t = setInterval(() => {
      setRuns((r) => {
        const p = (r[id] ?? 0) + Math.floor(Math.random() * 9) + 3;
        if (p >= 100) {
          clearInterval(t);
          setTimeout(() => setRuns((r2) => { const { [id]: _, ...rest } = r2; return rest; }), 1800);
          return { ...r, [id]: 100 };
        }
        return { ...r, [id]: p };
      });
    }, 380);
  };

  const activeCount = Object.keys(runs).length;

  return (
    <div className="space-y-4">
      {/* Métricas superiores */}
      <div className="flex flex-wrap gap-3">
        <StatChip label="SIMULACIONES TOTALES" value="1.248" color="#b45bff" icon={<FlaskConical size={16} className="text-neon-purple" />} />
        <StatChip label="EN EJECUCIÓN" value={String(activeCount)} color="#00e5ff" icon={<Activity size={16} className="text-neon-cyan pulse-soft" />} />
        <StatChip label="TASA DE DETECCIÓN" value="92%" color="#2bff88" icon={<CheckCircle2 size={16} className="text-neon-green" />} />
        <StatChip label="MEJOR RESULTADO" value="100%" color="#ffd60a" icon={<Trophy size={16} className="text-neon-yellow" />} />
      </div>

      {/* Catálogo */}
      <Panel color="#b45bff" title="CATÁLOGO DE SIMULACIONES" delay={0.1}
        right={<span className="font-tech text-[10px] text-slate-500 tracking-widest">// ENTORNO AISLADO · SIN EJECUCIÓN REAL</span>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {catalog.map((s, i) => (
            <SimCatalogCard
              key={s.id} sim={s} index={i}
              running={runs[s.id] !== undefined}
              progress={runs[s.id] ?? 0}
              onRun={() => start(s.id)}
            />
          ))}
        </div>
      </Panel>

      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-4">
        {/* Historial */}
        <Panel color="#00e5ff" title="HISTORIAL DE SIMULACIONES" delay={0.2} className="2xl:col-span-2 overflow-x-auto">
          <table className="w-full min-w-[620px]">
            <thead>
              <tr>
                <th className={thCls}>ID</th><th className={thCls}>TIPO</th><th className={thCls}>FECHA</th>
                <th className={thCls}>DURACIÓN</th><th className={thCls}>DETECCIÓN</th><th className={thCls}>RESULTADO</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={h.id} className="hover:bg-neon-cyan/5 transition-colors rise-l" style={{ animationDelay: `${0.25 + i * 0.05}s` }}>
                  <td className={`${tdCls} font-tech text-neon-cyan`}>{h.id}</td>
                  <td className={`${tdCls} font-semibold text-white`}>{h.tipo}</td>
                  <td className={`${tdCls} font-tech text-slate-400`}>{h.fecha}</td>
                  <td className={`${tdCls} font-tech`}>{h.duracion}</td>
                  <td className={tdCls}>
                    <div className="flex items-center gap-2 min-w-[90px]">
                      <Bar value={parseInt(h.detectado)} color={h.color} height={4} delay={0.3 + i * 0.05} />
                      <span className="font-tech text-[11px]" style={{ color: h.color }}>{h.detectado}</span>
                    </div>
                  </td>
                  <td className={tdCls}><NeonBadge color={h.color}>{h.resultado}</NeonBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        {/* Resultados y métricas */}
        <Panel color="#2bff88" title="RESULTADOS Y MÉTRICAS" delay={0.3}>
          <p className="font-tech text-[10px] text-slate-400 tracking-widest mb-1">EFICACIA DE DETECCIÓN — 5 MESES</p>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={effData} margin={{ top: 6, right: 6, left: -26, bottom: 0 }}>
                <defs>
                  <linearGradient id="effGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2bff88" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#2bff88" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1a2f55" strokeDasharray="3 6" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: "#5a719c", fontSize: 10, fontFamily: "'Share Tech Mono', monospace" }} axisLine={{ stroke: "#1a2f55" }} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fill: "#5a719c", fontSize: 10, fontFamily: "'Share Tech Mono', monospace" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "rgba(10,18,38,0.95)", border: "1px solid rgba(43,255,136,0.3)", borderRadius: 8, fontSize: 11, fontFamily: "'Share Tech Mono', monospace" }} />
                <Area type="monotone" dataKey="v" name="Eficacia %" stroke="#2bff88" strokeWidth={2} fill="url(#effGrad)" dot={{ r: 3, fill: "#2bff88", strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2.5 mt-3">
            {[
              { l: "Tiempo medio de detección (MTTD)", v: "38 s", p: 88, c: "#00e5ff" },
              { l: "Tiempo medio de respuesta (MTTR)", v: "2m 14s", p: 82, c: "#2bff88" },
              { l: "Cobertura MITRE ATT&CK", v: "76%", p: 76, c: "#b45bff" },
              { l: "Falsos positivos", v: "3.2%", p: 12, c: "#ffd60a" },
            ].map((m, i) => (
              <div key={m.l}>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-slate-300">{m.l}</span>
                  <span className="font-tech" style={{ color: m.c }}>{m.v}</span>
                </div>
                <Bar value={m.p} color={m.c} delay={0.4 + i * 0.1} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
