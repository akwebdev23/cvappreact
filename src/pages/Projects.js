
import React, { useEffect, useState } from 'react';
import CardsList from '../components/CardsList';
import { useFetchingCards } from '../hooks/useFetchingCards';
import LoadingSpinner from '../components/assets/loadingspinner/LoadingSpinner';
import Card from '../components/Card';

function Projects() {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState();
  
  const {isLoading, errorMessage, fetchedCards} = useFetchingCards('/projects', Card);
  
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
    <div className="projects">
        <h1 className='mb-0 mb-sm-2'>Experience</h1>
        {loading 
          ? <LoadingSpinner />
          : <CardsList title={'Projects'} classTitle={'project'} cards={cards}/>}
    </div>
  );
}

export default Projects;
