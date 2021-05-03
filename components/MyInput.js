import React from 'react';


const MyInput = (props) => {

    return (

        <div id={props.id + 'Container'}>
            <label htmlFor={props.id}>{props.label}</label>
            <input id={props.id} type={props.type} {...props} />
            {props.error === "true" ?
                <div className={'error'}> Insert a correct value</div>
                : null}
        </div>
    )
}


export default MyInput;