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

    let newPath;
    if (newIsJapanese) {
      newPath = router.pathname.startsWith('/ja') ? router.pathname : `/ja${router.pathname}`;
    } else {
      newPath = router.pathname.replace(/^\/ja/, '');
    }

    // Ensure newPath is not empty
    // This can happen if we are on the root page and we are switching from Japanese to English
    newPath = newPath || '/';

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
