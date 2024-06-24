import { config } from '@/lib/server/config';

import Container from '@/components/Container';
import Pagination from '@/components/Pagination';
import { getAllPages } from '@/lib/notion';
import BlogPostLink from '@/components/BlogPostLink';

const Page = ({ postsToShow, page, showNext }) => {
  return (
    <Container>
      {postsToShow && postsToShow.map(post => <BlogPostLink key={post.id} post={post} />)}
      <Pagination page={page} showNext={showNext} />
    </Container>
  );
};

export async function getStaticProps(context) {
  const { page } = context.params; // Get Current Page No.
  const posts = await getAllPages({ allowedTypes: ['Post'] });
  const postsToShow = posts.slice(config.postsPerPage * (page - 1), config.postsPerPage * page);
  const totalPosts = posts.length;
  const showNext = page * config.postsPerPage < totalPosts;

  return {
    props: {
      page, // Current Page
      postsToShow,
      showNext,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const posts = await getAllPages({ allowedTypes: ['Post'] });
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / config.postsPerPage);
  return {
    // remove first page, we 're not gonna handle that.
    paths: Array.from({ length: totalPages - 1 }, (_, i) => ({
      params: { page: '' + (i + 2) },
    })),
    fallback: true,
  };
}

export default Page;
