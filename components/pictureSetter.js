import React, {useState} from 'react';
import MyInput from "./MyInput";


const PictureSetter = (props) => {
    const [error, setError] = useState("false");

    const setEnteredPicture = (input) => {
        //Removes error when user starts texting
        setError("false");
        //If the input is empty doesnt show the error msg just do nothing
        if (input.value.toString().trim() === '') {
            return;
        }
        //Simple validation and if it doesnt pass it, error msg appears
        if (isNaN(+input.value) || input.value <= 0 || input.value > props.contentArray.length) {
            setError("true");
            return;
        }
        //If it passes through it sets the value
        props.setContentNumber(input.value);
    }

    //Defines the correct number while content is about to loop
    let getRightContentNumberVisual = () => {
        if (!props.contentNumber) return "";
        switch (props.contentNumber) {
            case (props.contentArray.length + 1):
                return 1;
            case 0:
                return props.contentArray.length;
            default:
                return props.contentNumber;
        }
    }

    return (
        <div className={'pictureSetter'}>
            <form>
                <span>Choose</span>

                <MyInput className={'pictureSetters'} type={'text'} placeholder={getRightContentNumberVisual()}
                         onChange={(event) => setEnteredPicture(event.target)}
                         error={error}
                />

                <span>from {props.contentArray.length}</span>
            </form>
        </div>)
}


export default PictureSetter;