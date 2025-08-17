// Tab functionality for education page
function toggleTab(tabId) {
    const tabContent = document.getElementById(tabId);
    const tabArrow = tabContent.previousElementSibling.querySelector('.tab-arrow');
    
    // Check if this tab is currently active
    const isActive = tabContent.classList.contains('active');
    
    // If the clicked tab wasn't active, open it
    if (!isActive) {
        tabContent.classList.add('active');
        tabHeader.classList.add('active');
    }

    else {
        tabContent.classList.remove('active');
        tabHeader.classList.remove('active');
    }
}

function loadNavigation() {
    fetch('/navigation.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;
            initializeLanguageSwitcher(); // Initialize language switcher
            initializeNavScrollEffect(); // Initialize navigation scroll effect
            highlightCurrentPage(); // Highlight current page in navigation
            initializeNavClicks(); // Initialize click-based highlighting
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
        });
}

function loadFooter() {
    fetch('/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}

// Load navigation and footer
document.addEventListener('DOMContentLoaded', function() {
    loadNavigation();
    loadFooter();
    sortArticlesByDate(); // Auto-sort articles on page load
    sortExperienceByDate(); // Auto-sort experience items on page load
    musicCarousel.init(); // Initialize music carousel
});

// Language switcher functionality
function initializeLanguageSwitcher() {
    const langTab = document.getElementById('lang-tab');
    const langDropdown = document.getElementById('lang-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    const navLinks = document.querySelectorAll('.nav-link');
    const currentLangSpan = document.getElementById('current-lang');
    
    // Get saved language preference or default to English
    let currentLanguage = localStorage.getItem('preferredLanguage') || 'en';
    let isEnglish = currentLanguage === 'en';

    // Apply saved language on load
    applyLanguage(isEnglish, navLinks, currentLangSpan);

    // Toggle dropdown visibility
    langTab.addEventListener('click', function(e) {
        e.stopPropagation();
        langDropdown.classList.toggle('show');
    });

    // Handle language selection
    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            isEnglish = selectedLang === 'en';
            currentLanguage = selectedLang;
            
            // Save language preference
            localStorage.setItem('preferredLanguage', currentLanguage);
            
            // Apply language changes
            applyLanguage(isEnglish, navLinks, currentLangSpan);
            
            // Hide dropdown
            langDropdown.classList.remove('show');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        langDropdown.classList.remove('show');
    });
}

// Apply language to navigation
function applyLanguage(isEnglish, navLinks, currentLangSpan) {
    navLinks.forEach(link => {
        if (isEnglish) {
            link.textContent = link.getAttribute('data-en');
        } else {
            link.textContent = link.getAttribute('data-zh');
        }
    });

    currentLangSpan.textContent = isEnglish ? 'EN' : '中文';
}

// Navigation scroll effect
function initializeNavScrollEffect() {
    const nav = document.querySelector('.nav-horizontal');
    const navBrand = document.querySelector('.nav-brand');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('shrunk');
        } else {
            nav.classList.remove('shrunk');
        }
    });
}

// Highlight current page in navigation
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    console.log('Current path:', currentPath); // Debug log
    
    navLinks.forEach(link => {
        // Remove any existing current-page class
        link.classList.remove('current-page');
        
        // Get the href attribute and normalize it
        const linkPath = link.getAttribute('href');
        console.log('Checking link:', linkPath); // Debug log
        
        // Normalize paths for comparison
        const normalizedCurrentPath = currentPath.toLowerCase();
        const normalizedLinkPath = linkPath.toLowerCase();
        
        // Check if this link matches the current page
        let isMatch = false;
        
        // Exact match
        if (normalizedLinkPath === normalizedCurrentPath) {
            isMatch = true;
        }
        // Home page special cases
        else if ((normalizedCurrentPath === '/' || normalizedCurrentPath === '/index.html') && 
                 normalizedLinkPath === '/index.html') {
            isMatch = true;
        }
        // Other page matches (without leading slash variations)
        else if (normalizedCurrentPath.endsWith(normalizedLinkPath.replace('/', ''))) {
            isMatch = true;
        }
        // Article sub-pages should highlight Articles tab
        else if (normalizedCurrentPath.includes('/articles/') && normalizedLinkPath === '/articles.html') {
            isMatch = true;
        }
        
        if (isMatch) {
            link.classList.add('current-page');
            console.log('✅ Current page link set for:', linkPath, 'matching current:', currentPath); // Debug log
        }
    });
}

