import Link from 'next/link';
import { useConfig } from '@/lib/config';

const Pagination = ({ page, showNext }) => {
  const BLOG = useConfig();
  const currentPage = +page;
  let additionalClassName = 'justify-between';
  if (currentPage === 1 && showNext) additionalClassName = 'justify-end';
  if (currentPage !== 1 && !showNext) additionalClassName = 'justify-start';
  return (
    <div className={`flex font-medium text-black dark:text-gray-100 ${additionalClassName}`}>
      {currentPage !== 1 && (
        <Link href={currentPage - 1 === 1 ? `${BLOG.path || '/'}` : `/page/${currentPage - 1}`}>
          <button rel='prev' className='block cursor-pointer'>
            ← Prev
          </button>
        </Link>
      )}
      {showNext && (
        <Link href={`/page/${currentPage + 1}`}>
          <button rel='next' className='block cursor-pointer'>
            Next →
          </button>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
