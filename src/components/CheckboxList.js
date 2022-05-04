
import React from 'react';

function CheckboxList(props) {
  console.dir(props.items);
  return (
    <fieldset className='from-group mb-2'>
        <legend>{props.title}</legend>
        {props.items?.length 
        ? props.items.map((item, index) =>  
            <div key={index} className='form-check'><input
              id='flexCheckDefault'
              className='form-check-input'
              type='checkbox'
              key={index}
              name={props.title+'[]'}
              value={item.id}/>{item.name}</div>
          ) 
        : ''}
    </fieldset>
  );
}

export default CheckboxList;
