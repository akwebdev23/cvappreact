import React, {useEffect, useState} from 'react';
import './styles.css';

function Alert({messages, color, sticky, callback, setAlertData, alertData: {show}}) {
    const [close, setClose] = useState(false);

    const closeHandler = () => {
        if(callback){
            callback();
            setClose(true);
            setAlertData({show: false});
        }
        else
            setClose(true);
            setAlertData({show: false});
    }
    if(show)
        return (
            <div className={'alert-box'+(sticky ? ' sticky' : '')} style={{top: sticky ? (window.scrollY + (window.offsetWidth > 572 ? 65 : 100)) + 'px' : '0px', right: '0'}}>
                <div className={'py-2 alert alert-'+color}>
                    {messages instanceof Array ? 
                        messages.map((message, index)=>
                            <div className='alert-text' key={index}>{message}
                            <hr className='my-1'/></div>) :
                        <div className='alert-text py-1'>{messages}</div>}
                </div>
                <div className='alert-close text-secondary' onClick={closeHandler}>x</div>
            </div>
        );
    else
        return null;
}

export default Alert;
