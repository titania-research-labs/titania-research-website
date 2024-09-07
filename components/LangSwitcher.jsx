import React from 'react';
import { useRouter } from 'next/router';

const LangSwitcher = () => {
  const router = useRouter();
  const [isJapanese, setIsJapanese] = React.useState(false);

  const switchLang = (toJapanese) => {
    setIsJapanese(!toJapanese);

    if (toJapanese) {
      router.push({
        pathname: `/ja${router.pathname}`,
        query: router.query,
      });
    } else {
      router.push({
        pathname: router.pathname.replace('/ja', ''),
        query: router.query,
      });
    }
  };

  return (
    <div className='lang-switcher flex space-x-2 text-[10px] text-gray-500'>
      <button
        className={`lang-switcher-button ${isJapanese && 'active'}`}
        onClick={() => switchLang(false)}
      >
        English
      </button>
      <button
        className={`lang-switcher-button ${!isJapanese && 'active'}`}
        onClick={() => switchLang(true)}
      >
        日本語
      </button>
    </div>
  );
};

export default LangSwitcher;
