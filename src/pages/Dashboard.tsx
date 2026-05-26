import React, { useState, useEffect } from 'react';
import { insforge } from '../lib/insforge';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';
import { Plus, Trash2, LayoutDashboard, LogOut, Upload, Loader2, CheckCircle } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    location: '',
    description: '',
    client: '',
    duration: '',
    scope: '',
  });
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await insforge.database.from('projects').select('*').order('created_at', { ascending: false });
    if (data) setProjects(data);
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGalleryImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mainImage) {
      alert('Selecciona una imagen principal.');
      return;
    }
    if (galleryImages.length === 0) {
      alert('Selecciona al menos una imagen para la galería.');
      return;
    }
    setUploading(true);

    let imageUrl = '';
    if (mainImage) {
      const { data: uploadData, error: uploadError } = await insforge.storage.from('project-images').upload(`${Date.now()}-${mainImage.name}`, mainImage);
      if (uploadData) {
        imageUrl = insforge.storage.from('project-images').getPublicUrl(uploadData.key);
      }
    }

    const galleryUrls: string[] = [];
    if (galleryImages.length > 0) {
      const uploads = await Promise.all(
        galleryImages.map((file) =>
          insforge.storage
            .from('project-images')
            .upload(`${Date.now()}-${Math.random().toString(16).slice(2)}-${file.name}`, file)
        )
      );

      for (const result of uploads) {
        if (result.data) {
          galleryUrls.push(insforge.storage.from('project-images').getPublicUrl(result.data.key));
        }
      }
    }

    const { error } = await insforge.database.from('projects').insert([
      {
        ...formData,
        main_image: imageUrl,
        gallery: galleryUrls,
        scope: formData.scope.split(',').map(s => s.trim()).filter(s => s !== ''),
      },
    ]);

    if (!error) {
      setIsAdding(false);
      setFormData({ title: '', year: '', location: '', description: '', client: '', duration: '', scope: '' });
      setMainImage(null);
      setGalleryImages([]);
      fetchProjects();
    }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
      const { error } = await insforge.database.from('projects').delete().match({ id });
      if (!error) fetchProjects();
    }
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-industrial-cyan" /></div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto pb-20">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="font-display font-bold text-4xl text-carbon flex items-center gap-3">
              <LayoutDashboard className="w-10 h-10 text-industrial-cyan" />
              Panel de Proyectos
            </h1>
            <p className="text-slate-500 mt-2">Gestiona los proyectos que se muestran en la web.</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAdding(!isAdding)}
              className="bg-industrial-cyan hover:bg-hyundai-navy text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-industrial-cyan/20"
            >
              {isAdding ? 'Cancelar' : <><Plus className="w-5 h-5" /> Nuevo Proyecto</>}
            </button>
            <button 
              onClick={signOut}
              className="bg-white border border-slate-200 text-slate-600 hover:text-red-500 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all"
            >
              <LogOut className="w-5 h-5" /> Salir
            </button>
          </div>
        </header>

        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 mb-12"
          >
            <h2 className="font-display font-bold text-2xl mb-8">Crear Nuevo Proyecto</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Título</label>
                  <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-industrial-cyan outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Año</label>
                    <input type="text" name="year" value={formData.year} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-industrial-cyan outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ubicación</label>
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-industrial-cyan outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Cliente</label>
                  <input type="text" name="client" value={formData.client} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-industrial-cyan outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Duración</label>
                  <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-industrial-cyan outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Imagen Principal</label>
                  <div className="flex items-center gap-4">
                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-100 transition-all text-slate-500">
                      <Upload className="w-5 h-5" />
                      {mainImage ? mainImage.name : 'Subir Imagen'}
                      <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" required />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Galería (múltiples imágenes)</label>
                  <div className="flex items-center gap-4">
                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-100 transition-all text-slate-500">
                      <Upload className="w-5 h-5" />
                      {galleryImages.length > 0 ? `${galleryImages.length} imagen(es) seleccionada(s)` : 'Subir Imágenes'}
                      <input type="file" onChange={handleGalleryChange} className="hidden" accept="image/*" multiple required />
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
                  <textarea name="description" rows={4} value={formData.description} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-industrial-cyan outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Alcance (separado por comas)</label>
                  <textarea name="scope" rows={3} value={formData.scope} onChange={handleInputChange} placeholder="Diseño, Construcción, Puesta en marcha..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-industrial-cyan outline-none" />
                </div>
                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={uploading}
                    className="w-full bg-hyundai-navy hover:bg-carbon text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl disabled:opacity-70"
                  >
                    {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle className="w-5 h-5" /> Guardar Proyecto</>}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-3xl" />
            ))
          ) : projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  {project.main_image ? (
                    <img src={project.main_image} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">Sin imagen</div>
                  )}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      onClick={() => handleDelete(project.id)}
                      className="p-2 bg-white/90 hover:bg-red-500 hover:text-white text-red-500 rounded-lg shadow-sm transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display font-bold text-xl mb-2 text-carbon">{project.title}</h3>
                  <div className="text-slate-500 text-sm mb-4 line-clamp-2">{project.description}</div>
                  <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between items-center text-sm font-mono text-slate-400">
                    <span>{project.year || 'N/A'}</span>
                    <span>{project.location || 'N/A'}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-slate-400 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              No hay proyectos creados todavía.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
