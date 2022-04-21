
import React, { useEffect, useState } from 'react';
import CardsList from '../components/CardsList';
import { useFetching } from '../hooks/useFetching';
import LoadingSpinner from '../components/assets/loadingspinner/LoadingSpinner';
import EntityDataService from '../components/API/EntityDataService';
import Card from '../components/Card';

function Skills() {
  const [skills, setSkills] = useState([]);
  const [cards, setCards] = useState([]);

  const [fetchSkills, isUploading, errorMessage] = useFetching(
    async () => {
      const [data, status] = await EntityDataService.get('/skills');
      console.dir('fetchSkills');
      const success = status ? setSkills(data): setSkills([]);
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
    fetchSkills();
    console.dir('USE EFFECT');
    console.dir('cards');
    console.dir(cards);
  },[]);
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
