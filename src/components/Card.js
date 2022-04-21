
import React, { useEffect, useState } from 'react';
import { API_UPLOAD, EXPERIENCE_ROUTE } from '../utils/consts';
import { NavLink } from 'react-router-dom';
import Level from './Level';
import CardFooter from './CardFooter';
import { useToggleClass } from '../hooks/useToggleClass';
import LinksList from './LinksList';

function Card({title, classTitle, card, open}) {
	const [toggleClass, openCloseHandler] = useToggleClass('open', open, ['card-header', 'card-open-state']);
	return (
		<div className={classTitle+'-card'}>
			<div className='card text-white bg-secondary mb-3' onClick={openCloseHandler}>
				<div title={toggleClass ? 'Свернуть': 'Развернуть'} 
					className={'card-header d-flex flex-sm-row flex-column '+toggleClass}>
					<h5 className='text-primary mb-sm-0 mb-2 mr-auto card-open-state'>
						{card.name}
					</h5>
					{classTitle == 'project' ?
						<div className='text-light'>
							{card.start.split(' ')[0]+'  -  '+(card.end ? card.end.split(' ')[0] : '...now')}
						</div>
						: <Level ownLevel={card?.level}/>}
				</div>
				<div className={'card-body d-flex flex-row align-items-center p-0 '+toggleClass}>
					<div className="card-body-text_content col-10 py-3 px-3">
						<p className="card-text">
							{card.description}
						</p>
					</div>
					<div className='card-image_content col-2'>
						<div className='img-fluid project-icon text-center'>
							<img alt={card.name+'_icon'} src={API_UPLOAD+card.icon} className='img-fluid'/>
						</div>
					</div>
				</div>
				<CardFooter title={title} classTitle={classTitle} card={card}/>
			</div>
		</div>
	);
}

export default Card;
