import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Calendar, Building2, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { insforge } from '../lib/insforge';

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchProject() {
      const { data, error } = await insforge.database
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      
      if (data) setProject(data);
      setLoading(false);
    }
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-carbon text-white">
        <Loader2 className="w-10 h-10 animate-spin text-industrial-cyan" />
      </div>
    );
  }

  if (!project) {
    return <Navigate to="/proyectos" replace />;
  }

  return (
    <>
      {/* Dark Header */}
      <section className="bg-carbon pt-32 pb-20 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-hyundai-navy/50 to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/proyectos" className="inline-flex items-center gap-2 text-industrial-cyan hover:text-white transition-colors mb-12 font-mono text-sm uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" />
            Volver a Proyectos
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display font-bold text-4xl md:text-6xl text-white mb-8 leading-tight">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-6 font-mono text-sm text-white/70">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <Calendar className="w-4 h-4 text-industrial-cyan" />
                <span>{project.year}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <MapPin className="w-4 h-4 text-industrial-cyan" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <Building2 className="w-4 h-4 text-industrial-cyan" />
                <span>{project.client}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <Clock className="w-4 h-4 text-industrial-cyan" />
                <span>{project.duration}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-3xl overflow-hidden aspect-[21/9] mb-16 relative shadow-2xl"
        >
        <img src={project.main_image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-hyundai-navy/40 to-transparent mix-blend-multiply" />
      </motion.div>

      <div className="grid md:grid-cols-3 gap-12 mb-20">
        <div className="md:col-span-2">
          <h2 className="font-display font-bold text-3xl text-carbon mb-6">Descripción del Proyecto</h2>
          <p className="font-sans text-lg text-slate-600 leading-relaxed whitespace-pre-wrap">
            {project.description}
          </p>
        </div>
        <div>
          <div className="glass-panel p-8 rounded-3xl border border-slate-200">
            <h3 className="font-display font-bold text-xl text-carbon mb-6 border-b border-slate-200 pb-4">Alcance del Trabajo</h3>
            <ul className="space-y-4">
              {project.scope && project.scope.length > 0 ? project.scope.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-industrial-cyan shrink-0 mt-0.5" />
                  <span className="font-sans text-slate-600">{item}</span>
                </li>
              )) : (
                <li className="text-slate-400 italic">No se definió el alcance.</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {project.gallery && project.gallery.length > 0 && (
        <div>
          <h2 className="font-display font-bold text-3xl text-carbon mb-8">Galería del Proyecto</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.gallery.map((img: string, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl overflow-hidden aspect-square border border-slate-100 shadow-sm"
              >
                <img src={img} alt={`${project.title} - Galería ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      )}
      </section>
    </>
  );
}
