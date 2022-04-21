
import React, {useState, useEffect} from 'react';
import EntityDataService from './API/EntityDataService';

function Level({ownLevel}) {
    const [levels, setLevels] = useState([]);
    useEffect(()=>{
        fetchLevels();
    },[]);
    async function fetchLevels(){
        const [data, status] = await EntityDataService.get('/skills/levels/all');
        console.dir(data);
        const success = status ? setLevels(data): setLevels([]);
    }
    return (
        <div className='card-skill-level d-flex align-items-center'>
            <div className='font-wheight-normal mr-2 text-light'>level</div>
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
