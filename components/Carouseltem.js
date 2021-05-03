import React, {useEffect, useRef} from "react";
import {MyCustomEvent} from "./customEventHelper/customEventHelper";

const CarouselItem = (props) => {
    let carousel = useRef(null);

    useEffect(() => {
            MyCustomEvent.addEventHandler(carousel.current, "moveContent", (() => {

                    return (carousel.current?.tagName === "VIDEO") ?
                        () => {
                            if (carousel.current.tagName === "VIDEO") {
                                carousel.current.pause();
                            }
                        }
                        : null;
                })()
            )
        }, [props]
    )

    useEffect(() => {
            if (carousel.current) {
                props.setCarouselWidth(carousel.current.offsetWidth);
            }
        }, [props]
    )

    return (
        <li id={props.id + 'imgContainer'}> {props.item ?
            <props.item.kind ref={carousel} id={props.id + props.item?.kind}
                             src={props.item?.URL} controls
            /> : null}
        </li>
    );
}

export default CarouselItem;