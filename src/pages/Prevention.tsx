import {
  Bug, Mail, Lock, Waves, Database, KeyRound, BrainCircuit, CheckCircle2, BookOpenCheck, Zap,
} from "lucide-react";
import { Panel, NeonBadge, NeonButton, Bar } from "../components/ui";

const preventions = [
  { icon: Lock, color: "#b45bff", type: "RANSOMWARE", items: ["Respaldos inmutables 3-2-1", "Segmentación de red crítica", "Deshabilitar macros de Office"] },
  { icon: Mail, color: "#2bff88", type: "PHISHING", items: ["DMARC + SPF + DKIM estrictos", "Formación continua a usuarios", "Sandbox de adjuntos entrantes"] },
  { icon: Bug, color: "#ff3b5c", type: "MALWARE", items: ["EDR en todos los endpoints", "Listas blancas de aplicaciones", "Parcheo automático mensual"] },
  { icon: Waves, color: "#00e5ff", type: "DDoS", items: ["Mitigación en el borde (scrubbing)", "Rate limiting por IP/ASN", "Anycast + CDN para servicios web"] },
  { icon: Database, color: "#ffd60a", type: "SQL INJECTION", items: ["Consultas parametrizadas (ORM)", "WAF con reglas OWASP CRS", "Principio de mínimo privilegio en BD"] },
  { icon: KeyRound, color: "#2f7bff", type: "FUERZA BRUTA", items: ["MFA obligatorio en accesos", "Bloqueo tras 5 intentos", "Contraseñas de 14+ caracteres"] },
];

const practices = [
  { t: "Gestión de parches", d: "Ciclo mensual con ventana de emergencia < 48h para CVEs críticos.", done: true },
  { t: "Zero Trust Network Access", d: "Verificación continua de identidad y postura del dispositivo.", done: true },
  { t: "Copias de seguridad verificadas", d: "Restauración probada trimestralmente en entorno aislado.", done: true },
  { t: "Simulacros de incidentes", d: "Ejercicios tabletop y purple team cada trimestre.", done: false },
  { t: "Inventario de activos actualizado", d: "Descubrimiento automático + CMDB sincronizada.", done: true },
  { t: "Cifrado de datos en reposo", d: "AES-256 en servidores y dispositivos móviles corporativos.", done: false },
];

const aiActions = [
  { p: "P1", c: "#ff3b5c", t: "Habilitar respaldo inmutable en SRV-FILES-01", d: "Riesgo de ransomware elevado detectado en este segmento.", impact: 18 },
  { p: "P1", c: "#ff3b5c", t: "Aplicar parche KB5034441 en 14 endpoints", d: "Explotación activa de la vulnerabilidad en la región.", impact: 15 },
  { p: "P2", c: "#ffd60a", t: "Restringir geo-IP de 3 países con tráfico anómalo", d: "Aumento de escaneos desde ASNs no habituales.", impact: 9 },
  { p: "P2", c: "#ffd60a", t: "Forzar MFA en cuentas de servicio antiguas", d: "6 cuentas sin MFA con privilegios elevados.", impact: 11 },
  { p: "P3", c: "#2bff88", t: "Optimizar reglas de firewall redundantes", d: "27 reglas sin coincidencias en 90 días.", impact: 4 },
];

