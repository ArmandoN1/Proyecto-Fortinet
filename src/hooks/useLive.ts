import { useEffect, useRef, useState } from "react";
import { initialTimeline, randomEvents, type TimelineEvent } from "../data/mock";

/** Reloj en vivo */
export function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

export interface LiveStats {
  simulations: number;
  attacks: number;
  threats: number;
  sessions: number;
  eps: number;
  countries: number;
  devices: number;
  cpu: number;
  ram: number;
  firewall: number;
  ips: number;
  riskScore: number;
}

const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Contadores y métricas de sistema que evolucionan en tiempo real */
export function useLiveStats(): LiveStats {
  const [stats, setStats] = useState<LiveStats>({
    simulations: 1248,
    attacks: 512,
    threats: 1089,
    sessions: 3590000,
    eps: 1234,
    countries: 76,
    devices: 2450,
    cpu: 42,
    ram: 61,
    firewall: 89,
    ips: 94,
    riskScore: 34,
  });

  useEffect(() => {
    const t = setInterval(() => {
      setStats((s) => ({
        ...s,
        simulations: s.simulations + (Math.random() < 0.4 ? 1 : 0),
        attacks: s.attacks + (Math.random() < 0.35 ? 1 : 0),
        threats: s.threats + (Math.random() < 0.5 ? Math.floor(rand(1, 3)) : 0),
        sessions: s.sessions + Math.floor(rand(400, 2400)),
        eps: clamp(Math.round(s.eps + rand(-90, 110)), 800, 2200),
        countries: clamp(s.countries + (Math.random() < 0.06 ? (Math.random() < 0.5 ? 1 : -1) : 0), 68, 94),
        devices: s.devices,
        cpu: clamp(Math.round(s.cpu + rand(-6, 7)), 18, 92),
        ram: clamp(Math.round(s.ram + rand(-4, 5)), 35, 88),
        firewall: clamp(Math.round(s.firewall + rand(-2, 2)), 82, 99),
        ips: clamp(Math.round(s.ips + rand(-2, 2)), 86, 99),
        riskScore: clamp(Math.round(s.riskScore + rand(-3, 3)), 22, 58),
      }));
    }, 1600);
    return () => clearInterval(t);
  }, []);

  return stats;
}

/** Timeline con eventos entrantes en vivo */
export function useLiveTimeline(max = 6): TimelineEvent[] {
  const [events, setEvents] = useState<TimelineEvent[]>(initialTimeline);
  useEffect(() => {
    const t = setInterval(() => {
      const e = randomEvents[Math.floor(Math.random() * randomEvents.length)];
      const time = new Date().toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setEvents((prev) => [{ ...e, time }, ...prev].slice(0, max));
    }, 5200);
    return () => clearInterval(t);
  }, [max]);
  return events;
}

/** Serie temporal en vivo para gráficos de área */
export function useLiveSeries(length = 30, base = 50, variance = 22) {
  const [data, setData] = useState(() =>
    Array.from({ length }, (_, i) => ({
      i,
      v: Math.round(base + Math.sin(i / 3) * 12 + rand(-variance / 2, variance / 2)),
    }))
  );
  const counter = useRef(length);
  useEffect(() => {
    const t = setInterval(() => {
      counter.current += 1;
      setData((prev) => [
        ...prev.slice(1),
        {
          i: counter.current,
          v: Math.round(clamp(base + Math.sin(counter.current / 3) * 12 + rand(-variance, variance), 5, 100)),
        },
      ]);
    }, 1400);
    return () => clearInterval(t);
  }, [base, variance]);
  return data;
}

/** Número animado tipo count-up cuando cambia el valor */
export function useAnimatedNumber(value: number, duration = 600): number {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);
  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    prevRef.current = value;
    if (from === to) return;
    const start = performance.now();
    let raf: number;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return display;
}

export function formatCompact(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + " M";
  if (n >= 10_000) return (n / 1000).toFixed(1) + " K";
  return n.toLocaleString("es-ES");
}
