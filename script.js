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
    z-index: 1000;
    position: relative;
}

.logo {
    display: block;
    margin: 0 auto;
}

nav {
    background-color: #343a40;
    padding: 10px;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 999;
    box-sizing: border-box;
    margin: 0;
}

nav ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

nav ul li {
    margin: 5px;
    width: auto; /* Ensure list items adjust to the link width */
}

nav ul li a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    padding: 10px 20px; /* Adjust padding as needed */
    background-color: #007bff;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s, border 0.3s;
    display: inline-block; /* Ensure links do not take the full width */
    text-align: center;
    height: 50px; /* Set a fixed height for uniformity */
    line-height: 30px; /* Adjust line height to center text vertically */
    box-sizing: border-box;
    white-space: nowrap; /* Prevent text wrapping */
    overflow: hidden; /* Ensure text does not overflow */
}

nav ul li a:hover {
    background-color: #0056b3;
    color: yellow;
    border: 2px solid white;
}

nav input[type="text"] {
    padding: 5px;
    border: none;
    border-radius: 4px;
    margin-top: 10px;
    display: block;
    width: calc(100% - 40px);
    margin: 10px auto;
}

@media (max-width: 600px) {
    .checklist-item {
        flex-direction: row;
        align-items: flex-start;
    }

    .checklist-item input[type="checkbox"] {
        margin-right: 10px;
        margin-top: 4px;
    }

    .hamburger {
        display: block;
    }

    nav ul {
        display: none; /* Collapse the menu for mobile view */
        flex-direction: column;
        width: 100%;
        background-color: #343a40;
        padding: 0;
        box-sizing: border-box;
    }

    nav ul.show {
        display: flex;
    }

    nav ul li {
        margin: 5px 0;
        width: 100%;
    }

    nav ul li a {
        width: 90%; /* Adjust width for mobile view */
        text-align: center;
        padding: 10px 0;
        margin: 0 auto;
    }

    nav input[type="text"] {
        width: 90%;
    }
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

/* General styles for nested lists to ensure proper indentation */
ul ul {
    padding-left: 20px; /* Adjust this value to control the level of indentation */
    list-style-type: disc; /* Change bullet style if necessary */
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
    margin: 0;
    text-align: center;
    box-sizing: border-box;
}

.collapsible .content nav ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.collapsible .content nav ul li {
    margin: 5px 0; /* Reduce margin for better spacing */
    width: 100%;
}

.collapsible .content nav ul li a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    padding: 10px 20px;
    background-color: #007bff;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s, border 0.3s;
    display: block;
    width: 90%; /* Ensure the buttons don't overflow */
    text-align: center;
    margin: 0 auto; /* Center the buttons */
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

@media (max-width: 600px) {
    footer .social-links a {
        margin: 5px 0;
    }
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
