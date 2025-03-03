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
      // Toggle arrow and toggle content
      const arrow = header.querySelector('.arrow');
      const content = header.nextElementSibling;
      if (!content) return;
      if (content.style.display === 'block') {
        content.style.display = 'none';
        if (arrow) arrow.textContent = '►'; // or &#9654;
      } else {
        content.style.display = 'block';
        if (arrow) arrow.textContent = '▼'; // or some down arrow
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

  function scrollToSection(section) {
    const headerOffset = document.querySelector('header').offsetHeight + 10;
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }

  // SEARCH FUNCTIONALITY (expands matches instead of hiding everything else)
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const sections = document.querySelectorAll('main .collapsible');

    if (!query) {
      // If query is empty, show all sections again, but re-collapse them to default
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

  // “ON LOCATION” CHECKLIST SWITCHER
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

  // CHECKBOX “SELECT ALL” FUNCTIONALITY
  // This will store or load states from localStorage just like before
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

  // Item checkboxes
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

  // LOAD existing checkbox states
  loadCheckboxStates();

  function storeCheckboxState(checkbox) {
    // Use a unique ID or fallback to text. If items change text, localStorage won't match.
    const labelText = (checkbox.nextElementSibling && checkbox.nextElementSibling.classList.contains('item-text'))
      ? checkbox.nextElementSibling.textContent.trim()
      : checkbox.textContent.trim();
    const section = checkbox.closest('section');
    if (!section) return;
    const uniqueId = section.id + '_' + labelText;
    localStorage.setItem(uniqueId, checkbox.checked);
  }

  function loadCheckboxStates() {
    // Grab all relevant checkboxes
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

  // TO-DO LIST
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
        todos.push({ text: text, completed: false });
        localStorage.setItem('todos', JSON.stringify(todos));
        todoInput.value = '';
        renderTodos();
      }
    });
  }
  renderTodos();

  // DARK MODE TOGGLE
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', themeToggle.checked);
    localStorage.setItem('isDarkMode', themeToggle.checked);
  });
}

// Load dark mode preference on page load
const isDarkMode = localStorage.getItem('isDarkMode') === 'true';
if (isDarkMode) {
  document.body.classList.add('dark-mode');
  themeToggle.checked = true;
}

  // FEEDBACK BUTTON
  const feedbackBtn = document.getElementById('feedbackBtn');
  if (feedbackBtn) {
    feedbackBtn.addEventListener('click', () => {
      const subject = encodeURIComponent("FTS Field Aid Feedback");
      const body = encodeURIComponent("Please share your feedback here.\n\nThanks,\nFTS Team");
      const mailToUrl = `mailto:nfmcglinchey@valvolineglobal.com?subject=${subject}&body=${body}`;
      window.location.href = mailToUrl;
    });
  }

  // SERVICE WORKER
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
});

// EXTERNAL (GLOBAL) FUNCTIONS
function redirectToSalesforce() {
  // Just open the web version. 
  // If you want the custom "app fallback" logic, you can add it here.
  window.location.href = 'https://valvoline.my.salesforce.com/';
}

function generateRecapEmail() {
  window.location.href = "https://nfmcglinchey.github.io/Recap/";
}

function downloadOfflineVersion() {
  window.open('FTS Field Aid.pdf', '_blank');
}
