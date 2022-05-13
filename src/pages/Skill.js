
import React, { useEffect, useState } from 'react';
import { useFetchingCards } from '../hooks/useFetchingCards';
import LoadingSpinner from '../components/assets/loadingspinner/LoadingSpinner';
import EntityDataService from '../components/API/EntityDataService';
import Card from '../components/Card';
import { useParams } from 'react-router-dom';

function Skill() {
  const [loading, setLoading] = useState(true);
  const [skill, setSkill] = useState({});
  const {id} = useParams();
  const {fetchHandler, isLoading, errorMessage} = useFetchingCards(
    false,
    false,
    async () => {
      const [data, status] = await EntityDataService.get('/skills/one/'+id);
      status ? setSkill(data) : setSkill({});
    }
  )
  const [levels, setLevels] = useState([]);
  async function fetchLevels(){
    const [data, status] = await EntityDataService.get('/skills/levels/all');
    console.dir(data);
    const success = status ? setLevels(data): setLevels([]);
  }
  useEffect(()=>{
    fetchLevels();
  },[]);
  useEffect(()=>{
    fetchHandler();

    if(errorMessage)
      console.dir(errorMessage);

    if(!isLoading)
      setLoading(false);
      
  },[isLoading]);
  return (
    <div className="skill">
        <h1 className='mb-1 mb-sm-2'>Skill</h1>
        {loading 
          ? <LoadingSpinner />
          : <Card levels={levels} title={'Skill'} classTitle={'skill'} card={skill} open={true}/>}
        
    </div>
  );
}

export default Skill;
