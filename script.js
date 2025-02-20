/****************************************************
 * script.js
 * 1. Collapsible sections
 * 2. Mobile hamburger menu
 * 3. Search functionality
 * 4. Key metrics placeholders
 * 5. Generate Recap Email
 * 6. Download Offline Version
 * 7. Progress tracking in localStorage
 * 8. PWA Service Worker Registration
 ****************************************************/

document.addEventListener('DOMContentLoaded', function () {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Helper function for clicks/taps
  function addClickOrTouchEventListener(element, callback) {
    if (!element) return;
    if (isMobile) {
      let touchStartX = 0;
      let touchStartY = 0;
      element.addEventListener('touchstart', function (event) {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
      });
      element.addEventListener('touchend', function (event) {
        const touchEndX = event.changedTouches[0].screenX;
        const touchEndY = event.changedTouches[0].screenY;
        const touchMovementX = Math.abs(touchEndX - touchStartX);
        const touchMovementY = Math.abs(touchEndY - touchStartY);
        const threshold = 10;
        if (touchMovementX < threshold && touchMovementY < threshold) {
          callback(event);
        }
      });
    } else {
      element.addEventListener('click', callback);
    }
  }

  // Collapsible Sections
  const collapsibleSections = document.querySelectorAll('.collapsible > h2');
  collapsibleSections.forEach(header => {
    addClickOrTouchEventListener(header, () => {
      const content = header.nextElementSibling;
      if (!content) return;
      content.style.display = (content.style.display === 'block') ? 'none' : 'block';
    });
  });
  document.querySelectorAll('.collapsible .content').forEach(div => {
    div.style.display = 'none';
  });

  // Navigation Tabs
  const navTabs = document.querySelectorAll('.nav-tab');
  navTabs.forEach(tab => {
    addClickOrTouchEventListener(tab, function (event) {
      event.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const section = document.getElementById(targetId);
      if (section) {
        const content = section.querySelector('.content');
        if (content) {
          content.style.display = (content.style.display === 'block') ? 'none' : 'block';
          scrollToSection(section);
        }
      }
    });
  });
  function scrollToSection(section) {
    const headerOffset = document.querySelector('header').offsetHeight + 10;
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }

  // Hamburger Menu
  window.toggleMenu = function() {
    document.getElementById('nav-menu').classList.toggle('show');
  };

  // Search
  const searchInput = document.getElementById('search');
  addClickOrTouchEventListener(searchInput, function (e) {
    e.stopPropagation();
  });
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
      const text = section.textContent.toLowerCase();
      section.style.display = text.includes(query) ? 'block' : 'none';
    });
  });

  // On Location Checklist Switcher
  const keyAccountButton = document.getElementById('key-account-button');
  const strategicAccountButton = document.getElementById('strategic-account-button');
  const keyAccountContent = document.getElementById('key-account-content');
  const strategicAccountContent = document.getElementById('strategic-account-content');
  if (keyAccountContent) keyAccountContent.style.display = 'none';
  if (strategicAccountContent) strategicAccountContent.style.display = 'none';
  addClickOrTouchEventListener(keyAccountButton, function () {
    toggleContent(keyAccountContent, strategicAccountContent);
  });
  addClickOrTouchEventListener(strategicAccountButton, function () {
    toggleContent(strategicAccountContent, keyAccountContent);
  });
  function toggleContent(contentToShow, contentToHide) {
    if (!contentToShow || !contentToHide) return;
    contentToHide.classList.remove('active');
    contentToHide.style.display = 'none';
    if (contentToShow.classList.contains('active')) {
      contentToShow.classList.remove('active');
      contentToShow.style.display = 'none';
    } else {
      contentToShow.classList.add('active');
      contentToShow.style.display = 'block';
    }
  }

  // Market Visit Checkboxes
  const sectionCheckboxes = document.querySelectorAll('#market-visit-checklist .section-checkbox');
  sectionCheckboxes.forEach(sectionCheckbox => {
    addClickOrTouchEventListener(sectionCheckbox, function () {
      const section = this.closest('section');
      if (!section) return;
      const itemCheckboxes = section.querySelectorAll('.item-checkbox');
      itemCheckboxes.forEach(itemCheckbox => {
        itemCheckbox.checked = this.checked;
        storeCheckboxState(itemCheckbox);
      });
      storeCheckboxState(sectionCheckbox);
    });
  });

  const itemCheckboxes = document.querySelectorAll('#market-visit-checklist .item-checkbox');
  itemCheckboxes.forEach(itemCheckbox => {
    addClickOrTouchEventListener(itemCheckbox, function () {
      const section = this.closest('section');
      if (!section) return;
      const sectionCheckbox = section.querySelector('.section-checkbox');
      if (sectionCheckbox) {
        const allChecked = (section.querySelectorAll('.item-checkbox:checked').length === section.querySelectorAll('.item-checkbox').length);
        sectionCheckbox.checked = allChecked;
        storeCheckboxState(sectionCheckbox);
      }
      storeCheckboxState(itemCheckbox);
    });
  });

  // Load existing states
  loadCheckboxStates();

  // Key Metrics placeholders (no longer used in HTML, but no harm leaving them)
  document.getElementById('via-metrics').textContent = 'Top Gains: +10% Premium Sales';
  document.getElementById('sac-metrics').textContent = 'Customer Retention: 85%';

  // PWA: Service Worker Registration
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

  /***************************************************
   * Utility Functions
   ***************************************************/
  function storeCheckboxState(checkbox) {
    if (!checkbox || !checkbox.closest) return;
    const section = checkbox.closest('section');
    if (!section) return;
    const uniqueId = section.id + '_' + checkbox.textContent.trim();
    localStorage.setItem(uniqueId, checkbox.checked);
  }

  function loadCheckboxStates() {
    // Only check within #market-visit-checklist
    const allCheckboxes = document.querySelectorAll('#market-visit-checklist .section-checkbox, #market-visit-checklist .item-checkbox');
    allCheckboxes.forEach(checkbox => {
      const section = checkbox.closest('section');
      if (!section) return;
      const uniqueId = section.id + '_' + checkbox.textContent.trim();
      const storedValue = localStorage.getItem(uniqueId);
      checkbox.checked = storedValue === 'true';
    });
  }
});

// External functions
function redirectToSalesforce() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const appUrl = 'salesforce1://valvoline.my.salesforce.com/';
  const webUrl = 'https://valvoline.my.salesforce.com/';
  if (isMobile) {
    const timeout = setTimeout(() => { window.location.href = webUrl; }, 2000);
    window.location.href = appUrl;
    window.addEventListener('blur', () => clearTimeout(timeout));
  } else {
    window.location.href = webUrl;
  }
}

function generateRecapEmail() {
  const subject = encodeURIComponent("FTS Visit Recap");
  const body = encodeURIComponent("Team,\n\nHere's a quick summary of today's visit:\n\n- Objectives covered:\n- Key metrics:\n- Next steps:\n\nThanks,\n[Your Name]");
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

function downloadOfflineVersion() {
  window.open('FTS Field Aid.pdf', '_blank');
}
