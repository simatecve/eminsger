import { motion } from 'motion/react';
import { Target, Eye, Award, Shield, Zap, Clock, Lightbulb } from 'lucide-react';
import { useCmsContent } from '../hooks/useCmsContent';

export default function About() {
  const cms = useCmsContent();
  const header = cms.block('about.header')?.content ?? {};
  const cards = cms.items('about.cards').map((item) => item.content);
  const valuesIntro = cms.block('about.valuesIntro')?.content ?? {};
  const values = cms.items('about.values').map((item) => item.content.text).filter(Boolean);
  const history = cms.block('about.history')?.content ?? {};
  const defaultCards = [
    {
      title: 'Mision',
      description:
        'Reconocer a cada uno de nuestros clientes; la razon de ser de nuestra empresa, logrando de manera permanente la excelencia en la calidad de nuestros productos y servicios con la satisfaccion de quienes lo utilizan, respaldado por un personal capacitado y una infraestructura estable y confiable.',
    },
    {
      title: 'Vision',
      description: 'Ser una empresa lider en la prestacion de ingenieria y servicios. Ademas de ser preferidos por nuestros clientes a nivel nacional e internacional.',
    },
  ];
  const visibleCards = cards.length > 0 ? cards : defaultCards;
  const valueIcons = [Shield, Award, Clock, Lightbulb];

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
              {header.title || 'Sobre Nosotros'}
            </h1>
            <p className="font-sans text-xl text-white/80 max-w-3xl leading-relaxed">
              {header.paragraphs?.[0] || 'En Group Emingser protegemos la inversion de nuestros clientes, ejecutando trabajos de ingenieria y servicio de alta calidad en cada proyecto a realizar.'}
            </p>
            <p className="font-sans text-xl text-white/80 max-w-3xl leading-relaxed mt-6">
              {header.paragraphs?.[1] || 'Ademas, ofrecemos servicios complementarios que agregan valor a nuestra propuesta.'}
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
            <Target className="w-8 h-8" /> {visibleCards[0]?.title || 'Mision'}
          </h2>
          <p className="text-slate-600 leading-relaxed relative z-10">
            {visibleCards[0]?.description}
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
            <Eye className="w-8 h-8" /> {visibleCards[1]?.title || 'Vision'}
          </h2>
          <p className="text-slate-600 leading-relaxed relative z-10">
            {visibleCards[1]?.description}
          </p>
        </motion.div>
      </div>

      {/* Valores & Slogan */}
      <div className="mb-20">
        <h2 className="font-display font-bold text-4xl mb-10 text-center text-carbon">{valuesIntro.title || 'Nuestros Valores'}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {(values.length > 0 ? values : ['Integridad', 'Calidad', 'Responsabilidad', 'Innovacion']).map((text, i) => {
            const ValorIcon = valueIcons[i % valueIcons.length];
            return (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center text-center group hover:bg-slate-100 transition-colors"
              >
                <ValorIcon className="w-12 h-12 text-industrial-cyan mb-4 group-hover:scale-110 transition-transform" />
                <span className="font-display font-semibold text-lg text-carbon">{text}</span>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="font-serif italic text-3xl md:text-4xl text-industrial-cyan">
            {valuesIntro.slogan ? `"${valuesIntro.slogan}"` : '"Pensar diferente y hacerlo simple mediante un metodo atractivo."'}
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
        <h2 className="font-display font-bold text-4xl mb-8 text-carbon">{valuesIntro.historyTitle || 'Nuestra Historia'}</h2>
        <div className="space-y-6 text-slate-600 leading-relaxed font-sans text-lg">
          {(history.paragraphs ?? []).map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </motion.div>
      </section>
    </>
  );
}
