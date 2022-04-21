
import React, { useEffect, useState } from 'react';
import CardsList from '../components/CardsList';
import { useFetching } from '../hooks/useFetching';
import LoadingSpinner from '../components/assets/loadingspinner/LoadingSpinner';
import EntityDataService from '../components/API/EntityDataService';
import Card from '../components/Card';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [cards, setCards] = useState([]);

  const [fetchProjects, isUploading, errorMessage] = useFetching(
    async () => {
      const [data, status] = await EntityDataService.get('/projects');
      console.dir('fetchProjects');

      const success = status ? setProjects(data): setProjects([]);
      console.dir(data);
      let cards = data.map(card => {
        return {card, Component: Card};
      });
      setCards(cards);
      console.dir('cards');
      console.dir(cards);
    }
  )
  useEffect(()=>{
    fetchProjects();
    console.dir('USE EFFECT');
    console.dir('cards');
    console.dir(cards);
  },[]);
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
