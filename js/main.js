document.addEventListener('DOMContentLoaded', () => {
    // Set dark mode as default
    document.body.classList.add('dark-mode');
    darkModeIcon.classList.replace('bx-moon', 'bx-sun');
    
    // Initialize EmailJS
    emailjs.init("lEo0cx4BBjOvuVWEW");
});

// Menu icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Combined scroll event handler
window.addEventListener('scroll', () => {
    // Sticky navbar
    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Active section highlighting
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Remove menu icon navbar when scrolling
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
});

// Dark/Light mode toggle
let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
    document.body.classList.toggle('light-mode');
    if(document.body.classList.contains('light-mode')) {
        darkModeIcon.classList.replace('bx-moon', 'bx-sun');
    } else {
        darkModeIcon.classList.replace('bx-sun', 'bx-moon');
    }
};


const contactForm = document.getElementById('contactForm');

const popupHTML = `
    <div class="popup-notification" id="popupNotification">
        <h3 id="popupTitle">Thank You! 🎉</h3>
        <p id="popupMessage">Your message has been sent successfully. I will get back to you soon!</p>
        <button onclick="closePopup()">Close</button>
    </div>
`;
document.body.insertAdjacentHTML('beforeend', popupHTML);

const popup = document.getElementById('popupNotification');
const popupTitle = document.getElementById('popupTitle');
const popupMessage = document.getElementById('popupMessage');

function closePopup() {
    popup.classList.remove('show');
}

function showPopup(success, message) {
    popupTitle.textContent = success ? 'Thank You! 🎉' : 'Oops! 😕';
    popupMessage.textContent = message;
    popup.classList.add('show');
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('input[type="submit"]');
    submitBtn.value = 'Sending...';
    submitBtn.disabled = true;

    const formData = {
        name: this.querySelector('input[name="name"]').value,
        email: this.querySelector('input[name="email"]').value,
        subject: this.querySelector('input[name="subject"]').value,
        mobile: this.querySelector('input[name="mobile"]').value,
        message: this.querySelector('textarea[name="message"]').value,
    };

    // Single email notification to you
    emailjs.send(
        "service_98xph98",
        "template_gcdaw8o",
        {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            mobile: formData.mobile,
            message: formData.message,
            to_name: "Abhishek Kusabi",
        }
    )
    .then(() => {
        console.log('Email sent successfully!');
        showPopup(true, 'Your message has been sent successfully. I will get back to you soon!');
        this.reset();
    })
    .catch((error) => {
        console.error('Failed to send email:', error);
        showPopup(false, 'Sorry, there was an error sending your message. Please try again later.');
    })
    .finally(() => {
        submitBtn.value = 'Send Message';
        submitBtn.disabled = false;
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Project cards hover effect
document.querySelectorAll('.services-box').forEach(box => {
    box.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    box.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});