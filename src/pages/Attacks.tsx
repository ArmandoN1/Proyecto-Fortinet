import { Bar as RBar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Crosshair, ShieldBan, Radar as RadarIcon, Globe2 } from "lucide-react";
import { Panel, NeonBadge, StatChip, thCls, tdCls } from "../components/ui";
import ThreatMap from "../components/ThreatMap";
import Timeline from "../components/Timeline";
import { severityColor, type Severity } from "../data/mock";

interface AttackRow {
  time: string; ip: string; country: string; type: string; target: string;
  severity: Severity; status: "BLOQUEADO" | "CONTENIDO" | "ANALIZANDO" | "MITIGADO";
}

const rows: AttackRow[] = [
  { time: "11:24:03", ip: "203.0.113.45", country: "China", type: "Ransomware.LockBit", target: "SRV-FILES-01", severity: "CRÍTICO", status: "CONTENIDO" },
  { time: "11:22:47", ip: "198.51.100.23", country: "Rusia", type: "Exploit.CVE-2023-23397", target: "MAIL-GW", severity: "CRÍTICO", status: "BLOQUEADO" },
  { time: "11:20:15", ip: "192.0.2.87", country: "EE.UU.", type: "Phishing.CredHarvest", target: "USR-2201", severity: "ALTO", status: "BLOQUEADO" },
  { time: "11:17:52", ip: "203.0.113.199", country: "Brasil", type: "Botnet.Mirai", target: "IOT-CAM-14", severity: "ALTO", status: "MITIGADO" },
  { time: "11:14:30", ip: "198.51.100.6", country: "Irán", type: "APT.Recon", target: "DMZ-WEB-02", severity: "ALTO", status: "ANALIZANDO" },
  { time: "11:11:08", ip: "192.0.2.140", country: "India", type: "SQLi.Union", target: "APP-PORTAL", severity: "MEDIO", status: "BLOQUEADO" },
  { time: "11:08:44", ip: "203.0.113.12", country: "Alemania", type: "PortScan.TCP", target: "FW-EDGE", severity: "BAJO", status: "BLOQUEADO" },
  { time: "11:05:21", ip: "198.51.100.77", country: "Corea del Sur", type: "BruteForce.SSH", target: "SRV-JUMP", severity: "MEDIO", status: "BLOQUEADO" },
];

const statusColor: Record<AttackRow["status"], string> = {
  BLOQUEADO: "#2bff88", CONTENIDO: "#b45bff", ANALIZANDO: "#ffd60a", MITIGADO: "#00e5ff",
};

const byType = [
  { name: "Malware", v: 286, c: "#ff3b5c" },
  { name: "Intrusión", v: 254, c: "#ff9f1c" },
  { name: "Web", v: 198, c: "#ffd60a" },
  { name: "Phishing", v: 162, c: "#2bff88" },
  { name: "Ransom", v: 118, c: "#b45bff" },
  { name: "DDoS", v: 94, c: "#00e5ff" },
];

const bySeverity = [
  { name: "Crítico", value: 231, color: "#ff3b5c" },
  { name: "Alto", value: 332, color: "#ff9f1c" },
  { name: "Medio", value: 405, color: "#ffd60a" },
  { name: "Bajo", value: 121, color: "#2bff88" },
];

const tooltipStyle = {
  background: "rgba(10, 18, 38, 0.95)", border: "1px solid rgba(0,229,255,0.3)",
  borderRadius: 8, fontSize: 11, fontFamily: "'Share Tech Mono', monospace", color: "#d7e4ff",
};

