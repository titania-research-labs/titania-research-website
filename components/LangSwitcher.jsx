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
    <div className='lang-switcher flex space-x-2 text-[10px] text-gray-500 ml-6 items-center'>
      <button
        className={`lang-switcher-button ${isJapanese && 'active'}`}
        onClick={() => switchLang(false)}
      >
        EN
      </button>
      <div>/</div>
      <button
        className={`lang-switcher-button ${!isJapanese && 'active'}`}
        onClick={() => switchLang(true)}
      >
        JA
      </button>
    </div>
  );
};

export default LangSwitcher;
