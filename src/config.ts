// Environment variables with fallbacks
const getEnv = (key: string, fallback: string) => {
  return import.meta.env[key] || fallback;
};

export const SITE = {
  name: getEnv('SITE_NAME', 'Your Name'),
  title: getEnv('SITE_TITLE', 'Your Name'),
  description: getEnv('SITE_DESCRIPTION', 'A minimal, elegant technical blog built with Astro and Monochrome Edge UI'),
  url: getEnv('SITE_URL', 'https://yourusername.github.io'),
  author: getEnv('SITE_AUTHOR', 'Your Name'),
  locale: 'ko-KR',
  defaultTheme: (getEnv('DEFAULT_THEME', 'warm') as 'warm' | 'cold'),
  defaultMode: (getEnv('DEFAULT_MODE', 'auto') as 'light' | 'dark' | 'auto'),
};

export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Code Work', href: '/code' },
];

export const SOCIAL_LINKS = {
  github: getEnv('GITHUB_USERNAME', '')
    ? `https://github.com/${getEnv('GITHUB_USERNAME', '')}`
    : 'https://github.com/yourusername',
  twitter: getEnv('TWITTER_USERNAME', '')
    ? `https://twitter.com/${getEnv('TWITTER_USERNAME', '')}`
    : null,
  email: getEnv('EMAIL', 'your.email@example.com'),
};
