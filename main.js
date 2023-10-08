

let btnMenu = document.querySelector(".menu-btn");
btnMenu.addEventListener("click", function cambiarEstilo(){
                                    let menuBuger = document.querySelector("#nav-containers");
                                    menuBuger.classList.toggle("nav-container");
                        });

let btnUser = document.querySelector(".user-btn");
btnUser.addEventListener("click", function cambiarEstilo(){
    let menuUser = document.querySelector("#user-containers");
    menuUser.classList.toggle("user-container");
    
});

var i = 0;
function move() {
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
move();


document.addEventListener("DOMContentLoaded", function() {
    // Encuentra el div por su id
    let load = document.getElementById("load-container");
    
    // Establece un temporizador para ocultar el div después de 5 segundos (5000 milisegundos)
    setTimeout(function() {
      load.style.display = "none"; // Oculta el div
    }, 5000); // 5000 milisegundos (5 segundos)
  });