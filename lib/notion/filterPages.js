export default function filterPages({ pages, allowedTypes = ['Post'], allowedStatuses = ['Published'] }) {
  if (!pages || !pages.length) return [];

  return pages
    .filter(page => allowedTypes.includes(page?.type?.[0]))
    .filter(
      page =>
        page.title && page.slug && page.lang && allowedStatuses.includes(page?.status?.[0]) && page.date <= new Date(),
    );
}
