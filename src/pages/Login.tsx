import { useEffect, useRef, useState, type FormEvent, type MouseEvent, type ReactNode } from "react";
import { User, Lock, Eye, EyeOff, ArrowRight, Play, Check, Hexagon } from "lucide-react";

/* ================= reloj HUD ================= */
function HudClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const f = (n: number) => String(n).padStart(2, "0");
  return (
    <>
      <p className="font-tech text-[10px] text-neon-blue/50 tracking-[0.4em]">
        {f(now.getDate())}.{f(now.getMonth() + 1)}.{f(now.getSeconds())}:{f(now.getMinutes())}
      </p>
      <p className="font-tech text-[11px] text-neon-cyan tracking-[0.4em] mt-1" style={{ textShadow: "0 0 12px rgba(0,229,255,0.8)" }}>
        {f(now.getDate())}.{f(now.getMonth() + 1)}.{now.getFullYear()} / {f(now.getHours())}:{f(now.getMinutes())}:{f(now.getSeconds())}
      </p>
    </>
  );
}

/* ================= campo de entrada ================= */
function Field({
  label, icon: Icon, type = "text", value, onChange, placeholder, right, error,
}: {
  label: string;
  icon: typeof User;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  right?: ReactNode;
  error?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  const borderColor = error ? "#ff3b5c" : focus ? "#00e5ff" : "rgba(85, 125, 210, 0.3)";
  return (
    <div>
      <p className="font-display text-[9.5px] tracking-[0.35em] mb-2.5 transition-colors duration-300 font-bold"
        style={{ color: error ? "#ff3b5c" : focus ? "#00e5ff" : "#8fa6cc", textShadow: focus ? "0 0 10px rgba(0,229,255,0.6)" : "none" }}>
        {label}
      </p>
      <div
        className="relative flex items-center gap-3 rounded-xl px-4 transition-all duration-300 overflow-hidden"
        style={{
          background: "rgba(7, 12, 30, 0.6)",
          border: `1px solid ${borderColor}`,
          boxShadow: focus
            ? "0 0 26px rgba(0,229,255,0.35), inset 0 0 20px rgba(0,229,255,0.07)"
            : error
              ? "0 0 18px rgba(255,59,92,0.35)"
              : "inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 14px rgba(0,0,0,0.3)",
        }}
      >
        {focus && <span className="input-sweep" />}
        <Icon size={18} className="shrink-0 transition-all duration-300"
          style={{ color: focus ? "#00e5ff" : "#5a719c", filter: focus ? "drop-shadow(0 0 8px #00e5ff)" : "none" }} />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent py-[18px] text-[15px] text-slate-100 placeholder:text-slate-600 outline-none font-medium min-w-0"
          autoComplete="off"
        />
        {right}
      </div>
    </div>
  );
}

/* ================= iconos sociales ================= */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[20px] h-[20px]" fill="currentColor">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  );
}
function MicrosoftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M0 0h11.377v11.372H0zm12.623 0H24v11.372H12.623zM0 12.623h11.377V24H0zm12.623 0H24V24H12.623z" />
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[20px] h-[20px]" fill="currentColor">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.031 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.701" />
    </svg>
  );
}

