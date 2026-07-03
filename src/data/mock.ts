import {
  LayoutGrid,
  FlaskConical,
  Crosshair,
  ShieldCheck,
  ShieldAlert,
  MonitorSmartphone,
  ScrollText,
  BrainCircuit,
  FileLock2,
  Target,
  BarChart3,
  Settings,
  Skull,
  Bug,
  Globe,
  Mail,
  Lock,
  type LucideIcon,
} from "lucide-react";

export interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

export const menuItems: MenuItem[] = [
  { id: "resumen", label: "Resumen", icon: LayoutGrid },
  { id: "simulaciones", label: "Simulaciones", icon: FlaskConical, badge: 4 },
  { id: "ataques", label: "Ataques", icon: Crosshair, badge: 12 },
  { id: "proteccion", label: "Protección", icon: ShieldCheck },
  { id: "prevencion", label: "Prevención", icon: ShieldAlert },
  { id: "dispositivos", label: "Dispositivos", icon: MonitorSmartphone },
  { id: "logs", label: "Logs y Reportes", icon: ScrollText },
  { id: "ia", label: "Análisis IA", icon: BrainCircuit },
  { id: "politicas", label: "Políticas", icon: FileLock2 },
  { id: "objetivos", label: "Objetivos", icon: Target },
  { id: "ejecutivo", label: "Dashboard Ejecutivo", icon: BarChart3 },
  { id: "config", label: "Configuración", icon: Settings },
];

export type Severity = "CRÍTICO" | "ALTO" | "MEDIO" | "BAJO";

export interface Threat {
  name: string;
  severity: Severity;
  count: number;
  icon: LucideIcon;
}

export const topThreats: Threat[] = [
  { name: "Ransomware.Locky", severity: "CRÍTICO", count: 231, icon: Skull },
  { name: "Trojan.Generic", severity: "ALTO", count: 189, icon: Bug },
  { name: "Malware.Botnet", severity: "ALTO", count: 143, icon: Bug },
  { name: "Phishing.SocialEng", severity: "MEDIO", count: 97, icon: Mail },
  { name: "Exploit.CVE-2023-23397", severity: "MEDIO", count: 64, icon: Globe },
];

export const severityColor: Record<Severity, string> = {
  CRÍTICO: "#ff3b5c",
  ALTO: "#ff9f1c",
  MEDIO: "#ffd60a",
  BAJO: "#2bff88",
};

export interface PreventionMetric {
  label: string;
  value: number;
  color: string;
}

export const preventionMetrics: PreventionMetric[] = [
  { label: "Control de Aplicaciones", value: 96, color: "#00e5ff" },
  { label: "IPS", value: 94, color: "#2f7bff" },
  { label: "Antimalware", value: 93, color: "#b45bff" },
  { label: "Web Filter", value: 90, color: "#2bff88" },
  { label: "Firewall", value: 89, color: "#ffd60a" },
  { label: "Análisis de Comportamiento", value: 87, color: "#ff9f1c" },
];

export interface SimulationType {
  id: string;
  label: string;
  sub?: string;
  icon: LucideIcon;
  color: string;
  count: number;
  delta: number;
}

export const simulationTypes: SimulationType[] = [
  { id: "malware", label: "MALWARE", icon: Bug, color: "#ff3b5c", count: 286, delta: 25 },
  { id: "intrusion", label: "INTRUSIÓN", sub: "IDS/IPS", icon: ShieldAlert, color: "#ff9f1c", count: 254, delta: 18 },
  { id: "web", label: "WEB ATTACK", icon: Globe, color: "#ffd60a", count: 198, delta: 12 },
  { id: "phishing", label: "PHISHING", icon: Mail, color: "#2bff88", count: 162, delta: 22 },
  { id: "ransomware", label: "RANSOMWARE", icon: Lock, color: "#b45bff", count: 118, delta: 30 },
];

export interface AIRecommendation {
  level: "critical" | "warning" | "info";
  text: string;
  detail: string;
}

