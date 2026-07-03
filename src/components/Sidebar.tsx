import { Hexagon, Wifi } from "lucide-react";
import { menuItems } from "../data/mock";
import { cn } from "../utils/cn";

interface Props {
  active: string;
  onSelect: (id: string) => void;
  open: boolean;
}

function FortinetLogo() {
  return (
    <div className="flex items-center gap-2 px-4 pt-5 pb-4">
      <div className="relative">
        <div className="w-9 h-9 rounded-md bg-gradient-to-br from-neon-red/90 to-[#8b0f2b] grid grid-cols-2 gap-[3px] p-[6px] shadow-[0_0_18px_rgba(255,59,92,0.5)]">
          <span className="bg-white/95 rounded-[1px]" />
          <span className="bg-white/95 rounded-[1px]" />
          <span className="bg-white/95 rounded-[1px]" />
          <span className="bg-white/40 rounded-[1px]" />
        </div>
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-neon-green pulse-soft" />
      </div>
      <div>
        <p className="font-display font-black tracking-[0.18em] text-white text-lg leading-none">
          F<span className="text-neon-red">O</span>RTINET
        </p>
        <p className="font-tech text-[9px] text-neon-cyan/70 tracking-[0.3em] mt-0.5">SOC CONSOLE v7.4</p>
      </div>
    </div>
  );
}

export default function Sidebar({ active, onSelect, open }: Props) {
  return (
    <aside
      className={cn(
        "fixed lg:static z-40 inset-y-0 left-0 w-60 shrink-0 flex flex-col glass-strong border-r border-neon-cyan/10 transition-transform duration-300 lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <FortinetLogo />

      <nav className="flex-1 overflow-y-auto px-3 space-y-0.5 pb-3">
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={cn(
                "relative w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-semibold tracking-wide uppercase transition-all group rise-l",
                isActive
                  ? "text-neon-cyan bg-neon-cyan/10 shadow-[inset_0_0_20px_rgba(0,229,255,0.08),0_0_14px_rgba(0,229,255,0.12)]"
                  : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
              )}
              style={{ animationDelay: `${0.04 * i}s` }}
            >
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-neon-cyan shadow-[0_0_10px_#00e5ff]" />
              )}
              <Icon
                size={16}
                className={cn(
                  "shrink-0 transition-colors",
                  isActive ? "text-neon-cyan drop-shadow-[0_0_6px_rgba(0,229,255,0.8)]" : "text-slate-500 group-hover:text-neon-cyan/70"
                )}
              />
              <span className="truncate">{item.label}</span>
              {item.badge && (
                <span className="ml-auto text-[10px] font-tech px-1.5 py-0.5 rounded bg-neon-red/15 text-neon-red border border-neon-red/30">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Device card */}
      <div className="m-3 p-3 rounded-xl glass hud-panel glow-cyan rise" style={{ ["--hud-color" as string]: "#00e5ff", animationDelay: "0.5s" }}>
        <div className="flex items-center gap-2 mb-2">
          <Hexagon size={16} className="text-neon-cyan" />
          <p className="font-display text-[11px] font-bold text-white tracking-widest">FORTIGATE 100F</p>
        </div>
        <div className="space-y-1 font-tech text-[10px] text-slate-400">
          <p>Versión: <span className="text-neon-cyan">v7.4.3</span></p>
          <p>Serial: <span className="text-slate-300">FG100FTK22001234</span></p>
          <p>HA: <span className="text-neon-green">Activo</span></p>
          <p>Uptime: <span className="text-slate-300">12d 4h 32m</span></p>
        </div>
        <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10px] font-tech text-neon-green">
            <Wifi size={11} className="pulse-soft" /> CONECTADO
          </span>
          <span className="flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="w-1 h-1 rounded-full bg-neon-cyan pulse-soft"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </span>
        </div>
      </div>
    </aside>
  );
}
