/**
 * Add copy button to code blocks
 */

function addCopyButtons() {
  const codeBlocks = document.querySelectorAll('pre');

  codeBlocks.forEach((pre) => {
    // Skip if button already exists
    if (pre.querySelector('.copy-button')) return;

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';

    // Wrap the pre element
    pre.parentNode?.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    // Create copy button
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.setAttribute('aria-label', 'Copy code');
    button.innerHTML = `
      <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;

    // Add click handler
    button.addEventListener('click', async () => {
      const code = pre.querySelector('code')?.textContent || pre.textContent || '';

      try {
        await navigator.clipboard.writeText(code);
        button.classList.add('copied');

        setTimeout(() => {
          button.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });

    wrapper.appendChild(button);
  });
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addCopyButtons);
} else {
  addCopyButtons();
}

// Re-initialize after view transitions
document.addEventListener('astro:after-swap', addCopyButtons);
