import { clientConfig } from '@/lib/server/config';

import Container from '@/components/Container';
import Pagination from '@/components/Pagination';
import { useConfig } from '@/lib/config';
import { getAllPages } from '@/lib/notion';
import JottingLink from '@/components/JottingLink';

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jottingsToShow.map(jotting => (
          <JottingLink key={jotting.id} post={jotting} />
        ))}
      </div>
      {showNext && <Pagination page={page} showNext={showNext} />}
    </Container>
  );
}
