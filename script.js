body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

header {
    text-align: center;
    padding: 20px;
    background-color: #007bff;
    color: white;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    z-index: 1000; /* Ensure header is on top */
    position: relative;
}

.logo {
    display: block;
    margin: 0 auto;
}

.primary-nav {
    background-color: #343a40;
    padding: 10px;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 999; /* Ensure nav is below header but above other content */
    box-sizing: border-box;
    margin: 0;
}

.primary-nav ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.primary-nav ul li {
    margin: 5px;
    width: auto; /* Ensure width is flexible */
    display: inline-block; /* Ensure buttons are in one line */
    text-align: center; /* Center the text inside buttons */
}

.primary-nav ul li a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    padding: 10px 15px; /* Reduced padding from 10px 20px */
    background-color: #007bff;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s, border 0.3s;
    display: inline-block; /* Ensure the width is applied */
    text-align: center; /* Center the text inside buttons */
    width: 200px; /* Set a fixed width */
    white-space: nowrap; /* Prevent text wrapping */
    line-height: 30px;
    box-sizing: border-box;
    overflow: hidden;
}

.primary-nav ul li a:hover {
    background-color: #0056b3;
    color: yellow;
    border: 2px solid white;
}

.primary-nav input[type="text"] {
    padding: 5px;
    border: none;
    border-radius: 4px;
    margin-top: 10px;
    display: block;
    width: calc(100% - 40px);
    margin: 10px auto;
}

@media (max-width: 600px) {
    .hamburger {
        display: block;
    }

    .primary-nav ul {
        display: none;
        flex-direction: column;
        width: 100%;
        background-color: #343a40;
        padding: 0;
        box-sizing: border-box;
    }

    .primary-nav ul.show {
        display: flex;
    }

    .primary-nav ul li {
        margin: 5px 0;
        width: 100%;
    }

    .primary-nav ul li a {
        padding: 10px;
        width: 100%;
        text-align: center;
    }

    .primary-nav input[type="text"] {
        width: 90%;
    }

    .collapsible h2 {
        font-size: 18px;
    }

    .collapsible .content {
        padding: 10px;
    }

    footer {
        padding: 10px;
    }

    footer .social-links a {
        margin: 5px 0;
    }
}

img {
    max-width: 100%;
    height: auto;
}

main {
    padding: 20px;
    flex: 1;
}

.collapsible {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 10px;
    background-color: white;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
}

.collapsible h2 {
    cursor: pointer;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f5f5f5;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
}

.collapsible .content {
    display: none;
    padding: 10px;
    box-sizing: border-box;
}

ul ul {
    padding-left: 20px;
    list-style-type: disc;
}

.checklist-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
    flex-wrap: nowrap;
}

.checklist-item input[type="checkbox"] {
    margin-right: 10px;
    margin-top: 4px;
}

.checklist-item .item-text {
    flex: 1;
    word-break: break-word;
}

#phone-number a {
    text-decoration: none;
    color: inherit;
}

.hamburger {
    display: none;
    cursor: pointer;
}

.hamburger div {
    width: 25px;
    height: 3px;
    background-color: white;
    margin: 5px;
    transition: all 0.3s ease;
}

.collapsible .content nav {
    background-color: #343a40;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    box-sizing: border-box;
    z-index: 1; /* Ensure it is below primary nav */
    position: relative;
}

.collapsible .content nav ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.collapsible .content nav ul li {
    margin: 5px 0;
    width: 100%;
    text-align: center;
}

.collapsible .content nav ul li a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    padding: 10px 15px; /* Reduced padding */
    background-color: #007bff;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s, border 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%; /* Adjust width to make it narrower */
    max-width: 300px; /* Set a maximum width for the tabs */
    margin: 0 auto; /* Center the tabs */
}

.collapsible .content nav ul li a:hover {
    background-color: #0056b3;
    color: yellow;
    border: 2px solid white;
}

footer {
    background-color: #343a40;
    color: white;
    text-align: center;
    padding: 20px 0;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

footer .social-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10px;
}

