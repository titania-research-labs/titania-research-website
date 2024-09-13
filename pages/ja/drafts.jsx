import { clientConfig } from '@/lib/server/config';

import Container from '@/components/Container';
import { getAllPages } from '@/lib/notion';
import { useConfig } from '@/lib/config';
import BlogPostLink from '@/components/BlogPostLink';

export default function Drafts({ postsToShow }) {
  const { title, description } = useConfig();

  return (
    <Container title={title} description={description}>
      {postsToShow.map(post => (
        <BlogPostLink key={post.id} post={post} />
      ))}
    </Container>
  );
}

export async function getStaticProps() {
  const posts = await getAllPages({ allowedTypes: ['Top', 'Post', 'Event', 'Single'], allowedStatuses: ['Draft'], allowedLang: 'ja' });
  const postsToShow = posts.slice(0, clientConfig.postsPerPage);

  return {
    props: {
      postsToShow,
    },
    revalidate: 1,
  };
}
