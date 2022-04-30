
import React, { useEffect, useState } from 'react';
import CardsList from '../components/CardsList';
import { useFetchingCards } from '../hooks/useFetchingCards';
import LoadingSpinner from '../components/assets/loadingspinner/LoadingSpinner';
import Card from '../components/Card';

function Skills() {
  const [cards, setCards] = useState();
  const [fetchProjects, isUploading, errorMessage, fetchedCard] = useFetchingCards('/skills', Card);

  useEffect(()=>{
    if(!errorMessage){
      setCards(fetchedCard);
      console.dir(fetchedCard);
    } else {
      console.dir(errorMessage);
    }
  });
  return (
    <div className="container">
        <h1>Skills</h1>
        {isUploading 
          ? <LoadingSpinner />
          : <CardsList title={'SkillsList'} classTitle={'skill'} cards={cards}/>}
    </div>
  );
}
export default Skills;
