import { motion } from 'motion/react';
import { Star, Truck, HandCoins, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Star,
    title: "Calidad",
    description: "Aseguramos la calidad de nuestros servicios, respaldados por un personal altamente capacitado."
  },
  {
    icon: Truck,
    title: "Rapidez en Entrega",
    description: "Cumplimos con el tiempo de entrega prometido y damos seguimiento continuo a la orden solicitada."
  },
  {
    icon: HandCoins,
    title: "Precio Competitivo",
    description: "Nuestros procesos de producción efectivos nos permiten ofrecer precios competitivos."
  },
  {
    icon: Award,
    title: "Garantía",
    description: "Garantizamos la inversión de nuestros clientes con trabajos y diseño e ingeniería calificada, con el servicio excepcional de nuestro equipo Group Emingser."
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-carbon max-w-4xl mx-auto leading-tight"
        >
          En Group Emingser nos caracterizamos por ofrecer a nuestros clientes
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-28 h-28 rounded-full bg-industrial-cyan flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(14,165,233,0.3)] group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(14,165,233,0.5)] transition-all duration-500">
              <feature.icon className="w-12 h-12 text-white" strokeWidth={1.5} />
            </div>
            {/* Using text-[#DC2626] (energy-red) to match the image's red text */}
            <h3 className="font-display font-bold text-2xl text-[#DC2626] mb-4 border-b border-[#DC2626]/30 pb-2">
              {feature.title}
            </h3>
            <p className="font-sans text-slate-600 leading-relaxed text-sm md:text-base">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* International Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-industrial-cyan/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 md:w-2/3">
          <h3 className="font-display font-bold text-3xl text-carbon mb-4">
            Group Emingser Internacional
          </h3>
          <p className="font-sans text-slate-600 text-lg leading-relaxed">
            En <strong className="text-carbon font-semibold">Group Emingser</strong> ofrecemos servicios a nivel internacional, nos encontramos ubicado América del Norte, El Caribe y América del Sur.
          </p>
        </div>
        
        <div className="relative z-10 md:w-1/3 flex justify-end w-full">
          <Link to="/sucursales" className="inline-block w-full md:w-auto text-center px-8 py-4 bg-industrial-cyan hover:bg-industrial-cyan/80 text-white font-bold rounded-full transition-colors shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_30px_rgba(14,165,233,0.6)]">
            Sucursales
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
