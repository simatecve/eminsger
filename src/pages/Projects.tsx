import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { insforge } from '../lib/insforge';

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await insforge.database
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

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
            className="text-center"
          >
            <h1 className="font-display font-bold text-5xl md:text-7xl mb-6 text-white tracking-tight">
              Nuestros <span className="font-serif italic text-industrial-cyan">Proyectos</span>
            </h1>
            <p className="font-sans text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Un portafolio de excelencia en ingeniería. Descubra cómo hemos transformado la infraestructura industrial a través de soluciones innovadoras y ejecución precisa.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-industrial-cyan" />
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Link key={project.id} to={`/proyectos/${project.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 aspect-[4/3] cursor-pointer"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${project.main_image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h2 className="font-display font-bold text-3xl text-white mb-4 leading-tight">
                        {project.title}
                      </h2>
                      
                      <div className="flex flex-wrap gap-4 text-white/70 font-mono text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-industrial-cyan" />
                          <span>{project.year}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-industrial-cyan" />
                          <span>{project.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400 font-sans text-lg">
            No se encontraron proyectos publicados actualmente.
          </div>
        )}
      </section>
    </>
  );
}
