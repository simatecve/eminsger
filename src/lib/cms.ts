import { insforge } from './insforge';
import { cmsDefaults, type CmsBlock } from '../data/cmsDefaults';

export type CmsDraft = Omit<CmsBlock, 'id'> & { id?: string };

const TABLE = 'cms_content_blocks';
const BUCKET = 'cms-assets';

const asBlock = (row: any): CmsBlock => ({
  id: row.id,
  section: row.section,
  item_key: row.item_key,
  label: row.label,
  content: row.content ?? {},
  is_hidden: Boolean(row.is_hidden),
  sort_order: Number(row.sort_order ?? 0),
});

export async function fetchCmsBlocks(includeHidden = false): Promise<CmsBlock[]> {
  const { data, error } = await insforge.database.from(TABLE).select('*').order('sort_order', { ascending: true });

  if (error || !Array.isArray(data)) {
    return cmsDefaults.filter((block) => includeHidden || !block.is_hidden);
  }

  const rows = data.map(asBlock);
  const byKey = new Map(rows.map((block) => [`${block.section}:${block.item_key}`, block]));
  const merged = [
    ...cmsDefaults.map((fallback) => byKey.get(`${fallback.section}:${fallback.item_key}`) ?? fallback),
    ...rows.filter((row) => !cmsDefaults.some((fallback) => fallback.section === row.section && fallback.item_key === row.item_key)),
  ];

  return merged
    .filter((block) => includeHidden || !block.is_hidden)
    .sort((a, b) => a.section.localeCompare(b.section) || a.sort_order - b.sort_order);
}

export function getCmsBlock(blocks: CmsBlock[], section: string, itemKey = 'main') {
  return blocks.find((block) => block.section === section && block.item_key === itemKey && !block.is_hidden)
    ?? cmsDefaults.find((block) => block.section === section && block.item_key === itemKey);
}

export function getCmsItems(blocks: CmsBlock[], section: string) {
  const items = blocks.filter((block) => block.section === section && !block.is_hidden);
  if (items.length > 0) {
    return items.sort((a, b) => a.sort_order - b.sort_order);
  }
  return cmsDefaults.filter((block) => block.section === section && !block.is_hidden).sort((a, b) => a.sort_order - b.sort_order);
}

export async function saveCmsBlock(block: CmsDraft) {
  const payload = {
    section: block.section,
    item_key: block.item_key,
    label: block.label,
    content: block.content,
    is_hidden: block.is_hidden,
    sort_order: block.sort_order,
  };

  if (block.id) {
    return insforge.database.from(TABLE).update(payload).match({ id: block.id });
  }

  const existing = await insforge.database
    .from(TABLE)
    .select('id')
    .eq('section', block.section)
    .eq('item_key', block.item_key)
    .single();

  if (existing.data?.id) {
    return insforge.database.from(TABLE).update(payload).match({ id: existing.data.id });
  }

  return insforge.database.from(TABLE).insert([payload]);
}

export async function deleteCmsBlock(block: CmsBlock) {
  if (!block.id) {
    return saveCmsBlock({ ...block, is_hidden: true });
  }
  return insforge.database.from(TABLE).delete().match({ id: block.id });
}

export async function uploadCmsAsset(file: File) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const key = `cms/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
  const { data, error } = await insforge.storage.from(BUCKET).upload(key, file);
  if (error || !data) return { url: '', key: '', error };
  return { url: insforge.storage.from(BUCKET).getPublicUrl(data.key), key: data.key, error: null };
}
