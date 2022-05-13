
import React from 'react';
import Card from './Card';

function CardsList({title, classTitle, cards, label, levels}) {
  return (
    <div>
      <h2 className="text-info d-flex justify-content-end mb-1 mb-sm-2">{label}</h2>
      <div className='cards-list'>
        {cards?.length 
          ? cards.map(({card, Component}) => <Component levels={levels} title={title} classTitle={classTitle} key={card.id} card={card} open={false}/>) 
          : <h4 className='cards-list-empty'>Здесь скоро что-то появится...</h4>}  
      </div>
    </div>
  );
}

export default CardsList;
