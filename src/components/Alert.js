import React from 'react';
function Alert({messages, color, callback}) {
    console.dir(messages);
    const closeHandler = () => {
        callback();
    }
    return (
        <div className='alert-box'>
            <div className={'alert alert-'+color}>
                {messages instanceof Array ? 
                    messages.map((message, index)=><div key={index}>{message}</div>) :
                    <div>{messages}</div>}
            </div>
            <div className='alert-close text-secondary' onClick={closeHandler}>x</div>
        </div>
    );
}

export default Alert;
