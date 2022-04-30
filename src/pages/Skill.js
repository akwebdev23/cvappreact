
import React, { useEffect, useState } from 'react';
import { useFetchingCards } from '../hooks/useFetchingCards';
import LoadingSpinner from '../components/assets/loadingspinner/LoadingSpinner';
import EntityDataService from '../components/API/EntityDataService';
import Card from '../components/Card';
import { useParams } from 'react-router-dom';

function Skill() {
  const [skill, setSkill] = useState({});
  const {id} = useParams();
  const [fetchSkill, isUploading, errorMessage] = useFetchingCards(
    false,
    false,
    async () => {
      const [data, status] = await EntityDataService.get('/skills/'+id);
      status ? setSkill(data) : setSkill({});
    }
  )
  useEffect(()=>{
    if(!errorMessage){
      fetchSkill();
    } else {
      console.dir(errorMessage);
    }
  },[]);
  return (
    <div className="container">
        <h1>Skill</h1>
        {isUploading 
          ? <LoadingSpinner />
          : <Card title={'Skill'} classTitle={'skill'} card={skill} open={true}/>}
        
    </div>
  );
}

export default Skill;
