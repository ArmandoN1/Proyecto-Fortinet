import { useState } from "react";
import {
  Users, Bell, Plug, KeyRound, Shield, DatabaseBackup, Plus,
  Copy, RefreshCw, Sun, Moon, CheckCircle2, HardDriveDownload,
} from "lucide-react";
import { Panel, NeonBadge, NeonButton, Toggle, Bar, thCls, tdCls } from "../components/ui";

const users = [
  { u: "admin", nombre: "Administrador Principal", rol: "SUPER ADMIN", rc: "#ff3b5c", last: "Ahora", estado: "ACTIVO" },
  { u: "jperez", nombre: "Juan Pérez", rol: "ANALISTA SOC", rc: "#00e5ff", last: "Hace 12 min", estado: "ACTIVO" },
  { u: "mgarcia", nombre: "María García", rol: "ANALISTA SOC", rc: "#00e5ff", last: "Hace 1 h", estado: "ACTIVO" },
  { u: "auditor1", nombre: "Auditoría Externa", rol: "AUDITOR", rc: "#ffd60a", last: "Hace 3 días", estado: "SUSPENDIDO" },
  { u: "soporte", nombre: "Mesa de Ayuda", rol: "SOLO LECTURA", rc: "#2bff88", last: "Hace 2 h", estado: "ACTIVO" },
];

const integrations = [
  { n: "FortiAnalyzer", d: "Correlación y almacenamiento de logs", on: true, c: "#ff3b5c" },
  { n: "Microsoft Sentinel", d: "SIEM en la nube — exportación CEF", on: true, c: "#00e5ff" },
  { n: "Slack / Teams", d: "Alertas en canales del SOC", on: true, c: "#b45bff" },
  { n: "ServiceNow", d: "Creación automática de tickets", on: false, c: "#2bff88" },
  { n: "VirusTotal", d: "Enriquecimiento de IoCs", on: true, c: "#ffd60a" },
  { n: "MISP", d: "Inteligencia de amenazas compartida", on: false, c: "#ff9f1c" },
];

const notifDefs = [
  { k: "critical", l: "Alertas críticas (push + correo + SMS)", def: true },
  { k: "daily", l: "Resumen diario por correo", def: true },
  { k: "sims", l: "Resultados de simulaciones", def: true },
  { k: "updates", l: "Actualizaciones de firmas y firmware", def: false },
  { k: "reports", l: "Informes semanales para gerencia", def: true },
];

