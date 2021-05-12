import React, {useEffect, useRef} from "react";

import {MyCustomEvent} from "../helpers/customEventHelper/customEventHelper";


const CarouselItem = (props) => {
    const carousel = useRef(null);

    useEffect(() => {
            MyCustomEvent.addEventHandler(carousel.current, "moveContent", (() => {
                if (carousel.current.firstChild.tagName === "VIDEO") {
                    carousel.current.firstChild.pause()
                }
            }));
        }, [props]
    )

    useEffect(() => {
            if (carousel.current) {
                props.setCarouselWidth(carousel.current.offsetWidth);
            }
        }, [props]
    )


    return (
        <li className={'carouselListItem'}
            ref={carousel}
        >
            {props.children}
        </li>
    );
}


export default CarouselItem;