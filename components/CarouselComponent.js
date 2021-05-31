import React, {useEffect, useRef, useState} from 'react';

import RadioSwitchers from "./RadioSwitchers";
import CarouselItem from "./Carouseltem";
import PictureSetter from "./pictureSetter";
import MyButton from "./MyButton";

import {DragNDropMouse} from "../interfaces/dragAndDropInterface/dragAndDropMouse";
import {DragNDropTouch} from "../interfaces/dragAndDropInterface/dragAndDropTouch";
import {MyCustomEvent} from "../helpers/customEventHelper/customEventHelper";

import '../styles/carouselComponent.css';


const CarouselComponent = (props) => {
    const [carouselPosition, setCarouselPosition] = useState(0);
    const [contentArray, setContentArray] = useState((!Array.isArray(props.children) ? [props.children] : props.children.flat()));
    const [contentNumber, setContentNumber] = useState((contentArray.length > 0) ? 1 : 0);
    const [carouselWidth, setCarouselWidth] = useState(0);

    const carousel = useRef(null);

    useEffect(() => {
        movePicture(contentNumber);
        MyCustomEvent.createCustomEvent("moveContent");
    });

    useEffect(() => {
        setContentArray((!Array.isArray(props.children) ? [props.children] : props.children.flat()));
    }, [props.children]);

    const movePicture = (contentNumber) => {
        givePosition(contentNumber);

        //Checks if the current carousel item is the lst and it should be moved to the first to provide looping
        if (contentNumber === 0 || contentNumber === contentArray.length + 1) {
            let finalContentNumber = contentNumber === 0 ? contentArray.length : 1;
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
    const returnPicture = () => {
        givePosition(contentNumber);
    }

    const givePosition = (contentNumber) => {
        carousel.current.style.left = 0 - carouselWidth * contentNumber + 'px';
        setCarouselPosition(-carouselWidth * contentNumber);
    }

    const loopContent = (contentNumber) => {
        setTimeout(() => {
            carousel.current.classList.add('no-transition');
            setContentNumber(contentNumber);
            givePosition(contentNumber);
        }, 470);
    }

    //Gets position of first touch and last touch and the distance from which swipe considered as a successful and return the string with the name
    const swipeDetector = (swipeLength, enoughSwipeLength) => {
        if (-swipeLength > enoughSwipeLength) return 'leftSwipe';
        else if (swipeLength > enoughSwipeLength) return 'rightSwipe';
        else return 'noSwipe';
    }

    //Gets a type of swipe and moves carousel
    const swipeMover = (whichSwipe) => {
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

    //Adds the additional content to array to provide infinity loop plus wraps content in custom <li> component
    const carouselContentArray = contentArray.length === 0 ? null : (
        <>
            <CarouselItem setCarouselWidth={setCarouselWidth}
                          contentNumber={contentNumber}
            >
                {contentArray[contentArray.length - 1]}
            </CarouselItem>

            {contentArray.map((item, index) => {
                return (
                    <CarouselItem key={index}
                                  setCarouselWidth={setCarouselWidth}
                                  contentNumber={contentNumber}
                    >
                        {item}
                    </CarouselItem>
                )
            })}

            <CarouselItem setCarouselWidth={setCarouselWidth}
                          contentNumber={contentNumber}
            >
                {contentArray[0]}
            </CarouselItem>
        </>
    );


    return (
        <div className={"carouselComponents"}>
            <div className={'galleryContainers'}>
                <div className={'galleries'}>

                    <MyButton disableDurationMS={"600"}
                              type={'button'}
                              className={'leftButtons'}
                              onclick={() => swipeLeft()}
                    >
                        {"<"}
                    </MyButton>

                    <ul className={'carousels'}
                        id={props.id}
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
                        {carouselContentArray}
                    </ul>

                    <MyButton disableDurationMS={"600"}
                              type={'button'}
                              className={'rightButtons'}
                              onclick={() => swipeRight()}
                    >
                        {">"}
                    </MyButton>
                </div>
            </div>

            <RadioSwitchers setContentNumber={setContentNumber}
                            contentNumber={contentNumber}
                            contentArray={contentArray}
            />

            <PictureSetter setContentNumber={setContentNumber}
                           contentNumber={contentNumber}
                           contentArray={contentArray}
            />
        </div>
    );
}


export default CarouselComponent;
