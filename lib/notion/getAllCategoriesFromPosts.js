export function getAllCategoriesFromPosts(posts) {
  const categories = [...posts.map(p => p.category).flat()];
  const categoryCount = {};
  categories.forEach(tag => {
    if (tag in categoryCount) {
      categoryCount[tag]++;
    } else {
      categoryCount[tag] = 1;
    }
  });
  return categoryCount;
}
