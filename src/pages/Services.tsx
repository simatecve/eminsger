import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { Wrench, Factory, HardHat, CheckCircle2, Activity, Zap, ShieldCheck } from 'lucide-react';

export default function Services() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const servicesData = [
    {
      id: 'mantenimiento',
      title: 'Servicios de Mantenimiento',
      icon: Wrench,
      descriptions: [
        "Contamos con un equipo de ingenieros y técnicos capacitados, acumulando mas de 15 años de experiencia en Operación y Mantenimiento de centrales eléctricas realizando Mantenimientos Preventivos desde 200 horas hasta 84,000 hrs de operación. También realizamos mantenimientos correctivos desde un consumo de aceite hasta realizar cambio del Block y cigüeñal en motores de combustión interna.",
        "Nuestro personal cuenta con amplia experiencia en servicios de entrenamiento de Centrales eléctricas y diagnósticos, realizando pruebas de P-max, termografía, análisis de vibración, calibraciones entre otros, nuestro personal realiza auditorias técnicas evaluando el estado en que se encuentran los diferentes sistemas y equipos que componen sus instalaciones."
      ],
      list: [
        "Mantenimiento Preventivo",
        "Mantenimiento Correctivo",
        "Mantenimiento Predictivo",
        "Inspección y diagnostico",
        "Ofrecemos entrenamiento al personal"
      ]
    },
    {
      id: 'industriales',
      title: 'Servicios Industriales',
      icon: Factory,
      descriptions: [
        "Nos comprometemos en dar soluciones a las necesidades y solicitudes de nuestros clientes, cumpliendo con los tiempos y presupuestos acordados de mantenimiento y reparaciones de equipos industriales como: compresores, calderas, Mantenimiento y rebobinado de motores eléctricos, acondicionadores de aire, torres de enfriamiento, chiller, centrifugas, paneles eléctricos, automatizaciones entre otros.",
        "Nuestros métodos de reparación y reconstrucción son estrictamente controlados para asegurar una calidad optima y constante en el reacondicionamiento de los equipos."
      ],
      list: [
        "Reacondicionamiento de piezas industriales",
        "Venta de repuesto",
        "Mantenimiento de máquinas industriales",
        "Rebobinado de motores eléctricos",
        "Aire acondicionado",
        "Climatización"
      ]
    },
    {
      id: 'proyectos',
      title: 'Proyectos',
      icon: HardHat,
      descriptions: [
        "Velamos por eficientizar la inversión de nuestro cliente (usuario) garantizando la realización de su proyecto desde el inicio hasta la entrega de llave en mano de tal manera como fue estructurado, con el compromiso de hacer cumplir la planificación en tiempo y costos acordados con nuestros clientes, contando con el personal adecuado para la ejecución de proyectos en rehabilitación de redes, montajes de maquinarias industriales.",
        "Aplicamos conocimientos que contribuyan a mejorar la calidad, costos y valor de sus proyectos desde la etapa de investigación hasta la concepción de los mismos.",
        "Nuestro compromiso es construir infraestructuras civiles y metálicas en un sentido mas amplio donde se identifica las necesidades del cliente antes de realizar un proyecto, teniendo una planificación determinada y precisa con un sentido de responsabilidad ante nuestros suplidores."
      ],
      list: [
        "Estudios y diseños",
        "Construcción",
        "Fiscalización y supervisión de obras",
        "Estructura metálica",
        "Rehabilitación de redes"
      ]
    }
  ];

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
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-6 h-6 text-industrial-cyan" />
              <span className="font-mono text-sm tracking-widest text-industrial-cyan uppercase">Catálogo de Soluciones</span>
            </div>
            <h1 className="font-display font-bold text-5xl md:text-7xl mb-6 text-white tracking-tight">
              Nuestros <span className="font-serif italic text-industrial-cyan">Servicios</span>
            </h1>
            <p className="font-sans text-xl text-white/80 max-w-3xl leading-relaxed">
              Soluciones integrales de ingeniería diseñadas para optimizar, proteger y potenciar la infraestructura crítica de su empresa con los más altos estándares de calidad.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* Services List */}
      <div className="space-y-16">
        {servicesData.map((service, index) => (
          <motion.div 
            key={service.id}
            id={service.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="glass-panel rounded-3xl overflow-hidden relative group"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-industrial-cyan/5 to-transparent pointer-events-none" />
            
            <div className="grid md:grid-cols-12 gap-0">
              {/* Left Column: Content */}
              <div className="md:col-span-7 p-8 md:p-12 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <service.icon className="w-8 h-8 text-industrial-cyan" />
                </div>
                
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-6 text-carbon">
                  {service.title}
                </h2>
                
                <div className="space-y-4 mb-8">
                  {service.descriptions.map((desc, i) => (
                    <p key={i} className="font-sans text-slate-600 leading-relaxed text-lg">
                      {desc}
                    </p>
                  ))}
                </div>
              </div>

              {/* Right Column: List (Terminal Style) */}
              <div className="md:col-span-5 bg-slate-50 p-8 md:p-12 border-t md:border-t-0 md:border-l border-slate-200 relative z-10 flex flex-col justify-center">
                <div className="mb-6 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-industrial-cyan" />
                  <h3 className="font-mono text-sm tracking-widest text-industrial-cyan uppercase">
                    Capacidades Técnicas
                  </h3>
                </div>
                
                <ul className="space-y-4">
                  {service.list.map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="flex items-start gap-3"
                    >
                      <ShieldCheck className="w-5 h-5 text-industrial-cyan shrink-0 mt-0.5" />
                      <span className="font-sans text-carbon font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      </section>
    </>
  );
}
