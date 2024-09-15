import { Fragment, useEffect, useRef, MouseEvent, TouchEvent } from "react";
import Engine from "../Classes/Engine";

/**
* La mejor manera de hacer manipulación del DOM con React es usar useRef junto useEffect y remover los eventListener cuando el componente ya no vaya a ser usado
*/
function SliderComponent(){
    let aux:any;
    const sliderContainerRef = useRef(aux);
    let isDown = useRef(false);
    let startX = useRef(0);
    let scrollLeft = useRef(0);

    useEffect(() => {
        const sliderContainer = sliderContainerRef.current;
        const eng = new Engine();
        eng.centerSlider(sliderContainer);


        //#region MouseEvents
        const handleMouseDown = (e:MouseEvent) => {
          isDown.current = true;
          sliderContainer.classList.add('active');
          startX.current = e.pageX - sliderContainer.offsetLeft;
          scrollLeft.current = sliderContainer.scrollLeft;
        };

        const handleMouseUp = () => {
          isDown.current = false;
          sliderContainer.classList.remove('active');
        };

        const handleMouseLeave = () => {
          isDown.current = false;
          sliderContainer.classList.remove('active');
        };

        const handleMouseMove = (e:MouseEvent) => {
          if (!isDown.current) return;
          e.preventDefault();
          const x = e.pageX - sliderContainer.offsetLeft;
          const walk = (x - startX.current) * 2;
          sliderContainer.scrollLeft = scrollLeft.current - walk;
        };
        //#endregion

        //#region mobileEvents
        const handleTouchStart = (e: TouchEvent) => {
          isDown.current = true;
          sliderContainer.classList.add('active');
          startX.current = e.touches[0].pageX - sliderContainer.offsetLeft;
          scrollLeft.current = sliderContainer.scrollLeft;
        };
      
        const handleTouchMove = (e: TouchEvent) => {
            if (!isDown.current) return;
            e.preventDefault();
            const x = e.touches[0].pageX - sliderContainer.offsetLeft;
            const walk = (x - startX.current) * 3; // Adjust scrolling speed
            sliderContainer.scrollLeft = scrollLeft.current - walk;
        };
      
        const handleTouchEnd = () => {
            isDown.current = false;
            sliderContainer.classList.remove('active');
        };
        //#endregion

        // Añadir los eventos
        if(sliderContainer){
          sliderContainer.addEventListener('mousedown', (event:any) => handleMouseDown(event));
          sliderContainer.addEventListener('mouseup', handleMouseUp);
          sliderContainer.addEventListener('mouseleave', handleMouseLeave);
          sliderContainer.addEventListener('mousemove', (event:any) =>  handleMouseMove(event));
          sliderContainer.addEventListener('touchstart', (event:TouchEvent) =>  handleTouchStart(event));
          sliderContainer.addEventListener('touchend', () =>  handleTouchEnd());
          sliderContainer.addEventListener('touchmove', (event:TouchEvent) =>  handleTouchMove(event));
        }

      // Cleanup al desmontar el componente
      return () => {
        if(!sliderContainer){
            sliderContainer.removeEventListener('mousedown', (event:any) => handleMouseDown(event));
            sliderContainer.removeEventListener('mouseup', handleMouseUp);
            sliderContainer.removeEventListener('mouseleave', handleMouseLeave);
            sliderContainer.removeEventListener('mousemove', (event:any) =>  handleMouseMove(event));
            sliderContainer.removeEventListener('touchstart', (event:TouchEvent) =>  handleTouchStart(event));
            sliderContainer.removeEventListener('touchend', () =>  handleTouchEnd());
            sliderContainer.removeEventListener('touchmove', (event:TouchEvent) =>  handleTouchMove(event));
        }
      };
    }, []);
    
    return(
    <Fragment>
    <h1>My Own Carrousel</h1>
    <section className="container">
        <div className="slider_container" ref={sliderContainerRef}>
            <div className="card">1</div>
            <div className="card">2</div>
            <div className="card">3</div>
            <div className="card">4</div>
            <div className="card">5</div>
            <div className="card">6</div>
            <div className="card">7</div>
            <div className="card">8</div>
        </div>
    </section>
    </Fragment>);
}
export default SliderComponent;