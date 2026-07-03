import { Globe2, MonitorSmartphone, Network, Zap } from "lucide-react";
import { formatCompact, useAnimatedNumber, type LiveStats } from "../hooks/useLive";

export default function MiniStats({ stats }: { stats: LiveStats }) {
  const sessions = useAnimatedNumber(stats.sessions);
  const eps = useAnimatedNumber(stats.eps);
  const countries = useAnimatedNumber(stats.countries);
  const devices = useAnimatedNumber(stats.devices);

  const items = [
    { label: "SESIONES ANALIZADAS", value: formatCompact(sessions), icon: Network, color: "#b45bff" },
    { label: "EVENTOS POR SEGUNDO", value: eps.toLocaleString("es-ES"), icon: Zap, color: "#00e5ff" },
    { label: "PAÍSES INVOLUCRADOS", value: String(countries), icon: Globe2, color: "#2bff88" },
    { label: "DISPOSITIVOS PROTEGIDOS", value: devices.toLocaleString("es-ES"), icon: MonitorSmartphone, color: "#2f7bff" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((it, i) => {
        const Icon = it.icon;
        return (
          <div
            key={it.label}
            className="glass rounded-xl px-3.5 py-3 flex items-center gap-3 border-l-2 rise hover:scale-[1.02] transition-transform"
            style={{ borderLeftColor: it.color, animationDelay: `${0.2 + i * 0.07}s` }}
          >
            <div
              className="w-9 h-9 rounded-lg grid place-items-center shrink-0 border"
              style={{ borderColor: it.color + "40", background: it.color + "12" }}
            >
              <Icon size={16} style={{ color: it.color, filter: `drop-shadow(0 0 5px ${it.color})` }} />
            </div>
            <div className="min-w-0">
              <p className="font-tech text-[9px] text-slate-400 tracking-[0.15em] truncate">{it.label}</p>
              <p className="font-display font-bold text-lg text-white tabular-nums leading-tight">{it.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
