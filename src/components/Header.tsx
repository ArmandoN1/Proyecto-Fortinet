import { Bell, LogOut, Maximize2, Menu, Settings, ShieldCheck, User } from "lucide-react";
import { useClock } from "../hooks/useLive";

interface Props {
  mode: "soc" | "lab";
  onModeChange: (m: "soc" | "lab") => void;
  onToggleSidebar: () => void;
  title: string;
  subtitle: string;
  onLogout?: () => void;
}

export default function Header({ mode, onModeChange, onToggleSidebar, title, subtitle, onLogout }: Props) {
  const now = useClock();
  const fecha = now.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();
  const hora = now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
    else document.exitFullscreen().catch(() => {});
  };

  return (
    <header className="sticky top-0 z-30 glass-strong border-b border-neon-cyan/10 px-4 py-3">
      <div className="flex items-center gap-3 flex-wrap">
        <button onClick={onToggleSidebar} className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-slate-300">
          <Menu size={18} />
        </button>

        <div className="min-w-0" key={title}>
          <h1 className="font-display font-black text-xl sm:text-2xl text-white tracking-[0.12em] text-glow leading-none rise-l">
            {mode === "lab" ? "LABORATORIO" : title}
          </h1>
          <p className="font-tech text-[10px] sm:text-[11px] text-neon-cyan tracking-[0.25em] mt-1 rise-l" style={{ animationDelay: "0.08s" }}>
            {mode === "lab" ? "SIMULACIÓN DE AMENAZAS EN ENTORNO AISLADO" : subtitle}
          </p>
        </div>

        {/* Mode switch */}
        <div className="flex items-center rounded-lg border border-neon-cyan/20 bg-cyber-900/70 p-0.5 font-tech text-[10px] tracking-wider ml-2">
          <button
            onClick={() => onModeChange("soc")}
            className={`px-2.5 py-1.5 rounded-md transition-all ${
              mode === "soc" ? "bg-neon-cyan/15 text-neon-cyan shadow-[0_0_12px_rgba(0,229,255,0.25)]" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            SOC
          </button>
          <button
            onClick={() => onModeChange("lab")}
            className={`px-2.5 py-1.5 rounded-md transition-all ${
              mode === "lab" ? "bg-neon-purple/15 text-neon-purple shadow-[0_0_12px_rgba(180,91,255,0.25)]" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            LAB
          </button>
        </div>

        <div className="flex-1" />

        {/* Estado del sistema */}
        <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-lg glass hud-panel" style={{ ["--hud-color" as string]: "#2bff88" }}>
          <ShieldCheck size={20} className="text-neon-green drop-shadow-[0_0_8px_rgba(43,255,136,0.8)]" />
          <div>
            <p className="font-tech text-[9px] text-slate-400 tracking-widest">ESTADO DEL SISTEMA</p>
            <p className="font-display text-sm font-bold text-neon-green leading-none">ÓPTIMO</p>
          </div>
        </div>

        {/* Fecha y hora */}
        <div className="hidden sm:block px-3 py-1.5 rounded-lg glass text-right">
          <p className="font-tech text-[9px] text-slate-400 tracking-widest">FECHA Y HORA</p>
          <p className="font-tech text-sm text-neon-cyan leading-none mt-0.5">
            {fecha} · <span className="text-white">{hora}</span>
          </p>
        </div>

        {/* Usuario */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg glass">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neon-cyan/40 to-neon-purple/40 border border-neon-cyan/40 grid place-items-center">
            <User size={13} className="text-neon-cyan" />
          </div>
          <div>
            <p className="font-tech text-[9px] text-slate-400 tracking-widest">USUARIO</p>
            <p className="text-xs font-bold text-white leading-none">admin <span className="text-slate-500 font-normal">· Administrador</span></p>
          </div>
        </div>

        {/* Icon actions */}
        <div className="flex items-center gap-1.5">
          <button className="relative p-2 rounded-lg glass hover:border-neon-cyan/40 transition-colors text-slate-300 hover:text-neon-cyan">
            <Bell size={15} />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-neon-red text-[9px] font-bold text-white grid place-items-center shadow-[0_0_8px_rgba(255,59,92,0.8)]">
              3
            </span>
          </button>
          <button className="p-2 rounded-lg glass hover:border-neon-cyan/40 transition-colors text-slate-300 hover:text-neon-cyan">
            <Settings size={15} className="hover:rotate-90 transition-transform duration-500" />
          </button>
          <button onClick={toggleFullscreen} className="p-2 rounded-lg glass hover:border-neon-cyan/40 transition-colors text-slate-300 hover:text-neon-cyan">
            <Maximize2 size={15} />
          </button>
          {onLogout && (
            <button
              onClick={onLogout}
              title="Cerrar sesión"
              className="p-2 rounded-lg glass hover:border-neon-red/50 transition-colors text-slate-300 hover:text-neon-red hover:shadow-[0_0_14px_rgba(255,59,92,0.25)]"
            >
              <LogOut size={15} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
