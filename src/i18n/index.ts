import ko from './locales/ko.json';
import en from './locales/en.json';

export const languages = {
  ko: 'Korean',
  en: 'English',
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'ko';

const translations = {
  ko,
  en,
};

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang;
}

export function useTranslations(lang: Language = defaultLang) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value: any = translations[lang];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };
}

export function getLocalizedUrl(url: string, lang: Language): string {
  if (lang === defaultLang) return url;
  return `/${lang}${url}`;
}
