import { useEffect, useMemo, useState } from 'react';
import { Eye, EyeOff, Loader2, Plus, Save, Trash2, Upload } from 'lucide-react';
import { deleteCmsBlock, fetchCmsBlocks, saveCmsBlock, uploadCmsAsset, type CmsDraft } from '../lib/cms';
import type { CmsBlock } from '../data/cmsDefaults';

type Field = {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'array' | 'url' | 'media' | 'select';
  options?: string[];
};

type CmsSection = {
  id: string;
  title: string;
  description: string;
  sections: string[];
  fields: Field[];
  collection?: boolean;
  addSection?: string;
  newContent?: Record<string, any>;
};

const cmsSections: CmsSection[] = [
  {
    id: 'home',
    title: 'Inicio',
    description: 'Hero, videos o imagenes de fondo, terminal, metricas, caracteristicas y especialidades.',
    sections: ['home.hero', 'home.heroMedia', 'home.statusMessages', 'home.metrics', 'home.featuresIntro', 'home.features', 'home.specialtiesIntro', 'home.specialties'],
    collection: true,
    addSection: 'home.heroMedia',
    newContent: { type: 'video', url: '' },
    fields: [
      { key: 'titlePrefix', label: 'Titulo corto' },
      { key: 'titleMain', label: 'Titulo principal' },
      { key: 'description', label: 'Descripcion', type: 'textarea' },
      { key: 'primaryCta', label: 'CTA principal' },
      { key: 'secondaryCta', label: 'CTA secundario' },
      { key: 'type', label: 'Tipo multimedia', type: 'select', options: ['video', 'image'] },
      { key: 'url', label: 'URL multimedia', type: 'media' },
      { key: 'text', label: 'Texto' },
      { key: 'title', label: 'Titulo' },
      { key: 'bannerTitle', label: 'Titulo banner' },
      { key: 'bannerDescription', label: 'Descripcion banner', type: 'textarea' },
      { key: 'bannerCta', label: 'Texto boton banner' },
      { key: 'projectsLabel', label: 'Etiqueta proyectos' },
      { key: 'projectsValue', label: 'Numero proyectos' },
      { key: 'mwLabel', label: 'Etiqueta MW' },
      { key: 'mwValue', label: 'Numero MW' },
      { key: 'clientsLabel', label: 'Etiqueta clientes' },
      { key: 'clientsValue', label: 'Numero clientes' },
      { key: 'efficiencyLabel', label: 'Etiqueta eficiencia' },
      { key: 'efficiencyValue', label: 'Valor eficiencia' },
      { key: 'partnerTitle', label: 'Partner titulo' },
      { key: 'partnerSubtitle', label: 'Partner subtitulo' },
      { key: 'certification', label: 'Certificacion' },
      { key: 'content', label: 'Contenido corto', type: 'textarea' },
      { key: 'bgImage', label: 'Imagen de fondo', type: 'media' },
      { key: 'link', label: 'Enlace' },
    ],
  },
  {
    id: 'about',
    title: 'Nosotros',
    description: 'Encabezado, mision, vision, valores, slogan e historia.',
    sections: ['about.header', 'about.cards', 'about.valuesIntro', 'about.values', 'about.history'],
    collection: true,
    addSection: 'about.values',
    newContent: { text: '' },
    fields: [
      { key: 'title', label: 'Titulo' },
      { key: 'paragraphs', label: 'Parrafos', type: 'array' },
      { key: 'description', label: 'Descripcion', type: 'textarea' },
      { key: 'text', label: 'Texto' },
      { key: 'slogan', label: 'Slogan' },
      { key: 'historyTitle', label: 'Titulo historia' },
    ],
  },
  {
    id: 'services',
    title: 'Servicios',
    description: 'Encabezado y contenido de cada servicio.',
    sections: ['services.header', 'services.items'],
    collection: true,
    addSection: 'services.items',
    newContent: { id: '', title: '', descriptions: [], list: [] },
    fields: [
      { key: 'eyebrow', label: 'Etiqueta superior' },
      { key: 'title', label: 'Titulo' },
      { key: 'description', label: 'Descripcion', type: 'textarea' },
      { key: 'id', label: 'Ancla interna' },
      { key: 'descriptions', label: 'Parrafos', type: 'array' },
      { key: 'list', label: 'Lista de capacidades', type: 'array' },
    ],
  },
  {
    id: 'branches',
    title: 'Sucursales',
    description: 'Encabezado y sucursales visibles en la web.',
    sections: ['branches.header', 'branches.items'],
    collection: true,
    addSection: 'branches.items',
    newContent: { country: '', flag: '', address: '', contact: '', email: '', phone: '', website: '' },
    fields: [
      { key: 'title', label: 'Titulo' },
      { key: 'description', label: 'Descripcion', type: 'textarea' },
      { key: 'country', label: 'Pais' },
      { key: 'flag', label: 'Codigo bandera o texto' },
      { key: 'address', label: 'Direccion', type: 'textarea' },
      { key: 'contact', label: 'Contacto' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Telefono' },
      { key: 'website', label: 'Website' },
    ],
  },
  {
    id: 'footer',
    title: 'Footer',
    description: 'Descripcion, contacto y enlaces sociales del pie de pagina.',
    sections: ['footer.main'],
    fields: [
      { key: 'description', label: 'Descripcion', type: 'textarea' },
      { key: 'contactCountry', label: 'Pais contacto' },
      { key: 'phone', label: 'Telefono' },
      { key: 'email', label: 'Email' },
      { key: 'copyright', label: 'Copyright' },
      { key: 'linkedinUrl', label: 'LinkedIn URL' },
      { key: 'mailUrl', label: 'Mail URL' },
    ],
  },
];

const valueToInput = (value: any, type?: Field['type']) => {
  if (type === 'array') return Array.isArray(value) ? value.join('\n') : '';
  return value ?? '';
};

const inputToValue = (value: string, type?: Field['type']) => {
  if (type === 'array') return value.split('\n').map((item) => item.trim()).filter(Boolean);
  return value;
};

const fieldsForBlock = (fields: Field[], block: CmsBlock) =>
  fields.filter((field) => Object.prototype.hasOwnProperty.call(block.content, field.key));

export default function CmsManager() {
  const [blocks, setBlocks] = useState<CmsBlock[]>([]);
  const [active, setActive] = useState(cmsSections[0].id);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState('');
  const [error, setError] = useState('');

  const activeConfig = cmsSections.find((section) => section.id === active)!;
  const visibleBlocks = useMemo(
    () => blocks.filter((block) => activeConfig.sections.includes(block.section)).sort((a, b) => a.section.localeCompare(b.section) || a.sort_order - b.sort_order),
    [blocks, activeConfig],
  );

  const load = async () => {
    setLoading(true);
    setBlocks(await fetchCmsBlocks(true));
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateBlock = (target: CmsBlock, patch: Partial<CmsDraft>) => {
    setBlocks((current) => current.map((block) => (block === target ? { ...block, ...patch } : block)));
  };

  const updateContent = (target: CmsBlock, field: Field, value: string) => {
    updateBlock(target, {
      content: {
        ...target.content,
        [field.key]: inputToValue(value, field.type),
      },
    });
  };

  const handleSave = async (block: CmsBlock) => {
    setSavingKey(`${block.section}:${block.item_key}`);
    setError('');
    const { error: saveError } = await saveCmsBlock(block);
    if (saveError) setError(saveError.message || 'No se pudo guardar el contenido.');
    await load();
    setSavingKey('');
  };

  const handleDelete = async (block: CmsBlock) => {
    if (!confirm('Eliminar este contenido del CMS?')) return;
    setSavingKey(`${block.section}:${block.item_key}`);
    const { error: deleteError } = await deleteCmsBlock(block);
    if (deleteError) setError(deleteError.message || 'No se pudo eliminar el contenido.');
    await load();
    setSavingKey('');
  };

  const handleUpload = async (block: CmsBlock, field: Field, file?: File) => {
    if (!file) return;
    setSavingKey(`${block.section}:${block.item_key}`);
    const { url, error: uploadError } = await uploadCmsAsset(file);
    if (uploadError) setError(uploadError.message || 'No se pudo subir el archivo.');
    if (url) updateContent(block, field, url);
    setSavingKey('');
  };

  const addBlock = () => {
    const section = activeConfig.addSection ?? activeConfig.sections.find((item) => item.endsWith('.items')) ?? activeConfig.sections[0];
    const now = Date.now();
    const draft: CmsBlock = {
      section,
      item_key: `nuevo-${now}`,
      label: 'Nuevo contenido',
      sort_order: visibleBlocks.length,
      is_hidden: false,
      content: activeConfig.newContent ?? Object.fromEntries(activeConfig.fields.slice(0, 4).map((field) => [field.key, field.type === 'array' ? [] : ''])),
    };
    setBlocks((current) => [...current, draft]);
  };

  if (loading) {
    return <div className="py-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-industrial-cyan" /></div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display font-bold text-3xl text-carbon">CMS de Contenido</h2>
        <p className="text-slate-500 mt-2">Edita solo textos y multimedia. El orden visual y las secciones publicas permanecen fijos.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {cmsSections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActive(section.id)}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${active === section.id ? 'bg-hyundai-navy text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            {section.title}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-display font-bold text-2xl text-carbon">{activeConfig.title}</h3>
            <p className="text-slate-500">{activeConfig.description}</p>
          </div>
          {activeConfig.collection && (
            <button onClick={addBlock} className="bg-industrial-cyan text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2">
              <Plus className="w-5 h-5" /> Nuevo
            </button>
          )}
        </div>

        {error && <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">{error}</div>}

        <div className="space-y-6">
          {visibleBlocks.map((block) => {
            const blockFields = fieldsForBlock(activeConfig.fields, block);
            const key = `${block.section}:${block.item_key}`;
            return (
              <div key={key} className="border border-slate-200 rounded-2xl p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                  <div className="grid md:grid-cols-3 gap-3 flex-1">
                    <input value={block.label} onChange={(e) => updateBlock(block, { label: e.target.value })} className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700" />
                    <input value={block.section} disabled className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-400" />
                    <input value={block.sort_order} type="number" onChange={(e) => updateBlock(block, { sort_order: Number(e.target.value) })} className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => updateBlock(block, { is_hidden: !block.is_hidden })} className="p-3 rounded-xl border border-slate-200 text-slate-600">
                      {block.is_hidden ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                    <button onClick={() => handleSave(block)} className="p-3 rounded-xl bg-hyundai-navy text-white">
                      {savingKey === key ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    </button>
                    <button onClick={() => handleDelete(block)} className="p-3 rounded-xl bg-red-50 text-red-500">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {blockFields.map((field) => (
                    <label key={field.key} className="block">
                      <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">{field.label}</span>
                      {field.type === 'textarea' || field.type === 'array' ? (
                        <textarea
                          rows={field.type === 'array' ? 5 : 3}
                          value={valueToInput(block.content[field.key], field.type)}
                          onChange={(e) => updateContent(block, field, e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-700"
                        />
                      ) : field.type === 'select' ? (
                        <select value={valueToInput(block.content[field.key], field.type)} onChange={(e) => updateContent(block, field, e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-700">
                          {field.options?.map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            value={valueToInput(block.content[field.key], field.type)}
                            onChange={(e) => updateContent(block, field, e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-700"
                          />
                          {field.type === 'media' && (
                            <label className="p-3 rounded-xl bg-slate-100 text-slate-600 cursor-pointer">
                              <Upload className="w-5 h-5" />
                              <input type="file" className="hidden" accept="image/*,video/*" onChange={(e) => handleUpload(block, field, e.target.files?.[0])} />
                            </label>
                          )}
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
