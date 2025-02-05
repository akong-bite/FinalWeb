document.addEventListener("DOMContentLoaded", function () {
    sessionStorage.removeItem("videoPlayed");

    const videoContainer = document.createElement("div");
    videoContainer.style.position = "fixed";
    videoContainer.style.top = "0";
    videoContainer.style.left = "0";
    videoContainer.style.width = "100vw";
    videoContainer.style.height = "100vh";
    videoContainer.style.backgroundColor = "black";
    videoContainer.style.display = "flex";
    videoContainer.style.justifyContent = "center";
    videoContainer.style.alignItems = "center";
    videoContainer.style.zIndex = "9999";
    videoContainer.style.cursor = "pointer";

    const video = document.createElement("video");
    video.src = "image/bulb.mp4";
    video.controls = false;
    video.style.maxWidth = "100%";
    video.style.maxHeight = "100%";

    videoContainer.appendChild(video);
    document.body.appendChild(videoContainer);

    videoContainer.addEventListener("click", function () {
        video.play();
    });

    video.onended = function () {
        document.body.removeChild(videoContainer);
        document.body.style.overflow = "auto";

        document.querySelector(".headcontainer").classList.add("fade-in");

        fadeInImages();
    };

    function fadeInImages() {
        document.querySelectorAll(".image-container img").forEach((img) => {
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                img.classList.add("appear");
            }
        });
    }

    setTimeout(fadeInImages, 100);
    window.addEventListener("scroll", fadeInImages);

    // Fix the image-container position after scrolling a bit
    window.addEventListener("scroll", function () {
        const scrollY = window.scrollY;
        const imageContainer = document.querySelector(".image-container");

        if (scrollY > 150) {
            imageContainer.classList.add("fixed");
        } else {
            imageContainer.classList.remove("fixed");
        }
    });
});








// class ImageAnimationController {
//     constructor() {
//       this.container = document.querySelector('.container');
//       this.mainImage = document.querySelector('.main-image');
//       this.cutoutImages = document.querySelectorAll('.cutout-image');
      
//       // Updated animation settings for three images
//       this.settings = {
//         startOffset: 0.1,  // Start animations earlier
//         imageOffset: 0.15, // Reduced spacing between animations
//         diagonalStrength: 80, // Reduced diagonal movement
//         scaleRange: 0.03,  // Subtle scale difference
//         maxMove: 50 // Maximum movement percentage of viewport height
       
//       };

      
      
  
//       this.init();
//     }
  
//     init() {
//       this.setupInitialPositions();
//       window.addEventListener('scroll', () => {
//         requestAnimationFrame(() => this.handleScroll());
//       });
//     }
  
//     setupInitialPositions() {
//       this.cutoutImages.forEach((img, index) => {
//         img.dataset.initialTop = img.offsetTop;
//         img.dataset.initialLeft = img.offsetLeft;
//       });
//     }
  
//     handleScroll() {
//       const scrollTop = window.pageYOffset;
//       const viewportHeight = window.innerHeight;
//       const scrollProgress = scrollTop / viewportHeight;
//       const maxScroll = this.settings.maxMove / 100; 
  
     
//       const mainImageMove = Math.min(scrollTop * 0.3, viewportHeight * 0.3);
//       this.mainImage.style.transform = `translate3d(0, ${mainImageMove}px, 0)`;
  
     
//       this.cutoutImages.forEach((img, index) => {
//         const startPoint = this.settings.startOffset + (index * this.settings.imageOffset);
        
//         if (scrollProgress > startPoint) {
          
//           const progressSinceStart = Math.min(
//             (scrollProgress - startPoint) / this.settings.imageOffset,
//             maxScroll
//           );
          
          
//           const moveX = this.settings.diagonalStrength * (index + 1) * progressSinceStart;
//           const moveY = this.settings.diagonalStrength * (index + 1) * progressSinceStart;
          
          
//           const scale = 1 - (index * this.settings.scaleRange);
//           img.style.transform = `
//             translate3d(${moveX}px, ${moveY}px, 0) 
//             scale(${scale})
//           `;
//           img.style.opacity = Math.min(progressSinceStart * 2, 1);
//         } else {
//           img.style.transform = 'translate3d(0, 0, 0) scale(1)';
//           img.style.opacity = 0;
//         }
//       });
//     }
//   }
  
//   // Initialize when the DOM is ready
//   document.addEventListener('DOMContentLoaded', () => {
//     new ImageAnimationController();
//   });