import { useState } from "react";
import {
  Server, Laptop, Router, Camera, Smartphone, Search,
  MonitorSmartphone, Wifi, WifiOff, AlertTriangle,
} from "lucide-react";
import { Panel, NeonBadge, Bar, StatChip, inputCls, thCls, tdCls } from "../components/ui";

type DevStatus = "EN LÍNEA" | "ADVERTENCIA" | "CRÍTICO" | "OFFLINE";

interface Device {
  name: string; tipo: string; icon: typeof Server; ip: string; os: string;
  cpu: number; ram: number; traffic: string; status: DevStatus;
}

const devices: Device[] = [
  { name: "SRV-FILES-01", tipo: "Servidor", icon: Server, ip: "10.0.1.11", os: "Windows Server 2022", cpu: 62, ram: 71, traffic: "412 Mbps", status: "EN LÍNEA" },
  { name: "SRV-DB-02", tipo: "Servidor", icon: Server, ip: "10.0.1.12", os: "Ubuntu 22.04 LTS", cpu: 78, ram: 84, traffic: "820 Mbps", status: "ADVERTENCIA" },
  { name: "FW-EDGE-01", tipo: "Firewall", icon: Router, ip: "10.0.0.1", os: "FortiOS 7.4.3", cpu: 41, ram: 58, traffic: "1.4 Gbps", status: "EN LÍNEA" },
  { name: "SW-CORE-01", tipo: "Switch", icon: Router, ip: "10.0.0.2", os: "FortiSwitchOS 7.4", cpu: 22, ram: 31, traffic: "2.1 Gbps", status: "EN LÍNEA" },
  { name: "WS-ADMIN-14", tipo: "Workstation", icon: Laptop, ip: "10.0.2.114", os: "Windows 11 Pro", cpu: 35, ram: 52, traffic: "38 Mbps", status: "EN LÍNEA" },
  { name: "WS-FIN-22", tipo: "Workstation", icon: Laptop, ip: "10.0.2.122", os: "Windows 10 Pro", cpu: 91, ram: 88, traffic: "12 Mbps", status: "CRÍTICO" },
  { name: "IOT-CAM-14", tipo: "Cámara IP", icon: Camera, ip: "10.0.4.14", os: "Firmware 2.1.8", cpu: 18, ram: 24, traffic: "6 Mbps", status: "ADVERTENCIA" },
  { name: "MOB-CEO-01", tipo: "Móvil", icon: Smartphone, ip: "10.0.5.31", os: "iOS 17.5", cpu: 12, ram: 40, traffic: "3 Mbps", status: "EN LÍNEA" },
  { name: "SRV-BCK-03", tipo: "Servidor", icon: Server, ip: "10.0.1.13", os: "Debian 12", cpu: 8, ram: 22, traffic: "0 Mbps", status: "OFFLINE" },
  { name: "AP-PISO2-04", tipo: "Access Point", icon: Wifi, ip: "10.0.0.24", os: "FortiAP 7.4", cpu: 15, ram: 28, traffic: "96 Mbps", status: "EN LÍNEA" },
];

const stColor: Record<DevStatus, string> = {
  "EN LÍNEA": "#2bff88", ADVERTENCIA: "#ffd60a", CRÍTICO: "#ff3b5c", OFFLINE: "#5a719c",
};

const barColor = (v: number) => (v > 85 ? "#ff3b5c" : v > 70 ? "#ffd60a" : "#00e5ff");

export default function Devices() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"TODOS" | DevStatus>("TODOS");

  const list = devices.filter(
    (d) =>
      (filter === "TODOS" || d.status === filter) &&
      (d.name.toLowerCase().includes(q.toLowerCase()) || d.ip.includes(q) || d.os.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <StatChip label="TOTAL DISPOSITIVOS" value="2.450" color="#2f7bff" icon={<MonitorSmartphone size={16} className="text-neon-blue" />} />
        <StatChip label="EN LÍNEA" value="2.215" color="#2bff88" icon={<Wifi size={16} className="text-neon-green" />} />
        <StatChip label="CON ADVERTENCIAS" value="143" color="#ffd60a" icon={<AlertTriangle size={16} className="text-neon-yellow" />} />
        <StatChip label="OFFLINE / CRÍTICOS" value="92" color="#ff3b5c" icon={<WifiOff size={16} className="text-neon-red" />} />
      </div>

      <Panel color="#2f7bff" delay={0.1}
        title="INVENTARIO DE EQUIPOS"
        right={
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar por nombre, IP, OS…"
                className={`${inputCls} pl-7 w-52`}
              />
            </div>
            {(["TODOS", "EN LÍNEA", "ADVERTENCIA", "CRÍTICO", "OFFLINE"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="font-tech text-[9px] px-2 py-1 rounded tracking-widest transition-all border"
                style={{
                  color: filter === f ? (f === "TODOS" ? "#00e5ff" : stColor[f as DevStatus]) : "#5a719c",
                  borderColor: filter === f ? (f === "TODOS" ? "#00e5ff50" : stColor[f as DevStatus] + "50") : "#1a2f55",
                  background: filter === f ? (f === "TODOS" ? "#00e5ff10" : stColor[f as DevStatus] + "10") : "transparent",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        }>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px]">
            <thead>
              <tr>
                <th className={thCls}>DISPOSITIVO</th><th className={thCls}>IP</th><th className={thCls}>SISTEMA OPERATIVO</th>
                <th className={thCls}>CPU</th><th className={thCls}>RAM</th><th className={thCls}>TRÁFICO</th><th className={thCls}>ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {list.map((d, i) => {
                const Icon = d.icon;
                const c = stColor[d.status];
                return (
                  <tr key={d.name} className="hover:bg-neon-blue/5 transition-colors rise-l" style={{ animationDelay: `${0.15 + i * 0.04}s` }}>
                    <td className={tdCls}>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg grid place-items-center border shrink-0" style={{ borderColor: c + "40", background: c + "10" }}>
                          <Icon size={14} style={{ color: c, filter: `drop-shadow(0 0 4px ${c})` }} />
                        </div>
                        <div>
                          <p className="font-tech text-[12px] text-white font-bold leading-tight">{d.name}</p>
                          <p className="font-tech text-[9px] text-slate-500 tracking-widest">{d.tipo.toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className={`${tdCls} font-tech text-neon-cyan`}>{d.ip}</td>
                    <td className={tdCls}>{d.os}</td>
                    <td className={tdCls}>
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <Bar value={d.cpu} color={barColor(d.cpu)} height={4} delay={0.2 + i * 0.04} />
                        <span className="font-tech text-[11px] tabular-nums" style={{ color: barColor(d.cpu) }}>{d.cpu}%</span>
                      </div>
                    </td>
                    <td className={tdCls}>
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <Bar value={d.ram} color={barColor(d.ram)} height={4} delay={0.25 + i * 0.04} />
                        <span className="font-tech text-[11px] tabular-nums" style={{ color: barColor(d.ram) }}>{d.ram}%</span>
                      </div>
                    </td>
                    <td className={`${tdCls} font-tech text-slate-300`}>{d.traffic}</td>
                    <td className={tdCls}>
                      <span className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${d.status !== "OFFLINE" ? "pulse-soft" : ""}`} style={{ background: c, boxShadow: `0 0 6px ${c}` }} />
                        <NeonBadge color={c}>{d.status}</NeonBadge>
                      </span>
                    </td>
                  </tr>
                );
              })}
              {list.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 font-tech text-[12px] text-slate-500 tracking-widest">
                    // SIN RESULTADOS PARA LOS FILTROS APLICADOS
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
