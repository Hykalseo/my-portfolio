// Remove theme toggle related code
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name && email && message) {
        const messageText = window.innerWidth < 768 ? 
            `Thanks, ${name}!` : 
            `Thank you for your message, ${name}!`;
        alert(messageText);
        document.getElementById('contactForm').reset();
    } else {
        alert('Please fill out all fields.');
    }
}

function checkScreenSize() {
    const form = document.getElementById('contactForm');
    if (form) { // Add null check
        if (window.innerWidth < 768) {
            form.classList.add('mobile-view');
        } else {
            form.classList.remove('mobile-view');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const loadingScreens = document.querySelectorAll('.loading-screen');
    
    // Show loading screen immediately
    loadingScreens.forEach(screen => {
        screen.style.display = 'flex';
        screen.style.opacity = '1';
    });
    
    // Hide loading screen when page is fully loaded
    window.addEventListener('load', function() {
        loadingScreens.forEach(screen => {
            screen.style.opacity = '0';
            setTimeout(() => {
                screen.style.display = 'none';
            }, 500);
        });
    });
    
    // Fallback in case load event doesn't fire
    setTimeout(() => {
        loadingScreens.forEach(screen => {
            if (screen.style.opacity !== '0') {
                screen.style.opacity = '0';
                setTimeout(() => {
                    screen.style.display = 'none';
                }, 500);
            }
        });
    }, 3000);
    
    checkScreenSize();
});

const contactForm = document.getElementById('contactForm');
if (contactForm) { // Add null check
    contactForm.addEventListener('submit', handleFormSubmit);
}

window.addEventListener('resize', checkScreenSize);

// Popup functions
// Remove these functions and event listeners
function showPopup(title, content) {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.querySelector('h3').textContent = title;
        popup.querySelector('p').textContent = content;
        popup.classList.add('active');
    }
}

function closePopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const backdrop = document.querySelector('.backdrop');

    if (menuToggle && sidebar && backdrop) {
        function toggleMenu() {
            menuToggle.classList.toggle('active');
            sidebar.classList.toggle('active');
            backdrop.classList.toggle('active');
        }

        menuToggle.addEventListener('click', toggleMenu);
        backdrop.addEventListener('click', toggleMenu);
    }

    const popup = document.getElementById('popup');
    if (popup) {
        popup.querySelector('.close-popup').removeEventListener('click', closePopup);
        popup.removeEventListener('click', function(e) {
            if (e.target === this) {
                closePopup();
            }
        });
    }
});

// Add event listeners for popup triggers
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.dataset.popupTitle;
            const content = this.dataset.popupContent;
            showPopup(title, content);
        });
    });

    // Add click handlers for portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', function() {
            const title = this.dataset.popupTitle;
            const content = this.dataset.popupContent;
            showPopup(title, content);
        });
    });

    // Existing popup close handlers
    const popup = document.getElementById('popup');
    if (popup) {
        popup.querySelector('.close-popup').addEventListener('click', closePopup);
        popup.addEventListener('click', function(e) {
            if (e.target === this) {
                closePopup();
            }
        });
    }
});