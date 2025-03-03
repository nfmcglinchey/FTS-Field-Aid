/****************************************************
 * script.js
 * 1. Collapsible sections (click-based)
 * 2. Mobile hamburger menu
 * 3. Search functionality (expands matches)
 * 4. Generate Recap Email
 * 5. Download Offline Version
 * 6. Progress tracking (localStorage)
 * 7. To-Do List logic
 * 8. Dark Mode toggle
 * 9. Feedback button
 * 10. PWA Service Worker Registration
 ****************************************************/

document.addEventListener('DOMContentLoaded', function () {
  // COLLAPSIBLE HEADERS
  const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
  collapsibleHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const arrow = header.querySelector('.arrow');
      const content = header.nextElementSibling;
      if (!content) return;
      if (content.style.display === 'block') {
        content.style.display = 'none';
        if (arrow) arrow.textContent = '►';
      } else {
        content.style.display = 'block';
        if (arrow) arrow.textContent = '▼';
      }
    });
  });

  // Initially hide all collapsible content
  const allCollapsibleContent = document.querySelectorAll('.collapsible-content');
  allCollapsibleContent.forEach(div => {
    div.style.display = 'none';
  });
  // Set default arrows
  const allArrows = document.querySelectorAll('.arrow');
  allArrows.forEach(arrow => {
    arrow.textContent = '►';
  });

  // HAMBURGER MENU
  window.toggleMenu = function() {
    document.getElementById('nav-menu').classList.toggle('show');
  };

  // NAVIGATION TABS
  const navTabs = document.querySelectorAll('.nav-tab');
  navTabs.forEach(tab => {
    tab.addEventListener('click', function (event) {
      event.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const section = document.getElementById(targetId);
      if (!section) return;
      // Expand section if it's collapsible
      const content = section.querySelector('.collapsible-content');
      const arrow = section.querySelector('.arrow');
      if (content && content.style.display !== 'block') {
        content.style.display = 'block';
        if (arrow) arrow.textContent = '▼';
      }
      scrollToSection(section);
    });
  });

  /***************
   * DARK MODE
   ***************/
  const storedPreference = localStorage.getItem('isDarkMode');
  const themeToggle = document.getElementById('themeToggle');

  // 1. If user has a saved preference, use it:
  if (storedPreference !== null) {
    if (storedPreference === 'true') {
      document.body.classList.add('dark-mode');
      if (themeToggle) themeToggle.checked = true;
    } else {
      document.body.classList.remove('dark-mode');
      if (themeToggle) themeToggle.checked = false;
    }
  }
  // 2. Else, if no preference, try geolocation-based detection:
  else if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`)
        .then(response => response.json())
        .then(data => {
          const sunrise = new Date(data.results.sunrise);
          const sunset = new Date(data.results.sunset);
          const now = new Date();
          // If it's before sunrise or after sunset, set dark mode
          if (now < sunrise || now > sunset) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('isDarkMode', 'true');
            if (themeToggle) themeToggle.checked = true;
          } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('isDarkMode', 'false');
            if (themeToggle) themeToggle.checked = false;
          }
        })
        .catch(err => console.error('Sunrise-Sunset API error:', err));
    }, error => {
      console.error('Geolocation error:', error);
      // If geolocation fails, fallback to a default (light) mode
      document.body.classList.remove('dark-mode');
      localStorage.setItem('isDarkMode', 'false');
      if (themeToggle) themeToggle.checked = false;
    });
  }

  // 3. Let the user override manually (always available):
  if (themeToggle) {
    themeToggle.addEventListener('change', () => {
      document.body.classList.toggle('dark-mode', themeToggle.checked);
      localStorage.setItem('isDarkMode', themeToggle.checked);
    });
  }

  /***************
   * SCROLL HELPER
   ***************/
  function scrollToSection(section) {
    const headerOffset = document.querySelector('header').offsetHeight + 10;
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }

  /***************
   * SEARCH
   ***************/
  const searchInput = document.getElementById('search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const sections = document.querySelectorAll('main .collapsible');

      if (!query) {
        // If query is empty, show all sections again, but re-collapse them
        sections.forEach(section => {
          section.style.display = '';
        });
        return;
      }

      sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        if (text.includes(query)) {
          // Show & expand
          section.style.display = 'block';
          const content = section.querySelector('.collapsible-content');
          const arrow = section.querySelector('.arrow');
          if (content) {
            content.style.display = 'block';
          }
          if (arrow) {
            arrow.textContent = '▼';
          }
        } else {
          // Hide if no match
          section.style.display = 'none';
        }
      });
    });
  }

  /***************
   * ON LOCATION CHECKLIST SWITCHER
   ***************/
  const keyAccountButton = document.getElementById('key-account-button');
  const strategicAccountButton = document.getElementById('strategic-account-button');
  const keyAccountContent = document.getElementById('key-account-content');
  const strategicAccountContent = document.getElementById('strategic-account-content');

  if (keyAccountContent) keyAccountContent.style.display = 'none';
  if (strategicAccountContent) strategicAccountContent.style.display = 'none';

  if (keyAccountButton) {
    keyAccountButton.addEventListener('click', () => {
      toggleContent(keyAccountContent, strategicAccountContent);
    });
  }
  if (strategicAccountButton) {
    strategicAccountButton.addEventListener('click', () => {
      toggleContent(strategicAccountContent, keyAccountContent);
    });
  }

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

  /***************
   * SELECT ALL CHECKBOXES
   ***************/
  const sectionSelectAllBoxes = document.querySelectorAll('.section-checkbox');
  sectionSelectAllBoxes.forEach(selectAllBox => {
    selectAllBox.addEventListener('change', function () {
      const section = this.closest('section.collapsible-content, section.collapsible');
      if (!section) return;
      const itemCheckboxes = section.querySelectorAll('.item-checkbox');
      itemCheckboxes.forEach(itemCheckbox => {
        itemCheckbox.checked = selectAllBox.checked;
        storeCheckboxState(itemCheckbox);
      });
      storeCheckboxState(selectAllBox);
    });
  });

  const itemCheckboxes = document.querySelectorAll('.item-checkbox');
  itemCheckboxes.forEach(itemCheckbox => {
    itemCheckbox.addEventListener('change', function () {
      storeCheckboxState(itemCheckbox);
      const parentSection = itemCheckbox.closest('section.collapsible-content, section.collapsible');
      if (!parentSection) return;
      const allItems = parentSection.querySelectorAll('.item-checkbox');
      const allChecked = Array.from(allItems).every(ch => ch.checked);
      const sectionSelectAll = parentSection.querySelector('.section-checkbox');
      if (sectionSelectAll) {
        sectionSelectAll.checked = allChecked;
        storeCheckboxState(sectionSelectAll);
      }
    });
  });

  // Load existing checkbox states
  loadCheckboxStates();

  function storeCheckboxState(checkbox) {
    const labelText = (checkbox.nextElementSibling && checkbox.nextElementSibling.classList.contains('item-text'))
      ? checkbox.nextElementSibling.textContent.trim()
      : checkbox.textContent.trim();
    const section = checkbox.closest('section');
    if (!section) return;
    const uniqueId = section.id + '_' + labelText;
    localStorage.setItem(uniqueId, checkbox.checked);
  }

  function loadCheckboxStates() {
    const allBoxes = document.querySelectorAll('.section-checkbox, .item-checkbox');
    allBoxes.forEach(box => {
      const labelText = (box.nextElementSibling && box.nextElementSibling.classList.contains('item-text'))
        ? box.nextElementSibling.textContent.trim()
        : box.textContent.trim();
      const section = box.closest('section');
      if (!section) return;
      const uniqueId = section.id + '_' + labelText;
      const storedValue = localStorage.getItem(uniqueId);
      box.checked = storedValue === 'true';
    });
  }

  /***************
   * TO-DO LIST
   ***************/
  const todoInput = document.getElementById('todoInput');
  const addTodoBtn = document.getElementById('addTodoBtn');
  const todoItems = document.getElementById('todoItems');

  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  function renderTodos() {
    todoItems.innerHTML = '';
    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.className = 'todo-item';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.addEventListener('change', function() {
        todos[index].completed = this.checked;
        localStorage.setItem('todos', JSON.stringify(todos));
      });

      const span = document.createElement('span');
      span.textContent = todo.text;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'todo-delete';
      deleteBtn.addEventListener('click', function() {
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      todoItems.appendChild(li);
    });
  }

  if (addTodoBtn) {
    addTodoBtn.addEventListener('click', function() {
      const text = todoInput.value.trim();
      if (text !== '') {
        todos.push({ text, completed: false });
        localStorage.setItem('todos', JSON.stringify(todos));
        todoInput.value = '';
        renderTodos();
      }
    });
  }
  renderTodos();

  /***************
   * FEEDBACK BUTTON
   ***************/
  const feedbackBtn = document.getElementById('feedbackBtn');
  if (feedbackBtn) {
    feedbackBtn.addEventListener('click', () => {
      const subject = encodeURIComponent("FTS Field Aid Feedback");
      const body = encodeURIComponent("Please share your feedback here.\n\nThanks,\nFTS Team");
      const mailToUrl = `mailto:nfmcglinchey@valvolineglobal.com?subject=${subject}&body=${body}`;
      window.location.href = mailToUrl;
    });
  }

  /***************
   * PWA SERVICE WORKER
   ***************/
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope:', registration.scope);
      }, function(err) {
        console.log('ServiceWorker registration failed:', err);
      });
    });
  }
});

/***************
 * GLOBAL FUNCTIONS
 ***************/
function redirectToSalesforce() {
  window.location.href = 'https://valvoline.my.salesforce.com/';
}

function generateRecapEmail() {
  window.location.href = "https://nfmcglinchey.github.io/Recap/";
}

function downloadOfflineVersion() {
  window.open('FTS Field Aid.pdf', '_blank');
}
