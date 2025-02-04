class ImageAnimationController {
    constructor() {
      // Initialize core elements
      this.container = document.querySelector('.container');
      this.mainImage = document.querySelector('.main-image');
      this.cutoutImages = document.querySelectorAll('.cutout-image');
      
      // Animation settings
      this.settings = {
        startOffset: 0.2,  // When animations begin (percentage of viewport)
        imageOffset: 0.15, // Spacing between image animations
        diagonalStrength: 100, // How far images move diagonally
        scaleRange: 0.05   // How much images scale down
      };
  
      this.init();
    }
  
    init() {
      // Store initial positions
      this.setupInitialPositions();
      // Bind scroll handler
      window.addEventListener('scroll', () => {
        requestAnimationFrame(() => this.handleScroll());
      });
    }
  
    setupInitialPositions() {
      // Store initial position of each cutout image
      this.cutoutImages.forEach((img, index) => {
        img.dataset.initialTop = img.offsetTop;
        img.dataset.initialLeft = img.offsetLeft;
      });
    }
  
    handleScroll() {
      const scrollTop = window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const scrollProgress = scrollTop / viewportHeight;
  
      // Animate main image with subtle parallax
      this.mainImage.style.transform = `translate3d(0, ${scrollTop * 0.3}px, 0)`;
  
      // Animate each cutout image
      this.cutoutImages.forEach((img, index) => {
        const startPoint = this.settings.startOffset + (index * this.settings.imageOffset);
        
        if (scrollProgress > startPoint) {
          // Calculate diagonal movement
          const progressSinceStart = (scrollProgress - startPoint) / this.settings.imageOffset;
          const moveX = this.settings.diagonalStrength * (index + 1) * progressSinceStart;
          const moveY = this.settings.diagonalStrength * (index + 1) * progressSinceStart;
          const scale = 1 - (index * this.settings.scaleRange);
          
          // Apply transform with easing
          img.style.transform = `
            translate3d(${moveX}px, ${moveY}px, 0) 
            scale(${scale})
          `;
          img.style.opacity = Math.min(progressSinceStart * 2, 1);
        } else {
          // Reset position when scrolling back up
          img.style.transform = 'translate3d(0, 0, 0) scale(1)';
          img.style.opacity = 0;
        }
      });
    }
  }
  
  // Initialize when the DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    new ImageAnimationController();
  });