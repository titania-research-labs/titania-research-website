import { useConfig } from '@/lib/config';
import Vercel from '@/components/Vercel';

const Footer = ({ isFullWidth }) => {
  const BLOG = useConfig();

  const d = new Date();
  const year = d.getFullYear();
  const from = +BLOG.since;
  return (
    <div
      className={`mt-6 flex-shrink-0 m-auto w-full text-gray-500 dark:text-gray-400 transition-all ${
        isFullWidth ? 'px-4 md:px-24' : 'max-w-4xl px-4'
      }`}
    >
      <hr className='border-gray-200 dark:border-gray-600' />
      <div className='my-4 text-sm leading-6'>
        <div className='flex align-baseline justify-between flex-wrap'>
          <p>
            © {BLOG.author} {from === year || !from ? year : `${from} - ${year}`}
          </p>
          <Vercel />
        </div>
      </div>
    </div>
  );
};

export default Footer;