export default function Attacks() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <StatChip label="ATAQUES HOY" value="512" color="#ff3b5c" icon={<Crosshair size={16} className="text-neon-red" />} />
        <StatChip label="BLOQUEADOS" value="497" color="#2bff88" icon={<ShieldBan size={16} className="text-neon-green" />} />
        <StatChip label="EN ANÁLISIS" value="9" color="#ffd60a" icon={<RadarIcon size={16} className="text-neon-yellow pulse-soft" />} />
        <StatChip label="PAÍSES ORIGEN" value="76" color="#00e5ff" icon={<Globe2 size={16} className="text-neon-cyan" />} />
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-4">
        <div className="2xl:col-span-2">
          <ThreatMap />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Panel color="#ff9f1c" title="ATAQUES POR TIPO" delay={0.2}>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byType} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <CartesianGrid stroke="#1a2f55" strokeDasharray="3 6" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "#5a719c", fontSize: 9, fontFamily: "'Share Tech Mono', monospace" }} axisLine={{ stroke: "#1a2f55" }} tickLine={false} />
                  <YAxis tick={{ fill: "#5a719c", fontSize: 9, fontFamily: "'Share Tech Mono', monospace" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(0,229,255,0.05)" }} />
                  <RBar dataKey="v" name="Ataques" radius={[4, 4, 0, 0]}>
                    {byType.map((d) => (
                      <Cell key={d.name} fill={d.c} style={{ filter: `drop-shadow(0 0 4px ${d.c}80)` }} />
                    ))}
                  </RBar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel color="#ff3b5c" title="POR SEVERIDAD" delay={0.3}>
            <div className="flex items-center gap-3">
              <div className="relative w-32 h-32 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={bySeverity} dataKey="value" innerRadius={40} outerRadius={56} paddingAngle={3} startAngle={90} endAngle={-270} stroke="none">
                      {bySeverity.map((d) => (
                        <Cell key={d.name} fill={d.color} style={{ filter: `drop-shadow(0 0 5px ${d.color}90)` }} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 grid place-items-center pointer-events-none">
                  <div className="text-center">
                    <p className="font-display font-black text-lg text-white leading-none">1.089</p>
                    <p className="font-tech text-[8px] text-slate-500 tracking-widest">TOTAL</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-1.5">
                {bySeverity.map((d) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-[2px]" style={{ background: d.color, boxShadow: `0 0 6px ${d.color}` }} />
                    <span className="text-[11px] text-slate-300 flex-1">{d.name}</span>
                    <span className="font-tech text-[11px] text-white tabular-nums">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-4">
        <Panel color="#ff3b5c" delay={0.35} className="2xl:col-span-2 overflow-x-auto"
          title="ATAQUES DETECTADOS"
          right={
            <span className="flex items-center gap-1.5 font-tech text-[11px] text-neon-red tracking-widest">
              <span className="w-2 h-2 rounded-full bg-neon-red pulse-soft shadow-[0_0_8px_#ff3b5c]" /> LIVE FEED
            </span>
          }>
          <table className="w-full min-w-[720px]">
            <thead>
              <tr>
                <th className={thCls}>HORA</th><th className={thCls}>IP ORIGEN</th><th className={thCls}>PAÍS</th>
                <th className={thCls}>TIPO</th><th className={thCls}>OBJETIVO</th><th className={thCls}>SEVERIDAD</th><th className={thCls}>ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.time + r.ip} className="hover:bg-neon-red/5 transition-colors rise-l" style={{ animationDelay: `${0.4 + i * 0.05}s` }}>
                  <td className={`${tdCls} font-tech text-slate-400`}>{r.time}</td>
                  <td className={`${tdCls} font-tech text-neon-cyan`}>{r.ip}</td>
                  <td className={tdCls}>{r.country}</td>
                  <td className={`${tdCls} font-semibold text-white font-tech`}>{r.type}</td>
                  <td className={`${tdCls} font-tech text-slate-400`}>{r.target}</td>
                  <td className={tdCls}><NeonBadge color={severityColor[r.severity]}>{r.severity}</NeonBadge></td>
                  <td className={tdCls}><NeonBadge color={statusColor[r.status]}>{r.status}</NeonBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Timeline />
      </div>
    </div>
  );
}
