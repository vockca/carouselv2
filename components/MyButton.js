import React, {useState} from 'react';


const MyButton = (props) => {
    const [areButtonsDisabled, setDisabledButtonStatus] = useState(false);

    //Disables buttons to prevent spamming
    const disableButtons = (duration) => {
        setDisabledButtonStatus(true);

        setTimeout(() => {
            setDisabledButtonStatus(false);
        }, duration);
    }

    return (
        <button type={props.type}
                disabled={areButtonsDisabled}
                id={props.id}
                className={props.className}
                onClick={(event) => {
                    props.onclick(event);
                    disableButtons(+props.disableDurationMS);
                }}
        >
            {props.children}
        </button>
    )
}


export default MyButton;
