
import React from 'react';
import SkillCard from './SkillCard';

function CardsList({title, classTitle, cards}) {
  return (
    <div>
      <h2 className="text-info d-flex justify-content-end">{title}</h2>
      <div className='cards-list'>
        {cards?.length 
          ? cards.map(({card, Component}) => <Component title={title} classTitle={classTitle} key={card.id} card={card} open={false}/>) 
          : <h4 className='cards-list-empty'>Здесь скоро что-то появится...</h4>}  
      </div>
    </div>
  );
}

export default CardsList;
