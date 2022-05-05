
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_HOST } from '../utils/consts';
import OptionSelect from '../components/OptionSelect';
import EntityDataService from '../components/API/EntityDataService';
import CheckboxList from '../components/CheckboxList';
import Alert from '../components/assets/alert/Alert';

function Admin() {
  const [skillLevels, setSkillLevels] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [links, setLinks] = useState([]);
  const [linkTypes, setLinkTypes] = useState([]);
  const [alertData, setAlertData] = useState({});
  const removeHandler = async ([url, func]) =>{
    console.dir(url);
    const [data, status] = await EntityDataService.get(url);
    console.dir(data);

    func();
    if(!status) 
      setAlertData({messages: data.message, color: 'danger', show: true})
  }


  useEffect(()=>{
    fetchSkillLevels();
    fetchSkills();
    fetchProjects();
    fetchLinks();
    fetchLinkTypes();
  },[]);
  async function fetchSkillLevels(){
    const [data, status] = await EntityDataService.get('/skills/levels/all');
    console.dir(data);
    const success = status ? setSkillLevels(data): setSkillLevels([]);
  }
  async function fetchSkills(){
    const [data, status] = await EntityDataService.get('/skills');
    console.dir(data);
    const success = status ? setSkills(data): setSkills([]);
  }
  async function fetchProjects(){
    const [data, status] = await EntityDataService.get('/projects');
    console.dir(data);
    const success = status ? setProjects(data): setProjects([]);
  }
  async function fetchLinks(){
    const [data, status] = await EntityDataService.get('/links');
    console.dir(data);
    const success = status ? setLinks(data): setLinks([]);
  }
  async function fetchLinkTypes(){
    const [data, status] = await EntityDataService.get('/linktypes');
    console.dir(data);
    const success = status ? setLinkTypes(data): setLinkTypes([]);
  }
  async function skillSubmit(event){
    event.preventDefault();
    let formData = new FormData(event.target);
    console.dir(formData);
    const [data, status] = await EntityDataService.create('/skills/create', formData);
    !status 
      ? setAlertData({messages: data.message, color: 'danger', show: true})
      : setAlertData({messages: 'Навык '+data.name+' успешно добавлен или отредактирован.', color: 'success', show: true});
    fetchSkills();
    console.dir('skill');
    console.dir(status);
    console.dir(data);
  }
  async function linkSubmit(event){
    event.preventDefault();
    let formData = new FormData(event.target);
    console.dir(formData);
    const [data, status] = await EntityDataService.create('/links/create', formData);
    !status 
      ? setAlertData({messages: data.message, color: 'danger', show: true})
      : setAlertData({messages: 'Ссылка '+data.name+' успешно добавлена или отредактирована.', color: 'success', show: true});
    fetchLinks();
    console.dir('links');
    console.dir(status);
    console.dir(data);

    console.dir(links);
    console.dir(alertData);
  }
  async function linkTypeSubmit(event){
    event.preventDefault();
    let formData = new FormData(event.target);
    console.dir(formData);
    const [data, status] = await EntityDataService.create('/linktypes/create/new', formData);
    !status 
      ? setAlertData({messages: data, color: 'danger', show: true})
      : setAlertData({messages: 'Тип ссылки '+data.name+' успешно добавлен или отредактирован.', color: 'success', show: true});
    fetchLinkTypes();
    console.dir('linkTypeSubmit');
    console.dir(status);
    console.dir(data);
  }
  function projectSubmit(event){
    event.preventDefault();
    let formData = new FormData(event.target);
    console.dir(formData);
    axios.post(API_HOST+'/projects/create',
      formData,
    {
      headers: {
        'Content-Type' : 'multipart/form-data'
      }
    }).then(response => {
      response.data.status 
        ? setAlertData({messages: 'Проект '+response.data.data.name+' успешно добавлен или отредактирован.', color: 'success', show: true})
        : setAlertData({messages: response.data.message, color: 'danger', show: true});
      fetchProjects();
      console.dir(response);
    }).catch(response => {
      console.dir(response);
      setAlertData({messages: response.data, color: 'danger', show: true});
    })
  }
  function skillLevelSubmit(event){
    event.preventDefault();
    let formData = new FormData(event.target);
    console.dir(formData);
    axios.post(API_HOST+'/skills/levels/create',
      formData,
    {
      headers: {
        'Content-Type' : 'multipart/form-data'
      }
    }).then(response => {
      response.data.status 
        ? setAlertData({messages: 'Уровень навыка '+response.data.data.name+' успешно добавлен или отредактирован.', color: 'success', show: true})
        : setAlertData({messages: response.data.message, color: 'danger', show: true});
      fetchSkillLevels();
    }).catch(response => {
      console.dir(response);
      setAlertData({messages: response.data, color: 'danger', show: true});
    })
  }
  const sticky = true;
  return (
    <div className='admin mb-4'>
        {alertData?.show 
          ? <Alert alertData={alertData} setAlertData={setAlertData} sticky={true} messages={alertData.messages} color={alertData.color}/> 
          : ''}
        <h1>CV Admin</h1>
        <div className='skill_add_form mb-3'>
          <h2>Skill add</h2>
          {skills.map((skill)=>
              <div key={skill.id}>
                <div className='d-flex' key={skill.id}>
                  <span key={skill.index} className='mr-auto'>{skill.name}</span>
                  <span key={skill.id + skill.index} onClick={()=>{removeHandler(['/skills/remove/'+skill.id, fetchSkills])}} title="Удалить" className='remove-btn px-3'>x</span>
                </div>
                <hr className='my-0'/>
              </div>
            )}
          <form onSubmit={skillSubmit} method='POST' encType='multipart/form-data'>
            <input required className='form-control my-2' type='text' name='name' placeholder='name'/>
            <input required className='form-control my-2' type='text' name='label' placeholder='label'/>
            <OptionSelect items={skillLevels} title={'level-id'}/>
            <CheckboxList items={projects} title={'project-collection'}/>
            <textarea className='form-control my-2' type='text' name='description' placeholder='description'></textarea>
            <input className='form-control my-2' type='file' name='icon' placeholder='icon'/>
            <input className='form-control my-2' type='file' name='image' placeholder='image'/>
            <input className='btn btn-primary mt-2' type='submit' name='submit' value='Отправить'/>
          </form>
        </div>
        <div className='project_add_form mb-3'>
          <h2>Project add</h2>
          {projects.map((project)=>
              <div key={project.id}>
                <div className='d-flex' key={project.id}>
                  <span key={project.index} className='mr-auto'>{project.name}</span>
                  <span key={project.id + project.index} onClick={()=>{removeHandler(['/projects/remove/'+project.id, fetchSkills])}} title="Удалить" className='remove-btn px-3'>x</span>
                </div>
                <hr className='my-0'/>
              </div>
            )}
          <form onSubmit={projectSubmit} method='POST' encType='multipart/form-data'>
            <input required className='form-control my-2' type='text' name='name' placeholder='name'/>
            <CheckboxList items={skills} title={'skill-collection'}/>
            <label>Начало</label>
            <input className='form-control my-2' type='date' name='start' placeholder='startdate'/>
            <label>Завершение</label>
            <input className='form-control my-2' type='date' name='end' placeholder='enddate'/>
            <textarea className='form-control my-2' type='text' name='description' placeholder='description'></textarea>
            <input className='form-control my-2' type='file' name='icon' placeholder='icon'/>
            <input className='form-control my-2' type='file' name='image' placeholder='image'/>
            <input className='btn btn-primary mt-2' type='submit' name='submit' value='Отправить'/>
          </form>
        </div>
        <div className='skill_level_add_form mb-3'>
          <h2>Skill Level add</h2>
          <div className='levels-list'>
          {skillLevels.map((skillLevel)=>
              <div key={skillLevel.id}>
                <div className='d-flex' key={skillLevel.id}>
                  <span key={skillLevel.index} className='mr-auto'>{skillLevel.name}</span>
                  <span key={skillLevel.id + skillLevel.index} onClick={()=>{removeHandler(['/skills/levels/remove/'+skillLevel.id, fetchSkillLevels])}} title="Удалить" className='remove-btn px-3'>x</span>
                </div>
                <hr className='my-0'/>
              </div>
            )}
          </div>
          <form onSubmit={skillLevelSubmit} method='POST' encType='multipart/form-data'>
            <input required className='form-control my-2' type='text' name='name' placeholder='name'/>
            <input required className='form-control my-2' type='number' name='level' placeholder='level'/>
            <input required className='form-control my-2' type='text' name='style' placeholder='style'/>
            <input className='btn btn-primary mt-2' type='submit' name='submit' value='Отправить'/>
          </form>
        </div>
        <div className='link_add_form mb-3'>
          <h2>Link add</h2>
          <div className='link-list'>
            {links.map((link)=>
              <div key={link.id}>
                <div className='d-flex' key={link.id}>
                  <span key={link.index} className='mr-auto'>{link.link+' | '+link.name+' | '+link.project?.name}</span>
                  <span key={link.id + link.index} onClick={()=>{removeHandler(['/links/remove/'+link.id, fetchLinks])}} title="Удалить" className='remove-btn px-3'>x</span>
                </div>
                <hr className='my-0'/>
              </div>
            )}
          </div>
          <form onSubmit={linkSubmit} method='POST' encType='multipart/form-data'>
            <input required className='form-control my-2' type='text' name='name' placeholder='name'/>
            <input required className='form-control my-2' type='text' name='link' placeholder='link'/>
            <OptionSelect items={linkTypes} title='linkType-id'/>
            <OptionSelect items={projects} title='project-id'/>
            <input className='btn btn-primary mt-2' type='submit' name='submit' value='Отправить'/>
          </form>
        </div>
        <div className='link_type_add_form mb-3'>
          <h2>LinkType add</h2>
          <div className='linktypes-list'>
            {linkTypes.map((linktype, index)=>
              <div>
                <div className='d-flex' key={linktype.id}>
                  <span key={linktype.index} className='mr-auto'>{linktype.name}</span>
                  <span key={linktype.id + linktype.index} onClick={()=>{removeHandler(['/linktypes/remove/'+linktype.id, fetchLinkTypes])}} title="Удалить" className='remove-btn px-3'>x</span>
                </div>
                <hr className='my-0'/>
              </div>
            )}
          </div>
          <form onSubmit={linkTypeSubmit} method='POST' encType='multipart/form-data'>
            <input required className='form-control my-2' type='text' name='name' placeholder='name'/>
            <input required className='form-control my-2' type='text' name='style' placeholder='style'/>
            <input className='btn btn-primary mt-2' type='submit' name='submit' value='Отправить'/>
          </form>
        </div>
    </div>
  );
}

export default Admin;
