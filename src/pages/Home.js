
import React, {useContext, useEffect} from 'react';
import { AppContext } from '../hooks/AppContext';

function Home() {
  const [{user, setUser}, {unexpectedAlertData}] = useContext(AppContext);
  useEffect(()=>{
    console.dir('MAIN user');
    console.dir(user);
  }, [user]);

  return (
    <div className="home">
        <h1>CV Main</h1>
        <div>{JSON.stringify(user.name)}</div>
    </div>
  );
}

export default Home;
