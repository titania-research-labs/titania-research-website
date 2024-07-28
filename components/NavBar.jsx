import Link from 'next/link';
import { useRouter } from 'next/router';
// import ThemeToggle from './ThemeToggle';

export default function NavBar() {
  const { locale } = useRouter();
  const links = [
    { id: 0, name: 'Blog', to: `/${locale}/blog` },
    { id: 1, name: 'Events', to: `/${locale}/events` },
    {
      id: 2,
      name: 'About',
      to: 'https://scandalous-stick-9ab.notion.site/Titania-Research-Homepage-587cd20f07b14d259fa7d5c8d9646fc9',
      external: true,
    },
    {
      id: 3,
      name: 'Contact',
      to: 'https://noteforms.com/forms/titania-research-website-form-hhsvja',
      external: true,
    }
  ];
  return (
    <div className='flex flex-row flex-shrink-0 items-center'>
      <ul className='flex flex-row pr-4'>
        {links.map(link => (
          <li key={link.id} className='block ml-4 text-gray-700 dark:text-gray-50 nav'>
            <Link href={link.to} target={link.external ? '_blank' : null}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      {/* <ThemeToggle /> */}
    </div>
  );
}
