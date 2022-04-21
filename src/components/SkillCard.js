
import {React, useState} from 'react';
import { API_UPLOAD, EXPERIENCE_ROUTE } from '../utils/consts';
import { NavLink } from 'react-router-dom';

function SkillCard(props) {
	const [toggleClass, setToggleClass] = useState('')
  	const openCloseCard = (event) => {
		!toggleClass ? setToggleClass('open') : setToggleClass('');
		console.dir(event);
		console.dir(this);
	} 
  return (
	<div className='skill-card'>
		<div className="card text-white bg-secondary mb-3">
			<div className="card-header skill-card-header_title text-primary">{props.card.name}</div>
			<div className="card-body d-flex flex-row align-items-center">
				<div className="card-body-text_content col-10">
					<p className="card-text">
						{props.card.description}
					</p>
				</div>
				<div className='skill-card-image_content col-2'>
					<div className='image_content-title'>
						<h4 className="card-title skill-card-body_title text-center">{props.card.label}</h4>
					</div>
					<div className='img-fluid skill-icon text-center'>
						<img alt={props.card.name+'_icon'} src={API_UPLOAD+props.card.icon} className='img-fluid'/>
					</div>
				</div>
			</div>
			<div className='card-footer'>
				<h5 className="card-title skill-card-projects_title">Связанные проекты</h5>
				<div className='skill-card-projects_content d-flex'>
					{props.card.projects.map(
						(project) =>
							<NavLink key={project.id} to={EXPERIENCE_ROUTE + '/'+project.id}>
								<div key={project.id}>
									<img key={project.id} className='img-fluid' src={API_UPLOAD+project.icon} title={project.name}/>
								</div>
							</NavLink>
					)}
				</div>
			</div>
		</div>
	</div>
  );
}

export default SkillCard;
