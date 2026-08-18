import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, Cpu, BookOpen, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";

const AbstractAICore = () => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full animate-float"
    style={{ filter: "drop-shadow(0 0 40px hsl(var(--primary) / 0.3))" }}
  >
    {/* Outer glowing rings */}
    <circle cx="100" cy="100" r="90" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.5" />
    <circle cx="100" cy="100" r="75" stroke="hsl(var(--primary) / 0.3)" strokeWidth="1" strokeDasharray="4 8" className="origin-center animate-[spin_30s_linear_infinite]" />
    <circle cx="100" cy="100" r="60" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.5" />

    {/* Center Core */}
    <circle cx="100" cy="100" r="25" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary) / 0.8)" strokeWidth="1" />
    <circle cx="100" cy="100" r="15" fill="hsl(var(--primary))" opacity="0.9" className="animate-pulse" />
    <circle cx="100" cy="100" r="6" fill="#fff" opacity="0.9" />

    {/* Connecting Nodes */}
    <line x1="100" y1="40" x2="100" y2="75" stroke="hsl(var(--primary) / 0.4)" strokeWidth="1.5" />
    <line x1="100" y1="125" x2="100" y2="160" stroke="hsl(var(--primary) / 0.4)" strokeWidth="1.5" />
    <line x1="40" y1="100" x2="75" y2="100" stroke="hsl(var(--primary) / 0.4)" strokeWidth="1.5" />
    <line x1="125" y1="100" x2="160" y2="100" stroke="hsl(var(--primary) / 0.4)" strokeWidth="1.5" />

    {/* Orbital Nodes */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      return (
        <circle key={i} cx={100 + 75 * Math.cos(rad)} cy={100 + 75 * Math.sin(rad)} r="3" fill="hsl(var(--primary))" className="animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
      );
    })}
  </svg>
);

const DomainCard = ({
  icon, title, description, delay, onClick, exploreTxt,
}: {
  icon: string; title: string; description: string; delay: number; onClick: () => void; exploreTxt: string;
}) => (
  <div
    onClick={onClick}
    className="glass-card rounded-[24px] p-8 card-lift cursor-pointer group animate-fade-in border border-white/5 hover:border-primary/40 hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden"
    style={{ animationDelay: `${delay}s` }}
  >
    {/* Subtle inner glow on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10">
      <div className="text-4xl mb-6 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">{icon}</div>
      <h3 className="font-display font-semibold text-white/90 text-xl mb-3 tracking-wide group-hover:text-primary transition-colors">{title}</h3>
      <p className="font-sans text-white/50 text-sm leading-relaxed font-light">{description}</p>
      <div className="mt-8 flex items-center gap-2 text-primary text-xs font-sans font-medium opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        {exploreTxt} <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </div>
  </div>
);

const FeaturePill = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-2.5 bg-white/[0.03] backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/[0.06] hover:border-primary/30 transition-all cursor-default">
    <span className="text-primary">{icon}</span>
    <span className="font-sans text-xs text-white/70 tracking-wide font-medium">{text}</span>
  </div>
);

export const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();

  const handleStart = () => {
    if (user) {
      navigate("/analyze");
    } else {
      navigate("/auth");
    }
  };

  const domains = [
    { icon: "⚖", title: t.domainMVATitle, description: t.domainMVADesc },
    { icon: "🌐", title: t.domainITTitle,  description: t.domainITDesc },
    { icon: "📜", title: t.domainIPCTitle, description: t.domainIPCDesc },
  ];

  const steps = [
    { step: "01", title: t.step1Title, desc: t.step1Desc },
    { step: "02", title: t.step2Title, desc: t.step2Desc },
    { step: "03", title: t.step3Title, desc: t.step3Desc },
  ];

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-primary/30">
      {/* ── Floating Navbar ── */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between w-full max-w-5xl px-6 py-3 border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-2xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <span className="text-white/90 font-display font-medium text-lg tracking-wide">e-Vakil</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-sans text-xs uppercase tracking-widest text-white/50 font-medium">
            <a href="#domains" className="hover:text-white transition-colors">{t.navDomains}</a>
            <a href="#about" className="hover:text-white transition-colors">{t.navAbout}</a>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={handleStart}
              className="font-sans text-xs font-semibold bg-white text-black px-5 py-2.5 rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              {t.navStartAnalysis}
            </button>
          </div>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-50 mix-blend-screen" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] opacity-50 mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center pt-32 pb-20">
          <div className="space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/[0.03] rounded-full border border-white/10 animate-fade-in backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-sans text-[11px] uppercase tracking-widest text-white/80 font-medium">{t.heroTag}</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-[5rem] font-medium leading-[1.05] tracking-tight animate-slide-up text-white" style={{ animationDelay: "0.1s" }}>
              The future of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">legal clarity.</span>
            </h1>

            <p className="font-sans text-white/50 text-lg leading-relaxed max-w-lg animate-slide-up font-light" style={{ animationDelay: "0.2s" }}>
              {t.heroDesc}
            </p>

            <div className="flex flex-wrap gap-3 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <FeaturePill icon={<Shield className="w-3.5 h-3.5" />} text={t.pillMVA} />
              <FeaturePill icon={<Cpu className="w-3.5 h-3.5" />} text={t.pillIT} />
              <FeaturePill icon={<BookOpen className="w-3.5 h-3.5" />} text={t.pillIPC} />
            </div>

            <div className="flex items-center gap-6 animate-slide-up pt-4" style={{ animationDelay: "0.4s" }}>
              <button
                onClick={handleStart}
                className="group flex items-center gap-3 font-sans font-semibold text-sm bg-primary text-primary-foreground px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
              >
                {t.heroCta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="w-[500px] h-[500px] relative">
              <AbstractAICore />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050505] to-transparent z-10" />
      </section>

      {/* ── Domain Cards ── */}
      <section id="domains" className="relative py-32 px-6 max-w-7xl mx-auto z-20">
        <div className="text-center mb-20 space-y-4">
          <p className="font-sans text-xs text-primary font-medium tracking-[0.2em] uppercase animate-fade-in">{t.domainsLabel}</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-white tracking-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {t.domainsTitle}
          </h2>
          <p className="font-sans text-white/50 text-base max-w-xl mx-auto animate-fade-in font-light" style={{ animationDelay: "0.2s" }}>
            {t.domainsSubtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {domains.map((d, i) => (
            <DomainCard key={d.title} {...d} delay={i * 0.12} onClick={handleStart} exploreTxt={t.domainExplore} />
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="about" className="py-32 px-6 border-t border-white/5 relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <p className="font-sans text-xs text-primary font-medium tracking-[0.2em] uppercase">{t.howLabel}</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-white tracking-tight">{t.howTitle}</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            {steps.map((item, i) => (
              <div key={item.step} className="relative text-center space-y-6 animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="w-16 h-16 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center mx-auto relative z-10 shadow-xl">
                  <span className="font-sans font-medium text-white/80 text-sm tracking-widest">{item.step}</span>
                </div>
                <div>
                  <h3 className="font-display font-medium text-white text-xl mb-3">{item.title}</h3>
                  <p className="font-sans text-white/50 text-sm leading-relaxed font-light px-4">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 bg-[#030303] py-12 px-6 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-primary" />
            </div>
            <span className="font-display font-medium text-white tracking-wide">e-Vakil</span>
          </div>
          <p className="font-sans text-xs text-white/40 text-center max-w-xl font-light leading-relaxed">{t.disclaimer}</p>
          <span className="font-sans text-xs text-white/30 tracking-widest uppercase">© 2026</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
