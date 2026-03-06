import { useEffect, useRef, useState } from 'react';
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CalendarRange,
  Check,
  Dna,
  Menu,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const auditCards = [
  {
    title: 'Hormone Patterning',
    detail: 'Resting biomarkers reconciled against sleep strain and recovery debt.',
  },
  {
    title: 'Inflammation Readout',
    detail: 'Multi-source signal arbitration surfaces latent chronic stress markers.',
  },
  {
    title: 'Glucose Adaptation',
    detail: 'Meal timing and movement windows recalibrated to metabolic response.',
  },
];

const telemetryMessages = [
  'Optimizing circadian rhythm...',
  'Sequencing adaptive recovery window...',
  'Refreshing mitochondrial stress model...',
  'Validating micronutrient correction path...',
];

const schedulerCells = [
  { day: 'Mon', task: 'Lab sync', active: true },
  { day: 'Tue', task: 'Cold exposure', active: false },
  { day: 'Wed', task: 'Peptide review', active: false },
  { day: 'Thu', task: 'Strength block', active: true },
  { day: 'Fri', task: 'Deep sleep audit', active: false },
  { day: 'Sat', task: 'Recovery walk', active: false },
  { day: 'Sun', task: 'Nervous reset', active: true },
];

const protocolCards = [
  {
    label: 'Archive 01',
    title: 'Genomic Intake',
    description: 'A molecular baseline mapped into an actionable performance model.',
    artifact: 'Double-helix lattice',
    icon: Dna,
  },
  {
    label: 'Archive 02',
    title: 'Signal Mapping',
    description: 'Behavioral, lab, and wearable telemetry fused into one protocol timeline.',
    artifact: 'Laser grid scan',
    icon: ScanLine,
  },
  {
    label: 'Archive 03',
    title: 'Live Adjustment',
    description: 'The system shifts dosage, rhythm, and recovery before drift becomes decline.',
    artifact: 'EKG pulse stream',
    icon: Activity,
  },
];

const pricing = [
  {
    name: 'Core',
    price: '$380',
    detail: 'Monthly clinical cadence',
    features: ['Quarterly lab review', 'Wearable ingestion', 'Foundational protocol'],
    featured: false,
  },
  {
    name: 'Performance',
    price: '$890',
    detail: 'For measurable optimization',
    features: ['Bi-weekly plan tuning', 'Dedicated strategist', 'Advanced telemetry modeling'],
    featured: true,
  },
  {
    name: 'Reserve',
    price: '$1,750',
    detail: 'White-glove protocol design',
    features: ['Real-time physician channel', 'Travel-aware adjustment', 'On-demand diagnostics'],
    featured: false,
  },
];

function MagneticButton({ children, className = '', light = false }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) {
      return undefined;
    }

    const handleMove = (event) => {
      const bounds = button.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;
      gsap.to(button, {
        x: x * 0.18,
        y: y * 0.18,
        duration: 0.35,
        ease: 'power3.out',
      });
    };

    const handleLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.45,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    button.addEventListener('pointermove', handleMove);
    button.addEventListener('pointerleave', handleLeave);

    return () => {
      button.removeEventListener('pointermove', handleMove);
      button.removeEventListener('pointerleave', handleLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className={`group relative overflow-hidden rounded-full border px-6 py-3 text-sm font-semibold tracking-[0.18em] transition-transform ${
        light
          ? 'border-white/30 bg-white/10 text-white'
          : 'border-moss/10 bg-moss text-cream'
      } ${className}`}
    >
      <span className="absolute inset-0 translate-y-full bg-clay transition-transform duration-500 group-hover:translate-y-0" />
      <span className="relative flex items-center gap-2">
        {children}
        <ArrowRight className="h-4 w-4" />
      </span>
    </button>
  );
}

