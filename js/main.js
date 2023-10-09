

let btnMenu = document.querySelector(".menu-btn");
btnMenu.addEventListener("click", function(){
                                    let menuBuger = document.querySelector("#nav-containers");
                                    menuBuger.classList.toggle("nav-container");
                        });

var rotado = false;                      
btnMenu.addEventListener("click", function(){
  let logoMenu=document.querySelector(".menu-btn");
  if(rotado){
   
    logoMenu.style.transform = "rotate(0deg)";
  }else{
    logoMenu.style.transform = "rotate(90deg)";
  }

  rotado = !rotado;
})

let btnUser = document.querySelector(".user-btn");
btnUser.addEventListener("click", function(){
    let menuUser = document.querySelector("#user-containers");
    menuUser.classList.toggle("user-container");
    
});


  var i = 0;
  function move() {
    if(window.location.href.includes("index.html")){
      if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBar");
        var width = 10;
        var id = setInterval(frame, 50);
        function frame() {
          if (width >= 100) {
            clearInterval(id);
            i = 0;
          } else {
            width++;
            elem.style.width = width + "%";
            elem.innerHTML = width + "%";
          }
        }
      }
    }
  }

move();


document.addEventListener("DOMContentLoaded", function() {
  // Encuentra el div por su id
  
  let load = document.getElementById("load-container");
  if(window.location.href.includes("index.html")){
    // Establece un temporizador para ocultar el div después de 5 segundos (5000 milisegundos)
    setTimeout(function() {
      load.style.display = "none"; // Oculta el div
    }, 5000); // 5000 milisegundos (5 segundos)
  }

});

const botonCompartir = document.getElementById("btn-share");
const popup = document.getElementById("popup");
const cerrarPopup = document.getElementById("cerrarPopup");

if(window.location.href.includes("game.html")){
  botonCompartir.addEventListener("click", function() {
    popup.style.display = "flex"; // Muestra el popup al hacer clic en el botón
  });

  cerrarPopup.addEventListener("click", function() {
    popup.style.display = "none"; // Oculta el popup al hacer clic en el botón "Cerrar"
  });
}



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerHeight = 110; // Altura de tu encabezado (ajusta según sea necesario)
      const offsetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth' // Desplazamiento suave
      });
    }
  });
});
