class Engine {
    isPar(quantity) { return (quantity % 2) === 0; }
    //Obtener anchos de cada card
    cardWidths(cards) {
        let aux = 0;
        for (let c of cards) {
            aux += c.offsetWidth;
        }
        return aux;
    }
    // Obtener (ancho entre la primera card y el borde del padre) * 2
    cardParentSpace(card) {
        return card.offsetLeft * 2;
    }
    //#region Importantes
    getTheMiddleCard(quantity) {
        let n = 0;
        if (!this.isPar(quantity)) {
            //Redondeamos hacia arriba
            n = 1 + Math.ceil(quantity / 2);
        }
        else {
            n = Math.ceil(quantity / 2);
        }
        return n;
    }
    centerSlider(sliderContainer) {
        let childs = [];
        //Arranges
        try {
            childs = Array.from(sliderContainer.children).filter((child) => { return child.tagName === "DIV"; });
        }
        catch (e) {
            console.log(e);
        }
        let cardWidths = this.cardWidths(childs);
        cardWidths += this.cardParentSpace(childs[0]);
        sliderContainer.scrollLeft = cardWidths / (Math.ceil(childs.length / 2));
    }
}
export default Engine;
