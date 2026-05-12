import { motion } from 'motion/react';
import { Settings, Zap, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeartbeatSVG = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full opacity-20 text-industrial-cyan">
    <path
      d="M0 50 L30 50 L40 20 L60 80 L70 50 L100 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeDasharray="200"
      strokeDashoffset="200"
    >
      <animate
        attributeName="stroke-dashoffset"
        values="200;0"
        dur="2s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

const HelixSVG = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full opacity-20 text-industrial-cyan animate-[spin_10s_linear_infinite]">
    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
    <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="1" />
    <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ScannerSVG = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full opacity-20 text-industrial-cyan">
    <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1" />
    <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="2">
      <animate attributeName="y1" values="10;90;10" dur="3s" repeatCount="indefinite" />
      <animate attributeName="y2" values="10;90;10" dur="3s" repeatCount="indefinite" />
    </line>
  </svg>
);

const protocols = [
  {
    title: "Mantenimiento Predictivo",
    content: "Reducción del 40% en tiempo de parada no planificada",
    icon: Settings,
    bgImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    AnimComponent: HeartbeatSVG,
    link: "/servicios#mantenimiento"
  },
  {
    title: "Instalación Energética",
    content: "Energía solar + Generación térmica integrada",
    icon: Zap,
    bgImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop",
    AnimComponent: HelixSVG,
    link: "/servicios#industriales"
  },
  {
    title: "Infraestructura Industrial",
    content: "Montaje y puesta en marcha llave en mano",
    icon: Shield,
    bgImage: "https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=2070&auto=format&fit=crop",
    AnimComponent: ScannerSVG,
    link: "/servicios#proyectos"
  }
];

export default function ServiceProtocols() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-4xl md:text-5xl text-carbon mb-6 tracking-tight"
        >
          Nuestras Especialidades
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-600 font-sans text-lg max-w-2xl mx-auto"
        >
          Soluciones de ingeniería de alto nivel para la industria moderna, garantizando eficiencia y continuidad operativa.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {protocols.map((protocol, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -10 }}
            className="group relative rounded-3xl overflow-hidden glass-panel flex flex-col h-[450px]"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-10 group-hover:opacity-20"
              style={{ backgroundImage: `url(${protocol.bgImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />

            {/* SVG Animation Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <div className="w-[150%] h-[150%] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <protocol.AnimComponent />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 flex flex-col h-full justify-between">
              <div>
                <div className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center border border-industrial-cyan/30 shadow-[0_0_20px_rgba(14,165,233,0.1)] mb-6 group-hover:scale-110 transition-transform duration-500">
                  <protocol.icon className="w-8 h-8 text-industrial-cyan" />
                </div>
                <h3 className="font-display font-bold text-2xl text-carbon mb-3 leading-tight">
                  {protocol.title}
                </h3>
                <p className="font-sans text-slate-600 text-sm leading-relaxed">
                  {protocol.content}
                </p>
              </div>

              <Link 
                to={protocol.link} 
                className="inline-flex items-center gap-2 text-industrial-cyan font-medium text-sm group/link mt-6"
              >
                Explorar Servicio
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
