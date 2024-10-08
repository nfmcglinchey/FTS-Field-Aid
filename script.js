document.addEventListener('DOMContentLoaded', function () {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    function addClickOrTouchEventListener(element, callback) {
        if (isMobile) {
            let touchStartX = 0;
            let touchStartY = 0;

            element.addEventListener('touchstart', function(event) {
                touchStartX = event.changedTouches[0].screenX;
                touchStartY = event.changedTouches[0].screenY;
            });

            element.addEventListener('touchend', function(event) {
                const touchEndX = event.changedTouches[0].screenX;
                const touchEndY = event.changedTouches[0].screenY;

                const touchMovementX = Math.abs(touchEndX - touchStartX);
                const touchMovementY = Math.abs(touchEndY - touchStartY);

                // Define a threshold for minimal movement to distinguish between a tap and scroll
                const threshold = 10; // Adjust this value if needed

                if (touchMovementX < threshold && touchMovementY < threshold) {
                    callback(event); // Execute the action only if it's a tap (minimal movement)
                }
            });
        } else {
            element.addEventListener('click', callback);
        }
    }

    const sections = {
        'market-visit-checklist': document.getElementById('market-visit-checklist'),
        'on-location-checklist': document.getElementById('on-location-checklist'),
        'fts-tools': document.getElementById('fts-tools')
    };

    // Navigation tab functionality
    document.querySelectorAll('.nav-tab').forEach(button => {
        addClickOrTouchEventListener(button, function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const section = document.getElementById(targetId);
            toggleSection(section);
        });
    });

    // Function to toggle sections visibility
    function toggleSection(section) {
        const content = section.querySelector('.content');
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
            scrollToSection(section);
        }
    }

    // Scroll to section function
    function scrollToSection(section) {
        const headerOffset = document.querySelector('header').offsetHeight + 10; // Adjust based on header height
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // Collapsible section headers functionality
    const collapsibleHeaders = document.querySelectorAll('.collapsible > h2');
    collapsibleHeaders.forEach(header => {
        addClickOrTouchEventListener(header, () => {
            const content = header.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });

    // Initially hide all collapsible content
    document.querySelectorAll('.collapsible .content').forEach(div => div.style.display = 'none');

    // Search functionality
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const sections = document.querySelectorAll('main section');
        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            section.style.display = text.includes(query) ? 'block' : 'none';
        });
    });

    // Toggle content for Key Account and Strategic Account
    const keyAccountButton = document.getElementById('key-account-button');
    const strategicAccountButton = document.getElementById('strategic-account-button');
    const keyAccountContent = document.getElementById('key-account-content');
    const strategicAccountContent = document.getElementById('strategic-account-content');

    keyAccountContent.style.display = 'none';
    strategicAccountContent.style.display = 'none';

    addClickOrTouchEventListener(keyAccountButton, function () {
        toggleContent(keyAccountContent, strategicAccountContent);
    });

    addClickOrTouchEventListener(strategicAccountButton, function () {
        toggleContent(strategicAccountContent, keyAccountContent);
    });

    function toggleContent(contentToShow, contentToHide) {
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

    // Modal functionality for viewing PDF
    const modal = document.getElementById('pdfModal');
    const btn = document.getElementById('openModalBtn');
    const span = document.getElementsByClassName('close-btn')[0];

    btn.onclick = function() {
        if (isMobile) {
            window.open('FTS Field Aid.pdf', '_blank');
        } else {
            modal.style.display = 'block';
        }
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Handling checkboxes for sections and items
    const sectionCheckboxes = document.querySelectorAll('.section-checkbox');
    sectionCheckboxes.forEach(sectionCheckbox => {
        addClickOrTouchEventListener(sectionCheckbox, function () {
            const section = this.closest('section');
            const itemCheckboxes = section.querySelectorAll('.item-checkbox');
            itemCheckboxes.forEach(itemCheckbox => {
                itemCheckbox.checked = this.checked;
            });
        });
    });

    const itemCheckboxes = document.querySelectorAll('.item-checkbox');
    itemCheckboxes.forEach(itemCheckbox => {
        addClickOrTouchEventListener(itemCheckbox, function () {
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
