import { Cpu, MemoryStick, BrickWall, ShieldHalf } from "lucide-react";
import type { LiveStats } from "../hooks/useLive";

function CircleIndicator({
  label,
  value,
  color,
  icon: Icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: typeof Cpu;
}) {
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-3 glass rounded-xl px-3 py-2.5 flex-1 min-w-[150px] rise">
      <div className="relative w-14 h-14 shrink-0">
        <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
          <circle cx="28" cy="28" r={r} fill="none" stroke="#1a2f55" strokeWidth="4" />
          <circle
            cx="28" cy="28" r={r} fill="none"
            stroke={color} strokeWidth="4" strokeLinecap="round"
            strokeDasharray={c}
            style={{
              strokeDashoffset: c - (c * value) / 100,
              filter: `drop-shadow(0 0 5px ${color})`,
              transition: "stroke-dashoffset 0.8s ease, stroke 0.4s ease",
            }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center">
          <Icon size={16} style={{ color, filter: `drop-shadow(0 0 5px ${color})` }} />
        </span>
      </div>
      <div>
        <p className="font-tech text-[10px] text-slate-400 tracking-[0.18em]">{label}</p>
        <p className="font-display font-black text-xl text-white tabular-nums leading-none mt-0.5">
          {value}<span className="text-xs text-slate-500">%</span>
        </p>
      </div>
    </div>
  );
}

export default function SystemIndicators({ stats }: { stats: LiveStats }) {
  return (
    <div className="flex flex-wrap gap-3">
      <CircleIndicator label="CPU" value={stats.cpu} color={stats.cpu > 80 ? "#ff3b5c" : "#00e5ff"} icon={Cpu} />
      <CircleIndicator label="RAM" value={stats.ram} color={stats.ram > 80 ? "#ff9f1c" : "#b45bff"} icon={MemoryStick} />
      <CircleIndicator label="FIREWALL" value={stats.firewall} color="#2bff88" icon={BrickWall} />
      <CircleIndicator label="IPS" value={stats.ips} color="#2f7bff" icon={ShieldHalf} />
    </div>
  );
}
