let draggingElem = {
    elem: null,
    firstTouch: null,
    shiftX: null,
    swipeLength: null,
    startPosition: null,
    currentSwipeLengthUsed: false,
}


// let validation = (event) => {
//     const draggingElem = document.elementFromPoint(event.clientX, event.clientY);
//
//     if (draggingElem.id.substr(0, 1) === '0' ||
//         draggingElem.id.substr(0, 1) === '' + (this.props.contentArray.length - 1)) {
// //checks if the current elem is the last or the first in the carousel to prevent the swipespamming
//         return null;
//     }
// }


//Gets elem , position and shift from that position to desirable style.left of elem
let moveUnderCursor = (elem, pageX, shiftX) => {
    elem.style.left = pageX - shiftX + 'px';
}


export const DragNDropMouse = {
    dragStart: (event, startPosition) => {

        event.preventDefault();
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
    },

    dragMove: (event) => {
        draggingElem.elem.style.cursor = 'move';

        moveUnderCursor(draggingElem.elem, event.pageX, draggingElem.shiftX);

        event.preventDefault();
    },

    dragStop: (event) => {
        if (draggingElem.elem === null) {
            console.error("Elem is null");
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

