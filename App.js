import React, {useState} from 'react';

import './styles/App.css';
import MyForm from "./components/MyForm";
import CarouselComponent from "./components/CarouselComponent";


const App = () => {
    const [content, setContent] = useState([<div>Hello</div>, <div>World</div>]);

    const contentAdder = (addingContent) => {
        setContent([...content, addingContent]);
    }

    const contentArray = content.map((item, index) => {
        return (
            <div key={index}>{item}</div>
        )
    })


    return (
        <>
            <CarouselComponent id={"mainCarousel"}
            >
                <div>Hello world</div>
                <div>Hello world</div>
                <video src={"https://res.cloudinary.com/nackca/video/upload/v1622485941/Pexels_Videos_1722593_t7midg.mp4"} controls/>
                {contentArray}
            </CarouselComponent>

            <MyForm className={'uploadForms'}
                    contentAdder={contentAdder}
            />
        </>
    )
}


export default App;
