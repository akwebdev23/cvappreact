
import React, { useEffect, useState } from 'react';
import CardsList from '../components/CardsList';
import { useFetchingCards } from '../hooks/useFetchingCards';
import LoadingSpinner from '../components/assets/loadingspinner/LoadingSpinner';
import Card from '../components/Card';

function Skills() {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const {fetchProjects, isLoading, errorMessage, fetchedCards} = useFetchingCards('/skills', Card);

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
        <h1 className='mb-0 mb-sm-2'>Skills</h1>
        {loading 
          ? <LoadingSpinner />
          : <CardsList title={'SkillsList'} classTitle={'skill'} cards={cards}/>}
    </div>
  );
}
export default Skills;
