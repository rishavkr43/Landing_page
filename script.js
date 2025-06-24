// script.js

// DOM Elements
const playBtn = document.getElementById('playBtn');
const mainVideo = document.getElementById('mainVideo');
const contactForm = document.getElementById('contactForm');
const navbar = document.querySelector('.navbar');


// Video functionality
let isVideoPlaying = false;

playBtn.addEventListener('click', function() {
    if (!isVideoPlaying) {
        // Play video
        mainVideo.play();
        playBtn.style.display = 'none';
        isVideoPlaying = true;
        
        // Show play button when video is paused
        mainVideo.addEventListener('pause', function() {
            playBtn.style.display = 'block';
            isVideoPlaying = false;
        });
        
        // Hide play button when video ends
        mainVideo.addEventListener('ended', function() {
            playBtn.style.display = 'block';
            isVideoPlaying = false;
        });
    }
});

// Video modal functionality for fullscreen
function createVideoModal() {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">&times;</button>
            <video controls autoplay>
                <source src="demo-video.mp4" type="video/mp4">
            </video>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', function() {
        modal.remove();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    modal.classList.add('active');
}

// Double click video for fullscreen
mainVideo.addEventListener('dblclick', createVideoModal);

// Navbar scroll effect
window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        // Hide navbar when scrolled down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Show navbar only when at top (scrollTop <= 100)
        navbar.style.transform = 'translateY(0)';
    }
    
    // Keep the navbar background consistent
    navbar.style.background = 'rgba(0, 0, 0, 0.1)';
}); 
    
