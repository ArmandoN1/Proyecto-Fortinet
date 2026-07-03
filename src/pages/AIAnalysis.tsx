import {
  Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import { BrainCircuit, Sparkles, AlertTriangle, Activity, Cpu, Zap } from "lucide-react";
import { Panel, NeonBadge, NeonButton, Bar, Ring } from "../components/ui";

const forecast = [
  { d: "14 May", real: 62, pred: null as number | null },
  { d: "15 May", real: 71, pred: null },
  { d: "16 May", real: 58, pred: null },
  { d: "17 May", real: 66, pred: null },
  { d: "18 May", real: 54, pred: null },
  { d: "19 May", real: 49, pred: null },
  { d: "20 May", real: 46, pred: 46 },
  { d: "21 May", real: null, pred: 52 },
  { d: "22 May", real: null, pred: 61 },
  { d: "23 May", real: null, pred: 57 },
  { d: "24 May", real: null, pred: 48 },
];

const radarData = [
  { area: "Ransomware", score: 82 },
  { area: "Phishing", score: 64 },
  { area: "DDoS", score: 41 },
  { area: "Insider", score: 35 },
  { area: "Exploits", score: 71 },
  { area: "Botnet", score: 55 },
];

const anomalies = [
  { t: "11:19", desc: "Pico de tráfico DNS saliente en WS-FIN-22 (+840%)", conf: 97, c: "#ff3b5c" },
  { t: "10:52", desc: "Inicio de sesión desde ubicación inusual: usuario mgarcia", conf: 89, c: "#ffd60a" },
  { t: "10:31", desc: "Transferencia de 4.2 GB fuera de horario laboral", conf: 84, c: "#ffd60a" },
  { t: "09:47", desc: "Beaconing periódico cada 60s hacia ASN desconocido", conf: 93, c: "#ff3b5c" },
  { t: "09:12", desc: "Uso anómalo de PowerShell codificado en SRV-DB-02", conf: 78, c: "#00e5ff" },
];

const recs = [
  { t: "Aislar WS-FIN-22 y ejecutar análisis forense completo", pr: "CRÍTICA", c: "#ff3b5c" },
  { t: "Añadir el ASN 210XX a la lista de bloqueo del DNS Filter", pr: "ALTA", c: "#ff9f1c" },
  { t: "Revisar reglas DLP para transferencias > 1 GB nocturnas", pr: "MEDIA", c: "#ffd60a" },
  { t: "Activar autenticación adaptativa para accesos remotos", pr: "MEDIA", c: "#ffd60a" },
];

const tooltipStyle = {
  background: "rgba(10, 18, 38, 0.95)", border: "1px solid rgba(180,91,255,0.3)",
  borderRadius: 8, fontSize: 11, fontFamily: "'Share Tech Mono', monospace", color: "#d7e4ff",
};

export default function AIAnalysis() {
  return (
    <div className="space-y-4">
      {/* Cabecera IA */}
      <Panel color="#b45bff" delay={0}>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative w-16 h-16 shrink-0">
            <div className="absolute inset-0 rounded-full bg-neon-purple/25 blur-xl pulse-soft" />
            <div className="relative w-full h-full rounded-full border border-neon-purple/40 grid place-items-center bg-neon-purple/10">
              <BrainCircuit size={30} className="text-neon-purple drop-shadow-[0_0_10px_rgba(180,91,255,0.9)] flicker" />
            </div>
            <svg viewBox="0 0 64 64" className="absolute inset-0 radar-sweep" style={{ animationDuration: "8s" }}>
              <circle cx="32" cy="32" r="30" fill="none" stroke="#b45bff" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="8 40" />
            </svg>
          </div>
          <div className="flex-1 min-w-[200px]">
            <p className="font-tech text-[10px] text-slate-400 tracking-[0.2em]">MOTOR DE ANÁLISIS</p>
            <p className="font-display font-black text-2xl text-neon-purple text-glow leading-tight">FORTI-AI v4.2 · NEURAL ENGINE</p>
            <p className="font-tech text-[11px] text-slate-400 mt-0.5">Modelo entrenado con 2.1B eventos · Última inferencia hace 4 s</p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <Ring value={94} color="#b45bff" size={64} />
              <p className="font-tech text-[9px] text-slate-400 tracking-widest mt-1">CONFIANZA</p>
            </div>
            <div className="text-center">
              <Ring value={88} color="#00e5ff" size={64} />
              <p className="font-tech text-[9px] text-slate-400 tracking-widest mt-1">PRECISIÓN</p>
            </div>
            <div className="text-center hidden sm:block">
              <Ring value={76} color="#2bff88" size={64} icon={<Cpu size={16} className="text-neon-green" />} />
              <p className="font-tech text-[9px] text-slate-400 tracking-widest mt-1">GPU LOAD</p>
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-4">
        {/* Predicción */}
        <Panel color="#b45bff" delay={0.1} className="2xl:col-span-2"
          title="PREDICCIÓN DE AMENAZAS — PRÓXIMOS 4 DÍAS"
          right={<NeonBadge color="#b45bff">MODELO LSTM · MAE 4.2</NeonBadge>}>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecast} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="realGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00e5ff" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#00e5ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#b45bff" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#b45bff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1a2f55" strokeDasharray="3 6" vertical={false} />
                <XAxis dataKey="d" tick={{ fill: "#5a719c", fontSize: 10, fontFamily: "'Share Tech Mono', monospace" }} axisLine={{ stroke: "#1a2f55" }} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: "#5a719c", fontSize: 10, fontFamily: "'Share Tech Mono', monospace" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="real" name="Amenazas (real)" stroke="#00e5ff" strokeWidth={2} fill="url(#realGrad)" dot={{ r: 3, fill: "#00e5ff", strokeWidth: 0 }} connectNulls={false} />
                <Line type="monotone" dataKey="pred" name="Predicción IA" stroke="#b45bff" strokeWidth={2} strokeDasharray="6 5" dot={{ r: 3, fill: "#b45bff", strokeWidth: 0 }} connectNulls={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-1 font-tech text-[10px]">
            <span className="flex items-center gap-1.5 text-neon-cyan"><span className="w-3 h-0.5 bg-neon-cyan" /> HISTÓRICO REAL</span>
            <span className="flex items-center gap-1.5 text-neon-purple"><span className="w-3 h-0.5 bg-neon-purple" style={{ borderTop: "2px dashed #b45bff", background: "none" }} /> PREDICCIÓN IA</span>
            <span className="ml-auto text-neon-yellow flex items-center gap-1"><AlertTriangle size={11} /> PICO PREVISTO: 22 MAY</span>
          </div>
        </Panel>

        {/* Radar de riesgo por vector */}
        <Panel color="#00e5ff" title="RIESGO POR VECTOR" delay={0.2}>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="72%">
                <PolarGrid stroke="#1a2f55" />
                <PolarAngleAxis dataKey="area" tick={{ fill: "#8fa6cc", fontSize: 10, fontFamily: "'Share Tech Mono', monospace" }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Riesgo" dataKey="score" stroke="#00e5ff" strokeWidth={2} fill="#00e5ff" fillOpacity={0.18}
                  style={{ filter: "drop-shadow(0 0 6px rgba(0,229,255,0.5))" }} />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="font-tech text-[10px] text-slate-500 tracking-widest text-center">VECTOR DOMINANTE: <span className="text-neon-red">RANSOMWARE (82)</span></p>
        </Panel>
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-4">
        {/* Anomalías */}
        <Panel color="#ff3b5c" delay={0.25}
          title="DETECCIÓN DE ANOMALÍAS"
          right={
            <span className="flex items-center gap-1.5 font-tech text-[10px] text-neon-red tracking-widest">
              <Activity size={11} className="pulse-soft" /> UEBA ACTIVO
            </span>
          }>
          <div className="space-y-2">
            {anomalies.map((a, i) => (
              <div key={a.desc} className="px-3 py-2 rounded-lg bg-cyber-800/50 border border-white/5 hover:border-neon-red/30 transition-colors rise-l"
                style={{ animationDelay: `${0.3 + i * 0.07}s` }}>
                <div className="flex items-center gap-2">
                  <span className="font-tech text-[10px] text-slate-500">{a.t}</span>
                  <span className="ml-auto font-tech text-[10px]" style={{ color: a.c }}>CONF. {a.conf}%</span>
                </div>
                <p className="text-[12px] text-slate-200 leading-snug mt-0.5">{a.desc}</p>
                <div className="mt-1.5"><Bar value={a.conf} color={a.c} height={3} delay={0.35 + i * 0.07} /></div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Recomendaciones */}
        <Panel color="#b45bff" title="RECOMENDACIONES INTELIGENTES" delay={0.3}>
          <div className="space-y-2">
            {recs.map((r, i) => (
              <div key={r.t} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-cyber-800/50 border border-white/5 rise-r"
                style={{ animationDelay: `${0.35 + i * 0.08}s` }}>
                <Sparkles size={13} className="text-neon-purple shrink-0" style={{ filter: "drop-shadow(0 0 4px #b45bff)" }} />
                <p className="text-[12px] text-slate-200 leading-snug flex-1">{r.t}</p>
                <NeonBadge color={r.c}>{r.pr}</NeonBadge>
              </div>
            ))}
          </div>
          <NeonButton color="#b45bff" className="w-full mt-3"><Zap size={11} /> APLICAR TODAS LAS ACCIONES P1</NeonButton>
        </Panel>

        {/* Resumen automático */}
        <Panel color="#2bff88" delay={0.35}
          title="RESUMEN GENERADO POR IA"
          right={<NeonBadge color="#2bff88">AUTO · HACE 2 MIN</NeonBadge>}>
          <div className="relative rounded-lg bg-cyber-800/50 border border-neon-green/15 p-3.5 overflow-hidden">
            <div className="scanline" style={{ animationDuration: "8s" }} />
            <p className="font-tech text-[11.5px] text-slate-300 leading-relaxed">
              <span className="text-neon-green">&gt;_ </span>
              Durante las últimas 24 horas se registraron <span className="text-white">1.089 amenazas</span>, un
              <span className="text-neon-green"> 18% más</span> que el período anterior, con predominio de
              <span className="text-neon-red"> ransomware (28%)</span>. El sistema contuvo el
              <span className="text-white"> 97,2%</span> de los eventos de forma automática. Se identificaron
              <span className="text-neon-yellow"> 5 anomalías de comportamiento</span>, dos de ellas críticas y asociadas
              al host <span className="text-neon-cyan">WS-FIN-22</span>, que presenta indicadores compatibles con
              exfiltración por canal DNS. El modelo prevé un <span className="text-neon-purple">pico de actividad el 22 de mayo</span> vinculado
              a la campaña LockBit observada en la región. Riesgo global: <span className="text-neon-green">BAJO (34/100)</span>,
              con tendencia descendente sostenida.
            </p>
            <span className="inline-block w-2 h-3.5 bg-neon-green ml-1 pulse-soft align-middle" />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[
              { l: "TOKENS ANALIZADOS", v: "4.2M" },
              { l: "FUENTES", v: "17" },
              { l: "TIEMPO INFERENCIA", v: "0.8s" },
            ].map((m) => (
              <div key={m.l} className="rounded-lg bg-cyber-800/50 border border-white/5 p-2 text-center">
                <p className="font-display font-bold text-sm text-white">{m.v}</p>
                <p className="font-tech text-[8px] text-slate-500 tracking-widest mt-0.5">{m.l}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
