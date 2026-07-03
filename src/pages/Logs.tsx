import { useMemo, useState } from "react";
import { Search, FileDown, FileSpreadsheet, ScrollText, Filter, CalendarRange, Database } from "lucide-react";
import { Panel, NeonBadge, NeonButton, StatChip, inputCls, thCls, tdCls } from "../components/ui";
import { severityColor, type Severity } from "../data/mock";

interface LogRow {
  ts: string; fecha: string; modulo: string; severidad: Severity; origen: string; evento: string;
}

const MODULES = ["TODOS", "FIREWALL", "IPS", "ANTIVIRUS", "WEBFILTER", "VPN", "SISTEMA"] as const;
const SEVS = ["TODAS", "CRÍTICO", "ALTO", "MEDIO", "BAJO"] as const;

const logs: LogRow[] = [
  { ts: "11:24:03", fecha: "20/05", modulo: "ANTIVIRUS", severidad: "CRÍTICO", origen: "10.0.2.122", evento: "Ransomware.LockBit detectado y puesto en cuarentena" },
  { ts: "11:23:41", fecha: "20/05", modulo: "WEBFILTER", severidad: "MEDIO", origen: "10.0.2.87", evento: "URL bloqueada: categoría Malicious Websites" },
  { ts: "11:22:47", fecha: "20/05", modulo: "IPS", severidad: "CRÍTICO", origen: "198.51.100.23", evento: "Exploit CVE-2023-23397 bloqueado en MAIL-GW" },
  { ts: "11:21:19", fecha: "20/05", modulo: "FIREWALL", severidad: "BAJO", origen: "10.0.3.44", evento: "Política 27: tráfico denegado puerto 3389" },
  { ts: "11:20:15", fecha: "20/05", modulo: "WEBFILTER", severidad: "ALTO", origen: "10.0.2.87", evento: "Intento de acceso a dominio de phishing bloqueado" },
  { ts: "11:18:33", fecha: "20/05", modulo: "VPN", severidad: "BAJO", origen: "84.120.11.9", evento: "Túnel SSL-VPN establecido: usuario jperez" },
  { ts: "11:17:52", fecha: "20/05", modulo: "IPS", severidad: "ALTO", origen: "203.0.113.199", evento: "Firma Botnet.Mirai.Beacon coincidente — sesión terminada" },
  { ts: "11:14:30", fecha: "20/05", modulo: "SISTEMA", severidad: "MEDIO", origen: "FW-EDGE-01", evento: "Uso de CPU superó el 80% durante 5 minutos" },
  { ts: "11:11:08", fecha: "20/05", modulo: "FIREWALL", severidad: "MEDIO", origen: "192.0.2.140", evento: "SQLi detectado por WAF — solicitud descartada" },
  { ts: "11:08:44", fecha: "20/05", modulo: "IPS", severidad: "BAJO", origen: "203.0.113.12", evento: "Escaneo de puertos TCP detectado y registrado" },
  { ts: "11:05:21", fecha: "20/05", modulo: "FIREWALL", severidad: "ALTO", origen: "198.51.100.77", evento: "Fuerza bruta SSH: IP bloqueada por umbral" },
  { ts: "11:02:10", fecha: "20/05", modulo: "SISTEMA", severidad: "BAJO", origen: "FG100F", evento: "Copia de seguridad de configuración completada" },
];

