$(document).ready(function() {
    const $track = $('.carousel-track');
    const $slides = $('.carousel-slide');
    const $indicators = $('.indicator');
    const slideCount = $slides.length;
    let currentIndex = 0;
    let slideWidth = $slides.width();
    let autoSlideInterval;
    
    // Initialize carousel
    function initCarousel() {
        slideWidth = $slides.width();
        $track.css('transform', `translateX(${-currentIndex * slideWidth}px)`);
        updateIndicators();
        startAutoSlide();
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        $track.css('transform', `translateX(${-currentIndex * slideWidth}px)`);
        updateIndicators();
        resetAutoSlide();
    }
    
    // Update indicator dots
    function updateIndicators() {
        $indicators.removeClass('active');
        $indicators.eq(currentIndex).addClass('active');
    }
    
    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        $track.css('transform', `translateX(${-currentIndex * slideWidth}px)`);
        updateIndicators();
        resetAutoSlide();
    }
    
    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        $track.css('transform', `translateX(${-currentIndex * slideWidth}px)`);
        updateIndicators();
        resetAutoSlide();
    }
    
    // Auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Event listeners
    $('.carousel-next').click(nextSlide);
    $('.carousel-prev').click(prevSlide);
    
    $indicators.click(function() {
        const index = $(this).data('index');
        goToSlide(index);
    });
    
    // Pause on hover
    $('.carousel-container').hover(
        function() {
            clearInterval(autoSlideInterval);
        },
        function() {
            resetAutoSlide();
        }
    );
    
    // Handle window resize
    $(window).resize(function() {
        slideWidth = $slides.width();
        $track.css('transform', `translateX(${-currentIndex * slideWidth}px)`);
    });
    
    // Initialize
    initCarousel();
});


// Add scroll effect to make header smaller when scrolling
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});