import { useEffect, useMemo, useState } from "react";
import { attackOrigins, attackTypesLegend } from "../data/mock";
import { attackSources, HQ, MAP_H, MAP_W, project, worldDots } from "../data/world";

/** Curva bezier entre origen y HQ */
function arcPath(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - Math.min(90, Math.hypot(x2 - x1, y2 - y1) * 0.28);
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

function Radar({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      {[42, 30, 18].map((r) => (
        <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="#00e5ff" strokeOpacity={0.25} strokeWidth={0.8} />
      ))}
      <line x1={cx - 42} y1={cy} x2={cx + 42} y2={cy} stroke="#00e5ff" strokeOpacity={0.15} strokeWidth={0.6} />
      <line x1={cx} y1={cy - 42} x2={cx} y2={cy + 42} stroke="#00e5ff" strokeOpacity={0.15} strokeWidth={0.6} />
      {/* sweep */}
      <g className="radar-sweep" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <path d={`M ${cx} ${cy} L ${cx + 42} ${cy} A 42 42 0 0 0 ${cx + 42 * Math.cos(-Math.PI / 4)} ${cy + 42 * Math.sin(-Math.PI / 4)} Z`}
          fill="url(#radarGrad)" />
        <line x1={cx} y1={cy} x2={cx + 42} y2={cy} stroke="#00e5ff" strokeWidth={1.2} strokeOpacity={0.9} />
      </g>
      {/* HQ logo */}
      <rect x={cx - 7} y={cy - 7} width={14} height={14} rx={2.5} fill="#0d1730" stroke="#00e5ff" strokeWidth={1}
        style={{ filter: "drop-shadow(0 0 8px rgba(0,229,255,0.9))" }} />
      <g fill="#00e5ff">
        <rect x={cx - 4.5} y={cy - 4.5} width={3.6} height={3.6} rx={0.6} />
        <rect x={cx + 0.9} y={cy - 4.5} width={3.6} height={3.6} rx={0.6} />
        <rect x={cx - 4.5} y={cy + 0.9} width={3.6} height={3.6} rx={0.6} />
        <rect x={cx + 0.9} y={cy + 0.9} width={3.6} height={3.6} rx={0.6} opacity={0.45} />
      </g>
      <circle cx={cx} cy={cy} r={12} fill="none" stroke="#00e5ff" strokeWidth={0.8} className="ping-dot" />
    </g>
  );
}

export default function ThreatMap() {
  const [activeIdx, setActiveIdx] = useState<number[]>([0, 2, 5]);

  // Rotar los ataques activos
  useEffect(() => {
    const t = setInterval(() => {
      setActiveIdx(() => {
        const n = 3 + Math.floor(Math.random() * 3);
        const set = new Set<number>();
        while (set.size < n) set.add(Math.floor(Math.random() * attackSources.length));
        return [...set];
      });
    }, 3400);
    return () => clearInterval(t);
  }, []);

  const nodes = useMemo(
    () => attackSources.map((s) => ({ ...s, ...project(s.lon, s.lat) })),
    []
  );

  return (
    <div
      className="glass hud-panel rounded-xl glow-cyan relative overflow-hidden rise"
      style={{ ["--hud-color" as string]: "#00e5ff", animationDelay: "0.15s" }}
    >
      <div className="scanline" />
      <div className="flex items-center justify-between px-4 pt-3.5 pb-1">
        <h2 className="font-display text-sm font-bold text-white tracking-[0.15em]">
          MAPA DE AMENAZAS EN TIEMPO REAL
        </h2>
        <span className="flex items-center gap-1.5 font-tech text-[11px] text-neon-red tracking-widest">
          <span className="w-2 h-2 rounded-full bg-neon-red pulse-soft shadow-[0_0_8px_#ff3b5c]" /> LIVE
        </span>
      </div>

      <div className="relative">
        <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="w-full h-auto">
          <defs>
            <radialGradient id="radarGrad">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="mapVignette">
              <stop offset="60%" stopColor="transparent" />
              <stop offset="100%" stopColor="#04070f" stopOpacity="0.8" />
            </radialGradient>
          </defs>

          {/* world dot-matrix */}
          {worldDots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={1.7} fill="#2f7bff" opacity={0.32} />
          ))}

          {/* attack arcs */}
          {nodes.map((n, i) => {
            const active = activeIdx.includes(i);
            const path = arcPath(n.x, n.y, HQ.x, HQ.y);
            return (
              <g key={n.id}>
                {active && (
                  <>
                    <path d={path} fill="none" stroke={n.color} strokeWidth={1.6} strokeOpacity={0.22} />
                    <path d={path} fill="none" stroke={n.color} strokeWidth={1.4} className="attack-line"
                      style={{ filter: `drop-shadow(0 0 4px ${n.color})` }} />
                  </>
                )}
                {/* node */}
                <circle cx={n.x} cy={n.y} r={active ? 3.2 : 2.2} fill={n.color}
                  style={{ filter: `drop-shadow(0 0 ${active ? 7 : 3}px ${n.color})` }} />
                {active && <circle cx={n.x} cy={n.y} r={5} fill="none" stroke={n.color} strokeWidth={1} className="ping-dot" />}
                {active && (
                  <text x={n.x + 6} y={n.y - 5} fontSize={8.5} fill={n.color} className="font-tech" opacity={0.95}
                    style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                    {n.name} · {n.type}
                  </text>
                )}
              </g>
            );
          })}

          <Radar cx={HQ.x} cy={HQ.y} />
          <rect x="0" y="0" width={MAP_W} height={MAP_H} fill="url(#mapVignette)" pointerEvents="none" />
        </svg>

        {/* Origen de ataques overlay */}
        <div className="absolute left-3 bottom-3 glass rounded-lg p-2.5 w-44 hidden sm:block">
          <p className="font-tech text-[9px] text-slate-400 tracking-[0.2em] mb-1.5">ORIGEN DE ATAQUES</p>
          {attackOrigins.map((o) => (
            <div key={o.country} className="flex items-center gap-1.5 py-0.5">
              <span className="w-1.5 h-1.5 rounded-[2px]" style={{ background: o.color, boxShadow: `0 0 5px ${o.color}` }} />
              <span className="text-[10px] text-slate-300 flex-1 truncate">{o.country}</span>
              <span className="font-tech text-[10px]" style={{ color: o.color }}>{o.pct}%</span>
            </div>
          ))}
        </div>

        {/* Tipos de ataque overlay */}
        <div className="absolute right-3 top-2 glass rounded-lg p-2.5 w-48 hidden md:block">
          <p className="font-tech text-[9px] text-slate-400 tracking-[0.2em] mb-1.5">TIPOS DE ATAQUE</p>
          {attackTypesLegend.map((t, i) => (
            <div key={t.label} className="py-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-[2px]" style={{ background: t.color, boxShadow: `0 0 5px ${t.color}` }} />
                <span className="text-[10px] text-slate-300 flex-1 truncate">{t.label}</span>
                <span className="font-tech text-[10px]" style={{ color: t.color }}>{t.pct}%</span>
              </div>
              <div className="h-[3px] rounded-full bg-cyber-700/60 mt-0.5 overflow-hidden">
                <div
                  className="h-full rounded-full bar-grow"
                  style={{ width: `${t.pct * 3}%`, background: t.color, boxShadow: `0 0 6px ${t.color}`, animationDelay: `${0.4 + i * 0.08}s` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
