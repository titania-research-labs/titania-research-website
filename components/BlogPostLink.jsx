import FormattedDate from '@/components/FormattedDate';
import Link from 'next/link';

const BlogPostLink = ({ post }) => {
  return (
    <Link href={`/${post.slug}`}>
      <article key={post.id} className='mb-6 md:mb-8'>
        <header className='flex flex-col justify-between md:flex-row md:items-baseline'>
          <h2 className='text-lg md:text-xl font-medium mb-2 cursor-pointer text-[#337ab7] dark:text-gray-100 hover:underline'>
            {post.title}
          </h2>
          <time className='flex-shrink-0 text-gray-600 dark:text-gray-400'>
            <FormattedDate date={post.date} />
          </time>
        </header>
      </article>
    </Link>
  );
};

export default BlogPostLink;
