import { motion } from 'motion/react';
import { Target, Eye, Award, Shield, Zap, Clock, Lightbulb } from 'lucide-react';

export default function About() {
  return (
    <>
      {/* Dark Header */}
      <section className="bg-carbon pt-32 pb-20 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-hyundai-navy/50 to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display font-bold text-5xl md:text-7xl mb-6 text-white tracking-tight">
              Sobre <span className="font-serif italic text-industrial-cyan">Nosotros</span>
            </h1>
            <p className="font-sans text-xl text-white/80 max-w-3xl leading-relaxed">
              En Group Emingser protegemos la inversión de nuestros clientes, ejecutando trabajos de ingeniería y servicio de alta calidad en cada proyecto a realizar. Deseamos formar parte integral del éxito de nuestros clientes; por esta razón, brindamos soluciones prácticas que nos permitan cumplir con las metas establecidas en cada una de nuestras gestiones.
            </p>
            <p className="font-sans text-xl text-white/80 max-w-3xl leading-relaxed mt-6">
              Además, ofrecemos servicios complementarios que agregan valor a nuestra propuesta, que se traducen en facilidades y ahorro en los costos de mantenimientos de nuestros clientes. El concepto de espíritu de excelencia es parte esencial de nuestro equipo Group Emingser.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* Misión & Visión */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-10 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Target className="w-32 h-32 text-industrial-cyan" />
          </div>
          <h2 className="font-display font-bold text-3xl mb-6 text-industrial-cyan flex items-center gap-3">
            <Target className="w-8 h-8" /> Misión
          </h2>
          <p className="text-slate-600 leading-relaxed relative z-10">
            Reconocer a cada uno de nuestros clientes; la razón de ser de nuestra empresa, logrando de manera permanente la excelencia en la calidad de nuestros productos y servicios con la satisfacción de quienes lo utilizan, respaldado por un personal capacitado y una infraestructura estable y confiable.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-10 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Eye className="w-32 h-32 text-industrial-cyan" />
          </div>
          <h2 className="font-display font-bold text-3xl mb-6 text-industrial-cyan flex items-center gap-3">
            <Eye className="w-8 h-8" /> Visión
          </h2>
          <p className="text-slate-600 leading-relaxed relative z-10">
            Ser una empresa líder en la prestación de ingeniería y servicios. Además de ser preferidos por nuestros clientes a nivel nacional e internacional.
          </p>
        </motion.div>
      </div>

      {/* Valores & Slogan */}
      <div className="mb-20">
        <h2 className="font-display font-bold text-4xl mb-10 text-center text-carbon">Nuestros Valores</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Shield, text: "Integridad" },
            { icon: Award, text: "Calidad" },
            { icon: Clock, text: "Responsabilidad" },
            { icon: Lightbulb, text: "Innovación" }
          ].map((valor, i) => (
            <motion.div
              key={valor.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center text-center group hover:bg-slate-100 transition-colors"
            >
              <valor.icon className="w-12 h-12 text-industrial-cyan mb-4 group-hover:scale-110 transition-transform" />
              <span className="font-display font-semibold text-lg text-carbon">{valor.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="font-serif italic text-3xl md:text-4xl text-industrial-cyan">
            "Pensar diferente y hacerlo simple mediante un método atractivo."
          </p>
        </motion.div>
      </div>

      {/* Historia */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel p-10 md:p-16 rounded-3xl"
      >
        <h2 className="font-display font-bold text-4xl mb-8 text-carbon">Nuestra Historia</h2>
        <div className="space-y-6 text-slate-600 leading-relaxed font-sans text-lg">
          <p>
            Group Emingser fue fundada en marzo 2016 con el propósito de atender las necesidades de la industria relacionada principalmente con la construcción, instalaciones eléctricas, mantenimiento industrial especializado, desarrollo de ingeniería, montaje en estructuras metálicas, mantenimiento a subestaciones eléctricas, Mantenimiento a motores de combustión internas para los diferentes sectores (Generación eléctrica, construcción, minería, marítimo, entre otros).
          </p>
          <p>
            En los inicios de nuestras operaciones, nos especializamos en la provisión de productos y servicios de ingeniería en centrales de generación eléctrica. En poco tiempo incorporamos nuevas líneas de servicio con el objetivo de proveer a nuestros clientes una solución integral a sus necesidades. Contando con un excelente grupo humano el cual se capacita de forma constante con el fin de estar actualizado en los cambios e innovaciones tecnológicas que se presentan en el mercado.
          </p>
          <p>
            Nuestro objetivo principal es lograr una permanente mejora en nuestras actividades a fin de dar un servicio que asegure una entrega en tiempo y forma con su correspondiente asesoramiento y soporte técnico. La complementación de las normas y procedimientos aplicados, nos precisa a un estricto cumplimiento de nuestra garantía y calidad en los productos y servicios que ofrecemos para lograr como meta final una satisfacción plena de nuestros clientes.
          </p>
        </div>
      </motion.div>
      </section>
    </>
  );
}
