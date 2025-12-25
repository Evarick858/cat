// Cat Profile Website - Interactive Behaviors

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Cat profile website loaded successfully');
  
  // Cat image Easter egg interaction
  const catButton = document.getElementById('catImage');
  if (catButton) {
    console.log('Cat button element found');
    
    // Debounce flag to prevent rapid clicking
    let isAnimating = false;
    
    // Create the secret text element
    const secretText = document.createElement('div');
    secretText.className = 'secret-text';
    secretText.textContent = 'Suhada Yusuf';
    secretText.style.opacity = '0';
    catButton.parentElement.appendChild(secretText);
    
    // Create the heart emoji element
    const heartEmoji = document.createElement('div');
    heartEmoji.className = 'heart-emoji';
    heartEmoji.textContent = '❤️';
    heartEmoji.style.opacity = '0';
    catButton.parentElement.appendChild(heartEmoji);
    
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
      
      // Step 2: Show the text with dance animation
      setTimeout(() => {
        secretText.style.opacity = '1';
        secretText.style.transform = 'translate(-50%, -50%) scale(1)';
        secretText.classList.add('dancing');
      }, 400);
      
      // Step 3: Hide the text
      setTimeout(() => {
        secretText.classList.remove('dancing');
        secretText.style.opacity = '0';
        secretText.style.transform = 'translate(-50%, -50%) scale(0.8)';
      }, 2800);
      
      // Step 4: Show broken heart emoji
      setTimeout(() => {
        heartEmoji.style.opacity = '1';
        heartEmoji.style.transform = 'translate(-50%, -50%) scale(1)';
        heartEmoji.classList.add('heart-beat');
      }, 3200);
      
      // Step 5: Hide the heart
      setTimeout(() => {
        heartEmoji.classList.remove('heart-beat');
        heartEmoji.style.opacity = '0';
        heartEmoji.style.transform = 'translate(-50%, -50%) scale(0.8)';
      }, 5000);
      
      // Step 6: Show the cat again
      setTimeout(() => {
        catButton.style.opacity = '1';
        catButton.style.transform = 'scale(1)';
        isAnimating = false;
      }, 5400);
    }, { passive: true });
    
    // Keyboard support - trigger on Enter or Space
    catButton.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); // Prevent page scroll on Space
        catButton.click();
      }
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
  
  // Game card click interactions
  const gameCards = document.querySelectorAll('.game-card');
  gameCards.forEach(card => {
    card.addEventListener('click', function() {
      // Remove active class from all cards
      gameCards.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked card
      this.classList.add('active');
      
      // Remove active class after 1 second
      setTimeout(() => {
        this.classList.remove('active');
      }, 1000);
    }, { passive: true });
    
    // Make cards keyboard accessible
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    
    // Keyboard support - trigger on Enter or Space
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.click();
      }
    });
  });
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
