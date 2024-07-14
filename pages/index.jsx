import cn from 'classnames';
import { getAllPages, getPageBlocks } from '@/lib/notion';
import Container from '@/components/Container';
import Page from '@/components/Page';

export default function IndexPage({ page, blockMap }) {
  if (!page) return null;

  const isFullWidth = page.isFullWidth ?? false;
  const category = 'top';

  return (
    <Container
      layout='top'
      title={page.title}
      slug={page.slug}
      type={category}
      isFullWidth={isFullWidth}
    >
      <Page page={page} blockMap={blockMap} category={category} isFullWidth={isFullWidth} />

      {/* Top */}
      <div
        className={cn(
          'px-4 flex justify-end font-medium text-gray-500 dark:text-gray-400 my-5',
          isFullWidth ? 'md:px-24' : 'mx-auto max-w-4xl',
        )}
      >
        <a>
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
            className='mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100'
          >
            ↑ Top
          </button>
        </a>
      </div>
    </Container>
  );
}

export async function getStaticProps({ locale }) {
  const slug = 'index';
  const pages = await getAllPages({ allowedTypes: ['Page'], allowedStatuses: ['Published'] });
  const page =
    pages.find(page => page.slug === slug && page.lang[0] === locale) || pages.find(page => page.slug === slug);

  if (!page) return { notFound: true };

  const blockMap = await getPageBlocks(page.id);

  return {
    props: { page, blockMap },
    revalidate: 1,
  };
}
