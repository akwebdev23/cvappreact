
import React, { useEffect, useState } from 'react';
import { useFetchingCards } from '../hooks/useFetchingCards';
import LoadingSpinner from '../components/assets/loadingspinner/LoadingSpinner';
import EntityDataService from '../components/API/EntityDataService';
import Card from '../components/Card';
import { useParams } from 'react-router-dom';

function Project() {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const {id} = useParams();
  const {fetchHandler, isLoading, errorMessage} = useFetchingCards(
    false,
    false,
    async () => {
      const [data, status] = await EntityDataService.get('/projects/one/'+id);
      status ? setProject(data) : setProject({});
    }
  )
  useEffect(()=>{
    fetchHandler();

    if(errorMessage)
      console.dir(errorMessage);

    if(!isLoading)
      setLoading(false);
      
  },[isLoading]);
  return (
    <div className="project">
        <h1 className='mb-1 mb-sm-2'>Project</h1>
        {loading 
          ? <LoadingSpinner />
          : <Card card={project} classTitle={'project'} open={true}/>}
    </div>
  );
}

export default Project;
