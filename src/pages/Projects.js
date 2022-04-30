
import React, { useEffect, useState } from 'react';
import CardsList from '../components/CardsList';
import { useFetchingCards } from '../hooks/useFetchingCards';
import LoadingSpinner from '../components/assets/loadingspinner/LoadingSpinner';
import Card from '../components/Card';

function Projects() {
  const [cards, setCards] = useState();
  const [fetchProjects, isUploading, errorMessage, fetchedCard] = useFetchingCards('/projects', Card);
  
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
        <h1>Projects</h1>
        {isUploading 
          ? <LoadingSpinner />
          : <CardsList title={'Projects'} classTitle={'project'} cards={cards}/>}
    </div>
  );
}

export default Projects;
