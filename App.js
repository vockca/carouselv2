import React, {useState} from 'react';

import './styles/App.css';
import MyForm from "./components/MyForm";
import CarouselComponent from "./components/CarouselComponent";


const App = () => {

    const [content, setContent] = useState([{URL: 'files/rabbit320.webm', kind: 'video'}]);

    const contentAdder = (addingContent) => {
        setContent([...content, addingContent]);
    }


    return (
        <>
            <CarouselComponent id={"mainCarousel"} contentArray={content}/>

            <MyForm className={'uploadForms'} contentAdder={contentAdder}/>
        </>
    )
}


export default App;
