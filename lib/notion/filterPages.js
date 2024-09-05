export default function filterPages({ pages, allowedTypes, allowedStatuses, allowedLang }) {
  if (!pages || !pages.length) return [];

  return pages.filter(
    page =>
      page.title &&
      page.slug &&
      page.category &&
      allowedStatuses.includes(page.status) &&
      allowedTypes.includes(page.type) &&
      page.lang === allowedLang &&
      page.date <= new Date(),
  );
}
