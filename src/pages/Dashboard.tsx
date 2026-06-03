import React, { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  BarChart3,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  FileText,
  ImagePlus,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  Pencil,
  Plus,
  Search,
  Settings,
  Trash2,
  Upload,
} from 'lucide-react';
import { insforge } from '../lib/insforge';
import { useAuth } from '../contexts/AuthContext';
import CmsManager from '../components/CmsManager';

type Panel = 'projects' | 'cms';

const emptyForm = {
  title: '',
  year: '',
  location: '',
  description: '',
  client: '',
  duration: '',
  scope: '',
};

export default function Dashboard() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [uploading, setUploading] = useState(false);
  const [activePanel, setActivePanel] = useState<Panel>('projects');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [query, setQuery] = useState('');
  const [formData, setFormData] = useState(emptyForm);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);

  const isEditMode = Boolean(editingProject);
  const visibleProjects = projects.filter((project) => !project.is_hidden).length;
  const hiddenProjects = projects.length - visibleProjects;
  const filteredProjects = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return projects;
    return projects.filter((project) =>
      [project.title, project.location, project.client, project.year].some((value) =>
        String(value ?? '').toLowerCase().includes(term),
      ),
    );
  }, [projects, query]);

  useEffect(() => {
    if (user) fetchProjects();
  }, [user]);

  const fetchProjects = async () => {
    setLoading(true);
    const { data } = await insforge.database.from('projects').select('*').order('created_at', { ascending: false });
    if (data) setProjects(data);
    setLoading(false);
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setMainImage(null);
    setGalleryImages([]);
  };

  const openCreate = () => {
    setEditingProject(null);
    resetForm();
    setIsAdding(true);
  };

  const openEdit = (project: any) => {
    setEditingProject(project);
    setFormData({
      title: project.title ?? '',
      year: project.year ?? '',
      location: project.location ?? '',
      description: project.description ?? '',
      client: project.client ?? '',
      duration: project.duration ?? '',
      scope: Array.isArray(project.scope) ? project.scope.join(', ') : '',
    });
    setMainImage(null);
    setGalleryImages([]);
    setIsAdding(true);
  };

  const closeForm = () => {
    setIsAdding(false);
    setEditingProject(null);
    resetForm();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const rehydrateAccessTokenFromStorage = () => {
    try {
      const raw = window.localStorage.getItem('insforge_session');
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (typeof parsed?.accessToken === 'string') insforge.setAccessToken(parsed.accessToken);
      if (parsed?.user) (insforge as any).tokenManager?.setUser?.(parsed.user);
    } catch {
    }
  };

  const randomId = () => {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
    return `${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`;
  };

  const makeUploadKey = (prefix: string, kind: string, file: File) => {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    return `${prefix}/${kind}-${randomId()}-${safeName}`;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const existingMainImage = typeof editingProject?.main_image === 'string' ? editingProject.main_image : '';
    const existingGallery = Array.isArray(editingProject?.gallery) ? editingProject.gallery : [];

    if (!mainImage && !existingMainImage) {
      alert('Selecciona una imagen principal.');
      return;
    }
    if (galleryImages.length === 0 && existingGallery.length === 0) {
      alert('Selecciona al menos una imagen para la galeria.');
      return;
    }

    setUploading(true);
    rehydrateAccessTokenFromStorage();
    const { data: currentUserData, error: currentUserError } = await insforge.auth.getCurrentUser();
    if (currentUserError || !currentUserData?.user) {
      alert('Tu sesion expiro. Vuelve a iniciar sesion para subir archivos.');
      setUploading(false);
      return;
    }

    const uploadPrefix = isEditMode ? `projects/${editingProject!.id}` : `projects/${Date.now()}-${randomId()}`;
    let imageUrl = editingProject?.main_image ?? '';

    if (mainImage) {
      const { data, error } = await insforge.storage
        .from('project-images')
        .upload(makeUploadKey(uploadPrefix, 'main', mainImage), mainImage);
      if (error || !data) {
        alert(`Error subiendo la imagen principal${error?.message ? `: ${error.message}` : '.'}`);
        setUploading(false);
        return;
      }
      imageUrl = insforge.storage.from('project-images').getPublicUrl(data.key);
    }

    let galleryUrls: string[] = Array.isArray(editingProject?.gallery) ? editingProject.gallery : [];
    if (galleryImages.length > 0) {
      const nextGalleryUrls: string[] = [];
      for (const file of galleryImages) {
        const { data, error } = await insforge.storage
          .from('project-images')
          .upload(makeUploadKey(uploadPrefix, 'gallery', file), file);
        if (error || !data) {
          alert(`Error subiendo la galeria (${file.name})${error?.message ? `: ${error.message}` : '.'}`);
          setUploading(false);
          return;
        }
        nextGalleryUrls.push(insforge.storage.from('project-images').getPublicUrl(data.key));
      }
      galleryUrls = nextGalleryUrls;
    }

    const payload = {
      ...formData,
      main_image: imageUrl,
      gallery: galleryUrls,
      scope: formData.scope.split(',').map((item) => item.trim()).filter(Boolean),
    };

    const { error } = isEditMode
      ? await insforge.database.from('projects').update(payload).match({ id: editingProject!.id })
      : await insforge.database.from('projects').insert([{ ...payload, is_hidden: false }]);

    if (error) {
      alert(error.message || 'Error guardando el proyecto.');
    } else {
      closeForm();
      fetchProjects();
    }
    setUploading(false);
  };

  const handleToggleHidden = async (project: any) => {
    const { error } = await insforge.database.from('projects').update({ is_hidden: !project.is_hidden }).match({ id: project.id });
    if (!error) fetchProjects();
    else alert(error.message || 'Error actualizando el estado del proyecto.');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Eliminar este proyecto permanentemente?')) return;
    const { error } = await insforge.database.from('projects').delete().match({ id });
    if (!error) fetchProjects();
    else alert(error.message || 'Error eliminando el proyecto.');
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-100"><Loader2 className="w-10 h-10 animate-spin text-industrial-cyan" /></div>;
  }
  if (!user) return <Navigate to="/login" replace />;

  const navItems = [
    { id: 'projects' as Panel, label: 'Proyectos', icon: LayoutDashboard, description: 'Portafolio publico' },
    { id: 'cms' as Panel, label: 'CMS Web', icon: FileText, description: 'Contenido y SEO' },
  ];

  return (
    <div className="min-h-screen bg-[#eef2f7] text-carbon">
      <aside className={`fixed inset-y-0 left-0 z-40 bg-white border-r border-slate-200 shadow-sm transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-72'}`}>
        <div className="h-full flex flex-col">
          <div className="h-20 px-5 flex items-center justify-between border-b border-slate-100">
            <div className={`min-w-0 ${sidebarCollapsed ? 'hidden' : 'block'}`}>
              <p className="font-display font-bold text-lg text-hyundai-navy">Emingser CMS</p>
              <p className="text-xs text-slate-400">Panel administrativo</p>
            </div>
            <button onClick={() => setSidebarCollapsed((value) => !value)} className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-hyundai-navy">
              {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>

          <nav className="flex-1 px-3 py-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePanel(item.id)}
                className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all ${activePanel === item.id ? 'bg-hyundai-navy text-white shadow-lg shadow-hyundai-navy/20' : 'text-slate-500 hover:bg-slate-50 hover:text-hyundai-navy'}`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!sidebarCollapsed && (
                  <span className="min-w-0">
                    <span className="block font-bold text-sm">{item.label}</span>
                    <span className={`block text-xs ${activePanel === item.id ? 'text-white/60' : 'text-slate-400'}`}>{item.description}</span>
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="px-4 py-5 border-t border-slate-100">
            {!sidebarCollapsed && (
              <div className="mb-4 rounded-2xl bg-slate-50 border border-slate-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-industrial-cyan text-white flex items-center justify-center font-bold">
                    {String(user?.email ?? 'A').charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-700 truncate">{user?.email ?? 'Administrador'}</p>
                    <p className="text-xs text-slate-400">Super admin</p>
                  </div>
                </div>
              </div>
            )}
            <button onClick={signOut} className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-slate-500 hover:text-red-500 hover:bg-red-50">
              <LogOut className="w-5 h-5" />
              {!sidebarCollapsed && <span className="font-bold text-sm">Salir</span>}
            </button>
            {!sidebarCollapsed && <p className="mt-5 text-[11px] text-slate-400">CMS desarrollado por Nocodeveloper</p>}
          </div>
        </div>
      </aside>

      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'pl-20' : 'pl-72'}`}>
        <div className="min-h-screen px-6 py-6 lg:px-10">
          <header className="h-20 bg-white border border-slate-200 rounded-3xl px-5 md:px-8 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarCollapsed((value) => !value)} className="lg:hidden w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500">
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-industrial-cyan">Super admin</p>
                <h1 className="font-display font-bold text-2xl text-carbon">{activePanel === 'projects' ? 'Gestion de proyectos' : 'Centro de contenido'}</h1>
              </div>
            </div>
            {activePanel === 'projects' && (
              <button onClick={() => (isAdding ? closeForm() : openCreate())} className="bg-industrial-cyan hover:bg-hyundai-navy text-white px-5 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-industrial-cyan/20">
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">{isAdding ? 'Cancelar' : 'Nuevo proyecto'}</span>
              </button>
            )}
          </header>

          {activePanel === 'projects' ? (
            <section className="mt-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { label: 'Total proyectos', value: projects.length, icon: BarChart3, tone: 'bg-hyundai-navy text-white' },
                  { label: 'Publicados', value: visibleProjects, icon: Eye, tone: 'bg-white text-hyundai-navy' },
                  { label: 'Ocultos', value: hiddenProjects, icon: EyeOff, tone: 'bg-white text-hyundai-navy' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">{stat.label}</p>
                      <p className="mt-2 text-4xl font-display font-bold text-carbon">{stat.value}</p>
                    </div>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.tone}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                ))}
              </div>

              {isAdding && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h2 className="font-display font-bold text-2xl text-carbon">{isEditMode ? 'Editar proyecto' : 'Crear proyecto'}</h2>
                      <p className="text-sm text-slate-400">Solo contenido, imagenes y datos descriptivos.</p>
                    </div>
                    <button onClick={closeForm} className="text-sm font-bold text-slate-400 hover:text-red-500">Cerrar</button>
                  </div>
                  <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Titulo"><input name="title" required value={formData.title} onChange={handleInputChange} className="admin-input" /></Field>
                      <Field label="Ano"><input name="year" value={formData.year} onChange={handleInputChange} className="admin-input" /></Field>
                      <Field label="Ubicacion"><input name="location" value={formData.location} onChange={handleInputChange} className="admin-input" /></Field>
                      <Field label="Cliente"><input name="client" value={formData.client} onChange={handleInputChange} className="admin-input" /></Field>
                      <Field label="Duracion"><input name="duration" value={formData.duration} onChange={handleInputChange} className="admin-input" /></Field>
                      <Field label="Alcance"><textarea name="scope" rows={3} value={formData.scope} onChange={handleInputChange} placeholder="Diseno, construccion, puesta en marcha" className="admin-input" /></Field>
                      <div className="md:col-span-2"><Field label="Descripcion"><textarea name="description" rows={5} value={formData.description} onChange={handleInputChange} className="admin-input" /></Field></div>
                    </div>
                    <div className="lg:col-span-5 space-y-4">
                      <UploadBox label="Imagen principal" text={mainImage ? mainImage.name : (isEditMode ? 'Reemplazar imagen' : 'Subir imagen')} onChange={(file) => setMainImage(file)} required={!isEditMode} />
                      <UploadBox label="Galeria" text={galleryImages.length > 0 ? `${galleryImages.length} archivo(s) seleccionados` : (isEditMode ? 'Reemplazar galeria' : 'Subir imagenes')} multiple onChange={(_, files) => setGalleryImages(files ?? [])} required={!isEditMode} />
                      <button type="submit" disabled={uploading} className="w-full bg-hyundai-navy hover:bg-carbon text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-60">
                        {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                        {isEditMode ? 'Guardar cambios' : 'Guardar proyecto'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display font-bold text-2xl text-carbon">Portafolio</h2>
                    <p className="text-sm text-slate-400">Administra visibilidad, imagenes y datos publicos.</p>
                  </div>
                  <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar proyecto..." className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-industrial-cyan text-slate-700" />
                  </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {loading ? (
                    Array(3).fill(0).map((_, index) => <div key={index} className="h-80 bg-slate-100 animate-pulse rounded-3xl" />)
                  ) : filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                      <article key={project.id} className="border border-slate-200 rounded-3xl overflow-hidden bg-white hover:shadow-xl transition-shadow">
                        <div className="h-48 bg-slate-100 relative">
                          {project.main_image ? <img src={project.main_image} alt={project.title} className="w-full h-full object-cover" /> : <div className="h-full flex items-center justify-center text-slate-400"><ImagePlus className="w-8 h-8" /></div>}
                          <span className={`absolute left-4 top-4 px-3 py-1 rounded-full text-xs font-bold ${project.is_hidden ? 'bg-carbon/80 text-white' : 'bg-emerald-500 text-white'}`}>{project.is_hidden ? 'Oculto' : 'Publicado'}</span>
                          <div className="absolute top-4 right-4 flex gap-2">
                            <IconButton onClick={() => openEdit(project)}><Pencil className="w-4 h-4" /></IconButton>
                            <IconButton onClick={() => handleToggleHidden(project)}>{project.is_hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</IconButton>
                            <IconButton danger onClick={() => handleDelete(project.id)}><Trash2 className="w-4 h-4" /></IconButton>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-display font-bold text-lg text-carbon line-clamp-1">{project.title}</h3>
                          <p className="mt-2 text-sm text-slate-500 line-clamp-2 min-h-[40px]">{project.description}</p>
                          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
                            <span>{project.year || 'N/A'}</span>
                            <span>{project.location || 'N/A'}</span>
                          </div>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="col-span-full py-16 text-center text-slate-400">No hay proyectos para mostrar.</div>
                  )}
                </div>
              </div>
            </section>
          ) : (
            <section className="mt-8">
              <CmsManager />
            </section>
          )}
        </div>
      </main>

      <style>{`
        .admin-input {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgb(226 232 240);
          background: rgb(248 250 252);
          padding: 0.875rem 1rem;
          color: rgb(15 23 42);
          outline: none;
        }
        .admin-input:focus {
          box-shadow: 0 0 0 2px #0EA5E9;
          background: white;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{label}</span>
      {children}
    </label>
  );
}

function UploadBox({
  label,
  text,
  multiple,
  required,
  onChange,
}: {
  label: string;
  text: string;
  multiple?: boolean;
  required?: boolean;
  onChange: (file?: File, files?: File[]) => void;
}) {
  return (
    <Field label={label}>
      <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-5 text-center text-slate-500 hover:bg-white">
        <Upload className="w-6 h-6 text-industrial-cyan" />
        <span className="text-sm font-bold">{text}</span>
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          required={required}
          className="hidden"
          onChange={(event) => {
            const files = event.target.files ? Array.from(event.target.files) : [];
            onChange(files[0], files);
          }}
        />
      </label>
    </Field>
  );
}

function IconButton({ children, onClick, danger = false }: { children: React.ReactNode; onClick: () => void; danger?: boolean }) {
  return (
    <button onClick={onClick} className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-sm transition-colors ${danger ? 'bg-white/90 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-white/90 text-slate-600 hover:bg-hyundai-navy hover:text-white'}`}>
      {children}
    </button>
  );
}
