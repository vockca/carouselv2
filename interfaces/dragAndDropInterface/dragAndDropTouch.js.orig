const draggingElem = {
    elem: null,
    firstTouch: null,
    shiftX: null,
    swipeLength: null,
    left: null,
    lastTouch: null,
}


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