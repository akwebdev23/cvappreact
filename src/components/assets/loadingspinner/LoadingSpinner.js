
import React from 'react';
import './styles.css';

function LoadingSpinner() {
  return (
        <div className='d-flex justify-content-center'>
            <div className='lds-grid'>
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
        </div>
    );
}
export default LoadingSpinner;
