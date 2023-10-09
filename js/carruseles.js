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
    const images = document.querySelectorAll(".card img");
    const rectangles = document.querySelectorAll(".my-rectangle");
  
    images.forEach((image, index) => {
      if (index === slideIndex) {
        image.style.animation = "animacionImagen  1.5s ease-out";
        rectangles[index].style.animation = "animacionInfo 1.5s ease-out"; // Agrega la animación al rectángulo correspondiente
      } else {
        image.style.animation = "none"; // Elimina la animación en las otras imágenes
        rectangles[index].style.animation = "none"; // Elimina la animación en los otros rectángulos grises
      }
    });
  
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



//CARRUSEL CHICO 1----------------------------------------------------------------------------------------------------------------------------------

const deslizador = document.querySelector(".deslizador");
const anteriorButton = document.querySelector(".anterior");
const siguienteButton = document.querySelector(".siguiente");
const deslizadorContainer = document.querySelector(".deslizador-container");
const indicador = document.querySelectorAll(".indicador");

let deslizadorIndex = 0;
let touchInicioX = 0;
let touchFinalX = 0;

anteriorButton.addEventListener("click", () => {
    deslizadorIndex--;
    if (deslizadorIndex < 0) {
        deslizadorIndex = indicador.length - 1;
    }
    mostrarSlide();
});

siguienteButton.addEventListener("click", () => {
    deslizadorIndex++;
    if (deslizadorIndex >= indicador.length) {
        deslizadorIndex = 0;
    }
    mostrarSlide();
});

indicador.forEach((indicador, index) => {
    indicador.addEventListener("click", () => {
        deslizadorIndex = index;
        mostrarSlide();
    });
});

deslizador.addEventListener("touchstart", (e) => {
    touchInicioX = e.touches[0].clientX;
});

deslizador.addEventListener("touchmove", (e) => {
    touchFinalX = e.touches[0].clientX;
});

deslizador.addEventListener("touchend", () => {
    const swipeThreshold = 50; // Umbral de desplazamiento mínimo para cambiar de diapositiva
    const deltaX = touchFinalX - touchInicioX;

    if (deltaX > swipeThreshold) {
        deslizadorIndex--;
        if (deslizadorIndex < 0) {
            deslizadorIndex = indicador.length - 1;
        }
        mostrarSlide();
    } else if (deltaX < -swipeThreshold) {
        deslizadorIndex++;
        if (deslizadorIndex >= indicador.length) {
            deslizadorIndex = 0;
        }
        mostrarSlide();
    }
});

function mostrarSlide() {
    const translateX = -deslizadorIndex * 100 + "%";
    const images = document.querySelectorAll(".tarjeta img");
    const rectangles = document.querySelectorAll(".info-juegos");
    const contenedor = document.querySelectorAll("super-contenedor");

  
    deslizadorContainer.style.transform = `translateX(${translateX})`;
    updateIndicador();
}

function updateIndicador() {
    indicador.forEach((indicador, index) => {
        if (index === deslizadorIndex) {
            indicador.classList.add("active");
        } else {
            indicador.classList.remove("active");
        }
    });
}

// Inicializa los indicadores al cargar la página
updateIndicador();

