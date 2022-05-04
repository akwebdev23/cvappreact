
import React from 'react';
import { NavLink } from 'react-router-dom';
import Level from './Level';
import { EXPERIENCE_ROUTE } from '../utils/consts';
import { API_UPLOAD } from '../utils/consts';
import { SKILLS_ROUTE } from '../utils/consts';
import LinksList from './LinksList';


function CardFooter({title, classTitle, card}) {
    if(classTitle == 'skill'){
        return (
            <div className='card-footer px-2 px-sm-2'>
                <h5 className="card-title mb-0">Связанные проекты</h5>
                <div className='d-flex'>
                    {card?.projects.map(
                        (project) =>
                            <NavLink key={project.id} to={EXPERIENCE_ROUTE + '/'+project.id}>
                                <div className='footer-card-icon' key={project.id}>
                                    <img key={project.id} className='img-fluid' src={API_UPLOAD+project.icon} title={project.name}/>
                                </div>
                            </NavLink>
                    )}
                </div>
            </div>
          );
    } else {
        return (
            <div className='card-footer px-2 px-sm-3'>
                <h5 className="card-title">Стек технологий</h5>
                <div className='d-flex'>
                    {card?.skills.map(
                        (skill) => 
                            <NavLink key={skill.id} to={SKILLS_ROUTE+'/'+skill.id}>
                                <div className='footer-card-icon' key={skill.id}>
                                    <img key={skill.id} className='img-fluid' src={API_UPLOAD+skill.icon} title={skill.name}/>
                                </div>
                            </NavLink>
                    )}
                </div>
			    <LinksList links={card.links}/>
            </div>
        );
    }
  
}
export default CardFooter;
