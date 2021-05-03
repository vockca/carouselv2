import React, {useEffect, useRef, useState} from 'react';

import RadioSwitchers from "./RadioSwitchers";
import CarouselItem from "./Carouseltem";
import PictureSetter from "./pictureSetter";
import MyButton from "./MyButton";

import {DragNDropMouse} from "./dragAndDropInterface/dragAndDropMouse";
import {DragNDropTouch} from "./dragAndDropInterface/dragAndDropTouch";
import {MyCustomEvent} from "./customEventHelper/customEventHelper";

import '../styles/carouselComponent.css';


//Clones the last and the first elements to provide infinite loop
let contentWrapper = (arr) => {
    let carouselContent = [arr[arr.length - 1], ...arr, arr[0]];
    return carouselContent;
}


const CarouselComponent = (props) => {
    const [carouselPosition, setCarouselPosition] = useState(0);
    const [contentNumber, setContentNumber] = useState((props.contentArray.length > 0) ? 1 : 0);
    const [carouselWidth, setCarouselWidth] = useState(0)

    const carouselContentArray = contentWrapper(props.contentArray);

    const carousel = useRef(null);

    useEffect(() => {
        movePicture(contentNumber);
    });
    useEffect(() => {
        MyCustomEvent.createCustomEvent("moveContent");
    }, [props])

    let movePicture = (contentNumber) => {
        givePosition(contentNumber);

        //Checks if the current carousel item is the lst and it should be moved to the first to provide looping
        if (contentNumber === 0 || contentNumber === props.contentArray.length + 1) {
            let finalContentNumber = contentNumber === 0 ? props.contentArray.length : 1;
            loopContent(finalContentNumber);
        }

        //If the carousel has no-transition class it deletes it to provide animation
        if (carousel.current.classList.contains('no-transition')) {
            carousel.current.classList.remove('no-transition');
        }

        //Triggers event to stop playing video if it was moved aside, the timer exist cuz it starts playing later
        setTimeout(() => {
            MyCustomEvent.triggerEvent("moveContent");
        }, 500);
    }

    //Defines the same content number to trigger animation to come back picture as it was
    let returnPicture = () => {
        givePosition(contentNumber);
    }

    let givePosition = (contentNumber) => {
        carousel.current.style.left = 0 - carouselWidth * contentNumber + 'px';
        setCarouselPosition(-carouselWidth * contentNumber);
    }

    let loopContent = (contentNumber) => {
        setTimeout(() => {
            carousel.current.classList.add('no-transition');
            setContentNumber(contentNumber);
            givePosition(contentNumber);
        }, 470);
    }

    //Gets position of first touch and last touch and the distance from which swipe considered as a successful and return the string with the name
    let swipeDetector = (swipeLength, enoughSwipeLength) => {
        if (-swipeLength > enoughSwipeLength) return 'leftSwipe';
        else if (swipeLength > enoughSwipeLength) return 'rightSwipe';
        else return 'noSwipe';
    }

    //Gets a type of swipe and moves carousel
    let swipeMover = (whichSwipe) => {
        switch (whichSwipe) {
            case 'rightSwipe':
                if (contentNumber - 1 === -1) return;
                swipeLeft();
                break;
            case 'leftSwipe':
                if (contentNumber + 1 === carouselContentArray.length + 1) return;
                swipeRight();
                break;
            case 'noSwipe':
                returnPicture();
                break;
        }
    }

    const swipeLeft = () => {
        setContentNumber(contentNumber - 1);
    }

    const swipeRight = () => {
        setContentNumber(contentNumber + 1);
    }

    //Adds the additional content to array to provide infinity loop
    let contentArray = carouselContentArray.map((item, index) => {
        return (<CarouselItem setCarouselWidth={setCarouselWidth} contentNumber={contentNumber} key={index} id={index}
                              item={item}/>);
    });

    return (
        <div className={"carouselComponents"}>
            <div className={'galleryContainers'}>
                <div className={'galleries'}>
                    <MyButton disableDurationMS={"600"} type={'button'} className={'leftButtons'}
                              onclick={() => swipeLeft()}> {"<"} </MyButton>

                    <ul className={'carousels'} id={props.id}
                        ref={carousel}
                        onMouseDown={event => DragNDropMouse.dragStart(event, carouselPosition)}
                        onMouseUp={(event) => {
                            DragNDropMouse.dragStop(event);
                            let swipeKind = swipeDetector(DragNDropMouse.getSwipeLength(), 100);
                            swipeMover(swipeKind);
                        }}
                        onMouseLeave={(event) => {
                            DragNDropMouse.dragStop(event);
                            let swipeKind = swipeDetector(DragNDropMouse.getSwipeLength(), 100);
                            swipeMover(swipeKind);
                        }}

                        onTouchStart={event => DragNDropTouch.dragStart(event, carouselPosition)}
                        onTouchEnd={event => {
                            DragNDropTouch.dragStop(event);
                            let swipeKind = swipeDetector(DragNDropTouch.getSwipeLength(), 100);
                            swipeMover(swipeKind);
                        }}
                    >
                        {contentArray}
                    </ul>
                    <MyButton disableDurationMS={"600"} type={'button'} className={'rightButtons'}
                              onclick={() => swipeRight()}> {">"} </MyButton>
                </div>
            </div>

            <RadioSwitchers setContentNumber={setContentNumber}
                            contentNumber={contentNumber}
                            contentArray={props.contentArray}
                            id={props.id}
            />

            <PictureSetter setContentNumber={setContentNumber}
                           contentNumber={contentNumber}
                           contentArray={props.contentArray}
            />
        </div>
    );
}


export default CarouselComponent;
