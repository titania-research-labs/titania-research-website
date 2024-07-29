import Link from 'next/link';

const CategoryItem = ({ category }) => (
  <Link href={`/category/${encodeURIComponent(category)}`}>
    <p className='mr-1 rounded-full px-2 py-1 border leading-none text-sm dark:border-gray-600'>{category}</p>
  </Link>
);

export default CategoryItem;
