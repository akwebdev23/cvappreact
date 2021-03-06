
import React, {useState, useEffect} from 'react';
import EntityDataService from './API/EntityDataService';

function Level({ownLevel, levels}) {
    return (
        <div className='card-skill-level d-flex align-items-center'>
            <div className='font-wheight-normal mr-2'>level</div>
            {levels.map((level)=>
                <div 
                    title={level.name} 
                    key={level.level} 
                    className={
                        'btn btn-sm btn-outline-'+
                        ((ownLevel.level >= level.level) 
                            ? level.style 
                            : 'secondary')}>
                            
                </div>)}
        </div>
    );
}
export default Level;
