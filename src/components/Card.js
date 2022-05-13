
import React, { useEffect, useState } from 'react';
import { API_UPLOAD, EXPERIENCE_ROUTE } from '../utils/consts';
import { NavLink } from 'react-router-dom';
import Level from './Level';
import CardFooter from './CardFooter';
import { useToggleClass } from '../hooks/useToggleClass';
import LinksList from './LinksList';

function Card({title, classTitle, card, open, levels}) {
	const [toggleClass, openCloseHandler] = useToggleClass('open', ['card-header', 'card-open-state'], ['card-body', 'card-footer'], open );
	return (
		<div className={classTitle+'-card'}>
			<div className='card text-white bg-secondary mb-3 px-0'>
				<div title={toggleClass ? 'Свернуть': 'Развернуть'} onClick={openCloseHandler}
					className={'card-header d-flex flex-sm-row flex-column px-2 px-sm-3 '+toggleClass}>
					<h5 className='text-primary mb-sm-0 mb-2 mr-auto card-open-state'>
						{card.name}
					</h5>
					{classTitle == 'project' ?
						<div className='text-light'>
							{(card?.start ? card?.start?.split('-')[1]+'.'+card?.start?.split('-')[0] : '...')
								+ '  -  '
								+ (card.end ? card?.end?.split('-')[1]+'.'+card?.end?.split('-')[0] : '...now')}
						</div>
						: <Level levels={levels} ownLevel={card?.level}/>}
				</div>
				<div className={'card-body d-flex flex-column align-items-center p-0 '+toggleClass}>
					<div className='card-image_content col-12 px-3 pt-2'>
						<div className='img-fluid project-icon text-center'>
							<img alt={card.name+'_icon'} src={API_UPLOAD+card.icon} className='img-fluid'/>
						</div>
					</div>
					<div className="card-body-text_content col-12 py-2 px-2 px-sm-3 pt-1 pt-sm-2">
						<p className="card-text">
							{card.description}
						</p>
					</div>
				</div>
				<CardFooter title={title} classTitle={classTitle} card={card}/>
			</div>
		</div>
	);
}

export default Card;
