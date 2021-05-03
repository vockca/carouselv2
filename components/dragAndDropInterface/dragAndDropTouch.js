let draggingElem = {
    elem: null,
    left: null,
    firstTouch: null,
    shiftX: null,
    swipeLength: null,
    lastTouch: null,
}

// let validation = (event) => {
//     const draggingElem = document.elementFromPoint(event.clientX, event.clientY);
//     //Checks if the current elem is the last or the first in the carousel to prevent the swipespamming
//     if (draggingElem.id.substr(0, 1) === '0' ||
//         draggingElem.id.substr(0, 1) === '' + (this.props.contentArray.length - 1)) {
//
//         return null;
//     }
// }


//Gets elem , position and shift from that position to desirable style.left of elem
let moveUnderCursor = (elem, pageX, shiftX) => {
    elem.style.left = pageX - shiftX + 'px';
}


export const DragNDropTouch = {
    dragStart: (event, startPosition) => {

        draggingElem.elem = event.currentTarget;
        draggingElem.startPosition = startPosition;
        draggingElem.firstTouch = event.touches[0].clientX;

        //Removes transition to freely drag elems
        draggingElem.elem.classList.add('no-transition');

        //Finds the distance between first touch and current style.left position of carousel
        draggingElem.shiftX = event.touches[0].pageX - draggingElem.startPosition;

        moveUnderCursor(draggingElem.elem, draggingElem.firstTouch, draggingElem.shiftX);

        draggingElem.elem.addEventListener('touchmove', DragNDropTouch.dragMove);
    },

    dragMove: (event) => {

        draggingElem.elem.style.cursor = 'move';

        moveUnderCursor(draggingElem.elem, event.touches[0].pageX, draggingElem.shiftX);

        draggingElem.lastTouch = event.touches[0].pageX;
    },

    dragStop: (event) => {

        if (draggingElem.elem === null) {
            console.error("Elem is null");
            return;
        }

        draggingElem.elem.removeEventListener('touchmove', DragNDropTouch.dragMove);

        draggingElem.elem.classList.remove('no-transition');

        draggingElem.swipeLength = draggingElem.lastTouch - draggingElem.firstTouch;
    },

    getSwipeLength: () => {
        let swipeLength = draggingElem.swipeLength;
        draggingElem.swipeLength = 0;
        return swipeLength;
    }
}