export default function Logs() {
  const [q, setQ] = useState("");
  const [mod, setMod] = useState<(typeof MODULES)[number]>("TODOS");
  const [sev, setSev] = useState<(typeof SEVS)[number]>("TODAS");
  const [from, setFrom] = useState("2024-05-14");
  const [to, setTo] = useState("2024-05-20");
  const [exporting, setExporting] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      logs.filter(
        (l) =>
          (mod === "TODOS" || l.modulo === mod) &&
          (sev === "TODAS" || l.severidad === sev) &&
          (l.evento.toLowerCase().includes(q.toLowerCase()) || l.origen.includes(q))
      ),
    [q, mod, sev]
  );

  const doExport = (fmt: string) => {
    setExporting(fmt);
    setTimeout(() => setExporting(null), 1800);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <StatChip label="EVENTOS 24H" value="48.2 K" color="#00e5ff" icon={<ScrollText size={16} className="text-neon-cyan" />} />
        <StatChip label="EVENTOS FILTRADOS" value={String(filtered.length)} color="#b45bff" icon={<Filter size={16} className="text-neon-purple" />} />
        <StatChip label="ALMACENAMIENTO LOGS" value="1.8 TB" color="#2f7bff" icon={<Database size={16} className="text-neon-blue" />} />
        <StatChip label="RETENCIÓN" value="365 días" color="#2bff88" icon={<CalendarRange size={16} className="text-neon-green" />} />
      </div>

      <Panel color="#00e5ff" title="FILTROS AVANZADOS" delay={0.1}>
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[200px]">
            <p className="font-tech text-[9px] text-slate-400 tracking-[0.2em] mb-1">BÚSQUEDA</p>
            <div className="relative">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar en eventos, IP…" className={`${inputCls} pl-7 w-full`} />
            </div>
          </div>
          <div>
            <p className="font-tech text-[9px] text-slate-400 tracking-[0.2em] mb-1">MÓDULO</p>
            <select value={mod} onChange={(e) => setMod(e.target.value as typeof mod)} className={inputCls}>
              {MODULES.map((m) => <option key={m} className="bg-cyber-900">{m}</option>)}
            </select>
          </div>
          <div>
            <p className="font-tech text-[9px] text-slate-400 tracking-[0.2em] mb-1">SEVERIDAD</p>
            <select value={sev} onChange={(e) => setSev(e.target.value as typeof sev)} className={inputCls}>
              {SEVS.map((s) => <option key={s} className="bg-cyber-900">{s}</option>)}
            </select>
          </div>
          <div>
            <p className="font-tech text-[9px] text-slate-400 tracking-[0.2em] mb-1">DESDE</p>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className={inputCls} />
          </div>
          <div>
            <p className="font-tech text-[9px] text-slate-400 tracking-[0.2em] mb-1">HASTA</p>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className={inputCls} />
          </div>
          <div className="flex gap-2">
            <NeonButton color="#ff3b5c" onClick={() => doExport("pdf")} disabled={exporting !== null}>
              <FileDown size={11} /> {exporting === "pdf" ? "GENERANDO…" : "PDF"}
            </NeonButton>
            <NeonButton color="#2bff88" onClick={() => doExport("xlsx")} disabled={exporting !== null}>
              <FileSpreadsheet size={11} /> {exporting === "xlsx" ? "GENERANDO…" : "EXCEL"}
            </NeonButton>
          </div>
        </div>
      </Panel>

      <Panel color="#b45bff" delay={0.2}
        title="REGISTRO DE EVENTOS"
        right={
          <span className="font-tech text-[10px] text-slate-500 tracking-widest">
            {filtered.length} EVENTOS · {from} → {to}
          </span>
        }>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr>
                <th className={thCls}>HORA</th><th className={thCls}>FECHA</th><th className={thCls}>MÓDULO</th>
                <th className={thCls}>SEVERIDAD</th><th className={thCls}>ORIGEN</th><th className={thCls}>EVENTO</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l, i) => (
                <tr key={l.ts + l.evento} className="hover:bg-neon-purple/5 transition-colors rise-l" style={{ animationDelay: `${0.25 + i * 0.03}s` }}>
                  <td className={`${tdCls} font-tech text-slate-400`}>{l.ts}</td>
                  <td className={`${tdCls} font-tech text-slate-500`}>{l.fecha}</td>
                  <td className={tdCls}><NeonBadge color="#00e5ff">{l.modulo}</NeonBadge></td>
                  <td className={tdCls}><NeonBadge color={severityColor[l.severidad]}>{l.severidad}</NeonBadge></td>
                  <td className={`${tdCls} font-tech text-neon-cyan`}>{l.origen}</td>
                  <td className={`${tdCls} whitespace-normal min-w-[260px] text-slate-200`}>{l.evento}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 font-tech text-[12px] text-slate-500 tracking-widest">
                    // SIN EVENTOS PARA LOS FILTROS APLICADOS
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
