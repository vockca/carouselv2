import React, {useState} from 'react';

import './styles/App.css';
import MyForm from "./components/MyForm";
import CarouselComponent from "./components/CarouselComponent";


const App = () => {
    const [content, setContent] = useState([{URL: 'files/rabbit320.webm', kind: 'video'}]);

    const contentAdder = (addingContent) => {
        setContent([...content, addingContent]);
    }

    const carouselContent = content.map((item, index) => {
        return (
                <item.kind key={index}
                          src={item['URL']}
                          controls/>
        )
    });


    return (
        <>
            <CarouselComponent id={"mainCarousel"}
                               contentArray={content}
            >
                {carouselContent}
            </CarouselComponent>

            <MyForm className={'uploadForms'}
                    contentAdder={contentAdder}
            />
        </>
    )
}


export default App;
