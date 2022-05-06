
import React from 'react';

function Contacts() {
  return (
    <div className="contacts">
        <h1>Контакты для связи </h1>
        <div className='contact-icons'>
          <div className='gmail-icon d-flex'>
            <a className='nav-link px-0 hover-success' href='mailto:akwebdev23@gmail.com'><img className='pr-1' src="/icons/gmail-logo.png"/>Email: akwebdev23@gmail.com</a>
          </div> 
          <div className='telegram-icon d-flex'>
            <a href="https://t.me/akwebdev23" className='nav-link px-0 hover-success'><img className='img-fluid pr-1' src="/icons/telegram-png.png"/>Telegram: t.me/akwebdev23</a>
          </div>
        </div>
    </div>
  );
}

export default Contacts;
