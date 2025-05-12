document.addEventListener('DOMContentLoaded', function() {
    // --------------------------
    // 1. Event Handling
    // --------------------------
    
    // Button click event
    const clickButton = document.getElementById('click-button');
    const clickOutput = document.getElementById('click-output');
    
    clickButton.addEventListener('click', function() {
        clickOutput.textContent = 'Button was clicked! 🎉';
        clickOutput.style.color = '#2ecc71';
        
        // Reset after 2 seconds
        setTimeout(() => {
            clickOutput.textContent = 'Button not clicked yet';
            clickOutput.style.color = '';
        }, 2000);
    });
    
    // Hover effects
    const hoverBox = document.getElementById('hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = 'Mouse is hovering! ✨';
        hoverOutput.style.color = '#3498db';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = 'Waiting for hover...';
        hoverOutput.style.color = '';
    });
    
    // Keypress detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keypress', function(e) {
        keypressOutput.textContent = `Key pressed: ${e.key} (Code: ${e.code})`;
        keypressOutput.style.color = '#9b59b6';
    });
    
    // Secret action (double click or long press)
    const secretBox = document.getElementById('secret-box');
    let pressTimer;
    
    // Double click
    secretBox.addEventListener('dblclick', function() {
        activateSecret();
    });
    
    // Long press
    secretBox.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
            activateSecret();
        }, 1000); // 1 second for long press
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    function activateSecret() {
        secretBox.classList.add('activated');
        secretBox.innerHTML = '<p>🎉 You found the secret! 🎉</p>';
        
        setTimeout(() => {
            secretBox.classList.remove('activated');
            secretBox.innerHTML = '<p>Double click or long press me for a secret!</p>';
        }, 3000);
    }
    
    // --------------------------
    // 2. Interactive Elements
    // --------------------------
    
    // Button that changes text and color
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#3498db', '#2ecc71', '#9b59b6', '#e74c3c', '#f39c12'];
    let colorIndex = 0;
    
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color changed to ${colors[colorIndex]}`;
        
        // Reset text after 1 second
        setTimeout(() => {
            this.textContent = 'Click to Change My Color';
        }, 1000);
    });
    
    // Image gallery/slideshow
    const galleryImages = document.querySelectorAll('.gallery-image');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
        currentImageIndex = index;
    }
    
    nextBtn.addEventListener('click', function() {
        let nextIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(nextIndex);
    });
    
    prevBtn.addEventListener('click', function() {
        let prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(prevIndex);
    });
    
    // Auto-advance slideshow every 3 seconds
    setInterval(() => {
        let nextIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(nextIndex);
    }, 3000);
    
    // Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // --------------------------
    // 3. Form Validation
    // --------------------------
    
    const userForm = document.getElementById('user-form');
    const usernameInput = document.getElementById('username');
    const usernameError = document.getElementById('username-error');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('password-error');
    const strengthMeter = document.querySelector('.strength-meter');
    const strengthText = document.querySelector('.strength-text');
    
    // Real-time validation
    usernameInput.addEventListener('input', validateUsername);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    // Form submission
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isUsernameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            this.reset();
            strengthMeter.style.setProperty('--width', '0');
            strengthText.textContent = '';
        } else {
            alert('Please fix the errors before submitting.');
        }
    });
    
    // Validation functions
    function validateUsername() {
        const value = usernameInput.value.trim();
        
        if (value === '') {
            usernameError.textContent = 'Username is required';
            return false;
        } else if (value.length < 3) {
            usernameError.textContent = 'Username must be at least 3 characters';
            return false;
        } else {
            usernameError.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value === '') {
            emailError.textContent = '';
            return true; // Email is optional in this example
        } else if (!emailRegex.test(value)) {
            emailError.textContent = 'Please enter a valid email address';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }
    
    function validatePassword() {
        const value = passwordInput.value;
        let isValid = true;
        let strength = 0;
        let messages = [];
        
        if (value.length === 0) {
            passwordError.textContent = '';
            strengthMeter.style.setProperty('--width', '0');
            strengthText.textContent = '';
            return false; // Password is required
        }
        
        // Check password requirements
        if (value.length < 8) {
            messages.push('Password must be at least 8 characters');
            isValid = false;
        } else {
            strength += 25;
        }
        
        if (!/[A-Z]/.test(value)) {
            messages.push('Add at least one uppercase letter');
        } else {
            strength += 25;
        }
        
        if (!/[0-9]/.test(value)) {
            messages.push('Add at least one number');
        } else {
            strength += 25;
        }
        
        if (!/[^A-Za-z0-9]/.test(value)) {
            messages.push('Add at least one special character');
        } else {
            strength += 25;
        }
        
        // Update strength meter
        strengthMeter.style.setProperty('--width', `${strength}%`);
        
        if (strength < 50) {
            strengthMeter.style.backgroundColor = '#e74c3c';
            strengthText.textContent = 'Weak';
            strengthText.style.color = '#e74c3c';
        } else if (strength < 75) {
            strengthMeter.style.backgroundColor = '#f39c12';
            strengthText.textContent = 'Moderate';
            strengthText.style.color = '#f39c12';
        } else {
            strengthMeter.style.backgroundColor = '#2ecc71';
            strengthText.textContent = 'Strong';
            strengthText.style.color = '#2ecc71';
        }
        
        // Show error messages if any
        if (messages.length > 0 && value.length >= 8) {
            passwordError.textContent = messages.join('. ') + '.';
        } else if (value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
        } else {
            passwordError.textContent = '';
        }
        
        return isValid;
    }
});