export default function filterPages({ pages, allowedTypes = ['Post'], allowedStatuses = ['Published'] }) {
  if (!pages || !pages.length) return [];

  return pages
    .filter(page => allowedTypes.includes(page.type))
    .filter(
      page =>
        page.title &&
        page.slug &&
        page.lang &&
        page.category &&
        allowedStatuses.includes(page.status) &&
        page.date <= new Date(),
    );
}