import Engine from "./Engine.js";
const eng = new Engine();


const sliderContainer = document.querySelector('.slider_container') as HTMLDivElement;

//Center Slider
eng.centerSlider(sliderContainer);

let isDown = false;
let startX:number;
let scrollLeft:number;

// Evento cuando presionas el mouse o el toque inicia (en móviles)
sliderContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    sliderContainer.classList.add('active');
    /* ("la posición X del mouse" - "offsetLeft: la distancia entre el borde
    izquierdo del contenedor ".slider_container" y el borde izquierdo de su
    contenedor padre más cercano")*/
    startX = e.pageX - sliderContainer.offsetLeft;
    scrollLeft = sliderContainer.scrollLeft;
});

/*El evento "mouseup" se dispara en un elemento cuando se suelta
un botón en un dispositivo señalador (como un mouse o trackpad)
mientras el puntero se encuentra dentro de él.

Es el evento contrario a "mousedown"*/
sliderContainer.addEventListener('mouseup', () => {
    isDown = false;
    sliderContainer.classList.remove('active');
});

/*El evento "mouseleave" se activa en un elemento cuando el cursor de un dispositivo
señalador (normalmente un ratón) se mueve fuera de él.

"mouseleave" y "mouseout" son similares, pero se diferencian en que "mouseleave" no hace
burbujas y "mouseout" sí. Esto significa que "mouseleave" se activa cuando el puntero ha
salido del elemento y de todos sus descendientes, mientras que "mouseout" se activa
cuando el puntero abandona el elemento o abandona uno de los descendientes del
elemento (incluso si el puntero sigue dentro del elemento).*/
sliderContainer.addEventListener('mouseleave', () => {
    isDown = false;
    sliderContainer.classList.remove('active');
});

/*El evento "mousemove" se dispara en un elemento cuando se mueve un dispositivo
señalador (normalmente un ratón) mientras el punto de acceso del cursor está
dentro de él.*/
sliderContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;  // Si no estás presionando el mouse, no hacer nada
    e.preventDefault();
    const x = e.pageX - sliderContainer.offsetLeft;
    const walk = (x - startX) * 2; // Multiplica el valor par incrementar la velocidada
    sliderContainer.scrollLeft = scrollLeft - walk;
});

//#region mobile events

// Para hacerlo funcionar en móviles también
sliderContainer.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - sliderContainer.offsetLeft;
    scrollLeft = sliderContainer.scrollLeft;
});

sliderContainer.addEventListener('touchend', () => {
    isDown = false;
});

sliderContainer.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - sliderContainer.offsetLeft;
    const walk = (x - startX) * 2; // Multiplica el valor para incrementar la velocidad
    sliderContainer.scrollLeft = scrollLeft - walk;
});

//#endregion