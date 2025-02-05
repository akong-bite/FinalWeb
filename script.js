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





class UberProjectScrollAnimation {
    constructor(projectSection) {
        this.projectSection = projectSection;
        this.mainImage = projectSection.querySelector('.project.left1 img');
        this.cutoutImages = Array.from(projectSection.querySelectorAll('.cutout-image'));

        // Scroll settings
        this.settings = {
            scrollSensitivity: 1,  // Adjust smoothness of scroll effect
            lerpFactor: 0.06,  // Smoother transition using interpolation
            cutoutImages: [
                {
                    id: 'cutout_1',
                    initialOffset: { x: 0, y: 0 },
                    maxTranslate: { x: 0, y: 200 }  // Now moves in X as well
                },
                {
                    id: 'cutout_2',
                    initialOffset: { x: 0, y: 50 },
                    maxTranslate: { x: 120, y: 400 }
                },
                {
                    id: 'cutout_3',
                    initialOffset: { x: 0, y: 100 },
                    maxTranslate: { x: 240, y: 600 }
                }
            ]
        };

        this.progress = 0; // Used for lerp
        this.targetProgress = 0; // Target progress

        this.init();
    }

    calculateScrollProgress() {
        const rect = this.projectSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate progress between 0 and 1
        const progress = 1 - (rect.top / viewportHeight);
        return Math.max(0, Math.min(progress * this.settings.scrollSensitivity, 1));
    }

    lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    animateCutoutImages() {
        this.progress = this.lerp(this.progress, this.targetProgress, this.settings.lerpFactor);

        this.cutoutImages.forEach((img, index) => {
            const imageSettings = this.settings.cutoutImages[index];

            // Calculate smooth translations
            const translateX = this.progress * imageSettings.maxTranslate.x;
            const translateY = this.progress * imageSettings.maxTranslate.y;

            // Calculate opacity (fade in)
            const opacity = Math.min(this.progress * 2, 1);

            // Apply transformations smoothly
            img.style.transform = `
                translate(
                    calc(-50% + ${imageSettings.initialOffset.x + translateX}px), 
                    calc(-50% + ${imageSettings.initialOffset.y + translateY}px)
                )
            `;
            img.style.opacity = opacity;
        });

        requestAnimationFrame(() => this.animateCutoutImages()); // Smooth transition loop
    }

    init() {
        // Initial styles
        this.cutoutImages.forEach((img, index) => {
            const imageSettings = this.settings.cutoutImages[index];
            img.style.transform = `
                translate(
                    calc(-50% + ${imageSettings.initialOffset.x}px), 
                    calc(-50% + ${imageSettings.initialOffset.y}px)
                )
            `;
            img.style.opacity = 0;
        });

        // Scroll listener
        window.addEventListener('scroll', () => {
            this.targetProgress = this.calculateScrollProgress();
        });

        this.animateCutoutImages(); // Start animation loop
    }
}

// Initialize the animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const projectSection = document.querySelector('.project-section');
    if (projectSection) {
        new UberProjectScrollAnimation(projectSection);
    }
});
