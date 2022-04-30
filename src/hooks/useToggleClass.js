import { useState } from 'react';

export const useToggleClass = (className, defaultState, elements) => {
    defaultState = defaultState ? className : '';
    const [toggleClass, setToggleClass] = useState(defaultState);
    const openCloseHandler = (event) => {
        console.dir('asd');
        let stop = false;
        if(elements){
            elements.forEach(element => {
                if(event.target.classList.contains(element) 
                    || event.target.localName === element)
                    stop = true;
            });
        }
        if(stop)
            !toggleClass ? setToggleClass(className) : setToggleClass('');
        console.dir(toggleClass);
        console.dir(className);
        console.dir(stop);
    }
    return [toggleClass, openCloseHandler];
}