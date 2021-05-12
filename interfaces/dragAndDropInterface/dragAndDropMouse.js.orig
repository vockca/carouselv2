const draggingElem = {
    elem: null,
    firstTouch: null,
    shiftX: null,
    swipeLength: null,
    startPosition: null,
    currentSwipeLengthUsed: false,
}


//Gets elem , position and shift from that position to desirable style.left of elem
let moveUnderCursor = (elem, pageX, shiftX) => {
    elem.style.left = pageX - shiftX + 'px';
}


export const DragNDropMouse = {
    dragStart: (event, startPosition) => {
        draggingElem.elem = event.currentTarget;
        draggingElem.startPosition = startPosition;
        draggingElem.firstTouch = event.pageX;
        draggingElem.currentSwipeLengthUsed = false;

        //Removes transition to freely drag elems
        draggingElem.elem.classList.add('no-transition');

        //Finds the distance between first touch and current style.left position of carousel
        draggingElem.shiftX = event.pageX - draggingElem.startPosition;

        moveUnderCursor(draggingElem.elem, draggingElem.firstTouch, draggingElem.shiftX);

        draggingElem.elem.addEventListener('mousemove', DragNDropMouse.dragMove);

        event.preventDefault();
    },

    dragMove: (event) => {
        draggingElem.elem.style.cursor = 'move';

        moveUnderCursor(draggingElem.elem, event.pageX, draggingElem.shiftX);

        event.preventDefault();
    },

    dragStop: (event) => {
        if (draggingElem.elem === null) {
            return;
        }

        draggingElem.elem.removeEventListener('mousemove', DragNDropMouse.dragMove);

        draggingElem.elem.classList.remove('no-transition');

        draggingElem.swipeLength = event.pageX - draggingElem.firstTouch;
    },

    getSwipeLength: () => {
        if (draggingElem.currentSwipeLengthUsed) return 0;

        draggingElem.currentSwipeLengthUsed = true;

        return draggingElem.swipeLength;
    }
}

