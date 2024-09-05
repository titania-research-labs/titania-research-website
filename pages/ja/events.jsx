import { clientConfig } from '@/lib/server/config';

import Container from '@/components/Container';
import Pagination from '@/components/Pagination';
import { getAllPages } from '@/lib/notion';
import { useConfig } from '@/lib/config';
import BlogPostLink from '@/components/BlogPostLink';

export default function Events({ postsToShow, page, showNext }) {
  const { title, description } = useConfig();

  return (
    <Container title={title} description={description}>
      {postsToShow.map(post => (
        <BlogPostLink key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} blogOrEvents={'events'} />}
    </Container>
  );
}

export async function getStaticProps() {
  const posts = await getAllPages({ allowedTypes: ['Event'], allowedStatuses: ['Published'] });
  const postsToShow = posts.slice(0, clientConfig.postsPerPage);
  const totalPosts = posts.length;
  const showNext = totalPosts > clientConfig.postsPerPage;
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext,
    },
    revalidate: 1,
  };
}
