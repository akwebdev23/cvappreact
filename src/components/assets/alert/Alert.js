import React, {useEffect, useState} from 'react';
import './styles.css';

function Alert({messages, color, sticky, callback, show}) {
    const [close, setClose] = useState(false);
    useEffect(()=>{
        if(show)
            setClose(false);        
    }, [messages])
    console.dir(messages);
    const closeHandler = () => {
        if(callback){
            callback();
            setClose(true);
        }
        else
            setClose(true);
    }
    if(!close )
        return (
            <div className={'alert-box'+(sticky ? ' sticky' : '')} style={{top: sticky ? (window.scrollY + 65) + 'px' : '0px', right: '0'}}>
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
