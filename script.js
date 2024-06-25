document.addEventListener('DOMContentLoaded', function () {
    const collapsibleHeaders = document.querySelectorAll('.collapsible h2');

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
            if (content.style.display !== 'block') {
                content.style.display = 'block';
            }

            // Smooth scroll to the target section
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Handle section checkbox based on subcategory checkboxes
    const sections = document.querySelectorAll('.collapsible');
    sections.forEach(section => {
        const sectionCheckbox = section.querySelector('.section-checkbox');
        const itemCheckboxes = section.querySelectorAll('.item-checkbox');

        itemCheckboxes.forEach(itemCheckbox => {
            itemCheckbox.addEventListener('change', () => {
                const allChecked = Array.from(itemCheckboxes).every(cb => cb.checked);
                sectionCheckbox.checked = allChecked;

                // Collapse section if all checkboxes are checked
                const content = section.querySelector('.content');
                if (allChecked) {
                    content.style.display = 'none';
                }
            });
        });

        sectionCheckbox.addEventListener('change', () => {
            itemCheckboxes.forEach(cb => cb.checked = sectionCheckbox.checked);
            const content = section.querySelector('.content');
            if (sectionCheckbox.checked) {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
});

