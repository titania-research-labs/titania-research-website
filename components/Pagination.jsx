import Link from 'next/link';

const Pagination = ({ page, showNext, blogOrEvents }) => {
  const currentPage = +page;
  let additionalClassName = 'justify-between';
  if (currentPage === 1 && showNext) additionalClassName = 'justify-end';
  if (currentPage !== 1 && !showNext) additionalClassName = 'justify-start';
  return (
    <div className={`flex font-medium text-gray-700 dark:text-gray-100 ${additionalClassName}`}>
      {currentPage !== 1 && (
        <Link href={currentPage - 1 === 1 ? `/${blogOrEvents}` : `/page/${currentPage - 1}`}>
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
