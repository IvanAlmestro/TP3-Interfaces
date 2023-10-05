

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