footer .social-links a {
    margin: 5px 10px;
    white-space: nowrap;
    color: white;
    text-decoration: none;
    transition: color 0.3s, background-color 0.3s, padding 0.3s;
}

footer .social-links a:hover {
    color: #007bff;
    text-decoration: underline;
    background-color: #f1f1f1;
    padding: 5px;
    border-radius: 3px;
}

/* Embed PDF Responsively */
.pdf-section embed {
    width: 100%;
    height: 600px; /* Default height for desktops */
}

/* Adjust for tablets */
@media (max-width: 768px) {
    .pdf-section embed {
        height: 400px; /* Adjust height for medium screens */
    }
}

/* Adjust for mobile (iPhone and small devices) */
@media (max-width: 480px) {
    .pdf-section embed {
        height: 300px; /* Adjust height for mobile devices */
    }
}

.mobile-fullscreen {
    display: block;
    text-align: center;
    margin-top: 10px;
}

.mobile-fullscreen a {
    color: #007bff;
    text-decoration: underline;
}

footer {
    padding: 10px;
}

.contact-section {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 5px;
    margin-top: 20px;
}

.contact-section h2 {
    text-align: center;
    margin-bottom: 20px;
}

.contact-section form {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}

.contact-section label {
    margin-bottom: 5px;
}

.contact-section input,
.contact-section textarea {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.contact-section button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.contact-section button:hover {
    background-color: #0056b3;
}

.contact-section a:hover {
    color: #007bff;
    text-decoration: underline;
    background-color: #f1f1f1;
    padding: 5px;
    border-radius: 3px;
}

.checklist-content {
    display: none;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 10px;
    background-color: #f9f9f9;
}

.checklist-content.active {
    display: block;
}

/* The Modal (background) */
.modal {
    display: none; 
    position: fixed; 
    z-index: 2000; /* Ensure modal is on top of everything */
    padding: 0; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: hidden; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.9); 
}

/* Modal Content */
.modal-content {
    background-color: #fefefe;
    margin: 0;
    padding: 0;
    border: none;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

/* The Close Button */
.close-btn {
    color: white;
    align-self: flex-end;
    font-size: 28px;
    font-weight: bold;
    margin: 10px;
    z-index: 2001; /* Ensure close button is on top of modal content */
    position: absolute;
    top: 0;
    right: 0;
}

.close-btn:hover,
.close-btn:focus {
    color: #ccc;
    text-decoration: none;
    cursor: pointer;
}

.modal-content embed {
    flex: 1;
    width: 100%;
    height: calc(100% - 40px);
    border: none;
}

@media (max-width: 600px) {
    .modal-content {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }

    .modal-content embed {
        width: 100%;
        height: calc(100% - 40px);
    }
}

@media (min-width: 601px) {
    #on-location-checklist-buttons {
        display: flex;
        justify-content: center;
    }

    #on-location-checklist-buttons button {
        margin: 10px;
    }

    #market-visit-checklist .content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #post-visit .content {
        display: flex;
        justify-content: center;
    }

    .content button {
        align-self: center;
    }

    #market-visit-checklist .content button {
        align-self: center;
    }
}

/* Center the Full Market Visit button */
button {
    display: block;
    margin: 10px auto;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    font-size: 16px;
    max-width: 300px; /* Set a maximum width for the buttons */
    width: 90%; /* Set the same width for all buttons */
}

button:hover {
    background-color: #0056b3;
    color: yellow;
    border: 2px solid white;
}

/* Style for Key Account and Strategic Account buttons */
#key-account-button, #strategic-account-button {
    display: block;
    margin: 10px auto;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    font-size: 16px;
    max-width: 300px;
}

#key-account-button:hover, #strategic-account-button:hover {
    background-color: #0056b3;
    color: yellow;
    border: 2px solid white;
}

/* Ensure the on-location checklist content doesn't show an empty box */
#on-location-checklist-content {
    border: none;
    padding: 0;
    background: none;
}
