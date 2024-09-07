import { useState } from 'react';

const useIsJapanese = (initialState = false) => {
  const [isJapanese, setIsJapanese] = useState(initialState);

  const toggleLanguage = () => {
    setIsJapanese(prevState => !prevState);
  };

  return [isJapanese, toggleLanguage];
};

export default useIsJapanese;
