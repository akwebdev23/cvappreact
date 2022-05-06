
import React, {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../hooks/AppContext';

function Home() {
  const [{user, setUser}, {unexpectedAlertData}] = useContext(AppContext);
  useEffect(()=>{
    console.dir('MAIN user');
    console.dir(user);
  }, [user]);

  return (
    <div className="home">
        <h2>Добро пожаловать</h2>
        <div className='d-flex flex-column'>
          <p className='col-12'>
            Меня зовут Алим. C 2019 года я занимаюсь full-stack разработкой веб-сервисов и безумно влюблен в it и науку в целом. 
          </p>
          <p className='col-12'>
            Я решил создать это приложение в качестве моего портфолио и буду наполнять его по мере развития своей карьеры.
          </p>
          <p className='mb-0'>
            Для удобства я разделил его на две части:
            <p className='ml-2 mb-0'>
              - мой опыт в виде описания проектов над, которыми я работал;
            </p>
            <p className='ml-2'>
              - мои "Hard Skills", то есть стек технологий, которые я использовал или использую;
            </p>
          </p>
          
        </div>
        <Link to={'/experience'} className='btn btn-success mr-2'>
          Проекты
        </Link>
        <Link to={'/skills'} className='btn btn-info'>
          Навыки
        </Link>

    </div>
  );
}

export default Home;
