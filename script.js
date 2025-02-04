window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const containerHeight = document.querySelector('.container').offsetHeight;
  
    // Parallax effect on main image
    document.querySelector('.main-image').style.transform = `translateY(${scrollY * 0.5}px)`;
  
    // Cutout image animations
    const cutoutImages = document.querySelectorAll('.cutout-image');
    cutoutImages.forEach((image, index) => {
      const triggerPoint = (containerHeight * 0.2) + (index * 150);
      if (scrollY > triggerPoint) {
        image.style.opacity = '1';
        image.style.transform = `translate(${(index * 30)}%, ${(index * 30)}%) rotate(${(index * 10)}deg) scale(1)`;
      } else {
        image.style.opacity = '0';
        image.style.transform = `translate(0, 0) rotate(0) scale(0.9)`;
      }
    });
  });