export default function Prevention() {
  const riskLevel = 34;
  const semi = Math.PI * 52;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Nivel de riesgo */}
        <Panel color="#2bff88" title="NIVEL DE RIESGO ACTUAL" delay={0}>
          <div className="flex flex-col items-center py-2">
            <div className="relative w-44">
              <svg viewBox="0 0 130 78" className="w-full">
                <defs>
                  <linearGradient id="riskGaugeGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2bff88" />
                    <stop offset="50%" stopColor="#ffd60a" />
                    <stop offset="100%" stopColor="#ff3b5c" />
                  </linearGradient>
                </defs>
                <path d="M 13 70 A 52 52 0 0 1 117 70" fill="none" stroke="#1a2f55" strokeWidth="9" strokeLinecap="round" />
                <path
                  d="M 13 70 A 52 52 0 0 1 117 70" fill="none" stroke="url(#riskGaugeGrad)" strokeWidth="9" strokeLinecap="round"
                  strokeDasharray={semi}
                  className="ring-draw"
                  style={{
                    strokeDashoffset: semi * (1 - riskLevel / 100),
                    ["--ring-from" as string]: `${semi}`,
                    animationDuration: "1.4s",
                    filter: "drop-shadow(0 0 6px rgba(43,255,136,0.5))",
                  }}
                />
                {/* aguja */}
                <line
                  x1="65" y1="70" x2="65" y2="26" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"
                  className="needle-sweep"
                  style={{
                    transform: `rotate(${-90 + (riskLevel / 100) * 180}deg)`,
                    transformOrigin: "65px 70px",
                    filter: "drop-shadow(0 0 4px #fff)",
                  }}
                />
                <circle cx="65" cy="70" r="3.5" fill="#0d1730" stroke="#00e5ff" strokeWidth="1.4" />
              </svg>
              <div className="text-center -mt-3">
                <p className="font-display font-black text-3xl text-neon-green text-glow leading-none">BAJO</p>
                <p className="font-tech text-[11px] text-slate-400 mt-1">{riskLevel}/100 · Reducción del 42% este mes</p>
              </div>
            </div>
            <div className="w-full mt-4 space-y-2">
              {[
                { l: "Superficie de ataque expuesta", v: 22, c: "#2bff88" },
                { l: "Vulnerabilidades sin parchear", v: 31, c: "#ffd60a" },
                { l: "Usuarios de alto riesgo", v: 14, c: "#00e5ff" },
              ].map((m, i) => (
                <div key={m.l}>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-slate-300">{m.l}</span>
                    <span className="font-tech" style={{ color: m.c }}>{m.v}%</span>
                  </div>
                  <Bar value={m.v} color={m.c} delay={0.3 + i * 0.1} />
                </div>
              ))}
            </div>
          </div>
        </Panel>

        {/* Acciones IA */}
        <Panel color="#b45bff" delay={0.1} className="xl:col-span-2"
          title="ACCIONES SUGERIDAS POR IA"
          right={
            <span className="flex items-center gap-1.5 font-tech text-[10px] text-neon-purple tracking-widest">
              <BrainCircuit size={12} className="flicker" /> FORTI-AI · CONFIANZA 94%
            </span>
          }>
          <div className="space-y-2">
            {aiActions.map((a, i) => (
              <div
                key={a.t}
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-cyber-800/50 border border-white/5 hover:border-neon-purple/30 transition-colors rise-r"
                style={{ animationDelay: `${0.2 + i * 0.08}s` }}
              >
                <NeonBadge color={a.c}>{a.p}</NeonBadge>
                <div className="flex-1 min-w-0">
                  <p className="text-[12.5px] font-semibold text-slate-100 leading-tight truncate">{a.t}</p>
                  <p className="text-[11px] text-slate-500 leading-tight truncate">{a.d}</p>
                </div>
                <div className="hidden sm:block w-28 shrink-0">
                  <p className="font-tech text-[9px] text-slate-500 tracking-widest mb-0.5 text-right">-{a.impact}% RIESGO</p>
                  <Bar value={a.impact * 5} color={a.c} height={4} delay={0.3 + i * 0.08} />
                </div>
                <NeonButton color="#b45bff" className="shrink-0"><Zap size={10} /> APLICAR</NeonButton>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Recomendaciones por tipo */}
      <Panel color="#00e5ff" title="RECOMENDACIONES POR TIPO DE ATAQUE" delay={0.2}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {preventions.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.type}
                className="rounded-xl p-3.5 bg-cyber-800/50 border border-white/5 hover:border-white/15 hover:-translate-y-1 transition-all relative overflow-hidden group rise"
                style={{ animationDelay: `${0.25 + i * 0.07}s` }}
              >
                <div className="absolute -top-8 right-0 w-24 h-20 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity" style={{ background: p.color }} />
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-8 h-8 rounded-lg grid place-items-center border" style={{ borderColor: p.color + "45", background: p.color + "12" }}>
                    <Icon size={15} style={{ color: p.color, filter: `drop-shadow(0 0 5px ${p.color})` }} />
                  </div>
                  <p className="font-display text-[11px] font-bold tracking-[0.12em]" style={{ color: p.color, textShadow: `0 0 10px ${p.color}` }}>
                    {p.type}
                  </p>
                </div>
                <ul className="space-y-1.5">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-1.5 text-[11.5px] text-slate-300 leading-snug">
                      <CheckCircle2 size={12} className="shrink-0 mt-0.5" style={{ color: p.color }} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* Buenas prácticas */}
      <Panel color="#ffd60a" delay={0.3}
        title="BUENAS PRÁCTICAS"
        right={
          <span className="flex items-center gap-1.5 font-tech text-[10px] text-neon-yellow tracking-widest">
            <BookOpenCheck size={12} /> 4/6 IMPLEMENTADAS
          </span>
        }>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {practices.map((p, i) => (
            <div
              key={p.t}
              className="flex gap-2.5 px-3 py-2.5 rounded-lg bg-cyber-800/50 border border-white/5 rise"
              style={{ animationDelay: `${0.35 + i * 0.06}s` }}
            >
              <span
                className="w-5 h-5 rounded-full grid place-items-center border shrink-0 mt-0.5"
                style={{
                  borderColor: p.done ? "#2bff8860" : "#5a719c50",
                  background: p.done ? "#2bff8815" : "transparent",
                  boxShadow: p.done ? "0 0 8px #2bff8840" : "none",
                }}
              >
                <CheckCircle2 size={11} style={{ color: p.done ? "#2bff88" : "#5a719c" }} />
              </span>
              <div>
                <p className={`text-[12px] font-bold leading-tight ${p.done ? "text-slate-100" : "text-slate-400"}`}>{p.t}</p>
                <p className="text-[10.5px] text-slate-500 leading-snug mt-0.5">{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
