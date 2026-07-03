import { Component, useEffect, useState, type ReactNode } from "react";
import { ShieldAlert, X } from "lucide-react";
import Particles from "./components/Particles";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Login from "./pages/Login";
import Overview from "./pages/Overview";
import Simulations from "./pages/Simulations";
import Attacks from "./pages/Attacks";
import Protection from "./pages/Protection";
import Prevention from "./pages/Prevention";
import Devices from "./pages/Devices";
import Logs from "./pages/Logs";
import AIAnalysis from "./pages/AIAnalysis";
import Policies from "./pages/Policies";
import Objectives from "./pages/Objectives";
import Executive from "./pages/Executive";
import Settings from "./pages/Settings";
import { useLiveStats } from "./hooks/useLive";

const ALERTS = [
  "Ransomware.LockBit contenido en VLAN-12",
  "Intento de intrusión bloqueado desde 185.220.x.x",
  "Firma IPS actualizada: 27.442",
  "Phishing masivo neutralizado · 42 correos",
  "Exfiltración de datos bloqueada · DLP",
];

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  resumen: { title: "SIMULACIONES", subtitle: "PROTECCIÓN, ATAQUES Y PREVENCIÓN" },
  simulaciones: { title: "SIMULACIONES", subtitle: "CATÁLOGO, EJECUCIÓN Y RESULTADOS" },
  ataques: { title: "ATAQUES", subtitle: "DETECCIÓN, ORIGEN E INCIDENTES EN TIEMPO REAL" },
  proteccion: { title: "PROTECCIÓN", subtitle: "MÓDULOS DEL SECURITY FABRIC" },
  prevencion: { title: "PREVENCIÓN", subtitle: "RIESGO, BUENAS PRÁCTICAS Y ACCIONES IA" },
  dispositivos: { title: "DISPOSITIVOS", subtitle: "INVENTARIO Y ESTADO DE LA RED" },
  logs: { title: "LOGS Y REPORTES", subtitle: "REGISTRO DE EVENTOS Y EXPORTACIÓN" },
  ia: { title: "ANÁLISIS IA", subtitle: "PREDICCIÓN, ANOMALÍAS Y RECOMENDACIONES" },
  politicas: { title: "POLÍTICAS", subtitle: "REGLAS DE FIREWALL, IPS Y CONTROL DE ACCESO" },
  objetivos: { title: "OBJETIVOS", subtitle: "KPIs Y CUMPLIMIENTO DE SEGURIDAD" },
  ejecutivo: { title: "DASHBOARD EJECUTIVO", subtitle: "INDICADORES Y TENDENCIAS PARA GERENCIA" },
  config: { title: "CONFIGURACIÓN", subtitle: "USUARIOS, INTEGRACIONES Y SISTEMA" },
};

/** Barrera de errores: si una página falla, muestra un aviso sin romper la app */
class PageBoundary extends Component<{ children: ReactNode; pageKey: string }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidUpdate(prev: { pageKey: string }) {
    if (prev.pageKey !== this.props.pageKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="glass hud-panel rounded-xl p-8 text-center glow-red" style={{ ["--hud-color" as string]: "#ff3b5c" }}>
          <p className="font-display font-bold text-neon-red tracking-[0.2em]">ERROR AL CARGAR EL MÓDULO</p>
          <p className="font-tech text-[11px] text-slate-400 mt-2">Selecciona otra sección del menú para continuar.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function LiveAlert() {
  const [alert, setAlert] = useState<string | null>(null);
  useEffect(() => {
    const t = setInterval(() => {
      setAlert(ALERTS[Math.floor(Math.random() * ALERTS.length)]);
      setTimeout(() => setAlert(null), 4500);
    }, 13000);
    return () => clearInterval(t);
  }, []);

  if (!alert) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 glass-strong hud-panel rounded-xl px-4 py-3 flex items-center gap-3 max-w-sm glow-red pop"
      style={{ ["--hud-color" as string]: "#ff3b5c" }}
    >
      <span className="relative shrink-0">
        <ShieldAlert size={20} className="text-neon-red drop-shadow-[0_0_8px_rgba(255,59,92,0.9)]" />
        <span className="absolute inset-0 rounded-full bg-neon-red/40 blur-md pulse-soft" />
      </span>
      <div className="min-w-0">
        <p className="font-tech text-[9px] text-neon-red tracking-[0.25em]">ALERTA DE SEGURIDAD</p>
        <p className="text-[12px] font-semibold text-slate-100 leading-snug">{alert}</p>
      </div>
      <button onClick={() => setAlert(null)} className="text-slate-500 hover:text-white shrink-0">
        <X size={14} />
      </button>
    </div>
  );
}

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [active, setActive] = useState("resumen");
  const [mode, setMode] = useState<"soc" | "lab">("soc");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const stats = useLiveStats();

  const meta = pageMeta[active] ?? pageMeta.resumen;

  if (!authed) {
    return <Login onLogin={() => setAuthed(true)} />;
  }

  const renderPage = () => {
    switch (active) {
      case "simulaciones": return <Simulations />;
      case "ataques": return <Attacks />;
      case "proteccion": return <Protection />;
      case "prevencion": return <Prevention />;
      case "dispositivos": return <Devices />;
      case "logs": return <Logs />;
      case "ia": return <AIAnalysis />;
      case "politicas": return <Policies />;
      case "objetivos": return <Objectives />;
      case "ejecutivo": return <Executive />;
      case "config": return <Settings />;
      default: return <Overview stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen circuit-bg relative text-slate-200 rise">
      <Particles />

      {/* overlay móvil */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="relative z-10 flex min-h-screen">
        <Sidebar
          active={active}
          onSelect={(id) => {
            setActive(id);
            setSidebarOpen(false);
          }}
          open={sidebarOpen}
        />

        <div className="flex-1 min-w-0 flex flex-col">
          <Header
            mode={mode}
            onModeChange={setMode}
            onToggleSidebar={() => setSidebarOpen((o) => !o)}
            title={meta.title}
            subtitle={meta.subtitle}
            onLogout={() => setAuthed(false)}
          />

          {/* banner modo laboratorio */}
          {mode === "lab" && (
            <div className="rise">
              <div className="mx-4 mt-3 px-4 py-2 rounded-lg border border-neon-purple/40 bg-neon-purple/10 font-tech text-[11px] text-neon-purple tracking-[0.2em] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-purple pulse-soft shadow-[0_0_8px_#b45bff]" />
                MODO LABORATORIO DE SIMULACIÓN ACTIVO — TODOS LOS ATAQUES SON VIRTUALES Y AISLADOS DEL ENTORNO DE PRODUCCIÓN
              </div>
            </div>
          )}

          <main className="flex-1 p-4">
            <div key={active} className="rise">
              <PageBoundary pageKey={active}>{renderPage()}</PageBoundary>
            </div>
          </main>

          <footer className="px-4 py-3 border-t border-neon-cyan/10 flex flex-wrap items-center gap-x-4 gap-y-1 font-tech text-[10px] text-slate-500 tracking-widest">
            <span className="text-neon-cyan/70">FORTINET SOC CONSOLE</span>
            <span>© 2024 SECURITY FABRIC</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green pulse-soft" /> TODOS LOS SISTEMAS OPERATIVOS
            </span>
            <span className="ml-auto">LATENCIA: 12ms · NODO: EU-WEST-1</span>
          </footer>
        </div>
      </div>

      <LiveAlert />
    </div>
  );
}
