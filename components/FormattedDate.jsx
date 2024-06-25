import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

const loaded = {};

export default function FormattedDate({ date }) {
  const lang = 'en';
  const [isLocaleLoaded, setIsLocaleLoaded] = useState(loaded[lang] === true);

  useEffect(() => {
    if (!isLocaleLoaded) {
      loaded[lang] ??= import(`dayjs/locale/${lang}`).then(
        () => {
          loaded[lang] = true;
          dayjs.locale(lang);
        },
        () => console.warn(`dayjs locale \`${lang}\` not found`),
      );
      loaded[lang].then(() => setIsLocaleLoaded(true));
    }
  }, [isLocaleLoaded, lang]);

  return <span>{dayjs(date).format('ll')}</span>;
}
