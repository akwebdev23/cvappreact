
import React from 'react';

function OptionSelect({items, title}) {
  return (
    <fieldset className='form-group mb-2'>
      <legend>{title}</legend>
      <select className='form-control' name={title}>
          {items?.length 
          ? items.map((item) => 
              <option
                key={item.id}
                className='text-dark' 
                name='option'
                value={item.id}>
                  {item.name}
              </option>) 
          : ''} 
      </select>
    </fieldset>
  );
}

export default OptionSelect;
