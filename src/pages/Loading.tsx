export default function Loading({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="intro-screen">
      <video
        className="intro-video"
        src="/clideo_editor_d6d95c3603414452be9fa927a944aa9d.mp4"
        preload="auto"
        autoPlay
        muted
        playsInline
        onEnded={onComplete}
      />
      <div className="loading-overlay" />
      <div className="loading-content absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 text-center px-4">
        <p className="font-display text-[11px] tracking-[0.45em] text-neon-blue text-white/80 uppercase">CARGANDO</p>
        <h1 className="text-[38px] md:text-[48px] font-semibold text-white tracking-[-0.03em]">Preparando el dashboard</h1>
        <p className="max-w-xs text-sm text-slate-300/90">Finaliza en breve. Si el video no se reproduce, espera mientras se carga el sistema.</p>
      </div>
    </div>
  );
}
