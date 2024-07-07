import FormattedDate from '@/components/FormattedDate';
import { useConfig } from '@/lib/config';
import Link from 'next/link';

const JottingLink = ({ post }) => {

  return (
    <Link href={`/${post.slug}`}>
      <article key={post.id} className='mb-6 md:mb-8'>
        <header className='flex flex-col md:items-baseline grid-cols-2 md:grid-cols-3 gap-2'>
          <h2 className='text-lg md:text-xl font-medium mb-2 cursor-pointer text-black dark:text-gray-100'>
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

export default JottingLink;
