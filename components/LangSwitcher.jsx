import React from 'react';
import useIsJapanese from '@/lib/useIsJapanese';

const LangSwitcher = () => {
  const { isJapanese, toggleLanguage } = useIsJapanese();

  return (
    <div className='lang-switcher flex space-x-2 text-[10px] text-gray-500 ml-6 items-center'>
      <button
        className={`lang-switcher-button ${isJapanese && 'active'}`}
        onClick={toggleLanguage}
      >
        EN
      </button>
      <div>/</div>
      <button
        className={`lang-switcher-button ${!isJapanese && 'active'}`}
        onClick={toggleLanguage}
      >
        JA
      </button>
    </div>
  );
};

export default LangSwitcher;
