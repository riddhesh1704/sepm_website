// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight active section in navigation
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active class to clicked navigation item
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('nav a').forEach(item => {
            item.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Simple animation for diagram containers when they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.diagram-container').forEach(container => {
    container.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    container.style.opacity = 0;
    container.style.transform = 'translateY(20px)';
    observer.observe(container);
});

// Add a simple search functionality for UML notations
function searchNotations() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const items = document.querySelectorAll('.notation-info li');
    
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.style.backgroundColor = '#e3f2fd';
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            item.style.backgroundColor = '';
        }
    });
}

// Add search functionality to the page
document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.createElement('div');
    searchBox.innerHTML = `
        <div style="margin: 1rem 0; text-align: center;">
            <input type="text" id="search-input" placeholder="Search UML notations..." 
                   style="padding: 0.5rem; width: 300px; border: 1px solid #ccc; border-radius: 4px;">
            <button onclick="searchNotations()" 
                    style="padding: 0.5rem 1rem; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Search
            </button>
        </div>
    `;
    
    const mainElement = document.querySelector('main');
    mainElement.insertBefore(searchBox, mainElement.firstChild);
});