import { useState } from "react";
import { BrickWall, ShieldHalf, AppWindow, Globe, UserCog, Plus, GripVertical } from "lucide-react";
import { Panel, NeonBadge, NeonButton, Toggle, thCls, tdCls } from "../components/ui";

type TabId = "fw" | "ips" | "app" | "web" | "perm";

const tabs: { id: TabId; label: string; icon: typeof BrickWall; color: string }[] = [
  { id: "fw", label: "FIREWALL", icon: BrickWall, color: "#2bff88" },
  { id: "ips", label: "REGLAS IPS", icon: ShieldHalf, color: "#2f7bff" },
  { id: "app", label: "APLICACIONES", icon: AppWindow, color: "#b45bff" },
  { id: "web", label: "CONTROL WEB", icon: Globe, color: "#ffd60a" },
  { id: "perm", label: "PERMISOS", icon: UserCog, color: "#ff4dd8" },
];

interface Rule {
  id: string; name: string; src: string; dst: string; action: "PERMITIR" | "DENEGAR" | "MONITOREAR" | "CUARENTENA";
  hits: string; enabled: boolean;
}

const initialRules: Record<TabId, Rule[]> = {
  fw: [
    { id: "FW-01", name: "LAN → WAN Salida general", src: "LAN", dst: "WAN", action: "PERMITIR", hits: "4.2M", enabled: true },
    { id: "FW-02", name: "Bloqueo RDP externo", src: "WAN", dst: "ANY:3389", action: "DENEGAR", hits: "12.4K", enabled: true },
    { id: "FW-03", name: "DMZ Web pública", src: "WAN", dst: "DMZ:443", action: "PERMITIR", hits: "1.8M", enabled: true },
    { id: "FW-04", name: "Bloqueo geo-IP alto riesgo", src: "GEO:BLOCK", dst: "ANY", action: "DENEGAR", hits: "89.1K", enabled: true },
    { id: "FW-05", name: "IoT aislado de LAN", src: "VLAN-IOT", dst: "LAN", action: "DENEGAR", hits: "2.3K", enabled: false },
  ],
  ips: [
    { id: "IPS-01", name: "Exploits críticos (CVE 9.0+)", src: "ANY", dst: "ANY", action: "DENEGAR", hits: "3.2K", enabled: true },
    { id: "IPS-02", name: "Firma Botnet C2", src: "ANY", dst: "WAN", action: "CUARENTENA", hits: "684", enabled: true },
    { id: "IPS-03", name: "Anomalías de protocolo", src: "ANY", dst: "ANY", action: "MONITOREAR", hits: "18.7K", enabled: true },
    { id: "IPS-04", name: "Escaneo de puertos", src: "WAN", dst: "ANY", action: "DENEGAR", hits: "42.9K", enabled: true },
  ],
  app: [
    { id: "APP-01", name: "Bloqueo P2P / Torrent", src: "LAN", dst: "APP:P2P", action: "DENEGAR", hits: "1.1K", enabled: true },
    { id: "APP-02", name: "Streaming limitado (QoS)", src: "LAN", dst: "APP:VIDEO", action: "MONITOREAR", hits: "204K", enabled: true },
    { id: "APP-03", name: "Herramientas remotas no corporativas", src: "LAN", dst: "APP:RAT", action: "DENEGAR", hits: "89", enabled: true },
    { id: "APP-04", name: "SaaS aprobado (M365, CRM)", src: "LAN", dst: "APP:SAAS", action: "PERMITIR", hits: "2.9M", enabled: true },
  ],
  web: [
    { id: "WEB-01", name: "Categoría: Malware / Phishing", src: "ANY", dst: "FGD:MALICIOUS", action: "DENEGAR", hits: "5.1K", enabled: true },
    { id: "WEB-02", name: "Categoría: Adultos / Apuestas", src: "LAN", dst: "FGD:ADULT", action: "DENEGAR", hits: "740", enabled: true },
    { id: "WEB-03", name: "Redes sociales en horario laboral", src: "LAN", dst: "FGD:SOCIAL", action: "MONITOREAR", hits: "96K", enabled: false },
    { id: "WEB-04", name: "Dominios recién registrados", src: "ANY", dst: "FGD:NEWDOMAIN", action: "CUARENTENA", hits: "1.4K", enabled: true },
  ],
  perm: [
    { id: "PRM-01", name: "Administradores — acceso total", src: "GRP:ADMIN", dst: "CONSOLE", action: "PERMITIR", hits: "312", enabled: true },
    { id: "PRM-02", name: "Analistas — solo lectura + informes", src: "GRP:ANALYST", dst: "CONSOLE:RO", action: "PERMITIR", hits: "1.2K", enabled: true },
    { id: "PRM-03", name: "Auditores — logs y reportes", src: "GRP:AUDIT", dst: "LOGS", action: "PERMITIR", hits: "88", enabled: true },
    { id: "PRM-04", name: "Invitados — bloqueo consola", src: "GRP:GUEST", dst: "CONSOLE", action: "DENEGAR", hits: "17", enabled: true },
  ],
};

