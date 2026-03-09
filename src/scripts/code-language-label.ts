/**
 * Add language labels to code blocks
 */

function addLanguageLabels() {
  const codeBlocks = document.querySelectorAll('pre[class*="language-"], pre code[class*="language-"]');

  codeBlocks.forEach((block) => {
    const pre = block.tagName === 'PRE' ? block : block.parentElement;
    if (!pre || pre.querySelector('.language-label')) return;

    // Extract language from class
    const classList = block.className.split(' ');
    const languageClass = classList.find(cls => cls.startsWith('language-'));

    if (!languageClass) return;

    const language = languageClass.replace('language-', '');

    // Language display names
    const languageNames: Record<string, string> = {
      'js': 'JavaScript',
      'ts': 'TypeScript',
      'jsx': 'JSX',
      'tsx': 'TSX',
      'html': 'HTML',
      'css': 'CSS',
      'scss': 'SCSS',
      'json': 'JSON',
      'md': 'Markdown',
      'bash': 'Bash',
      'sh': 'Shell',
      'py': 'Python',
      'java': 'Java',
      'go': 'Go',
      'rust': 'Rust',
      'cpp': 'C++',
      'c': 'C',
      'yaml': 'YAML',
      'yml': 'YAML',
      'toml': 'TOML',
      'sql': 'SQL',
      'graphql': 'GraphQL',
      'dockerfile': 'Dockerfile',
      'astro': 'Astro',
    };

    const displayName = languageNames[language] || language.toUpperCase();

    // Create label
    const label = document.createElement('div');
    label.className = 'language-label';
    label.textContent = displayName;

    // Insert label
    const wrapper = pre?.parentElement;
    if (wrapper?.classList.contains('code-block-wrapper')) {
      wrapper.appendChild(label);
    }
  });
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addLanguageLabels);
} else {
  addLanguageLabels();
}

// Re-initialize after view transitions
document.addEventListener('astro:after-swap', addLanguageLabels);
