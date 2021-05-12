import React from 'react';


const RadioSwitchers = (props) => {
    const chooseContent = (elem) => {
        const id = +elem.getAttribute('data-id');
        props.setContentNumber(id);
    }

    //Magic number cuz the content number starts with 1,2,3 but indexes start with 0,1,2 and it needs to be fit
    const contentArray = props.contentArray.map((item, index) => {
        if (index + 1 === props.contentNumber) {
            return (
                <input key={index}
                       type={'radio'}
                       checked={true}
                       onChange={(event) => chooseContent(event.target)}
                       data-id={index + 1}
                       name={'carouselRadio'}
                />)
        }
        return (
            <input
                key={index}
                type={'radio'}
                onChange={(event) => chooseContent(event.target)}
                data-id={index + 1}
                name={'carouselRadio'}
            />)
    })


    return (
        <div className={'carouselRadios'}>
            {contentArray}
        </div>
    )
}


export default RadioSwitchers;