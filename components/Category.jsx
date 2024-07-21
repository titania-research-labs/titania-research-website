import Link from 'next/link';

const Category = ({ allCategories, currentCategory }) => {
  if (!allCategories) return null;
  return (
    <div className='category-container'>
      <ul className='flex max-w-full mt-4 overflow-x-auto'>
        {Object.keys(allCategories).map(key => {
          const selected = key === currentCategory;
          return (
            <li
              key={key}
              className={`mr-3 font-medium border whitespace-nowrap dark:text-gray-300 ${
                selected
                  ? 'text-white bg-black border-black dark:bg-gray-600 dark:border-gray-600'
                  : 'bg-gray-100 border-gray-100 text-gray-400 dark:bg-night dark:border-gray-800'
              }`}
            >
              <Link
                key={key}
                href={`/category/${encodeURIComponent(key)}`}
                className='px-4 py-2 block'
              >
                {`${key} (${allCategories[key]})`}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Category;
