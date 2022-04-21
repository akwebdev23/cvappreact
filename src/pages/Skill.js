
import React, { useEffect, useState } from 'react';
import { useFetching } from '../hooks/useFetching';
import LoadingSpinner from '../components/assets/loadingspinner/LoadingSpinner';
import EntityDataService from '../components/API/EntityDataService';
import Card from '../components/Card';
import { useParams } from 'react-router-dom';

function Skill() {
  const [skill, setSkill] = useState({});
  const {id} = useParams();
  const [fetchSkill, isUploading, errorMessage] = useFetching(
    async () => {
      const [data, status] = await EntityDataService.get('/skills/'+id);
      console.dir('fetchSkill');
      const success = status ? setSkill(data) : setSkill({});
      console.dir(data);
      console.dir(id);
    }
  )
  useEffect(()=>{
    fetchSkill();
    console.dir('USE EFFECT');
    console.dir('skill');
    console.dir(skill);
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