const actionColor: Record<Rule["action"], string> = {
  PERMITIR: "#2bff88", DENEGAR: "#ff3b5c", MONITOREAR: "#ffd60a", CUARENTENA: "#b45bff",
};

export default function Policies() {
  const [tab, setTab] = useState<TabId>("fw");
  const [rules, setRules] = useState(initialRules);

  const current = tabs.find((t) => t.id === tab)!;
  const list = rules[tab];
  const activeCount = list.filter((r) => r.enabled).length;

  const toggleRule = (id: string, v: boolean) =>
    setRules((r) => ({ ...r, [tab]: r[tab].map((x) => (x.id === id ? { ...x, enabled: v } : x)) }));

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="glass rounded-xl p-1.5 flex flex-wrap gap-1 rise">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg font-tech text-[10px] tracking-[0.15em] transition-all"
              style={{
                color: active ? t.color : "#5a719c",
                background: active ? t.color + "12" : "transparent",
                boxShadow: active ? `0 0 14px ${t.color}25, inset 0 0 14px ${t.color}0d` : "none",
                border: `1px solid ${active ? t.color + "40" : "transparent"}`,
              }}
            >
              <Icon size={13} style={active ? { filter: `drop-shadow(0 0 5px ${t.color})` } : undefined} />
              {t.label}
              <span className="text-[9px] opacity-70">({rules[t.id].filter((r) => r.enabled).length})</span>
            </button>
          );
        })}
      </div>

      <div key={tab} className="rise">
        <Panel color={current.color}
          title={`GESTIÓN DE ${current.label}`}
          right={
            <div className="flex items-center gap-3">
              <span className="font-tech text-[10px] text-slate-500 tracking-widest">
                {activeCount}/{list.length} REGLAS ACTIVAS
              </span>
              <NeonButton color={current.color}><Plus size={11} /> NUEVA REGLA</NeonButton>
            </div>
          }>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr>
                  <th className={thCls}></th><th className={thCls}>ID</th><th className={thCls}>NOMBRE</th>
                  <th className={thCls}>ORIGEN</th><th className={thCls}>DESTINO</th><th className={thCls}>ACCIÓN</th>
                  <th className={thCls}>COINCIDENCIAS</th><th className={thCls}>ESTADO</th>
                </tr>
              </thead>
              <tbody>
                {list.map((r, i) => (
                  <tr key={r.id} className="hover:bg-white/[0.03] transition-colors rise-l"
                    style={{ opacity: r.enabled ? 1 : 0.55, animationDelay: `${i * 0.05}s` }}>
                    <td className={tdCls}><GripVertical size={13} className="text-slate-600 cursor-grab" /></td>
                    <td className={`${tdCls} font-tech`} style={{ color: current.color }}>{r.id}</td>
                    <td className={`${tdCls} font-semibold text-white`}>{r.name}</td>
                    <td className={tdCls}><span className="font-tech text-[11px] px-1.5 py-0.5 rounded bg-cyber-700/50 border border-white/10 text-slate-300">{r.src}</span></td>
                    <td className={tdCls}><span className="font-tech text-[11px] px-1.5 py-0.5 rounded bg-cyber-700/50 border border-white/10 text-slate-300">{r.dst}</span></td>
                    <td className={tdCls}><NeonBadge color={actionColor[r.action]}>{r.action}</NeonBadge></td>
                    <td className={`${tdCls} font-tech text-slate-300 tabular-nums`}>{r.hits}</td>
                    <td className={tdCls}><Toggle on={r.enabled} onChange={(v) => toggleRule(r.id, v)} color={current.color} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-tech text-[9px] text-slate-600 tracking-widest mt-3">
            // LAS REGLAS SE EVALÚAN EN ORDEN DESCENDENTE · ARRASTRA PARA REORDENAR · ÚLTIMA SINCRONIZACIÓN: HACE 8 S
          </p>
        </Panel>
      </div>
    </div>
  );
}
