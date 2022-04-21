
import React from 'react';

function CheckboxList(props) {
  return (
    <fieldset className='from-group mb-2'>
        <legend>{props.title}</legend>
        {props.items?.length 
        ? props.items.map((item) =>  
            <div key={item.id} className='form-check'><input
              id='flexCheckDefault'
              className='form-check-input'
              type='checkbox'
              key={item.id}
              name='item_id[]'
              value={item.id}/>{item.name}</div>
          ) 
        : ''}
    </fieldset>
  );
}

export default CheckboxList;
