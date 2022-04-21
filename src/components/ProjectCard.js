
import React, { useState } from 'react';
import { API_UPLOAD, SKILLS_ROUTE } from '../utils/consts';
import { NavLink } from 'react-router-dom';

function ProjectCard(props) {
	const [toggleClass, setToggleClass] = useState('')
  	const openCloseCard = (event) => {
		!toggleClass ? setToggleClass('open') : setToggleClass('');
		console.dir(event);
		console.dir(this);
	} 
	return (
		<div className='project-card'>
			<div className="card text-white bg-secondary mb-3">
				<div title='Развернуть' className='project-card-main-content d-flex'>
					<div className='project-card-main-text_content'>
						<div onClick={openCloseCard} 
								className={'card-header project-card-header_title d-flex justify-content-between '+toggleClass}>
							<h5 className='text-primary mb-0'>{props.card.name}</h5>
							<div className='text-light'>{props.card.start.split(' ')[0]+'  -  '+(props.card.end ? props.card.end.split(' ')[0] : '...now')}</div>
						</div>
						<div className={'card-body d-flex flex-row align-items-center p-0 '+toggleClass}>
							<div className="card-body-text_content col-10 py-3 px-3">
								<p className="card-text">
									{props.card.description}
								</p>
							</div>
							<div className='project-card-image_content ml-auto'>
								<div className='img-fluid project-icon text-center'>
									<img alt={props.card.name+'_icon'} src={API_UPLOAD+props.card.icon} className='img-fluid'/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='card-footer'>
					<h5 className="card-title project-card-projects_title">Стек технологий</h5>
					<div className='project-card-projects_content d-flex'>
						{props.card.skills.map(
							(skill) => 
								<NavLink key={skill.id} to={SKILLS_ROUTE+'/'+skill.id}>
									<div className='project-card-skill-icon' key={skill.id}>
										<img key={skill.id} className='img-fluid' src={API_UPLOAD+skill.icon} title={skill.name}/>
									</div>
								</NavLink>
						)}
					</div>
				</div>
			</div>
		</div>
  	);
}

export default ProjectCard;
