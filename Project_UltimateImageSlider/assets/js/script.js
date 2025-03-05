var swiper = new Swiper('.main-slider', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    effect: 'fade', // Options: "flip", "fade", "coverflow", "cube"
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    keyboard: { enabled: true },
    mousewheel: { invert: false },
    on: {
        slideChangeTransitionStart: function() {
            updateBackground();
            updateCaption();
            highlightThumbnail();
            startProgressBar();
        }
    }
});

function updateCaption() {
    document.querySelectorAll('.caption').forEach(cap => cap.style.display = 'none');
    var activeSlide = document.querySelector('.main-slider .swiper-slide-active');
    if (activeSlide) {
        var caption = activeSlide.querySelector('.caption');
        if (caption) caption.style.display = 'block';
    }
}

function updateBackground() {
    var activeSlide = document.querySelector('.main-slider .swiper-slide-active img');
    document.body.style.backgroundImage = `url('${activeSlide.src}')`;
}

function highlightThumbnail() {
    document.querySelectorAll('.swiper-thumbnails img').forEach((thumb, index) => {
        thumb.classList.toggle('active', index === swiper.realIndex);
    });
}

function startProgressBar() {
    document.querySelector('.progress-bar').style.width = '100%';
    setTimeout(() => {
        document.querySelector('.progress-bar').style.width = '0%';
    }, 3000);
}

document.querySelector('.theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

document.querySelector('.fullscreen-btn').addEventListener('click', () => {
    document.documentElement.requestFullscreen();
});

document.querySelectorAll('.swiper-thumbnails img').forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        swiper.slideToLoop(index);
    });
});

updateBackground();
updateCaption();
highlightThumbnail();