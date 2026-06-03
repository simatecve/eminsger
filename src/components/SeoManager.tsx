import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCmsContent } from '../hooks/useCmsContent';

const setMeta = (selector: string, attribute: 'name' | 'property', value: string, content?: string) => {
  if (!content) return;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

export default function SeoManager() {
  const location = useLocation();
  const cms = useCmsContent();

  useEffect(() => {
    const pathname = location.pathname === '/' ? '/' : `/${location.pathname.split('/').filter(Boolean)[0]}`;
    const seo = cms.items('seo.pages').find((item) => item.content.path === pathname)?.content;
    if (!seo) return;

    if (seo.title) document.title = seo.title;
    setMeta('meta[name="description"]', 'name', 'description', seo.description);
    setMeta('meta[name="keywords"]', 'name', 'keywords', seo.keywords);
    setMeta('meta[property="og:title"]', 'property', 'og:title', seo.ogTitle || seo.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', seo.ogDescription || seo.description);
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMeta('meta[property="og:url"]', 'property', 'og:url', window.location.href);
    setMeta('meta[property="og:image"]', 'property', 'og:image', seo.ogImage);
  }, [cms.blocks, location.pathname]);

  return null;
}
