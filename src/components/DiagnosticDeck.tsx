import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const cards = [
  "Diagnóstico Eléctrico",
  "Análisis Térmico",
  "Optimización de Procesos"
];

export default function DiagnosticDeck() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray('.diagnostic-card') as HTMLElement[];
      let currentIndex = 0;

      const rotateCards = () => {
        elements.forEach((el, i) => {
          const offset = (i - currentIndex + elements.length) % elements.length;
          
          gsap.to(el, {
            y: offset * 20,
            x: offset * 10,
            scale: 1 - offset * 0.05,
            opacity: 1 - offset * 0.2,
            zIndex: elements.length - offset,
            duration: 0.8,
            ease: "back.out(1.7)"
          });
        });
        currentIndex = (currentIndex + 1) % elements.length;
      };

      // Initial positioning
      rotateCards();

      const interval = setInterval(rotateCards, 4000);
      return () => clearInterval(interval);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-sm h-48 mt-12">
      {cards.map((card, i) => (
        <div
          key={i}
          className="diagnostic-card absolute top-0 left-0 w-full bg-white/90 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex items-center justify-between shadow-2xl"
        >
          <span className="font-mono text-sm text-hyundai-navy font-bold">{card}</span>
          <div className="w-2 h-2 rounded-full bg-industrial-cyan animate-pulse" />
        </div>
      ))}
    </div>
  );
}
