document.addEventListener('DOMContentLoaded', function () {
    const phoneNumberElement = document.getElementById('phone-number');
    phoneNumberElement.addEventListener('mouseover', function () {
        this.textContent = "1-800-832-6825";
    });
    phoneNumberElement.addEventListener('mouseout', function () {
        this.textContent = "1-800-TeamVal";
    });

    const collapsibleHeaders = document.querySelectorAll('.collapsible h2');
    const sectionCheckboxes = document.querySelectorAll('.section-checkbox');

    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const sections = document.querySelectorAll('main section');
        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            section.style.display = text.includes(query) ? 'block' : 'none';
        });
    });

    // Ensure the collapsible sections start closed
    document.querySelectorAll('.collapsible .content').forEach(div => div.style.display = 'none');

    // Smooth scrolling and expanding for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            // Expand the target section
            const content = targetElement.querySelector('.content');
            if (content && content.style.display !== 'block') {
                content.style.display = 'block';
            }

            // Smooth scroll to the target section
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Add event listeners for the FTS Tools links to open in a new tab
    const ftsToolLinks = document.querySelectorAll('#fts-tools nav ul li a');
    ftsToolLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetUrl = this.getAttribute('href');
            window.open(targetUrl, '_blank');
        });
    });

    // Functionality for section checkboxes
    sectionCheckboxes.forEach(sectionCheckbox => {
        sectionCheckbox.addEventListener('change', function () {
            const section = this.closest('section');
            const itemCheckboxes = section.querySelectorAll('.item-checkbox');
            itemCheckboxes.forEach(itemCheckbox => {
                itemCheckbox.checked = this.checked;
            });
        });
    });

    // Functionality for item checkboxes
    const itemCheckboxes = document.querySelectorAll('.item-checkbox');
    itemCheckboxes.forEach(itemCheckbox => {
        itemCheckbox.addEventListener('change', function () {
            const section = this.closest('section');
            const sectionCheckbox = section.querySelector('.section-checkbox');
            const allChecked = section.querySelectorAll('.item-checkbox:checked').length === section.querySelectorAll('.item-checkbox').length;
            sectionCheckbox.checked = allChecked;
        });
    });

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
});

function toggleMenu() {
    document.getElementById('nav-menu').classList.toggle('show');
}
