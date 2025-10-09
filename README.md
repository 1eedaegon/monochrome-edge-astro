# 🎨 Monochrome Edge Astro Blog Template

> A minimal, elegant, and feature-rich technical blog template built with **Astro 5** and **Monochrome Edge UI**.

[![Deploy to GitHub Pages](https://github.com/yourusername/monochrome-edge-astro/actions/workflows/deploy.yml/badge.svg)](https://github.com/yourusername/monochrome-edge-astro/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[🌐 Live Demo](https://yourusername.github.io) | [📖 Documentation](#documentation) | [🐛 Report Bug](https://github.com/yourusername/monochrome-edge-astro/issues)

---

## ✨ Features

### 🎨 Beautiful Design
- **Monochrome Edge UI** - Professional, minimalist design system
- **Dual Themes** - Warm (content-focused) and Cold (tech-focused) color schemes
- **Dark Mode** - Auto-follows system preference with manual toggle
- **Fully Responsive** - Mobile-first design that works beautifully on all devices

### ⚡ Performance & SEO
- **Lightning Fast** - Astro's zero-JS by default approach
- **Perfect Lighthouse Scores** - Optimized for Core Web Vitals
- **SEO Optimized** - Auto-generated sitemap, RSS feed, Open Graph tags
- **Reading Progress** - Visual progress bar for better UX

### 📝 Content Management
- **Markdown-First** - Write in plain Markdown, everything else is automatic
- **Auto Metadata** - Dates extracted from Git history, reading time calculated
- **Wiki-Style Links** - Use `[[article-name]]` for easy cross-referencing
- **Backlinks** - Automatic reverse link tracking between posts
- **Series Support** - Group related posts with automatic navigation
- **Categories & Tags** - Organize and filter your content

### 🔍 Advanced Features
- **Full-Text Search** - Fuzzy search with Fuse.js (Ctrl+K / Cmd+K)
- **Dynamic Filtering** - Client-side tag and category filtering without page reload
- **i18n Ready** - Multi-language support (Korean/English UI)
- **Table of Contents** - Auto-generated from headings with smooth scrolling

---

## 🚀 Quick Start

### Option 1: Use as GitHub Template (Recommended for `username.github.io`)

1. **Click "Use this template"** at the top of this repository

2. **Name your repository**:
   - For personal site: `[your-username].github.io`
   - For project site: `my-awesome-blog`

3. **Clone your new repository**:
   ```bash
   git clone https://github.com/[your-username]/[your-username].github.io.git
   cd [your-username].github.io
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Configure your blog** - Create `.env` file:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```env
   SITE_NAME=My Tech Blog
   SITE_URL=https://[your-username].github.io
   SITE_AUTHOR=Your Name
   GITHUB_USERNAME=[your-username]
   EMAIL=your.email@example.com
   ```

6. **Start development server**:
   ```bash
   npm run dev
   ```
   
   Open http://localhost:4321

7. **Deploy to GitHub Pages**:
   - Push to `main` branch
   - Go to **Settings → Pages**
   - Source: **GitHub Actions**
   - Your site will auto-deploy! 🎉

### Option 2: Manual Clone

```bash
git clone https://github.com/monochrome-edge-astro/monochrome-edge-astro.git my-blog
cd my-blog
npm install
npm run dev
```

---

## 📝 Writing Your First Post

### 1. Create a Markdown File

Create `src/content/articles/my-first-post.md`:

```markdown
---
title: "My First Blog Post"
description: "An introduction to my blog"
tags: [hello, blog, astro]
category: "General"
featured: true
---

# Welcome!

This is my first post. The date, reading time, and TOC are auto-generated!

## Section 1

You can link to other posts using [[another-post]] syntax.

Backlinks are automatically tracked!
```

### 2. That's It!

Everything else is automatic:
- ✅ **Date** from Git commit
- ✅ **Reading time** calculated from content
- ✅ **Table of contents** generated from headings
- ✅ **Backlinks** tracked automatically
- ✅ **Search index** updated

---

## 🎨 Customization

### Change Theme Colors

Edit `src/config.ts`:

```typescript
export const SITE = {
  defaultTheme: 'cold',  // 'warm' or 'cold'
  defaultMode: 'dark',   // 'light', 'dark', or 'auto'
  // ...
};
```

### Add Navigation Links

```typescript
export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Articles', href: '/articles' },
  { name: 'Projects', href: '/projects' },  // Add your own!
  { name: 'About', href: '/about' },
];
```

### Customize Colors

Edit `src/styles/global.css`:

```css
:root[data-theme='warm'][data-mode='light'] {
  --accent-primary: #d97706;  /* Your brand color */
  --accent-secondary: #f59e0b;
}
```

---

## 📁 Project Structure

```
/
├── .github/workflows/
│   └── deploy.yml              # Auto-deploy to GitHub Pages
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro        # Navigation with search
│   │   ├── SearchModal.astro   # Full-text search UI
│   │   ├── LanguageSwitcher.astro
│   │   ├── ReadingProgress.astro
│   │   └── ...
│   ├── content/
│   │   └── articles/           # 📝 Your blog posts here!
│   ├── i18n/
│   │   └── locales/            # Translations (ko, en)
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro         # Homepage
│   │   ├── articles.astro      # All articles (with filtering)
│   │   ├── articles/[slug].astro
│   │   ├── categories/[category].astro
│   │   ├── series/[series].astro
│   │   └── search-index.json.ts # Search endpoint
│   ├── scripts/
│   │   ├── theme-toggle.ts
│   │   ├── search.ts           # Search logic
│   │   └── article-filter.ts   # Client-side filtering
│   ├── utils/
│   │   ├── git-dates.ts        # Auto date extraction
│   │   ├── reading-time.ts
│   │   ├── relationships.ts    # Backlinks
│   │   ├── series.ts
│   │   └── category.ts
│   ├── config.ts               # 🔧 Main configuration
│   └── content.config.ts       # Content schema
├── .env.example                # Environment variables template
├── astro.config.mjs
└── package.json
```

---

## 🛠️ Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build for production to `./dist/` |
| `npm run preview` | Preview production build locally |

---

## 📚 Advanced Usage

### Series Posts

Group related posts:

```markdown
---
title: "React Hooks - Part 1"
series: "React Hooks Guide"
seriesOrder: 1
---
```

Readers will see:
- Previous/Next navigation
- Series table of contents
- Progress indicator

### Categories

Organize by topic:

```markdown
---
title: "Understanding Closures"
category: "JavaScript"
tags: [javascript, fundamentals, closures]
---
```

Automatic category archive pages are generated!

### Wiki Links & Backlinks

Link to other posts:

```markdown
Check out my [[react-basics]] post for more info.

Custom text: [[react-basics|this React guide]].
```

Backlinks are automatically shown at the bottom of referenced posts!

### Manual Related Posts

```markdown
---
title: "Advanced React Patterns"
relatedPosts: [react-basics, hooks-explained]
---
```

### Multi-language Posts

```markdown
---
title: "Hello World"
lang: en  # or 'ko'
---
```

---

## 📊 Frontmatter Reference

### Required Fields

```yaml
---
title: "Post Title"  # Only required field!
---
```

### All Available Fields

```yaml
---
# Basic
title: "Post Title"
description: "SEO description"
lang: ko  # 'ko' or 'en'

# Dates (auto-generated from Git if omitted)
date: 2025-01-01
updated: 2025-01-02

# Classification
tags: [tag1, tag2]
category: "Category Name"

# Author
author: "Author Name"  # Defaults to SITE.author

# Series
series: "Series Name"
seriesOrder: 1

# Status
draft: false  # true to hide in production
featured: true  # Show on homepage

# SEO
ogImage: "/images/og.png"
canonical: "https://..."

# Relationships
relatedPosts: [post1, post2]
---
```

---

## 🚢 Deployment

### GitHub Pages (Automatic)

1. **Push to `main`** branch
2. **GitHub Actions** builds and deploys automatically
3. **Done!** Your site is live at `https://[username].github.io`

### Manual Deployment

```bash
npm run build
# Upload ./dist/ to your hosting
```

### Other Platforms

**Vercel:**
```bash
# Import repository
# Build command: npm run build
# Output directory: dist
```

**Netlify:**
```bash
# Same as Vercel
```

**Cloudflare Pages:**
```bash
# Framework: Astro
# Build command: npm run build
# Output directory: dist
```

---

## 🔧 Configuration

### Environment Variables

All environment variables are optional. Defaults are in `src/config.ts`.

```env
# Site
SITE_NAME=My Blog
SITE_TITLE=My Blog
SITE_DESCRIPTION=A minimal blog
SITE_URL=https://yourusername.github.io
SITE_AUTHOR=Your Name

# Social
GITHUB_USERNAME=yourusername
TWITTER_USERNAME=yourusername
EMAIL=you@example.com

# Theme (optional)
DEFAULT_THEME=warm  # 'warm' or 'cold'
DEFAULT_MODE=auto   # 'light', 'dark', or 'auto'

# Analytics (optional)
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### Theme Configuration

The template includes two carefully crafted themes:

**Warm Theme** - Perfect for:
- Personal blogs
- Writing & literature
- Creative content
- Warm, inviting feel

**Cold Theme** - Perfect for:
- Technical blogs
- Documentation
- SaaS & APIs
- Professional, modern feel

Both themes include light and dark mode variants!

---

## ⌨️ Keyboard Shortcuts

- **Ctrl+K / Cmd+K** - Open search
- **Esc** - Close search or modals
- **↑ / ↓** - Navigate search results
- **Enter** - Select search result

---

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

MIT License - feel free to use this template for your own blog!

---

## 🙏 Credits

- Built with [Astro](https://astro.build)
- Styled with [Monochrome Edge UI](https://github.com/1eedaegon/monochrome-edge)
- Search powered by [Fuse.js](https://fusejs.io)
- Inspired by [skyzh.dev](https://www.skyzh.dev)

---

## 📞 Support

Need help? Have questions?

- 📖 [Astro Documentation](https://docs.astro.build)
- 💬 [Open an Issue](https://github.com/yourusername/monochrome-edge-astro/issues)
- 🐦 [Follow on Twitter](https://twitter.com/yourusername)

---

## 🎯 Roadmap

- [ ] Comment system integration (Giscus/Utterances)
- [ ] View counter
- [ ] Related posts algorithm
- [ ] Newsletter integration
- [ ] Image optimization
- [ ] Code block enhancements (copy button, line highlighting)

---

**Happy blogging!** 🚀

Made with ❤️ using Astro and Monochrome Edge UI

---

## 📖 Documentation

### How It Works

1. **Write Markdown** - Just create `.md` files in `src/content/articles/`
2. **Auto-Generate Metadata** - Git history provides dates, content provides reading time
3. **Build Relationships** - Wiki links and backlinks connect your content
4. **Deploy** - Push to GitHub, auto-deploy to Pages

### File-Based Routing

- `/` - Homepage with featured posts
- `/articles` - All articles with filtering
- `/articles/[slug]` - Individual article
- `/categories/[category]` - Category archive
- `/series/[series]` - Series table of contents
- `/search-index.json` - Search API endpoint

### Custom Components

Create your own components in `src/components/` and use them in any `.astro` or `.md` file!

### Extending the Theme

1. **Add new colors** in `src/styles/global.css`
2. **Create custom components** in `src/components/`
3. **Add new pages** in `src/pages/`
4. **Extend content schema** in `src/content.config.ts`

---

Enjoy your new blog! Start writing amazing content! ✍️
