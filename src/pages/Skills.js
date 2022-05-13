
import React, { useEffect, useState } from 'react';
import CardsList from '../components/CardsList';
import { useFetchingCards } from '../hooks/useFetchingCards';
import LoadingSpinner from '../components/assets/loadingspinner/LoadingSpinner';
import Card from '../components/Card';
import EntityDataService from '../components/API/EntityDataService';

function Skills() {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const {fetchProjects, isLoading, errorMessage, fetchedCards} = useFetchingCards('/skills', Card);
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
    console.dir('fetchedCards');
    console.dir(fetchedCards);
    console.dir(isLoading);
    
    setCards(fetchedCards);

    if(errorMessage)
      console.dir(errorMessage);

    if(!isLoading)
      setLoading(false);
      
  }, [fetchedCards]);
  return (
    <div className="skills">
        <h1 className='mb-1 mb-sm-2'>Навыки</h1>
        {loading 
          ? <LoadingSpinner />
          : <CardsList levels={levels} label={'SkillsList'} title={'SkillsList'} classTitle={'skill'} cards={cards}/>}
    </div>
  );
}
export default Skills;
