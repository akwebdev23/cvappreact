
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

  useEffect(()=>{
    fetchSkillLevels();
    fetchSkills();
    fetchProjects();
    fetchLinks();
    fetchLinkTypes();
  },[alertData]);
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
    const success = status ? false : setSkills([...skills, data]);
    console.dir(status);
    console.dir(data);
  }
  async function linkSubmit(event){
    event.preventDefault();
    let formData = new FormData(event.target);
    console.dir(formData);
    const [data, status] = await EntityDataService.create('/links/create', formData);
    const success = status ? false : setLinks([...links, data]);
    setAlertData({messages: 'Ссылка '+data.name+' успешно добавлена или отредактирована.', color: 'success', show: true});

    console.dir(links);
    console.dir(alertData);
    console.dir(status);
    console.dir(data);
  }
  async function linkTypeSubmit(event){
    event.preventDefault();
    let formData = new FormData(event.target);
    console.dir(formData);
    const [data, status] = await EntityDataService.create('/linktypes/create/new', formData);
    const success = status ? false : setLinkTypes([...linkTypes, data]);

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
      const success = response.data.status == 'error' ? false : setProjects([...projects, response.data.data]);
      console.dir(response);
    }).catch(response => {
      console.dir(response);
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
      const success = response.data.status == 'error' ? false : setSkillLevels([...skillLevels, response.data.data]);
      console.dir(response);
    }).catch(response => {
      console.dir(response);
    })
  }
  return (
    <div className='admin mb-4'>
        {alertData?.show ? <Alert callback={false} sticky={true} messages={alertData.messages} color={alertData.color}/> : ''}
        <h1>CV Admin</h1>
        <div className='skill_add_form mb-3'>
          <h2>Skill add</h2>
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
            {skillLevels.map((skillLevel)=>{
              return (<div key={skillLevel.id}>{skillLevel.name}</div>)
            })}
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
          {JSON.stringify(alertData)}
          {alertData?.show ? <Alert show={alertData.show} callback={false} sticky={true} messages={alertData.messages} color={alertData.color}/> : ''}
          <div className='link-list'>
            {links.map((link)=><div key={link.id}>{link.link+' | '+link.name+' | '+link.project.name}<hr className='my-0'/></div>
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
            {linkTypes.map((linktype)=><div key={linktype.id}>{linktype.name}</div>)}
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
