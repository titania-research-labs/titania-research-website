import { clientConfig } from '@/lib/server/config';

import { useRouter } from 'next/router';
import cn from 'classnames';
import { getAllPages, getPageBlocks } from '@/lib/notion';
import Container from '@/components/Container';
import Page from '@/components/Page';
import Comments from '@/components/Comments';

export default function BlogPage({ page, blockMap }) {
  const router = useRouter();

  // TODO: It would be better to render something
  if (router.isFallback) return null;

  const isFullWidth = page.isFullWidth ?? false;
  const category = page.type === 'Post' ? 'post' : page.type === 'Event' ? 'event' : '';

  return (
    <Container
      layout='blog'
      title={page.title}
      slug={page.slug}
      // date={new Date(page.publishedAt).toISOString()}
      type='article'
      isFullWidth={isFullWidth}
    >
      <Page page={page} blockMap={blockMap} category={category} isFullWidth={isFullWidth} />

      {/* Back and Top */}
      <div
        className={cn(
          'px-4 flex justify-between font-medium text-gray-500 dark:text-gray-400 my-5',
          isFullWidth ? 'md:px-24' : 'mx-auto max-w-4xl',
        )}
      >
        <a>
          <button
            onClick={() => router.push(page.type === 'Post' ? '/blog' : page.type === 'Event' ? '/events' : '/')}
            className='mt-2 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100'
          >
            ← Back
          </button>
        </a>
        <a>
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
            className='mt-2 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100'
          >
            ↑ Top
          </button>
        </a>
      </div>

      <Comments frontMatter={page} />
    </Container>
  );
}

export async function getStaticPaths() {
  const pages = await getAllPages({ allowedTypes: ['Post', 'Event'], allowedStatuses: ['Published', 'Draft'] });
  return {
    paths: pages.map(page => `${clientConfig.path}/${page.slug}`),
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const pages = await getAllPages({ allowedTypes: ['Post', 'Event'], allowedStatuses: ['Published', 'Draft'] });
  // Find the current page by slug
  const page = pages.find(page => page.slug === slug);

  if (!page) return { notFound: true };

  const blockMap = await getPageBlocks(page.id);

  return {
    props: { page, blockMap },
    revalidate: 1,
  };
}