export default function Settings() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [notifs, setNotifs] = useState<Record<string, boolean>>(
    Object.fromEntries(notifDefs.map((n) => [n.k, n.def]))
  );
  const [ints, setInts] = useState<Record<string, boolean>>(
    Object.fromEntries(integrations.map((i) => [i.n, i.on]))
  );
  const [copied, setCopied] = useState(false);
  const [backupRunning, setBackupRunning] = useState(false);

  const copyKey = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const runBackup = () => {
    setBackupRunning(true);
    setTimeout(() => setBackupRunning(false), 2500);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-4">
        {/* Usuarios */}
        <Panel color="#00e5ff" delay={0} className="2xl:col-span-2 overflow-x-auto"
          title="GESTIÓN DE USUARIOS"
          right={<NeonButton color="#00e5ff"><Plus size={11} /> NUEVO USUARIO</NeonButton>}>
          <table className="w-full min-w-[640px]">
            <thead>
              <tr>
                <th className={thCls}>USUARIO</th><th className={thCls}>NOMBRE</th><th className={thCls}>ROL</th>
                <th className={thCls}>ÚLTIMO ACCESO</th><th className={thCls}>ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.u} className="hover:bg-neon-cyan/5 transition-colors rise-l" style={{ animationDelay: `${i * 0.06}s` }}>
                  <td className={tdCls}>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neon-cyan/40 to-neon-purple/40 border border-neon-cyan/40 grid place-items-center">
                        <Users size={12} className="text-neon-cyan" />
                      </div>
                      <span className="font-tech text-neon-cyan">{u.u}</span>
                    </div>
                  </td>
                  <td className={`${tdCls} text-white font-semibold`}>{u.nombre}</td>
                  <td className={tdCls}><NeonBadge color={u.rc}>{u.rol}</NeonBadge></td>
                  <td className={`${tdCls} font-tech text-slate-400`}>{u.last}</td>
                  <td className={tdCls}>
                    <NeonBadge color={u.estado === "ACTIVO" ? "#2bff88" : "#5a719c"}>{u.estado}</NeonBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="font-tech text-[9px] text-slate-600 tracking-widest mt-3">
            // ROLES DISPONIBLES: SUPER ADMIN · ANALISTA SOC · AUDITOR · SOLO LECTURA — MFA OBLIGATORIO PARA ROLES PRIVILEGIADOS
          </p>
        </Panel>

        {/* Apariencia + Notificaciones */}
        <div className="space-y-4">
          <Panel color="#b45bff" title="APARIENCIA" delay={0.1}>
            <div className="flex gap-2">
              <button
                onClick={() => setTheme("dark")}
                className="flex-1 rounded-xl p-3 border transition-all text-center"
                style={{
                  borderColor: theme === "dark" ? "#b45bff60" : "#1a2f55",
                  background: theme === "dark" ? "#b45bff12" : "transparent",
                  boxShadow: theme === "dark" ? "0 0 16px rgba(180,91,255,0.2)" : "none",
                }}
              >
                <Moon size={18} className="mx-auto mb-1.5" style={{ color: theme === "dark" ? "#b45bff" : "#5a719c" }} />
                <p className="font-tech text-[10px] tracking-widest" style={{ color: theme === "dark" ? "#b45bff" : "#5a719c" }}>OSCURO FUTURISTA</p>
                {theme === "dark" && <NeonBadge color="#2bff88">ACTIVO</NeonBadge>}
              </button>
              <button
                onClick={() => setTheme("light")}
                className="flex-1 rounded-xl p-3 border transition-all text-center"
                style={{
                  borderColor: theme === "light" ? "#ffd60a60" : "#1a2f55",
                  background: theme === "light" ? "#ffd60a12" : "transparent",
                }}
              >
                <Sun size={18} className="mx-auto mb-1.5" style={{ color: theme === "light" ? "#ffd60a" : "#5a719c" }} />
                <p className="font-tech text-[10px] tracking-widest" style={{ color: theme === "light" ? "#ffd60a" : "#5a719c" }}>CLARO</p>
                {theme === "light" && <NeonBadge color="#ffd60a">PRÓXIMAMENTE</NeonBadge>}
              </button>
            </div>
            {theme === "light" && (
              <p className="font-tech text-[9px] text-neon-yellow/80 tracking-widest mt-2">
                ⚠ EL MODO CLARO ESTARÁ DISPONIBLE EN LA v7.5 — SE MANTIENE EL TEMA OSCURO
              </p>
            )}
          </Panel>

          <Panel color="#ffd60a" title="NOTIFICACIONES" delay={0.15}
            right={<Bell size={13} className="text-neon-yellow" />}>
            <div className="space-y-2.5">
              {notifDefs.map((n) => (
                <div key={n.k} className="flex items-center gap-3">
                  <p className="text-[11.5px] text-slate-300 flex-1">{n.l}</p>
                  <Toggle on={notifs[n.k]} onChange={(v) => setNotifs((x) => ({ ...x, [n.k]: v }))} color="#ffd60a" />
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-4">
        {/* Integraciones */}
        <Panel color="#2bff88" title="INTEGRACIONES" delay={0.2}
          right={<Plug size={13} className="text-neon-green" />}>
          <div className="space-y-2">
            {integrations.map((it, i) => (
              <div key={it.n} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-cyber-800/50 border border-white/5 rise"
                style={{ animationDelay: `${0.25 + i * 0.05}s` }}>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: ints[it.n] ? it.c : "#334766", boxShadow: ints[it.n] ? `0 0 6px ${it.c}` : "none" }} />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-bold text-white leading-tight">{it.n}</p>
                  <p className="text-[10.5px] text-slate-500 leading-tight truncate">{it.d}</p>
                </div>
                <Toggle on={ints[it.n]} onChange={(v) => setInts((x) => ({ ...x, [it.n]: v }))} color={it.c} />
              </div>
            ))}
          </div>
        </Panel>

        {/* API */}
        <Panel color="#00e5ff" title="APIs Y CLAVES" delay={0.25}
          right={<KeyRound size={13} className="text-neon-cyan" />}>
          <div className="rounded-lg bg-cyber-800/60 border border-neon-cyan/15 p-3">
            <p className="font-tech text-[9px] text-slate-400 tracking-[0.2em] mb-1">API KEY — REST v2</p>
            <div className="flex items-center gap-2">
              <code className="font-tech text-[11px] text-neon-cyan truncate flex-1">fgt_sk_9f2e••••••••••••b7a1</code>
              <button onClick={copyKey} className="p-1.5 rounded-md border border-neon-cyan/25 text-neon-cyan hover:bg-neon-cyan/10 transition-colors">
                {copied ? <CheckCircle2 size={12} className="text-neon-green" /> : <Copy size={12} />}
              </button>
              <button className="p-1.5 rounded-md border border-neon-cyan/25 text-neon-cyan hover:bg-neon-cyan/10 transition-colors">
                <RefreshCw size={12} />
              </button>
            </div>
          </div>
          <div className="mt-3 space-y-2 font-tech text-[10.5px]">
            <div className="flex justify-between"><span className="text-slate-400">LÍMITE DE PETICIONES</span><span className="text-white">10.000 / h</span></div>
            <div className="flex justify-between"><span className="text-slate-400">USO ACTUAL</span><span className="text-neon-cyan">3.412 / h</span></div>
            <Bar value={34} color="#00e5ff" height={4} delay={0.4} />
            <div className="flex justify-between pt-1"><span className="text-slate-400">WEBHOOKS ACTIVOS</span><span className="text-white">4</span></div>
            <div className="flex justify-between"><span className="text-slate-400">VERSIÓN API</span><span className="text-neon-green">v2.4 · ESTABLE</span></div>
          </div>
        </Panel>

        {/* Seguridad + Respaldos */}
        <div className="space-y-4">
          <Panel color="#ff3b5c" title="SEGURIDAD DE LA CONSOLA" delay={0.3}
            right={<Shield size={13} className="text-neon-red" />}>
            <div className="space-y-2 font-tech text-[10.5px]">
              {[
                { l: "MFA obligatorio", v: "ACTIVO", c: "#2bff88" },
                { l: "Tiempo de sesión", v: "15 MIN", c: "#00e5ff" },
                { l: "IPs de administración", v: "3 PERMITIDAS", c: "#00e5ff" },
                { l: "Certificado TLS", v: "VÁLIDO · 240 DÍAS", c: "#2bff88" },
                { l: "Última auditoría", v: "02 MAY 2024", c: "#ffd60a" },
              ].map((r) => (
                <div key={r.l} className="flex justify-between items-center py-1 border-b border-white/5 last:border-0">
                  <span className="text-slate-400">{r.l}</span>
                  <NeonBadge color={r.c}>{r.v}</NeonBadge>
                </div>
              ))}
            </div>
          </Panel>

          <Panel color="#b45bff" title="RESPALDOS" delay={0.35}
            right={<DatabaseBackup size={13} className="text-neon-purple" />}>
            <div className="flex items-center justify-between font-tech text-[10.5px] mb-2">
              <span className="text-slate-400">ÚLTIMO RESPALDO</span>
              <span className="text-white">HOY 03:00 · OK</span>
            </div>
            <div className="flex items-center justify-between font-tech text-[10.5px] mb-3">
              <span className="text-slate-400">PROGRAMACIÓN</span>
              <span className="text-neon-purple">DIARIO · RETENCIÓN 30D</span>
            </div>
            <NeonButton color="#b45bff" className="w-full" onClick={runBackup} disabled={backupRunning}>
              <HardDriveDownload size={11} />
              {backupRunning ? "RESPALDANDO CONFIGURACIÓN…" : "EJECUTAR RESPALDO AHORA"}
            </NeonButton>
            {backupRunning && <div className="mt-2"><Bar value={100} color="#b45bff" height={4} /></div>}
          </Panel>
        </div>
      </div>
    </div>
  );
}
