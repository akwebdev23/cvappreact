
import React, { useEffect, useState } from 'react';
import CardsList from '../components/CardsList';
import { useFetching } from '../hooks/useFetching';
import LoadingSpinner from '../components/assets/loadingspinner/LoadingSpinner';
import EntityDataService from '../components/API/EntityDataService';
import Card from '../components/Card';
import { useParams } from 'react-router-dom';

function Project() {
  const [project, setProject] = useState({});
  const {id} = useParams();
  const [fetchProject, isUploading, errorMessage] = useFetching(
    async () => {
      const [data, status] = await EntityDataService.get('/projects/'+id);
      console.dir('fetchProject');

      const success = status ? setProject(data) : setProject({});
      console.dir(data);
      console.dir(id);
      
    }
  )
  useEffect(()=>{
    fetchProject();
    console.dir('USE EFFECT');
    console.dir('skill');
    console.dir(project);
  },[]);
  return (
    <div className="container">
        <h1>Project</h1>
        {isUploading 
          ? <LoadingSpinner />
          : <Card card={project} classTitle={'project'} open={true}/>}
    </div>
  );
}

export default Project;
