const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbarMenu');
const heroTyping = document.querySelector('.typing-text');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const pageLoader = document.getElementById('pageLoader');

const words = ['Web Developer', 'Software Enthusiast', 'Problem Solver', 'Future Tech Entrepreneur'];
let wordIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    const displayedText = isDeleting
        ? currentWord.substring(0, characterIndex - 1)
        : currentWord.substring(0, characterIndex + 1);

    heroTyping.textContent = displayedText;

    if (!isDeleting) {
        characterIndex++;
    } else {
        characterIndex--;
    }

    let speed = isDeleting ? 60 : 120;

    if (!isDeleting && characterIndex === currentWord.length) {
        speed = 1800;
        isDeleting = true;
    } else if (isDeleting && characterIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 450;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();


hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbarMenu.classList.toggle('mobile-active');
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('mobile-active');
    });
});

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll('.fade-in').forEach((element) => {
    revealObserver.observe(element);
});

function setActiveLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.clientHeight;
        const id = section.getAttribute('id');

        if (scrollPosition >= top && scrollPosition < top + height) {
            navLinks.forEach((link) => {
                link.classList.toggle(link.getAttribute('href') === `#${id}`, link.getAttribute('href') === `#${id}`);
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', () => {
    setActiveLink();
    const showButton = window.scrollY > 500;
    backToTop.classList.toggle('show', showButton);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('load', () => {
    if (pageLoader) {
        pageLoader.classList.add('hidden');
        setTimeout(() => {
            pageLoader.style.display = 'none';
        }, 500);
    }
});

const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.getElementById('skills');

if (skillsSection) {
    const skillObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    skillBars.forEach((bar) => {
                        bar.style.width = bar.style.getPropertyValue('--progress');
                    });
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.35 }
    );
    skillObserver.observe(skillsSection);
}


function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('visible');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

const toastStyle = document.createElement('style');
toastStyle.textContent = `
.toast {
    position: fixed;
    bottom: 24px;
    right: 24px;
    padding: 14px 20px;
    border-radius: 18px;
    color: #040816;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.95);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.25s ease, transform 0.25s ease;
    z-index: 10001;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
}
.toast.visible { opacity: 1; transform: translateY(0); }
.toast-info { background: #b8e1ff; }
.toast-success { background: #afffe2; }
.toast-error { background: #ffb8b8; }
`;
document.head.appendChild(toastStyle);

const mobileObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll('.project-card, .experience-card, .extra-card, .contact-info, .feature-card').forEach((el) => {
    mobileObserver.observe(el);
});

// Smooth page transitions if user navigates via anchor links
navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        if (link.hash) {
            event.preventDefault();
            document.querySelector(link.hash).scrollIntoView({ behavior: 'smooth' });
        }
    });
});
