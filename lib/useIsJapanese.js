import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

const useIsJapanese = () => {
  const router = useRouter();
  const [isJapanese, setIsJapanese] = useState(false);

  useEffect(() => {
    setIsJapanese(router.pathname.startsWith('/ja'));
  }, [router.pathname]);

  const toggleLanguage = useCallback(() => {
    const newIsJapanese = !isJapanese;
    setIsJapanese(newIsJapanese);

    const newPath = newIsJapanese ? `/ja${router.pathname.replace(/^\/ja/, '')}` : router.pathname.replace(/^\/ja/, '');

    router.push(
      {
        pathname: newPath,
        query: router.query,
      },
      undefined,
      { shallow: true },
    );
  }, [isJapanese, router]);

  return { isJapanese, toggleLanguage };
};

export default useIsJapanese;
