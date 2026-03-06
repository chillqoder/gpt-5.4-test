# Project Brief: Nura Health Landing Page
**Role:** Senior Creative Technologist & Lead Frontend Engineer  
**Objective:** Architect a high-fidelity, cinematic "1:1 Pixel Perfect" landing page.  
**Aesthetic Identity:** "High-End Organic Tech" / "Clinical Boutique" — a bridge between a biological research lab and an avant-garde luxury magazine.

---

## 1. CORE DESIGN SYSTEM (STRICT)

### Palette
| Element | Color | Hex |
| :--- | :--- | :--- |
| **Primary** | Moss | `#2E4036` |
| **Accent** | Clay | `#CC5833` |
| **Background** | Cream | `#F2F0E9` |
| **Text/Dark** | Charcoal | `#1A1A1A` |

### Typography
* **Headings:** `Plus Jakarta Sans` & `Outfit` (Tight tracking).
* **Drama/Emphasis:** `Cormorant Garamond` (Italic for biological/organic concepts).
* **Data:** Clean `Monospace` for clinical telemetry.

### Visual Texture
* **Global Overlay:** Implement a CSS Noise overlay (SVG turbulence, 0.05 opacity) to eliminate flat gradients.
* **Border Radius:** Systemic use of `rounded-[2rem]` to `rounded-[3rem]` for all containers.

---

## 2. COMPONENT ARCHITECTURE & BEHAVIOR

### A. NAVBAR (The Floating Island)
* **Structure:** Fixed, pill-shaped container.
* **Morphing Logic:** * *Top:* Transparent, white text.
    * *Scroll:* Transition to `white/60` glassmorphic blur, moss text, subtle border.

### B. HERO SECTION (Nature is the Algorithm)
* **Visuals:** `100dvh` height. Background: [Moody Forest](https://images.unsplash.com/photo-1470115636492-6d2b56f9146d) with Moss-to-Black gradient.
* **Layout:** Bottom-left third alignment.
* **Typography:** Contrast "Nature is the" (Bold Sans) vs. "Algorithm." (Massive Serif Italic).
* **Animation:** GSAP staggered fade-up.

### C. FEATURES (Precision Micro-UI Dashboard)
* **Card 1 (Audit Intelligence):** "Diagnostic Shuffler." 3 overlapping white cards, vertical cycle using `unshift(pop())` logic. Spring-bounce transition (`cubic-bezier(0.34, 1.56, 0.64, 1)`).
* **Card 2 (Neural Stream):** "Telemetry Typewriter." Live text feed cycling messages (e.g., *"Optimizing Circadian Rhythm..."*) with a blinking clay cursor and pulsing dot.
* **Card 3 (Adaptive Regimen):** "Mock Cursor Protocol Scheduler." Weekly grid with an automated SVG cursor that simulates clicks and interaction.

### D. PHILOSOPHY (The Manifesto)
* **Visuals:** Charcoal section, parallax organic texture [Texture link](https://images.unsplash.com/photo-1542601906990-b4d3fb778b09).
* **Interaction:** GSAP SplitText reveal comparing "What is wrong?" vs. "What is optimal?".

### E. PROTOCOL (Sticky Stacking Archive)
* **Interaction:** 3 full-screen cards using GSAP ScrollTrigger. 
* **Stacking effect:** Active card scales previous card to `0.9`, adds `20px` blur, and `0.5` opacity.
* **Artifacts:** Rotating double-helix, scanning laser-grid, pulsing EKG waveform.

### F. MEMBERSHIP & FOOTER
* **Pricing:** Three-tier grid. "Performance" tier pops with Moss background and Clay button.
* **Footer:** Deep Charcoal, `rounded-t-[4rem]`. Include "System Operational" status indicator.

---

## 3. TECHNICAL REQUIREMENTS

* **Stack:** React 19, Tailwind CSS, GSAP 3 (ScrollTrigger), Lucide React.
* **Lifecycle:** Use `gsap.context()` inside `useEffect` for memory management.
* **Micro-Interactions:** Magnetic buttons, `overflow-hidden` sliding background transitions.
* **Code Quality:** No placeholders. Real Unsplash URLs only. Functional software feel for UI cards.

> **Execution Directive:** Do not build a website; build a digital instrument. Every scroll must feel intentional and weighted. Eradicate all generic AI patterns.