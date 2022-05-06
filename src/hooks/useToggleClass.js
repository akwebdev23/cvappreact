import { useState } from 'react';

export const useToggleClass = (className, actionClasses,  stoplistClasses, defState) => {
    const [toggleClass, setToggleClass] = useState(defState ? className : '');
    const openCloseHandler = (event, onlyClose) => {
        let action = true;
        if(stoplistClasses){
            stoplistClasses.forEach(element => {
                if(event.target.classList.contains(element) 
                    || event.target.localName === element)
                    action = false;
            });
        }
        console.dir('useToggleClass');
        console.dir('actionClasses');
        console.dir(actionClasses);
        console.dir(event.target);

        if(actionClasses){
            actionClasses.forEach(element => {
                if(event.target.classList.contains(element) 
                    || event.target.localName === element)
                    action = true;
            });
        }

        if(action)
            !toggleClass ? setToggleClass(className) : setToggleClass('');
        if(onlyClose)
            setToggleClass('');

        console.dir(toggleClass);
        console.dir(className);
        console.dir(action);
    }
    return [toggleClass, openCloseHandler];
}