
import React, { useEffect, useState } from 'react';
import { useFetchingCards } from '../hooks/useFetchingCards';
import LoadingSpinner from '../components/assets/loadingspinner/LoadingSpinner';
import EntityDataService from '../components/API/EntityDataService';
import Card from '../components/Card';
import { useParams } from 'react-router-dom';

function Project() {
  const [project, setProject] = useState({});
  const {id} = useParams();
  const [fetchProject, isUploading, errorMessage] = useFetchingCards(
    false,
    false,
    async () => {
      const [data, status] = await EntityDataService.get('/projects/'+id);
      status ? setProject(data) : setProject({});
    }
  )
  useEffect(()=>{
    if(!errorMessage){
      fetchProject();
    } else {
      console.dir(errorMessage);
    }
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
