const slider = document.querySelector(".slider");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const sliderContainer = document.querySelector(".slider-container");
const indicators = document.querySelectorAll(".indicator");

let slideIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

prevButton.addEventListener("click", () => {
    slideIndex--;
    if (slideIndex < 0) {
        slideIndex = indicators.length - 1;
    }
    showSlide();
});

nextButton.addEventListener("click", () => {
    slideIndex++;
    if (slideIndex >= indicators.length) {
        slideIndex = 0;
    }
    showSlide();
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
        slideIndex = index;
        showSlide();
    });
});

slider.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
});

slider.addEventListener("touchmove", (e) => {
    touchEndX = e.touches[0].clientX;
});

slider.addEventListener("touchend", () => {
    const swipeThreshold = 50; // Umbral de desplazamiento mínimo para cambiar de diapositiva
    const deltaX = touchEndX - touchStartX;

    if (deltaX > swipeThreshold) {
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = indicators.length - 1;
        }
        showSlide();
    } else if (deltaX < -swipeThreshold) {
        slideIndex++;
        if (slideIndex >= indicators.length) {
            slideIndex = 0;
        }
        showSlide();
    }
});

function showSlide() {
    const translateX = -slideIndex * 100 + "%";
    sliderContainer.style.transform = `translateX(${translateX})`;
    updateIndicators();
}

function updateIndicators() {
    indicators.forEach((indicator, index) => {
        if (index === slideIndex) {
            indicator.classList.add("active");
        } else {
            indicator.classList.remove("active");
        }
    });
}

// Inicializa los indicadores al cargar la página
updateIndicators();