/* ================= LOGIN ================= */
export default function Login({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [leaving, setLeaving] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const onCardMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el || status === "loading" || status === "success") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 6.5, y: px * 9 });
  };
  const onCardLeave = () => setTilt({ x: 0, y: 0 });

  const spawnRipple = (e: MouseEvent<HTMLElement>, host?: HTMLElement | null) => {
    const el = host ?? (e.currentTarget as HTMLElement);
    const rect = el.getBoundingClientRect();
    const span = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    span.className = "ripple";
    span.style.width = span.style.height = `${size}px`;
    span.style.left = `${e.clientX - rect.left - size / 2}px`;
    span.style.top = `${e.clientY - rect.top - size / 2}px`;
    el.appendChild(span);
    setTimeout(() => span.remove(), 700);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (status === "loading" || status === "success") return;
    if (!user.trim() || !pass.trim()) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 600);
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setLeaving(true);
        setTimeout(onLogin, 760);
      }, 1250);
    }, 1600);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 90% 75% at 18% 62%, #060d24 0%, transparent 55%), radial-gradient(ellipse 55% 50% at 82% 12%, #0b0a26 0%, transparent 60%), radial-gradient(ellipse 60% 65% at 90% 88%, #170a30 0%, transparent 55%), linear-gradient(158deg, #02040d 0%, #040718 45%, #08051a 100%)",
      }}
    >
      <video
        className="fixed inset-0 w-full h-full object-cover z-0"
        src="/kling_20260704_VIDEO_Create_a_c_867_0.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{ pointerEvents: "none" }}
      />
      {leaving && <div className="exit-flash" />}

      {/* barridos de escaneo del fondo */}
      <div className="scanline z-[5]" style={{ animationDuration: "8s", opacity: 0.45 }} />
      <div className="scan-x z-[5]" />
      <div className="scan-x z-[5]" style={{ animationDelay: "6.5s" }} />

      {/* reflejos alrededor del panel */}
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 32% 48% at 66% 28%, rgba(0,150,255,0.1), transparent), radial-gradient(ellipse 30% 42% at 78% 88%, rgba(180,91,255,0.13), transparent), radial-gradient(ellipse 22% 32% at 94% 50%, rgba(130,60,255,0.08), transparent)",
        }} />

      {/* ============ HUD GLOBAL ============ */}
      {/* sup-izq */}
      <div className="fixed top-7 left-8 z-10 pointer-events-none hidden sm:block">
        <div className="w-24 h-20 border-t border-l border-neon-blue/35 rounded-tl-md relative">
          <span className="absolute -top-[3px] -left-[3px] w-1.5 h-1.5 bg-neon-cyan shadow-[0_0_10px_#00e5ff]" />
          <span className="absolute top-2 left-3 font-tech text-[8px] text-neon-blue/50 tracking-[0.35em]">FTNT-AI // v7.4</span>
          <span className="absolute -top-[1px] left-24 w-10 h-px bg-neon-blue/25" />
        </div>
        <p className="font-tech text-[8px] text-slate-600 tracking-[0.3em] mt-2 ml-1">CORE: <span className="text-neon-green/70">ONLINE</span> · GPU: 76%</p>
      </div>
      {/* fecha sup-der */}
      <div className="fixed top-7 right-8 z-10 text-right pointer-events-none rise" style={{ animationDelay: "0.3s" }}>
        <HudClock />
        <div className="flex justify-end gap-1 mt-2">
          {[14, 24, 9, 18].map((wd, i) => (
            <span key={i} className="h-[2px] bg-neon-cyan/45" style={{ width: wd }} />
          ))}
        </div>
        <p className="font-tech text-[8px] text-slate-600 tracking-[0.3em] mt-1.5">SEC-LINK TLS 1.3 · AES-256</p>
      </div>
      {/* regla lateral izq */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-10 pointer-events-none hidden lg:flex flex-col gap-2.5">
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} className={`h-px ${i === 4 ? "w-7 bg-neon-cyan/70 shadow-[0_0_6px_#00e5ff]" : "w-3 bg-neon-blue/30"}`} />
        ))}
        <span className="font-tech text-[8px] text-neon-blue/40 tracking-[0.25em] mt-1 -rotate-90 origin-left translate-y-4">AXIS-Y</span>
      </div>
      {/* regla lateral der */}
      <div className="fixed right-8 top-[38%] z-10 pointer-events-none hidden xl:flex flex-col items-end gap-2">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={`h-px ${i === 2 ? "w-6 bg-neon-purple/70 shadow-[0_0_6px_#b45bff]" : "w-2.5 bg-neon-purple/30"}`} />
        ))}
      </div>
      {/* conectando inf-izq */}
      <div className="fixed bottom-8 left-8 z-10 pointer-events-none hidden md:block rise" style={{ animationDelay: "0.6s" }}>
        <div className="flex items-end gap-3">
          <div className="flex flex-col gap-1">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="w-2 h-2 border border-neon-cyan/50 bg-neon-cyan/10"
                style={{ opacity: 1 - i * 0.2, boxShadow: i === 0 ? "0 0 8px rgba(0,229,255,0.6)" : "none" }} />
            ))}
          </div>
          <div>
            <p className="font-tech text-[10px] text-neon-cyan/85 tracking-[0.4em] flicker leading-relaxed">
              CONECTANDO<br />AL SISTEMA
            </p>
            <div className="mt-2 space-y-1.5">
              {[64, 40, 52].map((wd, i) => (
                <div key={i} className="h-[2px] w-24 bg-cyber-700/60 overflow-hidden rounded-full">
                  <div className="h-full bg-neon-cyan/80 energy-bar rounded-full"
                    style={{ maxWidth: `${wd}%`, animationDelay: `${0.8 + i * 0.5}s`, boxShadow: "0 0 8px #00e5ff" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="font-tech text-[9px] text-slate-600 tracking-[0.45em] mt-4">SYS 01 <span className="text-neon-blue/50 ml-2">▚▚▚</span> <span className="text-neon-cyan/40">0xF4A2</span></p>
      </div>
      {/* coordenadas inf-centro */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none hidden xl:block text-center">
        <p className="font-tech text-[9px] text-slate-500 tracking-[0.4em]">LAT 40.4168 N · LON 03.7038 W · ALT 667M</p>
        <div className="flex justify-center gap-1 mt-1.5">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className={`w-1 h-1 rounded-full ${i === 3 || i === 8 ? "bg-neon-cyan/70" : "bg-slate-700"}`} />
          ))}
        </div>
      </div>
      {/* trama inf-der */}
      <div className="fixed bottom-8 right-8 z-10 pointer-events-none hidden sm:block">
        <p className="font-tech text-[8px] text-slate-600 tracking-[0.3em] text-right mb-1.5">RENDER 60FPS · Δ0.016</p>
        <svg width="80" height="50" viewBox="0 0 80 50" className="ml-auto block">
          {Array.from({ length: 7 }, (_, i) => (
            <line key={i} x1={30 + i * 8} y1="50" x2={80} y2={i * 8} stroke="rgba(150,160,230,0.28)" strokeWidth="1.5" />
          ))}
        </svg>
        <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-neon-purple shadow-[0_0_12px_#b45bff]" />
      </div>
      {/* marcadores flotantes */}
      <span className="fixed top-1/3 right-10 w-1.5 h-1.5 bg-neon-purple/80 shadow-[0_0_12px_#b45bff] z-10 pointer-events-none hidden lg:block pulse-soft" />
      <span className="fixed bottom-1/4 left-11 w-1 h-10 bg-gradient-to-b from-neon-blue/50 to-transparent z-10 pointer-events-none hidden lg:block" />
      <span className="fixed top-[22%] left-[38%] font-tech text-[8px] text-neon-blue/30 tracking-[0.3em] z-10 pointer-events-none hidden xl:block">NODE-07</span>
      <span className="fixed top-[64%] left-[42%] font-tech text-[8px] text-neon-cyan/25 tracking-[0.3em] z-10 pointer-events-none hidden xl:block flicker">SIGNAL LOCK</span>

      {/* ============ CONTENIDO ============ */}
      <div className={`relative z-10 min-h-screen flex items-center justify-center lg:justify-between gap-10 px-6 lg:pl-[9%] lg:pr-[7%] xl:pr-[9%] ${leaving ? "holo-dissolve" : ""}`}>
        {/* ----- texto izquierdo ----- */}
        <div className="hidden lg:block max-w-md pt-4">
          <p className="font-display text-[11px] font-bold text-neon-blue tracking-[0.5em] rise"
            style={{ animationDelay: "0.2s", textShadow: "0 0 16px rgba(60,130,255,0.9)" }}>
            BIENVENIDO DE NUEVO<span className="caret-blink text-neon-cyan">.</span>
          </p>
          <h1 className="text-[50px] xl:text-[56px] font-semibold text-white mt-6 rise"
            style={{ animationDelay: "0.35s", fontFamily: "'Rajdhani', sans-serif", lineHeight: 1.1, letterSpacing: "0.015em", textShadow: "0 4px 40px rgba(0,100,255,0.35)" }}>
            Inicia sesión en<br />tu cuenta
          </h1>
          <p className="text-slate-400 text-[17px] mt-7 leading-relaxed rise" style={{ animationDelay: "0.5s" }}>
            Accede a un mundo de posibilidades<br />con tecnología futurista.
          </p>
          <div className="w-44 h-px bg-gradient-to-r from-slate-400/50 to-transparent mt-11 mb-10 rise" style={{ animationDelay: "0.6s" }} />
          <button
            className="flex items-center gap-6 group rise relative"
            style={{ animationDelay: "0.7s" }}
            onClick={(e) => spawnRipple(e)}
          >
            <span className="font-display text-[11px] font-bold text-neon-blue tracking-[0.5em] group-hover:text-neon-cyan transition-colors"
              style={{ textShadow: "0 0 14px rgba(60,130,255,0.7)" }}>
              EXPLORAR
            </span>
            <span className="relative w-[52px] h-[52px] rounded-full border border-neon-blue/60 grid place-items-center bg-neon-blue/5 overflow-hidden
              group-hover:border-neon-cyan group-hover:shadow-[0_0_32px_rgba(0,190,255,0.55)] group-hover:scale-110 transition-all duration-300">
              <span className="absolute inset-1.5 rounded-full border border-neon-blue/25" />
              <Play size={14} className="text-neon-blue group-hover:text-neon-cyan ml-0.5 transition-colors" fill="currentColor" />
            </span>
          </button>
        </div>

        {/* ----- panel de login ----- */}
        <div style={{ perspective: 1500 }} className="w-full max-w-[400px] shrink-0 py-8">
          <div
            ref={cardRef}
            onMouseMove={onCardMove}
            onMouseLeave={onCardLeave}
            className={`login-frame frame-glow-strong holo-grid relative px-8 sm:px-10 pt-14 pb-11 pop ${status === "error" ? "shake" : ""}`}
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: "transform 0.25s ease-out",
              transformStyle: "preserve-3d",
              animationDelay: "0.25s",
            }}
          >
            {/* segmentos luminosos del marco */}
            <span className="absolute top-[-2px] left-8 right-8 h-[2.5px] pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,1), rgba(0,229,255,1), transparent)", boxShadow: "0 0 18px rgba(0,229,255,0.95)" }} />
            <span className="absolute top-5 left-[-2px] w-[2.5px] h-20 pointer-events-none"
              style={{ background: "linear-gradient(180deg, transparent, rgba(0,229,255,0.85), transparent)", boxShadow: "0 0 14px rgba(0,229,255,0.8)" }} />
            <span className="absolute top-5 right-[-2px] w-[2.5px] h-20 pointer-events-none"
              style={{ background: "linear-gradient(180deg, transparent, rgba(0,229,255,0.85), transparent)", boxShadow: "0 0 14px rgba(0,229,255,0.8)" }} />
            <span className="absolute bottom-[-2px] left-10 right-10 h-[2.5px] pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(190,95,255,0.95), transparent)", boxShadow: "0 0 18px rgba(190,95,255,0.85)" }} />
            <span className="absolute bottom-7 right-[-2px] w-[2.5px] h-24 pointer-events-none"
              style={{ background: "linear-gradient(180deg, transparent, rgba(190,95,255,0.85), transparent)", boxShadow: "0 0 14px rgba(190,95,255,0.8)" }} />
            <span className="absolute bottom-7 left-[-2px] w-[2.5px] h-14 pointer-events-none"
              style={{ background: "linear-gradient(180deg, transparent, rgba(140,91,255,0.6), transparent)" }} />

            {/* brackets de esquina reforzados */}
            {[
              { cls: "top-2 left-2 border-t-2 border-l-2 rounded-tl-lg", c: "#00e5ff" },
              { cls: "top-2 right-2 border-t-2 border-r-2 rounded-tr-lg", c: "#00e5ff" },
              { cls: "bottom-2 left-2 border-b-2 border-l-2 rounded-bl-lg", c: "#b45bff" },
              { cls: "bottom-2 right-2 border-b-2 border-r-2 rounded-br-lg", c: "#b45bff" },
            ].map(({ cls, c }) => (
              <span key={cls} className={`absolute w-6 h-6 pointer-events-none ${cls}`}
                style={{ borderColor: c, filter: `drop-shadow(0 0 8px ${c})` }} />
            ))}
            {/* nodos + ticks HUD en esquinas */}
            <span className="absolute top-[13px] left-[13px] w-1 h-1 bg-neon-cyan shadow-[0_0_8px_#00e5ff] pointer-events-none" />
            <span className="absolute top-[13px] right-[13px] w-1 h-1 bg-neon-cyan shadow-[0_0_8px_#00e5ff] pointer-events-none" />
            <span className="absolute bottom-[13px] left-[13px] w-1 h-1 bg-neon-purple shadow-[0_0_8px_#b45bff] pointer-events-none" />
            <span className="absolute bottom-[13px] right-[13px] w-1 h-1 bg-neon-purple shadow-[0_0_8px_#b45bff] pointer-events-none" />
            <span className="absolute top-3.5 left-10 font-tech text-[7px] text-neon-cyan/50 tracking-[0.3em] pointer-events-none">ID-SEC</span>
            <span className="absolute top-3.5 right-10 font-tech text-[7px] text-neon-cyan/50 tracking-[0.3em] pointer-events-none">v2.4</span>
            <span className="absolute bottom-3.5 right-10 font-tech text-[7px] text-neon-purple/50 tracking-[0.3em] pointer-events-none">AUTH-01</span>

            {/* escaneo holográfico en éxito */}
            {status === "success" && (
              <div className="absolute inset-0 overflow-hidden rounded-[22px] pointer-events-none z-20">
                <div className="holo-scan" />
              </div>
            )}

            {/* logo hexagonal */}
            <div className="flex flex-col items-center" style={{ transform: "translateZ(40px)" }}>
              <div className="relative">
                <div className="absolute inset-[-12px] rounded-full bg-neon-purple/30 blur-2xl pulse-soft" />
                <div className="relative grid place-items-center">
                  <Hexagon size={56} strokeWidth={1.4}
                    className={status === "success" ? "text-neon-green check-pop" : "text-neon-purple"}
                    style={{ filter: `drop-shadow(0 0 18px ${status === "success" ? "rgba(43,255,136,1)" : "rgba(160,85,255,1)"})` }} />
                  <Hexagon size={30} strokeWidth={2}
                    className={`absolute ${status === "success" ? "text-neon-green" : "text-neon-purple"} radar-sweep`}
                    style={{ animationDuration: "10s" }} />
                </div>
              </div>

              <div className="flex items-center gap-4 mt-9">
                <span className="w-7 h-px bg-slate-300/50" />
                <h2 className="font-display text-[14px] font-bold text-white tracking-[0.4em] whitespace-nowrap"
                  style={{ textShadow: "0 0 20px rgba(255,255,255,0.35)" }}>
                  {status === "success" ? "ACCESO CONCEDIDO" : "INICIAR SESIÓN"}
                </h2>
                <span className="w-7 h-px bg-slate-300/50" />
              </div>
              {status === "success" && (
                <p className="font-tech text-[10px] text-neon-green tracking-[0.32em] mt-3 rise">
                  IDENTIDAD VERIFICADA · CARGANDO CONSOLA…
                </p>
              )}
            </div>

            {/* formulario */}
            <form onSubmit={submit} className="mt-11 space-y-7" style={{ transform: "translateZ(28px)" }}>
              <Field
                label="USUARIO"
                icon={User}
                value={user}
                onChange={setUser}
                placeholder="Ingresa tu usuario"
                error={status === "error" && !user.trim()}
              />
              <Field
                label="CONTRASEÑA"
                icon={Lock}
                type={showPass ? "text" : "password"}
                value={pass}
                onChange={setPass}
                placeholder="Ingresa tu contraseña"
                error={status === "error" && !pass.trim()}
                right={
                  <button type="button" onClick={() => setShowPass((s) => !s)}
                    className="text-slate-500 hover:text-neon-cyan transition-colors shrink-0 p-1">
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />

              <div className="flex items-center justify-between pt-0.5">
                <button type="button" onClick={() => setRemember((r) => !r)} className="flex items-center gap-2.5 group">
                  <span
                    className="w-[20px] h-[20px] rounded-[6px] border grid place-items-center transition-all duration-200"
                    style={{
                      borderColor: remember ? "#2f7bff" : "#2a4576",
                      background: remember ? "rgba(47,123,255,0.3)" : "transparent",
                      boxShadow: remember ? "0 0 14px rgba(47,123,255,0.55)" : "none",
                    }}
                  >
                    {remember && <Check size={13} className="text-white check-pop" strokeWidth={3} />}
                  </span>
                  <span className="text-[13.5px] text-slate-200 group-hover:text-white transition-colors">Recuérdame</span>
                </button>
                <button type="button" className="text-[13.5px] text-neon-purple hover:text-neon-cyan transition-colors"
                  style={{ textShadow: "0 0 12px rgba(180,91,255,0.55)" }}>
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* botón ACCEDER */}
              <button
                ref={btnRef}
                type="submit"
                onClick={(e) => spawnRipple(e, btnRef.current)}
                disabled={status === "loading" || status === "success"}
                className={`relative w-full overflow-hidden rounded-full py-[18px] font-display text-[13px] font-bold tracking-[0.42em] text-white transition-all duration-300 group mt-1 ${status === "idle" ? "btn-glow" : ""}`}
                style={{
                  background: status === "success"
                    ? "linear-gradient(90deg, #0d8a4a, #2bff88)"
                    : "linear-gradient(90deg, #2e63ff 0%, #5f5aff 45%, #a44dff 100%)",
                  boxShadow: status === "success"
                    ? "0 0 46px rgba(43,255,136,0.6)"
                    : undefined,
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {status === "loading" ? (
                    <>
                      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] hud-spinner">
                        <circle cx="12" cy="12" r="9" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" />
                        <circle cx="12" cy="12" r="9" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="14 42" />
                      </svg>
                      VERIFICANDO…
                    </>
                  ) : status === "success" ? (
                    <><Check size={17} className="check-pop" strokeWidth={3} /> ACCESO CONCEDIDO</>
                  ) : (
                    <>
                      ACCEDER
                      <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                    </>
                  )}
                </span>
                {status === "idle" && (
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                )}
              </button>

              {status === "loading" && (
                <div className="h-[3px] rounded-full bg-cyber-700/70 overflow-hidden -mt-3">
                  <div className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple energy-bar"
                    style={{ boxShadow: "0 0 12px #00e5ff" }} />
                </div>
              )}
            </form>

            {/* social */}
            <div className="mt-11" style={{ transform: "translateZ(20px)" }}>
              <div className="flex items-center gap-4">
                <span className="flex-1 h-px bg-slate-400/25" />
                <p className="font-display text-[9px] font-bold text-slate-400 tracking-[0.42em] whitespace-nowrap">O CONTINÚA CON</p>
                <span className="flex-1 h-px bg-slate-400/25" />
              </div>
              <div className="flex justify-center gap-6 mt-7">
                {[
                  { icon: <GoogleIcon />, label: "Google" },
                  { icon: <MicrosoftIcon />, label: "Microsoft" },
                  { icon: <AppleIcon />, label: "Apple" },
                ].map(({ icon, label }) => (
                  <button
                    key={label}
                    type="button"
                    title={label}
                    onClick={(e) => spawnRipple(e)}
                    className="relative overflow-hidden w-[54px] h-[54px] rounded-full grid place-items-center text-white/90
                      transition-all duration-300 hover:-translate-y-1.5 hover:text-white"
                    style={{
                      background: "rgba(9, 15, 34, 0.75)",
                      border: "1px solid rgba(110, 150, 255, 0.4)",
                      boxShadow: "0 0 16px rgba(47,123,255,0.2), inset 0 1px 0 rgba(255,255,255,0.07)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0,229,255,0.85)";
                      e.currentTarget.style.boxShadow = "0 0 30px rgba(0,229,255,0.5), inset 0 0 14px rgba(0,229,255,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(110,150,255,0.4)";
                      e.currentTarget.style.boxShadow = "0 0 16px rgba(47,123,255,0.2), inset 0 1px 0 rgba(255,255,255,0.07)";
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-[14px] text-slate-300 mt-8 rise" style={{ animationDelay: "0.8s" }}>
            ¿No tienes cuenta?{" "}
            <button className="text-neon-purple hover:text-neon-cyan font-semibold transition-colors ml-1"
              style={{ textShadow: "0 0 14px rgba(180,91,255,0.6)" }}>
              Regístrate
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
