// Portfolio data management
const portfolioData = {
    items: [],
    skills: [],
    services: []
};

// Load data from localStorage
function loadData() {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
        Object.assign(portfolioData, JSON.parse(savedData));
        renderPortfolioItems();
        renderSkills();
        renderServices();
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    updateMainSite();
}

// Add portfolio item
function addPortfolioItem(item) {
    portfolioData.items.push(item);
    saveData();
    renderPortfolioItems();
}

// Update portfolio item
function updatePortfolioItem(index, item) {
    portfolioData.items[index] = item;
    saveData();
    renderPortfolioItems();
}

// Delete portfolio item
function deletePortfolioItem(index) {
    portfolioData.items.splice(index, 1);
    saveData();
    renderPortfolioItems();
}

// Add skill
function addSkill(skill) {
    portfolioData.skills.push(skill);
    saveData();
    renderSkills();
}

// Update skill
function updateSkill(index, skill) {
    portfolioData.skills[index] = skill;
    saveData();
    renderSkills();
}

// Delete skill
function deleteSkill(index) {
    portfolioData.skills.splice(index, 1);
    saveData();
    renderSkills();
}

// Add service
function addService(service) {
    portfolioData.services.push(service);
    saveData();
    renderServices();
}

// Update service
function updateService(index, service) {
    portfolioData.services[index] = service;
    saveData();
    renderServices();
}

// Delete service
function deleteService(index) {
    portfolioData.services.splice(index, 1);
    saveData();
    renderServices();
}

// Render portfolio items in admin dashboard
function renderPortfolioItems() {
    const container = document.getElementById('portfolioItems');
    if (!container) return;

    container.innerHTML = '';
    portfolioData.items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'portfolio-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="action-buttons">
                <button onclick="editPortfolioItem(${index})">Edit</button>
                <button onclick="deletePortfolioItem(${index})">Delete</button>
            </div>
        `;
        container.appendChild(itemElement);
    });
}

// Render skills in admin dashboard
function renderSkills() {
    const container = document.getElementById('skillsList');
    if (!container) return;

    container.innerHTML = '';
    portfolioData.skills.forEach((skill, index) => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-item';
        skillElement.innerHTML = `
            <img src="${skill.icon}" alt="${skill.name}">
            <h3>${skill.name}</h3>
            <p>${skill.category}</p>
            <div class="action-buttons">
                <button onclick="editSkill(${index})">Edit</button>
                <button onclick="deleteSkill(${index})">Delete</button>
            </div>
        `;
        container.appendChild(skillElement);
    });
}

// Render services in admin dashboard
function renderServices() {
    const container = document.getElementById('servicesList');
    if (!container) return;

    container.innerHTML = '';
    portfolioData.services.forEach((service, index) => {
        const serviceElement = document.createElement('div');
        serviceElement.className = 'service-item';
        serviceElement.innerHTML = `
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <div class="action-buttons">
                <button onclick="editService(${index})">Edit</button>
                <button onclick="deleteService(${index})">Delete</button>
            </div>
        `;
        container.appendChild(serviceElement);
    });
}

// Update main site content
function updateMainSite() {
    const portfolioSection = document.querySelector('#portfolio .gallery');
    const skillsSection = document.querySelector('#skills');
    const servicesSection = document.querySelector('#services .service-cards');

    if (portfolioSection) {
        portfolioSection.innerHTML = portfolioData.items.map(item => `
            <div class="portfolio-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join('');
    }

    if (skillsSection) {
        // Update skills section
    }

    if (servicesSection) {
        // Update services section
    }
}

// Initialize data when page loads
document.addEventListener('DOMContentLoaded', loadData);