function App() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const manifestoRef = useRef(null);
  const protocolRef = useRef(null);
  const protocolCardRefs = useRef([]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [cards, setCards] = useState(auditCards);
  const [messageIndex, setMessageIndex] = useState(0);
  const [typedMessage, setTypedMessage] = useState('');
  const [cursorIndex, setCursorIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCards((current) => {
        const next = [...current];
        next.unshift(next.pop());
        return next;
      });
    }, 2400);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const fullMessage = telemetryMessages[messageIndex];
    let timeoutId;

    if (typedMessage.length < fullMessage.length) {
      timeoutId = window.setTimeout(() => {
        setTypedMessage(fullMessage.slice(0, typedMessage.length + 1));
      }, 42);
    } else {
      timeoutId = window.setTimeout(() => {
        setTypedMessage('');
        setMessageIndex((current) => (current + 1) % telemetryMessages.length);
      }, 1200);
    }

    return () => window.clearTimeout(timeoutId);
  }, [messageIndex, typedMessage]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCursorIndex((current) => (current + 2) % schedulerCells.length);
    }, 1600);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const context = gsap.context(() => {
      const heroNodes = heroRef.current?.querySelectorAll('[data-hero]');
      if (heroNodes?.length) {
        gsap.fromTo(
          heroNodes,
          { opacity: 0, y: 42 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.14,
            ease: 'power3.out',
          },
        );
      }

      const manifestoLines = manifestoRef.current?.querySelectorAll('[data-split]');
      if (manifestoLines?.length) {
        gsap.fromTo(
          manifestoLines,
          { opacity: 0, yPercent: 100 },
          {
            opacity: 1,
            yPercent: 0,
            stagger: 0.08,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: 'top 72%',
            },
          },
        );
      }

      protocolCardRefs.current.forEach((card, index) => {
        if (!card) {
          return;
        }

        gsap.fromTo(
          card,
          {
            scale: 1,
            filter: 'blur(0px)',
            opacity: 1,
          },
          {
            scale: 0.9,
            filter: 'blur(20px)',
            opacity: 0.5,
            ease: 'none',
            scrollTrigger: {
              trigger: protocolRef.current,
              start: `${index * 23}% top`,
              end: `${(index + 1) * 23 + 28}% top`,
              scrub: true,
            },
          },
        );
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  const cursorCell = schedulerCells[cursorIndex];

  return (
    <div ref={rootRef} className="bg-cream text-charcoal">
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <div
          className={`flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-500 md:px-6 ${
            isScrolled
              ? 'border-moss/10 bg-white/60 text-moss shadow-halo backdrop-blur-xl'
              : 'border-white/10 bg-transparent text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-moss text-cream">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold tracking-tight">Nura Health</p>
              <p className={`font-mono text-[10px] uppercase tracking-[0.24em] ${isScrolled ? 'text-moss/70' : 'text-white/70'}`}>
                Biological Intelligence
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#features">System</a>
            <a href="#philosophy">Philosophy</a>
            <a href="#protocol">Protocol</a>
            <a href="#membership">Membership</a>
          </nav>
          <div className="hidden md:block">
            <MagneticButton light={!isScrolled} className={isScrolled ? '' : 'bg-white/10'}>
              Enter Nura
            </MagneticButton>
          </div>
          <button className="md:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <main>
        <section
          ref={heroRef}
          className="relative flex min-h-[100dvh] items-end overflow-hidden px-4 pb-10 pt-32 sm:px-6 lg:px-10"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=1600&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-hero-gradient" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(204,88,51,0.16),transparent_32%)]" />

          <div className="relative mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="max-w-3xl">
              <p
                data-hero
                className="mb-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.28em] text-white/80 backdrop-blur-sm"
              >
                Clinical Boutique Platform
              </p>
              <h1
                data-hero
                className="max-w-4xl font-sans text-[clamp(3.4rem,7vw,7.6rem)] font-extrabold leading-[0.88] tracking-[-0.05em] text-white"
              >
                Nature is the{' '}
                <span className="block font-serif text-[clamp(4.2rem,8vw,8.6rem)] font-medium italic text-cream">
                  Algorithm.
                </span>
              </h1>
              <p
                data-hero
                className="mt-8 max-w-xl text-base leading-7 text-white/76 sm:text-lg"
              >
                Nura turns raw biology into a living operating system. Every protocol is staged like precision research and delivered with the tactility of a private atelier.
              </p>
              <div data-hero className="mt-10 flex flex-wrap gap-4">
                <MagneticButton light>Build My Protocol</MagneticButton>
                <button className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold tracking-[0.18em] text-white transition hover:bg-white/10">
                  View Method
                </button>
              </div>
            </div>

            <div
              data-hero
              className="rounded-[2.5rem] border border-white/12 bg-white/10 p-5 text-white shadow-halo backdrop-blur-md"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/60">Live Intake</p>
                  <p className="mt-2 font-display text-2xl">Patient 047 / Resonance Stable</p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 font-mono text-xs text-white/70">
                  <span className="h-2 w-2 rounded-full bg-clay shadow-[0_0_20px_rgba(204,88,51,0.8)]" />
                  streaming
                </div>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  ['Sleep Variability', '+18%'],
                  ['Stress Load', '-12%'],
                  ['Recovery Index', '92.4'],
                  ['Protocol Drift', '0.03'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[1.8rem] bg-black/15 p-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/45">{label}</p>
                    <p className="mt-3 font-display text-3xl">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="relative px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-moss/60">Precision Micro-UI Dashboard</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-charcoal sm:text-6xl">
                The interface behaves like a clinical instrument, not a brochure.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              <article className="rounded-[2.4rem] border border-moss/10 bg-bone p-6 shadow-halo">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-moss/50">Audit Intelligence</p>
                    <h3 className="mt-3 font-display text-2xl font-semibold">Diagnostic Shuffler</h3>
                  </div>
                  <ShieldCheck className="h-6 w-6 text-clay" />
                </div>
                <div className="relative mt-10 h-72">
                  {cards.map((card, index) => (
                    <div
                      key={card.title}
                      className="absolute inset-x-0 rounded-[2rem] border border-moss/10 bg-white p-5 transition-all duration-700"
                      style={{
                        top: `${index * 18}px`,
                        transform: `scale(${1 - index * 0.05})`,
                        zIndex: cards.length - index,
                        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                        opacity: 1 - index * 0.14,
                      }}
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-moss/40">
                        protocol set {String(index + 1).padStart(2, '0')}
                      </p>
                      <h4 className="mt-5 font-display text-2xl font-semibold tracking-[-0.03em]">{card.title}</h4>
                      <p className="mt-3 text-sm leading-6 text-charcoal/70">{card.detail}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-[2.4rem] border border-moss/10 bg-moss p-6 text-cream shadow-halo">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cream/55">Neural Stream</p>
                    <h3 className="mt-3 font-display text-2xl font-semibold">Telemetry Typewriter</h3>
                  </div>
                  <BrainCircuit className="h-6 w-6 text-clay" />
                </div>
                <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-clay" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-cream/60">Telemetry loop</span>
                  </div>
                  <p className="mt-8 min-h-20 font-mono text-lg leading-8 text-cream/90">
                    {typedMessage}
                    <span className="ml-1 inline-block h-6 w-[2px] animate-pulse bg-clay align-middle" />
                  </p>
                  <div className="mt-8 grid gap-3">
                    {telemetryMessages.map((message) => (
                      <div key={message} className="flex items-center justify-between rounded-[1.2rem] bg-black/10 px-4 py-3">
                        <span className="text-sm text-cream/75">{message}</span>
                        <span className="font-mono text-xs uppercase tracking-[0.18em] text-cream/40">ready</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              <article className="rounded-[2.4rem] border border-moss/10 bg-bone p-6 shadow-halo">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-moss/50">Adaptive Regimen</p>
                    <h3 className="mt-3 font-display text-2xl font-semibold">Protocol Scheduler</h3>
                  </div>
                  <CalendarRange className="h-6 w-6 text-clay" />
                </div>
                <div className="relative mt-10 rounded-[2rem] border border-moss/10 bg-white p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {schedulerCells.map((cell, index) => (
                      <div
                        key={cell.day}
                        className={`rounded-[1.4rem] border p-4 transition ${
                          index === cursorIndex
                            ? 'border-clay/60 bg-clay/10'
                            : cell.active
                              ? 'border-moss/20 bg-moss/5'
                              : 'border-moss/10 bg-cream'
                        }`}
                      >
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-moss/45">{cell.day}</p>
                        <p className="mt-3 text-sm font-medium">{cell.task}</p>
                      </div>
                    ))}
                  </div>
                  <div
                    className="pointer-events-none absolute flex h-9 w-9 items-center justify-center rounded-full bg-charcoal text-cream shadow-lg transition-all duration-700"
                    style={{
                      top: `${38 + Math.floor(cursorIndex / 2) * 90}px`,
                      left: `${cursorIndex % 2 === 0 ? '44%' : '82%'}`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="h-3 w-3 rounded-full border border-cream/70 bg-clay" />
                  </div>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-moss/45">
                    cursor locking on {cursorCell.day} / {cursorCell.task}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          id="philosophy"
          ref={manifestoRef}
          className="relative overflow-hidden bg-charcoal px-4 py-28 text-cream sm:px-6 lg:px-10"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(204,88,51,0.18),transparent_28%)]" />
          <div className="absolute inset-0 translate-y-6 scale-110 bg-[linear-gradient(180deg,rgba(26,26,26,0.75),rgba(26,26,26,0.95))]" />

          <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cream/55">The Manifesto</p>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Clinical care should pursue the optimal, not merely diagnose the broken.
              </h2>
            </div>
            <div className="space-y-8 text-[clamp(1.7rem,3vw,3rem)] font-medium leading-[1.1] tracking-[-0.04em]">
              <div className="overflow-hidden">
                <p data-split>What is wrong?</p>
              </div>
              <div className="overflow-hidden">
                <p data-split className="font-serif italic text-clay">What is optimal?</p>
              </div>
              <p className="max-w-2xl text-base leading-8 tracking-normal text-cream/70">
                Nura reframes health as a dynamic design problem. We treat physiology as an adaptive ecosystem, then compose interventions with the rigor of a lab and the restraint of luxury editorial.
              </p>
            </div>
          </div>
        </section>

        <section id="protocol" ref={protocolRef} className="relative px-4 py-24 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-moss/55">Sticky Stacking Archive</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
                Each protocol stage is preserved like a living artifact.
              </h2>
            </div>

            <div className="mt-16 space-y-8">
              {protocolCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <article
                    key={card.title}
                    ref={(element) => {
                      protocolCardRefs.current[index] = element;
                    }}
                    className="sticky top-20 rounded-[3rem] border border-moss/10 bg-gradient-to-br from-white to-[#ebe6dc] p-8 shadow-halo md:p-12"
                  >
                    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-moss/50">{card.label}</p>
                        <h3 className="mt-6 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{card.title}</h3>
                        <p className="mt-6 max-w-xl text-lg leading-8 text-charcoal/72">{card.description}</p>
                      </div>
                      <div className="rounded-[2.4rem] bg-charcoal p-6 text-cream">
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cream/50">{card.artifact}</p>
                          <Icon className="h-5 w-5 text-clay" />
                        </div>
                        <div className="mt-8 flex h-64 items-center justify-center rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(204,88,51,0.2),transparent_45%)]">
                          <div
                            className={`relative flex items-center justify-center ${
                              index === 0
                                ? 'h-36 w-36 rounded-full border border-clay/70'
                                : index === 1
                                  ? 'h-40 w-full rounded-[2rem] border border-clay/40'
                                  : 'h-24 w-full rounded-full border border-clay/40'
                            }`}
                          >
                            {index === 0 && (
                              <>
                                <div className="absolute h-28 w-14 rounded-full border border-cream/40" />
                                <div className="absolute h-28 w-14 rotate-90 rounded-full border border-clay/70" />
                              </>
                            )}
                            {index === 1 && (
                              <div className="grid w-full grid-cols-6 gap-2 px-6">
                                {Array.from({ length: 18 }).map((_, lineIndex) => (
                                  <div
                                    key={lineIndex}
                                    className="h-6 rounded-full bg-gradient-to-b from-clay/70 to-transparent"
                                  />
                                ))}
                              </div>
                            )}
                            {index === 2 && (
                              <div className="flex w-full items-center gap-2 px-8">
                                {Array.from({ length: 24 }).map((_, pulseIndex) => (
                                  <div
                                    key={pulseIndex}
                                    className="w-full rounded-full bg-clay/70"
                                    style={{
                                      height: pulseIndex % 6 === 0 ? '40px' : pulseIndex % 3 === 0 ? '18px' : '8px',
                                    }}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="membership" className="px-4 pb-24 pt-10 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl rounded-[3rem] bg-moss px-6 py-10 text-cream sm:px-8 lg:px-12 lg:py-14">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cream/55">Membership</p>
                <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                  Choose the cadence your biology demands.
                </h2>
              </div>
              <MagneticButton className="border-clay/20 bg-clay text-cream">Request Access</MagneticButton>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {pricing.map((tier) => (
                <article
                  key={tier.name}
                  className={`rounded-[2.2rem] border p-6 ${
                    tier.featured
                      ? 'border-clay/30 bg-cream text-charcoal'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display text-2xl font-semibold">{tier.name}</p>
                      <p className={`mt-2 text-sm ${tier.featured ? 'text-charcoal/65' : 'text-cream/60'}`}>{tier.detail}</p>
                    </div>
                    {tier.featured && (
                      <span className="rounded-full bg-moss px-3 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-cream">
                        preferred
                      </span>
                    )}
                  </div>
                  <div className="mt-8 flex items-end gap-2">
                    <span className="font-display text-5xl font-semibold">{tier.price}</span>
                    <span className={`pb-2 font-mono text-[11px] uppercase tracking-[0.22em] ${tier.featured ? 'text-charcoal/45' : 'text-cream/45'}`}>
                      / month
                    </span>
                  </div>
                  <div className="mt-8 space-y-3">
                    {tier.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <Check className={`h-4 w-4 ${tier.featured ? 'text-clay' : 'text-cream'}`} />
                        <span className={tier.featured ? 'text-charcoal/75' : 'text-cream/75'}>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    className={`mt-8 w-full rounded-full px-5 py-3 text-sm font-semibold tracking-[0.18em] transition ${
                      tier.featured
                        ? 'bg-clay text-cream hover:bg-clay/90'
                        : 'border border-white/15 bg-white/10 text-cream hover:bg-white/15'
                    }`}
                  >
                    Select {tier.name}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="rounded-t-[4rem] bg-charcoal px-4 py-10 text-cream sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-3xl font-semibold tracking-[-0.04em]">Nura Health</p>
            <p className="mt-3 max-w-md text-cream/62">
              A high-touch operating layer for proactive, measurable human performance.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#95d3a4] shadow-[0_0_18px_rgba(149,211,164,0.8)]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-cream/65">System Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
