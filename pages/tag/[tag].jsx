import { getAllPages, getAllTagsFromPosts } from '@/lib/notion';
import Container from '@/components/Container';
import Tags from '@/components/Tags';
import BlogPostLink from '@/components/BlogPostLink';

export default function Tag({ tags, posts, currentTag }) {
  let filteredBlogPosts = [];

  filteredBlogPosts = posts.filter(post => {
    const tagContent = post.tags ? post.tags.join(' ') : '';
    const searchContent = post.title + tagContent;
    return searchContent.toLowerCase();
  });

  return (
    <Container>
      <Tags tags={tags} currentTag={currentTag} />
      <div className='article-container my-8'>
        {!filteredBlogPosts.length && <p className='text-gray-500 dark:text-gray-300'>No posts found.</p>}
        {filteredBlogPosts.slice(0, 20).map(post => (
          <BlogPostLink key={post.id} post={post} />
        ))}
      </div>
    </Container>
  );
}

export async function getStaticProps({ params }) {
  const currentTag = params.tag;
  const posts = await getAllPages({ allowedTypes: ['Post'] });
  const tags = getAllTagsFromPosts(posts);
  const filteredPosts = posts.filter(post => post && post.tags && post.tags.includes(currentTag));
  return {
    props: {
      tags,
      posts: filteredPosts,
      currentTag,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const posts = await getAllPages({ allowedTypes: ['Post'] });
  const tags = getAllTagsFromPosts(posts);
  return {
    paths: Object.keys(tags).map(tag => ({ params: { tag } })),
    fallback: true,
  };
}
