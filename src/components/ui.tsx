import type { ReactNode } from "react";
import { cn } from "../utils/cn";

/* ---------- Panel glass con esquinas HUD ---------- */
export function Panel({
  color = "#00e5ff",
  title,
  right,
  children,
  className,
  delay = 0,
}: {
  color?: string;
  title?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const glow =
    color === "#ff3b5c" ? "glow-red" :
    color === "#b45bff" ? "glow-purple" :
    color === "#2bff88" ? "glow-green" :
    color === "#ffd60a" || color === "#ff9f1c" ? "glow-yellow" : "glow-cyan";
  return (
    <div
      className={cn("glass hud-panel rounded-xl p-4 rise", glow, className)}
      style={{ ["--hud-color" as string]: color, animationDelay: `${delay}s` }}
    >
      {(title || right) && (
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          {title && (
            <h2 className="font-display text-sm font-bold text-white tracking-[0.15em]">{title}</h2>
          )}
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

/* ---------- Badge neón ---------- */
export function NeonBadge({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span
      className="font-tech text-[9px] px-1.5 py-0.5 rounded tracking-wider inline-block whitespace-nowrap"
      style={{ color, background: color + "15", border: `1px solid ${color}40`, textShadow: `0 0 8px ${color}` }}
    >
      {children}
    </span>
  );
}

/* ---------- Barra de progreso animada (CSS) ---------- */
export function Bar({ value, color, height = 5, delay = 0 }: { value: number; color: string; height?: number; delay?: number }) {
  return (
    <div className="rounded-full bg-cyber-700/60 overflow-hidden w-full" style={{ height }}>
      <div
        className="h-full rounded-full bar-grow"
        style={{
          width: `${value}%`,
          background: `linear-gradient(90deg, ${color}55, ${color})`,
          boxShadow: `0 0 8px ${color}80`,
          animationDelay: `${delay}s`,
          transition: "width 0.6s ease",
        }}
      />
    </div>
  );
}

/* ---------- Toggle neón (CSS) ---------- */
export function Toggle({ on, onChange, color = "#2bff88" }: { on: boolean; onChange: (v: boolean) => void; color?: string }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="relative w-10 h-5 rounded-full transition-colors shrink-0"
      style={{
        background: on ? color + "30" : "#1a2f55",
        border: `1px solid ${on ? color + "70" : "#2a4576"}`,
        boxShadow: on ? `0 0 10px ${color}40` : "none",
      }}
    >
      <span
        className="absolute top-[2px] w-[14px] h-[14px] rounded-full transition-all duration-200 ease-out"
        style={{
          left: on ? 22 : 3,
          background: on ? color : "#5a719c",
          boxShadow: on ? `0 0 8px ${color}` : "none",
        }}
      />
    </button>
  );
}

/* ---------- Botón neón ---------- */
export function NeonButton({
  color = "#00e5ff",
  children,
  onClick,
  disabled,
  className,
}: {
  color?: string;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg font-tech text-[10px] tracking-[0.2em] transition-all disabled:opacity-50",
        className
      )}
      style={{ color, border: `1px solid ${color}40`, background: color + "0d" }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 16px ${color}40`)}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      {children}
    </button>
  );
}

/* ---------- Anillo circular (CSS) ---------- */
export function Ring({ value, color, size = 56, icon }: { value: number; color: string; size?: number; icon?: ReactNode }) {
  const r = size * 0.39;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1a2f55" strokeWidth={size * 0.07} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={size * 0.07} strokeLinecap="round"
          strokeDasharray={c}
          className="ring-draw"
          style={{
            strokeDashoffset: c - (c * value) / 100,
            ["--ring-from" as string]: `${c}`,
            filter: `drop-shadow(0 0 5px ${color})`,
            transition: "stroke-dashoffset 0.8s ease",
          }}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center font-tech text-[11px]" style={{ color }}>
        {icon ?? `${value}%`}
      </span>
    </div>
  );
}

/* ---------- Estilos de tabla ---------- */
export const thCls =
  "px-3 py-2 text-left font-tech text-[9px] text-slate-400 tracking-[0.2em] border-b border-neon-cyan/10 whitespace-nowrap";
export const tdCls = "px-3 py-2 text-[12px] text-slate-300 border-b border-white/5 whitespace-nowrap";

/* ---------- Chip de estadística ---------- */
export function StatChip({ label, value, color, icon }: { label: string; value: string; color: string; icon?: ReactNode }) {
  return (
    <div className="glass rounded-xl px-3.5 py-3 flex items-center gap-3 border-l-2 flex-1 min-w-[150px] rise" style={{ borderLeftColor: color }}>
      {icon && (
        <div className="w-9 h-9 rounded-lg grid place-items-center shrink-0 border" style={{ borderColor: color + "40", background: color + "12" }}>
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <p className="font-tech text-[9px] text-slate-400 tracking-[0.15em] truncate">{label}</p>
        <p className="font-display font-bold text-lg text-white tabular-nums leading-tight">{value}</p>
      </div>
    </div>
  );
}

/* ---------- Input futurista ---------- */
export const inputCls =
  "bg-cyber-800/60 border border-neon-cyan/15 rounded-lg px-3 py-1.5 text-[12px] text-slate-200 placeholder:text-slate-600 outline-none focus:border-neon-cyan/50 focus:shadow-[0_0_12px_rgba(0,229,255,0.15)] transition-all font-tech";