// Contact form functionality
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name') || contactForm.querySelector('input[type="text"]').value;
    const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
    const message = formData.get('message') || contactForm.querySelector('textarea').value;
    
    // Validate form
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        alert('Message sent successfully!');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Google Maps initialization
function initMap() {
    const mapOptions = {
        center: { lat: 37.7749, lng: -122.4194 }, // San Francisco coordinates
        zoom: 12,
        styles: [
            {
                featureType: 'all',
                elementType: 'geometry.fill',
                stylers: [{ color: '#f5f5f5' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#0066ff' }]
            }
        ]
    };

    const map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

    // Add marker
    const marker = new google.maps.Marker({
        position: { lat: 37.7749, lng: -122.4194 },
        map: map,
        title: 'Our Office',
        animation: google.maps.Animation.DROP
    });

    // Add info window
    const infoWindow = new google.maps.InfoWindow({
        content: `<div>
            <h3>Our Office</h3>
            <p>123 Design Street<br>
            San Francisco, CA 94102</p>
        </div>`
    });

    // Show info window when marker is clicked
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}
// Testimonial Auto-Slider Implementation
class TestimonialSlider {
    constructor() {
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.dots = document.querySelectorAll('.dot');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.autoSlideDelay = 2000; // 2 seconds
        
        console.log('Testimonial Slider initialized');
        console.log('Found slides:', this.slides.length);
        console.log('Found dots:', this.dots.length);
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) {
            console.log('No testimonial slides found');
            return;
        }
        
        // Show first slide initially
        this.showSlide(0);
        
        // Add click events to dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                console.log('Dot clicked:', index);
                this.goToSlide(index);
            });
        });
        
        // Start auto-sliding
        this.startAutoSlide();
        
        // Pause on hover
        const sliderContainer = document.querySelector('.testimonial-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => this.pauseAutoSlide());
            sliderContainer.addEventListener('mouseleave', () => this.startAutoSlide());
        }
    }
    
    showSlide(index) {
        console.log('Showing slide:', index);
        
        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        this.dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide and activate corresponding dot
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
        }
        if (this.dots[index]) {
            this.dots[index].classList.add('active');
        }
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        console.log('Moving to next slide:', nextIndex);
        this.showSlide(nextIndex);
    }
    
    goToSlide(index) {
        this.showSlide(index);
        // Restart auto-slide after manual navigation
        this.startAutoSlide();
    }
    
    startAutoSlide() {
        this.pauseAutoSlide(); // Clear any existing interval
        console.log('Starting auto-slide');
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoSlideDelay);
    }
    
    pauseAutoSlide() {
        if (this.slideInterval) {
            console.log('Pausing auto-slide');
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

// Initialize the testimonial slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing testimonial slider');
    new TestimonialSlider();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Progress bar animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Trigger progress bar animation when section is visible
const progressSection = document.querySelector('.testimonial');
if (progressSection) {
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressObserver.observe(progressSection);
}

// Pricing card hover effects
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (this.classList.contains('featured')) {
            this.style.transform = 'scale(1.05)';
        } else {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Mobile menu toggle (if needed)
function createMobileMenu() {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.display = 'none';
    
    const navActions = document.querySelector('.nav-actions');
    navActions.appendChild(mobileMenuBtn);
    
    // Show mobile menu button on small screens
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            document.querySelector('.nav-links').style.display = 'none';
        } else {
            mobileMenuBtn.style.display = 'none';
            document.querySelector('.nav-links').style.display = 'flex';
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

// Initialize mobile menu
createMobileMenu();

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// // Testimonial Slider Functionality
// class TestimonialSlider {
//     constructor() {
//         this.slides = document.querySelectorAll('.testimonial-slide');
//         this.dots = document.querySelectorAll('.dot');
//         this.currentSlide = 0;
//         this.slideInterval = null;
        
//         this.init();
//     }
    
//     init() {
//         // Add click events to dots
//         this.dots.forEach((dot, index) => {
//             dot.addEventListener('click', () => {
//                 this.goToSlide(index);
//                 this.resetAutoSlide();
//             });
//         });
        
//         // Start auto sliding
//         this.startAutoSlide();
        
//         // Pause on hover
//         const slider = document.querySelector('.testimonial-slider');
//         if (slider) {
//             slider.addEventListener('mouseenter', () => this.pauseAutoSlide());
//             slider.addEventListener('mouseleave', () => this.startAutoSlide());
//         }
//     }
    
//     goToSlide(slideIndex) {
//         // Remove active class from current slide and dot
//         this.slides[this.currentSlide].classList.remove('active');
//         this.dots[this.currentSlide].classList.remove('active');
        
//         // Update current slide
//         this.currentSlide = slideIndex;
        
//         // Add active class to new slide and dot
//         this.slides[this.currentSlide].classList.add('active');
//         this.dots[this.currentSlide].classList.add('active');
//     }
    
//     nextSlide() {
//         const nextIndex = (this.currentSlide + 1) % this.slides.length;
//         this.goToSlide(nextIndex);
//     }
    
//     startAutoSlide() {
//         this.slideInterval = setInterval(() => {
//             this.nextSlide();
//         }, 5000); // Change slide every 5 seconds
//     }
    
//     pauseAutoSlide() {
//         if (this.slideInterval) {
//             clearInterval(this.slideInterval);
//         }
//     }
    
//     resetAutoSlide() {
//         this.pauseAutoSlide();
//         this.startAutoSlide();
//     }
// }

// // Initialize testimonial slider when DOM is loaded
// document.addEventListener('DOMContentLoaded', function() {
//     if (document.querySelector('.testimonial-slider')) {
//         new TestimonialSlider();
//     }
// });

// Error handling for video
mainVideo.addEventListener('error', function() {
    console.error('Video failed to load');
    playBtn.style.display = 'none';
    const errorMsg = document.createElement('div');
    errorMsg.textContent = 'Video unavailable';
    errorMsg.style.position = 'absolute';
    errorMsg.style.top = '50%';
    errorMsg.style.left = '50%';
    errorMsg.style.transform = 'translate(-50%, -50%)';
    errorMsg.style.color = '#666';
    document.querySelector('.video-player').appendChild(errorMsg);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Figma landing page loaded successfully');
    
    // Add any additional initialization here
    if (typeof google !== 'undefined') {
        initMap();
    }
});