export const aiRecommendations: AIRecommendation[] = [
  {
    level: "critical",
    text: "Aumento del 28% en ataques de Ransomware detectado.",
    detail: "Recomendación: habilitar respaldo inmutable y microsegmentación.",
  },
  {
    level: "warning",
    text: "Se recomienda actualizar firmas IPS (v27.442 disponible).",
    detail: "Impacto potencial: reducción del riesgo en un 15%.",
  },
  {
    level: "info",
    text: "Tráfico inusual detectado desde 3 países.",
    detail: "Recomendación: revisar políticas de geolocalización.",
  },
  {
    level: "warning",
    text: "14 dispositivos con parches pendientes de seguridad.",
    detail: "Recomendación: programar ventana de mantenimiento.",
  },
];

export interface TimelineEvent {
  time: string;
  title: string;
  sub: string;
  color: string;
  iconKey: "sim" | "block" | "malware" | "url" | "ransom";
}

export const initialTimeline: TimelineEvent[] = [
  { time: "11:24 AM", title: "Simulación completada", sub: "Ransomware — contenido", color: "#b45bff", iconKey: "ransom" },
  { time: "11:23 AM", title: "URL bloqueada", sub: "Sitio malicioso · WebFilter", color: "#2bff88", iconKey: "url" },
  { time: "11:22 AM", title: "Intrusión detectada", sub: "CVE-2023-23397 · IPS", color: "#ff3b5c", iconKey: "malware" },
  { time: "11:21 AM", title: "Ataque bloqueado", sub: "Trojan.Generic · Antivirus", color: "#ff9f1c", iconKey: "block" },
  { time: "11:20 AM", title: "Simulación ejecutada", sub: "Phishing · Campaña interna", color: "#00e5ff", iconKey: "sim" },
];

export const randomEvents: Omit<TimelineEvent, "time">[] = [
  { title: "Ataque bloqueado", sub: "Botnet.Mirai · Firewall", color: "#ff9f1c", iconKey: "block" },
  { title: "Malware detectado", sub: "Trojan.Emotet · Sandbox", color: "#ff3b5c", iconKey: "malware" },
  { title: "URL bloqueada", sub: "C2 Server · WebFilter", color: "#2bff88", iconKey: "url" },
  { title: "Simulación iniciada", sub: "Web Attack · SQLi", color: "#00e5ff", iconKey: "sim" },
  { title: "Ransomware contenido", sub: "LockBit 3.0 · EDR", color: "#b45bff", iconKey: "ransom" },
  { title: "Exploit neutralizado", sub: "Log4Shell · IPS", color: "#ff3b5c", iconKey: "malware" },
  { title: "Phishing bloqueado", sub: "Credential harvest · Mail", color: "#2bff88", iconKey: "url" },
];

export const attackOrigins = [
  { country: "China", pct: 32, color: "#ff3b5c" },
  { country: "Estados Unidos", pct: 18, color: "#ff9f1c" },
  { country: "Rusia", pct: 12, color: "#ffd60a" },
  { country: "Brasil", pct: 8, color: "#00e5ff" },
  { country: "Otros", pct: 30, color: "#2f7bff" },
];

export const attackTypesLegend = [
  { label: "Malware", pct: 28, color: "#b45bff" },
  { label: "Intrusión (IDS/IPS)", pct: 24, color: "#ff3b5c" },
  { label: "Phishing", pct: 18, color: "#2bff88" },
  { label: "Explotación", pct: 16, color: "#00e5ff" },
  { label: "Fuerza Bruta", pct: 14, color: "#ffd60a" },
];

export const deviceStatus = [
  { name: "Protegidos", value: 2215, color: "#2bff88" },
  { name: "Advertencia", value: 143, color: "#ffd60a" },
  { name: "Críticos", value: 92, color: "#ff3b5c" },
];

export const riskHistory = [
  { day: "14 May", riesgo: 72, tendencia: 60 },
  { day: "15 May", riesgo: 78, tendencia: 58 },
  { day: "16 May", riesgo: 55, tendencia: 54 },
  { day: "17 May", riesgo: 61, tendencia: 50 },
  { day: "18 May", riesgo: 42, tendencia: 45 },
  { day: "19 May", riesgo: 48, tendencia: 40 },
  { day: "20 May", riesgo: 34, tendencia: 36 },
];
