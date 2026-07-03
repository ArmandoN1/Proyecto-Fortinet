import { useState } from "react";
import {
  BrickWall, ShieldHalf, Radar, Bug, Globe, KeySquare, ServerCog, LockKeyhole, ShieldCheck,
} from "lucide-react";
import { Panel, Toggle, Bar, Ring, NeonBadge } from "../components/ui";

interface Module {
  id: string; name: string; desc: string; icon: typeof BrickWall; color: string;
  version: string; blocked: number; unit: string; health: number;
}

const modules: Module[] = [
  { id: "fw", name: "FIREWALL", desc: "Inspección de estado y NAT en perímetro", icon: BrickWall, color: "#2bff88", version: "v7.4.3", blocked: 12480, unit: "conexiones", health: 98 },
  { id: "ips", name: "IPS", desc: "Prevención de intrusiones en línea", icon: ShieldHalf, color: "#2f7bff", version: "sig 27.442", blocked: 3211, unit: "exploits", health: 96 },
  { id: "ids", name: "IDS", desc: "Detección pasiva y correlación de eventos", icon: Radar, color: "#00e5ff", version: "sig 27.442", blocked: 1904, unit: "alertas", health: 94 },
  { id: "av", name: "ANTIVIRUS", desc: "Motor antimalware + sandbox en la nube", icon: Bug, color: "#ff3b5c", version: "DB 91.02", blocked: 842, unit: "muestras", health: 97 },
  { id: "wf", name: "WEB FILTER", desc: "Filtrado por categorías y reputación URL", icon: Globe, color: "#ffd60a", version: "FGD activo", blocked: 5117, unit: "URLs", health: 92 },
  { id: "vpn", name: "VPN", desc: "Túneles IPsec / SSL-VPN activos", icon: KeySquare, color: "#b45bff", version: "84 túneles", blocked: 0, unit: "caídas", health: 99 },
  { id: "dns", name: "DNS FILTER", desc: "Bloqueo de dominios maliciosos y C2", icon: ServerCog, color: "#ff9f1c", version: "FGD activo", blocked: 2286, unit: "dominios", health: 95 },
  { id: "ssl", name: "SSL INSPECTION", desc: "Inspección profunda de tráfico cifrado", icon: LockKeyhole, color: "#ff4dd8", version: "cert OK", blocked: 668, unit: "sesiones", health: 90 },
];

const indicators = [
  { l: "Cobertura de red protegida", v: 97, c: "#2bff88" },
  { l: "Firmas actualizadas", v: 100, c: "#00e5ff" },
  { l: "Endpoints con agente EDR", v: 93, c: "#2f7bff" },
  { l: "Tráfico cifrado inspeccionado", v: 84, c: "#ff4dd8" },
  { l: "Políticas aplicadas correctamente", v: 96, c: "#b45bff" },
  { l: "Redundancia HA operativa", v: 100, c: "#ffd60a" },
];

export default function Protection() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(modules.map((m) => [m.id, true]))
  );

  const activeCount = Object.values(enabled).filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Resumen global */}
      <Panel color="#2bff88" delay={0}>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-neon-green/25 blur-xl pulse-soft" />
            <div className="relative w-16 h-16 rounded-full border border-neon-green/40 grid place-items-center bg-neon-green/10">
              <ShieldCheck size={30} className="text-neon-green drop-shadow-[0_0_10px_rgba(43,255,136,0.9)]" />
            </div>
          </div>
          <div className="flex-1 min-w-[180px]">
            <p className="font-tech text-[10px] text-slate-400 tracking-[0.2em]">ESTADO GLOBAL DE PROTECCIÓN</p>
            <p className="font-display font-black text-2xl text-neon-green text-glow leading-tight">SECURITY FABRIC ACTIVO</p>
            <p className="font-tech text-[11px] text-slate-400 mt-0.5">{activeCount}/8 módulos habilitados · Última sincronización hace 12 s</p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <Ring value={96} color="#2bff88" size={64} />
              <p className="font-tech text-[9px] text-slate-400 tracking-widest mt-1">SALUD</p>
            </div>
            <div className="text-center">
              <Ring value={92} color="#00e5ff" size={64} />
              <p className="font-tech text-[9px] text-slate-400 tracking-widest mt-1">COBERTURA</p>
            </div>
          </div>
        </div>
      </Panel>

      {/* Módulos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {modules.map((m, i) => {
          const Icon = m.icon;
          const on = enabled[m.id];
          return (
            <div
              key={m.id}
              className="glass hud-panel rounded-xl p-4 relative overflow-hidden rise hover:-translate-y-1 transition-transform duration-200"
              style={{ ["--hud-color" as string]: on ? m.color : "#334766", opacity: on ? 1 : 0.75, animationDelay: `${0.1 + i * 0.06}s` }}
            >
              <div className="flex items-start justify-between gap-2">
                <div
                  className="w-10 h-10 rounded-lg grid place-items-center border transition-all"
                  style={{
                    borderColor: on ? m.color + "50" : "#33476640",
                    background: on ? m.color + "14" : "#33476615",
                    boxShadow: on ? `0 0 16px ${m.color}30` : "none",
                  }}
                >
                  <Icon size={18} style={{ color: on ? m.color : "#5a719c", filter: on ? `drop-shadow(0 0 6px ${m.color})` : "none" }} />
                </div>
                <Toggle on={on} onChange={(v) => setEnabled((e) => ({ ...e, [m.id]: v }))} color={m.color} />
              </div>
              <p className="font-display text-[12px] font-bold tracking-[0.1em] mt-2.5" style={{ color: on ? m.color : "#5a719c", textShadow: on ? `0 0 10px ${m.color}` : "none" }}>
                {m.name}
              </p>
              <p className="text-[11px] text-slate-400 leading-snug mt-0.5 min-h-[28px]">{m.desc}</p>
              <div className="flex items-center justify-between mt-2 font-tech text-[10px]">
                <span className="text-slate-500">{m.version}</span>
                <NeonBadge color={on ? "#2bff88" : "#5a719c"}>{on ? "ACTIVO" : "INACTIVO"}</NeonBadge>
              </div>
              <div className="mt-2.5 pt-2 border-t border-white/5">
                <div className="flex justify-between text-[10px] font-tech mb-1">
                  <span className="text-slate-400">SALUD</span>
                  <span style={{ color: m.color }}>{on ? m.health : 0}%</span>
                </div>
                <Bar value={on ? m.health : 0} color={m.color} height={4} delay={0.2 + i * 0.05} />
                <p className="font-tech text-[10px] text-slate-500 mt-2">
                  BLOQUEADOS 24H: <span className="text-white tabular-nums">{m.blocked.toLocaleString("es-ES")}</span> {m.unit}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicadores */}
      <Panel color="#00e5ff" title="INDICADORES DE PROTECCIÓN" delay={0.4}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-3">
          {indicators.map((ind, i) => (
            <div key={ind.l}>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-300">{ind.l}</span>
                <span className="font-tech" style={{ color: ind.c }}>{ind.v}%</span>
              </div>
              <Bar value={ind.v} color={ind.c} delay={0.5 + i * 0.08} />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