// Initialize click-based navigation highlighting
function initializeNavClicks() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove click-active class from all links
            navLinks.forEach(navLink => {
                navLink.classList.remove('click-active');
            });
            
            // Add click-active class to clicked link
            this.classList.add('click-active');
            
            console.log('✅ Click-active set for:', this.getAttribute('href'));
        });
    });
}

// Handle video clicks
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'VIDEO') {
        e.stopPropagation();
    }
});

// Auto-sort articles by date (newest to oldest)
function sortArticlesByDate() {
    const articlesList = document.querySelector('.articles-list');
    if (!articlesList) return; // Exit if not on articles page
    
    const articles = Array.from(articlesList.querySelectorAll('.article-item'));
    
    // Function to parse date strings like "July 6th, 2025" or "June 28th, 2025"
    function parseArticleDate(dateString) {
        // Remove ordinal suffixes (st, nd, rd, th) and parse
        const cleanedDate = dateString.replace(/(\d+)(st|nd|rd|th)/, '$1');
        return new Date(cleanedDate);
    }
    
    // Sort articles by date
    articles.sort((a, b) => {
        const dateTextA = a.querySelector('.article-date').textContent.trim();
        const dateTextB = b.querySelector('.article-date').textContent.trim();
        
        const dateA = parseArticleDate(dateTextA);
        const dateB = parseArticleDate(dateTextB);
        
        console.log(`Comparing dates: "${dateTextA}" (${dateA}) vs "${dateTextB}" (${dateB})`);
        
        return dateB - dateA; // Newest first (descending order)
    });
    
    console.log('Articles sorted by date (newest first)');
    
    // Clear the container and re-append in sorted order
    articlesList.innerHTML = '';
    articles.forEach(article => {
        articlesList.appendChild(article);
    });
}

// Auto-sort experience items by end date (newest to oldest)
function sortExperienceByDate() {
    const tabsContainer = document.querySelector('.education-tabs');
    if (!tabsContainer) return; // Exit if not on experience page

    const items = Array.from(tabsContainer.querySelectorAll('.tab-item'));

    function parseEndDate(rangeText) {
        if (!rangeText) return new Date(0);

        const cleaned = rangeText.replace(/\s+/g, ' ').trim();

        // Examples: "June 2023 - May 2024", "January 2025 - Present", "July 2025"
        const hasDash = cleaned.includes('-');
        let endText = cleaned;
        if (hasDash) {
            endText = cleaned.split('-')[1].trim();
        }

        // Handle Present/current entries by prioritizing them as most recent
        if (/present/i.test(endText)) {
            return new Date(9999, 11, 31);
        }

        // Ensure a day for parsing; prefer first day of month
        // Accept formats like "May 2024" or "May 2024,"
        endText = endText.replace(/[,]/g, '').trim();

        // If only a year is provided, default to December of that year
        if (/^\d{4}$/.test(endText)) {
            return new Date(parseInt(endText, 10), 11, 31);
        }

        // Try to parse as Month Year
        const parsed = new Date(endText);
        if (!isNaN(parsed)) {
            return parsed;
        }

        // Fallback: parse start date if end couldn't be parsed
        if (hasDash) {
            const startText = cleaned.split('-')[0].trim();
            const startParsed = new Date(startText);
            if (!isNaN(startParsed)) return startParsed;
        }

        return new Date(0);
    }

    items.sort((a, b) => {
        const aText = (a.querySelector('.tab-years')?.textContent || '').trim();
        const bText = (b.querySelector('.tab-years')?.textContent || '').trim();
        const aDate = parseEndDate(aText);
        const bDate = parseEndDate(bText);
        return bDate - aDate; // Newest first
    });

    // Re-append in sorted order
    items.forEach(item => tabsContainer.appendChild(item));
}

// Music Carousel Functionality
const musicCarousel = {
    currentSlide: 0,
    totalSlides: 3,
    
    init() {
        // Initialize carousel if on life page
        if (document.querySelector('.music-carousel')) {
            this.updateCarousel();
            // Auto-advance carousel every 8 seconds
            setInterval(() => {
                this.next();
            }, 8000);
        }
    },
    
    next() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    },
    
    prev() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    },
    
    goTo(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateCarousel();
    },
    
    updateCarousel() {
        const track = document.querySelector('.carousel-track');
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        
        if (!track || !slides.length || !indicators.length) return;
        
        // Move the track
        const translateX = -this.currentSlide * (100 / this.totalSlides);
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update slide visibility
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }
};

