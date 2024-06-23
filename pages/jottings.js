import { clientConfig } from '@/lib/server/config';

import Container from '@/components/Container';
import BlogPost from '@/components/BlogPost';
import Pagination from '@/components/Pagination';
import { useConfig } from '@/lib/config';
import { getAllPages } from '@/lib/notion';

export async function getStaticProps() {
  const jottings = await getAllPages({ allowedTypes: ['Jotting'] });
  const jottingsToShow = jottings.slice(0, clientConfig.postsPerPage);
  const totalJottings = jottings.length;
  const showNext = totalJottings > clientConfig.postsPerPage;
  return {
    props: {
      page: 1, // current page is 1
      jottingsToShow,
      showNext,
    },
    revalidate: 1,
  };
}

export default function Jottings({ jottingsToShow, page, showNext }) {
  const { title, description } = useConfig();

  return (
    <Container title={title} description={description}>
      {jottingsToShow.map(jotting => (
        <BlogPost key={jotting.id} post={jotting} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
    </Container>
  );
}
