import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { deviceStatus, riskHistory } from "../data/mock";
import { worldDots } from "../data/world";

const tooltipStyle = {
  background: "rgba(10, 18, 38, 0.95)",
  border: "1px solid rgba(0,229,255,0.3)",
  borderRadius: 8,
  fontSize: 11,
  fontFamily: "'Share Tech Mono', monospace",
  color: "#d7e4ff",
};

export function RiskChart() {
  return (
    <div
      className="glass hud-panel rounded-xl p-4 glow-red h-full rise"
      style={{ ["--hud-color" as string]: "#ff3b5c", animationDelay: "0.4s" }}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display text-sm font-bold text-white tracking-[0.15em]">EVOLUCIÓN DEL RIESGO</h2>
        <div className="flex items-center gap-3 font-tech text-[10px]">
          <span className="flex items-center gap-1 text-neon-red"><span className="w-2 h-0.5 bg-neon-red" /> Riesgo</span>
          <span className="flex items-center gap-1 text-neon-cyan"><span className="w-2 h-0.5 bg-neon-cyan border-dashed" /> Tendencia</span>
        </div>
      </div>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={riskHistory} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
            <defs>
              <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff3b5c" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#ff3b5c" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1a2f55" strokeDasharray="3 6" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: "#5a719c", fontSize: 10, fontFamily: "'Share Tech Mono', monospace" }} axisLine={{ stroke: "#1a2f55" }} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fill: "#5a719c", fontSize: 10, fontFamily: "'Share Tech Mono', monospace" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="riesgo" name="Riesgo" stroke="#ff3b5c" strokeWidth={2} fill="url(#riskGrad)"
              dot={{ r: 3, fill: "#ff3b5c", strokeWidth: 0 }} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="tendencia" name="Tendencia" stroke="#00e5ff" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function DeviceStatusChart() {
  const total = deviceStatus.reduce((a, b) => a + b.value, 0);
  return (
    <div
      className="glass hud-panel rounded-xl p-4 glow-green h-full rise"
      style={{ ["--hud-color" as string]: "#2bff88", animationDelay: "0.45s" }}
    >
      <h2 className="font-display text-sm font-bold text-white tracking-[0.15em] mb-2">ESTADO DE DISPOSITIVOS</h2>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative w-36 h-36 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={deviceStatus}
                dataKey="value"
                innerRadius={46}
                outerRadius={62}
                paddingAngle={3}
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {deviceStatus.map((d) => (
                  <Cell key={d.name} fill={d.color} style={{ filter: `drop-shadow(0 0 5px ${d.color}90)` }} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <div className="text-center">
              <p className="font-display font-black text-xl text-white tabular-nums leading-none">{total.toLocaleString("es-ES")}</p>
              <p className="font-tech text-[9px] text-slate-500 tracking-widest mt-0.5">TOTAL</p>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-[120px] space-y-2">
          {deviceStatus.map((d) => (
            <div key={d.name} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-[2px]" style={{ background: d.color, boxShadow: `0 0 6px ${d.color}` }} />
              <span className="text-[11px] text-slate-300 flex-1">{d.name}</span>
              <span className="font-tech text-[11px] text-white tabular-nums">{d.value.toLocaleString("es-ES")}</span>
              <span className="font-tech text-[10px] text-slate-500">({Math.round((d.value / total) * 100)}%)</span>
            </div>
          ))}
          {/* mini mapa */}
          <svg viewBox="0 0 720 300" className="w-full mt-1 opacity-70">
            {worldDots.filter((_, i) => i % 2 === 0).map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r={2.4} fill={i % 17 === 0 ? "#2bff88" : "#1f3d6e"} opacity={i % 17 === 0 ? 0.9 : 0.5} />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
