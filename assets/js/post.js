/**
 * Post Page JavaScript Functions
 * Handles share functionality, theme integration, and UI interactions
 */

// Share Menu Functions
function toggleShareMenu() {
  const shareMenu = document.getElementById('shareMenu');
  shareMenu.classList.toggle('active');
  
  // Close menu when clicking outside
  if (shareMenu.classList.contains('active')) {
    document.addEventListener('click', closeShareMenuOnOutsideClick);
  } else {
    document.removeEventListener('click', closeShareMenuOnOutsideClick);
  }
}

function closeShareMenuOnOutsideClick(event) {
  const shareGroup = document.querySelector('.share-group');
  if (!shareGroup.contains(event.target)) {
    document.getElementById('shareMenu').classList.remove('active');
    document.removeEventListener('click', closeShareMenuOnOutsideClick);
  }
}

// Social Media Share Functions
function shareToTwitter() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(document.title);
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
  closeShareMenu();
}

function shareToFacebook() {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
  closeShareMenu();
}

function shareToLinkedIn() {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank', 'width=600,height=400');
  closeShareMenu();
}

// Copy to Clipboard Function
function copyToClipboard() {
  // Modern browser support
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(window.location.href).then(function() {
      showCopyFeedback();
      closeShareMenu();
    }).catch(function(err) {
      console.warn('Failed to copy using modern API, falling back:', err);
      fallbackCopyToClipboard();
    });
  } else {
    // Fallback for older browsers or non-secure contexts
    fallbackCopyToClipboard();
  }
}

function fallbackCopyToClipboard() {
  const textArea = document.createElement('textarea');
  textArea.value = window.location.href;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showCopyFeedback();
      closeShareMenu();
    } else {
      console.warn('Copy command was unsuccessful');
    }
  } catch (err) {
    console.error('Fallback copy failed:', err);
  }
  
  document.body.removeChild(textArea);
}

// Share Menu Helper Functions
function closeShareMenu() {
  const shareMenu = document.getElementById('shareMenu');
  if (shareMenu) {
    shareMenu.classList.remove('active');
  }
  document.removeEventListener('click', closeShareMenuOnOutsideClick);
}

// Copy Feedback Display
function showCopyFeedback() {
  // Remove existing feedback if any
  const existing = document.querySelector('.copy-feedback');
  if (existing) {
    existing.remove();
  }
  
  // Create and show feedback
  const feedback = document.createElement('div');
  feedback.className = 'copy-feedback';
  feedback.textContent = 'Link copied to clipboard!';
  feedback.setAttribute('role', 'alert');
  feedback.setAttribute('aria-live', 'polite');
  document.body.appendChild(feedback);
  
  // Trigger animation
  requestAnimationFrame(() => {
    feedback.classList.add('show');
  });
  
  // Remove after 3 seconds
  setTimeout(() => {
    feedback.classList.remove('show');
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.remove();
      }
    }, 300);
  }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  
  // Close share menu on escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeShareMenu();
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Theme detection and synchronization
  initializeThemeSync();
});

// Theme Synchronization Functions
function initializeThemeSync() {
  // Get the current theme from the body or html element
  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 
           document.body.getAttribute('data-theme') || 
           localStorage.getItem('theme') || 
           'light';
  }
  
  // Apply theme to the document
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    
    // Update any MathJax elements if they exist
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }
  
  // Initialize theme
  const currentTheme = getCurrentTheme();
  applyTheme(currentTheme);
  
  // Listen for theme changes from the navbar toggle
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && 
          (mutation.attributeName === 'data-theme' || mutation.attributeName === 'class')) {
        const newTheme = getCurrentTheme();
        applyTheme(newTheme);
      }
    });
  });
  
  // Start observing theme changes
  observer.observe(document.documentElement, { 
    attributes: true, 
    attributeFilter: ['data-theme', 'class'] 
  });
  
  observer.observe(document.body, { 
    attributes: true, 
    attributeFilter: ['data-theme', 'class'] 
  });
  
  // Listen for storage changes (theme changes from other tabs)
  window.addEventListener('storage', function(e) {
    if (e.key === 'theme') {
      const newTheme = e.newValue || 'light';
      applyTheme(newTheme);
    }
  });
  
  // Manual theme toggle integration (if needed)
  window.addEventListener('themeChanged', function(e) {
    const newTheme = e.detail.theme || getCurrentTheme();
    applyTheme(newTheme);
  });
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Performance optimization for scroll events
function optimizeScrollPerformance() {
  let ticking = false;
  
  function updateScrollPosition() {
    // Add any scroll-based functionality here if needed
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScrollPosition);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick, { passive: true });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
  optimizeScrollPerformance();
});

// Export functions for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    toggleShareMenu,
    shareToTwitter,
    shareToFacebook,
    shareToLinkedIn,
    copyToClipboard,
    closeShareMenu,
    showCopyFeedback
  };
}