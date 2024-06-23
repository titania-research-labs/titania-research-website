export default function filterPublishedPages({ pages, allowedTypes = ['Post'] }) {
  if (!pages || !pages.length) return [];

  return pages
    .filter(page => allowedTypes.includes(page?.type?.[0]))
    .filter(page => page.title && page.slug && page?.status?.[0] === 'Published' && page.date <= new Date());
}
