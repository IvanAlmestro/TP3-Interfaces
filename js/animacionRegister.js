const successMessage = document.getElementById('success-message');
const registerButton = document.getElementById('register-button');
const ingresar = document.getElementById('ingresarR');
const ingresarL = document.getElementById('ingresar');


registerButton.addEventListener('click', (e) => {
    e.preventDefault();
    successMessage.classList.remove('hidden');
    
    // Agregar una animación de desvanecimiento
    setTimeout(() => {
        successMessage.style.opacity = '1';
        successMessage.style.transform = 'translateY(-30px)'; // Mover arriba del botón
    }, 10);

    // Ocultar el mensaje después de un tiempo (puedes ajustar el tiempo)
    setTimeout(() => {
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateY(0)';
        successMessage.addEventListener('transitionend', () => {
            successMessage.classList.add('hidden');
            // Redirige al usuario a login.html después de 3 segundos
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 0); // Espera 1 segundo antes de redirigir
        }, { once: true });
    }, 3000); // 3 segundos
});

ingresar.addEventListener('click', (e) => {
    location.href = 'login.html';
    e.preventDefault();
});
