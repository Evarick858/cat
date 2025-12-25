// Cat Profile Website - Interactive Behaviors

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Cat profile website loaded successfully');
  
  // Create stars background
  createStars();
  
  // Parallax effect for stars on scroll
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        parallaxStars();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  
  // Cat image Easter egg interaction
  const catButton = document.getElementById('catImage');
  if (catButton) {
    console.log('Cat button element found');
    
    // Debounce flag to prevent rapid clicking
    let isAnimating = false;
    
    // Create the Xzovy text element
    const secretText = document.createElement('div');
    secretText.className = 'secret-text secret-text-2';
    secretText.textContent = 'Xzovy';
    secretText.style.opacity = '0';
    catButton.parentElement.appendChild(secretText);
    
    // Click event listener for cat Easter egg
    catButton.addEventListener('click', () => {
      // Prevent rapid clicking while animation is running
      if (isAnimating) {
        return;
      }
      
      // Set debounce flag
      isAnimating = true;
      
      // Step 1: Hide the cat
      catButton.style.opacity = '0';
      catButton.style.transform = 'scale(0.8)';
      
      // Step 2: Show Xzovy with heartbeat
      setTimeout(() => {
        secretText.style.opacity = '1';
        secretText.style.transform = 'translate(-50%, -50%) scale(1)';
        secretText.classList.add('beating');
      }, 400);
      
      // Step 3: Hide Xzovy
      setTimeout(() => {
        secretText.classList.remove('beating');
        secretText.style.opacity = '0';
        secretText.style.transform = 'translate(-50%, -50%) scale(0.8)';
      }, 3400);
      
      // Step 4: Create heart rain
      setTimeout(() => {
        createHeartRain(catButton.parentElement);
      }, 3800);
      
      // Step 5: Show the cat again
      setTimeout(() => {
        catButton.style.opacity = '1';
        catButton.style.transform = 'scale(1)';
        isAnimating = false;
      }, 6800);
    }, { passive: true });
    
    // Keyboard support - trigger on Enter or Space
    catButton.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); // Prevent page scroll on Space
        catButton.click();
      }
    });
  }
  
  // Function to create heart rain effect
  function createHeartRain(container) {
    const heartCount = 20;
    const hearts = [];
    
    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement('div');
      heart.className = 'falling-heart';
      heart.textContent = '❤️';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.animationDelay = Math.random() * 2 + 's';
      heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
      heart.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
      container.appendChild(heart);
      hearts.push(heart);
    }
    
    // Remove hearts after animation
    setTimeout(() => {
      hearts.forEach(heart => heart.remove());
    }, 4000);
  }
  
  // Function to create stars background
  function createStars() {
    const starsContainer = document.getElementById('starsContainer');
    if (!starsContainer) {
      console.error('Stars container not found');
      return;
    }
    
    const starCount = 13;
    const sizes = [15, 20, 25, 30, 18, 22, 28, 16, 24, 19, 26, 21, 23]; // Different sizes
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random position
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      
      // Different size for each star
      const size = sizes[i];
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      
      // Random animation delay
      star.style.animationDelay = Math.random() * 3 + 's';
      
      // Parallax speed (slower than scroll)
      star.dataset.speed = (Math.random() * 0.3 + 0.1).toFixed(2); // 0.1 to 0.4
      
      starsContainer.appendChild(star);
    }
    
    console.log(`Created ${starCount} stars with different sizes`);
  }
  
  // Parallax effect for stars (moves slower than scroll)
  function parallaxStars() {
    const stars = document.querySelectorAll('.star');
    const scrolled = window.pageYOffset;
    
    stars.forEach(star => {
      const speed = parseFloat(star.dataset.speed);
      const yPos = scrolled * speed; // Positive = moves down slower
      star.style.transform = `translateY(${yPos}px)`;
    });
  }
  
  // Intersection Observer for viewport entrance animations
  const observerOptions = {
    root: null, // Use viewport as root
    rootMargin: '50px', // Start animation slightly before element enters viewport
    threshold: 0.1 // Trigger when 10% of element is visible
  };
  
  // Callback function when elements enter/exit viewport
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Element has entered the viewport
        const element = entry.target;
        
        // Determine which animation to apply based on existing classes
        if (element.classList.contains('slide-in-left')) {
          element.style.animation = 'slideInFromLeft 0.8s ease-out forwards';
        } else if (element.classList.contains('slide-in-right')) {
          element.style.animation = 'slideInFromRight 0.8s ease-out forwards';
        } else if (element.classList.contains('slide-in-bottom')) {
          element.style.animation = 'slideInFromBottom 0.8s ease-out forwards';
        } else if (element.classList.contains('fade-in')) {
          element.style.animation = 'fadeIn 0.8s ease-out forwards';
        }
        
        // Stop observing this element after animation is triggered
        observer.unobserve(element);
      }
    });
  };
  
  // Create the Intersection Observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  // Observe all elements with the animate-on-scroll class
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  console.log(`Observing ${animatedElements.length} elements for viewport animations`);
  
  // Performance optimization: Remove will-change after animations complete
  const removeWillChange = (element) => {
    element.addEventListener('animationend', () => {
      element.style.willChange = 'auto';
    }, { once: true, passive: true });
  };
  
  // Apply to hero elements
  const heroElements = document.querySelectorAll('.hero-name, .hero-quote, .cat-button');
  heroElements.forEach(removeWillChange);
  
  // Apply to activity items
  const activityItems = document.querySelectorAll('.activity-item');
  activityItems.forEach(removeWillChange);
  
  // Activity card click to expand/collapse
  activityItems.forEach(item => {
    item.addEventListener('click', function() {
      const isExpanded = this.classList.contains('expanded');
      
      if (isExpanded) {
        // Collapse: show all items again
        activityItems.forEach(card => {
          card.classList.remove('expanded', 'hidden');
        });
      } else {
        // Expand: hide others, show this one
        activityItems.forEach(card => {
          if (card === this) {
            card.classList.add('expanded');
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
            card.classList.remove('expanded');
          }
        });
      }
    }, { passive: true });
    
    // Make cards keyboard accessible
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-expanded', 'false');
    
    // Keyboard support
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        item.click();
        item.setAttribute('aria-expanded', item.classList.contains('expanded'));
      }
    });
  });
  
  // Game card flip interactions
  const gameCards = document.querySelectorAll('.game-card');
  gameCards.forEach(card => {
    card.addEventListener('click', function() {
      const isCurrentlyFlipped = this.classList.contains('flipped');
      
      // Close all other cards first
      gameCards.forEach(c => {
        if (c !== this) {
          c.classList.remove('flipped');
        }
      });
      
      // Toggle current card
      if (isCurrentlyFlipped) {
        this.classList.remove('flipped');
      } else {
        this.classList.add('flipped');
      }
    }, { passive: true });
    
    // Make cards keyboard accessible
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Click to flip card');
    
    // Keyboard support - trigger on Enter or Space
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.click();
      }
    });
  });
  
  // Background Music Player (Floating Button)
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  const playIcon = document.querySelector('.music-icon-play');
  const pauseIcon = document.querySelector('.music-icon-pause');
  
  if (musicToggle && bgMusic) {
    let isPlaying = false;
    
    musicToggle.addEventListener('click', () => {
      if (isPlaying) {
        // Pause music
        bgMusic.pause();
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        musicToggle.classList.remove('playing');
        musicToggle.setAttribute('title', 'Play Background Music');
        isPlaying = false;
      } else {
        // Play music
        bgMusic.play().then(() => {
          playIcon.style.display = 'none';
          pauseIcon.style.display = 'inline';
          musicToggle.classList.add('playing');
          musicToggle.setAttribute('title', 'Pause Background Music');
          isPlaying = true;
        }).catch(error => {
          console.log('Audio play failed:', error);
        });
      }
    });
    
    // Keyboard support
    musicToggle.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        musicToggle.click();
      }
    });
  }
});


// Toggle activity details
function toggleActivity(element) {
  const description = element.querySelector('.activity-description');
  const allItems = document.querySelectorAll('.activity-item');
  const allDescriptions = document.querySelectorAll('.activity-description');
  
  // Close all other descriptions
  allDescriptions.forEach(desc => {
    if (desc !== description) {
      desc.style.display = 'none';
    }
  });
  
  // Remove active class from all items
  allItems.forEach(item => {
    if (item !== element) {
      item.classList.remove('active');
    }
  });
  
  // Toggle current description
  if (description.style.display === 'none') {
    description.style.display = 'block';
    element.classList.add('active');
  } else {
    description.style.display = 'none';
    element.classList.remove('active');
  }
}
