
import React from 'react';
function LinksList({links}) {
  return (
    <div className='project-links'>
      <div className='cards-list d-flex justify-content-end'>
        {links?.length 
          ? links.map((link, index) => 
            <a key={index} href={link.link} className='project-link'><div key={index} className={'btn btn-outline-'+link.linkType.style}>{link.name}</div></a>) 
          : ''}  
      </div>
    </div>
  );
}

export default LinksList;
