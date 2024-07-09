document.addEventListener('DOMContentLoaded', function () {
    const keyAccountButton = document.getElementById('key-account-button');
    const strategicAccountButton = document.getElementById('strategic-account-button');
    const keyAccountContent = document.getElementById('key-account-content');
    const strategicAccountContent = document.getElementById('strategic-account-content');

    keyAccountContent.style.display = 'none';
    strategicAccountContent.style.display = 'none';

    keyAccountButton.addEventListener('click', function () {
        showContent(keyAccountContent, strategicAccountContent);
    });

    strategicAccountButton.addEventListener('click', function () {
        showContent(strategicAccountContent, keyAccountContent);
    });

    function showContent(contentToShow, contentToHide) {
        contentToHide.style.display = 'none';
        if (contentToShow.style.display === 'block') {
            contentToShow.style.display = 'none';
        } else {
            contentToShow.style.display = 'block';
        }
    }

    const collapsibleHeaders = document.querySelectorAll('.collapsible > h2');
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

    document.querySelectorAll('.collapsible .content').forEach(div => div.style.display = 'none');

    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            const content = targetElement.querySelector('.content');
            if (content && content.style.display !== 'block') {
                content.style.display = 'block';
            }

            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    const ftsToolLinks = document.querySelectorAll('#fts-tools nav ul li a');
    ftsToolLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetUrl = this.getAttribute('href');
            if (targetUrl === 'javascript:void(0)') {
                redirectToSalesforce();
            } else {
                window.open(targetUrl, '_blank');
            }
        });
    });

    const sectionCheckboxes = document.querySelectorAll('.section-checkbox');
    sectionCheckboxes.forEach(sectionCheckbox => {
        sectionCheckbox.addEventListener('change', function () {
            const section = this.closest('section');
            const itemCheckboxes = section.querySelectorAll('.item-checkbox');
            itemCheckboxes.forEach(itemCheckbox => {
                itemCheckbox.checked = this.checked;
            });
        });
    });

    const itemCheckboxes = document.querySelectorAll('.item-checkbox');
    itemCheckboxes.forEach(itemCheckbox => {
        itemCheckbox.addEventListener('change', function () {
            const section = this.closest('section');
            const sectionCheckbox = section.querySelector('.section-checkbox');
            const allChecked = section.querySelectorAll('.item-checkbox:checked').length === section.querySelectorAll('.item-checkbox').length;
            sectionCheckbox.checked = allChecked;
        });
    });

    // Salesforce link redirection logic
    const salesforceLink = document.getElementById('salesforce-link');
    salesforceLink.addEventListener('click', function (event) {
        event.preventDefault();
        redirectToSalesforce();
    });
});

function toggleMenu() {
    document.getElementById('nav-menu').classList.toggle('show');
}

function redirectToSalesforce() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const salesforceAppUrl = 'salesforce1://valvoline.my.salesforce.com/';
    const salesforceWebUrl = 'https://valvoline.my.salesforce.com/';

    if (isMobile) {
        const start = Date.now();

        // Attempt to open the Salesforce app
        window.location.href = salesforceAppUrl;

        // Fallback to browser if the app is not installed
        setTimeout(() => {
            const elapsedTime = Date.now() - start;
            if (elapsedTime < 1500) {  // If less than 1.5 seconds have passed, the app wasn't opened
                window.location.href = salesforceWebUrl;
            }
        }, 1500);
    } else {
        // Open in browser for non-mobile devices
        window.location.href = salesforceWebUrl;
    }
}
