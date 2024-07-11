document.addEventListener('DOMContentLoaded', function () {
    const keyAccountButton = document.getElementById('key-account-button');
    const strategicAccountButton = document.getElementById('strategic-account-button');
    const keyAccountContent = document.getElementById('key-account-content');
    const strategicAccountContent = document.getElementById('strategic-account-content');
    const onLocationChecklistContent = document.getElementById('on-location-checklist-content');
    const onLocationChecklistSection = document.getElementById('on-location-checklist');

    keyAccountContent.style.display = 'none';
    strategicAccountContent.style.display = 'none';

    keyAccountButton.addEventListener('click', function () {
        toggleContent(keyAccountContent, strategicAccountContent);
    });

    strategicAccountButton.addEventListener('click', function () {
        toggleContent(strategicAccountContent, keyAccountContent);
    });

    function toggleContent(contentToShow, contentToHide) {
        contentToHide.style.display = 'none';
        if (contentToShow.style.display === 'block') {
            contentToShow.style.display = 'none';
            onLocationChecklistContent.classList.remove('active');
            onLocationChecklistContent.style.maxHeight = '0';
        } else {
            contentToShow.style.display = 'block';
            onLocationChecklistContent.classList.add('active');
            onLocationChecklistContent.style.maxHeight = contentToShow.scrollHeight + 'px';
        }
    }

    const collapsibleHeaders = document.querySelectorAll('.collapsible > h2');
    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
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
});

function toggleMenu() {
    document.getElementById('nav-menu').classList.toggle('show');
}

function redirectToSalesforce() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const appUrl = 'salesforce1://valvoline.my.salesforce.com/';
    const webUrl = 'https://valvoline.my.salesforce.com/';

    if (isMobile) {
        const timeout = setTimeout(() => {
            // If the app did not open, navigate to the web URL
            window.location.href = webUrl;
        }, 2000); // 2 seconds delay

        // Try to open the app
        window.location.href = appUrl;

        // Clear the timeout if the app opens successfully
        window.addEventListener('blur', () => clearTimeout(timeout));
    } else {
        window.location.href = webUrl;
    }
}
