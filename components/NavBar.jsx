import Link from 'next/link';

export default function NavBar() {
  const links = [
    { id: 0, name: 'Blog', to: '/blog' },
    { id: 1, name: 'Events', to: '/events' },
    { id: 2, name: 'About', to: '/about' },
    {
      id: 3,
      name: 'Contact',
      to: 'https://noteforms.com/forms/titania-research-website-form-hhsvja',
      external: true,
    },
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
    </div>
  );
}
