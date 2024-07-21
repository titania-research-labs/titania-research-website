import { getAllPages, getAllCategoriesFromPosts } from '@/lib/notion';
import CategoryLayout from '@/layouts/category';

export default function Tag({ allCategories, posts, currentCategory }) {
  return <CategoryLayout allCategories={allCategories} posts={posts} currentCategory={currentCategory} />;
}

export async function getStaticProps({ params }) {
  const currentCategory = params.category;
  const posts = await getAllPages({ allowedTypes: ['Post'], allowedStatuses: ['Published'] });
  const allCategories = getAllCategoriesFromPosts(posts);
  const filteredPosts = posts.filter(post => post && post.tags && post.tags.includes(currentCategory));
  return {
    props: {
      allCategories,
      posts: filteredPosts,
      currentCategory,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const posts = await getAllPages({ allowedTypes: ['Post'], allowedStatuses: ['Published'] });
  const allCategories = getAllCategoriesFromPosts(posts);
  return {
    paths: Object.keys(allCategories).map(category => ({ params: { category } })),
    fallback: true,
  };
}
