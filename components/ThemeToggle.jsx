import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ThemeToggle() {
  const router = useRouter();
  const { locale: activeLocale } = router;

  return (
    <div className='flex flex-row text-black dark:text-gray-300 text-xs'>
      <div>
        <Link href={router.asPath} locale='en' className={`${activeLocale === 'en' ? 'active font-bold' : ''}`}>
          en
        </Link>
      </div>
      <div className='px-0.5 text-[8px]'>/</div>
      <div>
        <Link href={router.asPath} locale='ja' className={`${activeLocale === 'ja' ? 'active font-bold' : ''}`}>
          ja
        </Link>
      </div>
    </div>
  );
}
