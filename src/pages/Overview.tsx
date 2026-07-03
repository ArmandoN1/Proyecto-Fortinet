import StatusCards from "../components/StatusCards";
import SystemIndicators from "../components/SystemIndicators";
import ThreatMap from "../components/ThreatMap";
import MiniStats from "../components/MiniStats";
import ThreatList from "../components/ThreatList";
import PreventionIndex from "../components/PreventionIndex";
import SimulationCards from "../components/SimulationCards";
import AIPanel from "../components/AIPanel";
import Timeline from "../components/Timeline";
import { DeviceStatusChart, RiskChart } from "../components/Charts";
import type { LiveStats } from "../hooks/useLive";

/** Sección "Resumen" — dashboard original sin modificaciones */
export default function Overview({ stats }: { stats: LiveStats }) {
  return (
    <div className="space-y-4">
      <StatusCards stats={stats} />
      <SystemIndicators stats={stats} />

      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-4">
        <div className="2xl:col-span-2 space-y-4">
          <ThreatMap />
          <MiniStats stats={stats} />
        </div>
        <div className="space-y-4">
          <ThreatList />
          <PreventionIndex />
        </div>
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-4">
        <div className="2xl:col-span-2">
          <SimulationCards />
        </div>
        <AIPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Timeline />
        <RiskChart />
        <DeviceStatusChart />
      </div>
    </div>
  );
}
