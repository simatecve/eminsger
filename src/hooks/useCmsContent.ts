import { useEffect, useState } from 'react';
import { fetchCmsBlocks, getCmsBlock, getCmsItems } from '../lib/cms';
import type { CmsBlock } from '../data/cmsDefaults';

export function useCmsContent() {
  const [blocks, setBlocks] = useState<CmsBlock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchCmsBlocks(false).then((nextBlocks) => {
      if (!mounted) return;
      setBlocks(nextBlocks);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return {
    blocks,
    loading,
    block: (section: string, itemKey = 'main') => getCmsBlock(blocks, section, itemKey),
    items: (section: string) => getCmsItems(blocks, section),
  };
}
