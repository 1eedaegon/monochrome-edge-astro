type SortOption = 'newest' | 'oldest' | 'title';

let currentTag: string | null = null;
let currentSort: SortOption = 'newest';

/**
 * Filter articles by tag
 */
function filterByTag(tag: string | null) {
  currentTag = tag;

  const articles = document.querySelectorAll<HTMLElement>('.article-card');
  const tagButtons = document.querySelectorAll<HTMLElement>('.tag-filter-btn');

  articles.forEach(article => {
    const tags = article.dataset.tags?.split(',') || [];

    if (!tag || tags.includes(tag)) {
      article.style.display = 'block';
    } else {
      article.style.display = 'none';
    }
  });

  // Update active tag button
  tagButtons.forEach(btn => {
    if (btn.dataset.tag === tag) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  updateURL();
  updateResultsCount();
}

/**
 * Sort articles
 */
function sortArticles(sortBy: SortOption) {
  currentSort = sortBy;

  const container = document.querySelector('.articles-grid');
  if (!container) return;

  const articles = Array.from(container.querySelectorAll<HTMLElement>('.article-card'));

  articles.sort((a, b) => {
    if (sortBy === 'newest' || sortBy === 'oldest') {
      const dateA = new Date(a.dataset.date || '').getTime();
      const dateB = new Date(b.dataset.date || '').getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    } else if (sortBy === 'title') {
      const titleA = a.dataset.title || '';
      const titleB = b.dataset.title || '';
      return titleA.localeCompare(titleB);
    }
    return 0;
  });

  // Re-append in sorted order
  articles.forEach(article => {
    container.appendChild(article);
  });

  // Update sort button
  const sortButtons = document.querySelectorAll<HTMLElement>('.sort-btn');
  sortButtons.forEach(btn => {
    if (btn.dataset.sort === sortBy) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  updateURL();
}

/**
 * Update URL with current filters
 */
function updateURL() {
  const url = new URL(window.location.href);

  if (currentTag) {
    url.searchParams.set('tag', currentTag);
  } else {
    url.searchParams.delete('tag');
  }

  if (currentSort !== 'newest') {
    url.searchParams.set('sort', currentSort);
  } else {
    url.searchParams.delete('sort');
  }

  history.pushState({}, '', url);
}

/**
 * Update results count
 */
function updateResultsCount() {
  const articles = document.querySelectorAll<HTMLElement>('.article-card');
  const visibleArticles = Array.from(articles).filter(
    article => article.style.display !== 'none'
  );

  const countElement = document.getElementById('results-count');
  if (countElement) {
    countElement.textContent = `${visibleArticles.length} article${visibleArticles.length !== 1 ? 's' : ''}`;
  }
}

/**
 * Initialize filters from URL
 */
function initializeFromURL() {
  const params = new URLSearchParams(window.location.search);

  const tag = params.get('tag');
  const sort = params.get('sort') as SortOption || 'newest';

  if (tag) {
    filterByTag(tag);
  }

  if (sort) {
    sortArticles(sort);
  }

  updateResultsCount();
}

/**
 * Handle browser back/forward
 */
window.addEventListener('popstate', () => {
  initializeFromURL();
});

/**
 * Initialize on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  initializeFromURL();

  // Tag filter buttons
  document.querySelectorAll<HTMLElement>('.tag-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.dataset.tag || null;
      filterByTag(tag);
    });
  });

  // Sort buttons
  document.querySelectorAll<HTMLElement>('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sort = btn.dataset.sort as SortOption;
      if (sort) {
        sortArticles(sort);
      }
    });
  });

  // Clear filter button
  const clearBtn = document.getElementById('clear-filter');
  clearBtn?.addEventListener('click', () => {
    filterByTag(null);
  });
});

// Make functions globally available
(window as any).filterByTag = filterByTag;
(window as any).sortArticles = sortArticles;
