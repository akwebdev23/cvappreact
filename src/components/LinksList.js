
import React from 'react';
function LinksList({links}) {
  return (
    <div className='links py-2'>
      <h5 className="links-title mb-2 d-flex justify-content-end "><span>Ссылки</span></h5>
      <div className='links-list d-flex justify-content-end align-content-center align-items-center flex-column flex-sm-row flex-wrap'>
        {links?.length 
          ? links.map((link, index) => 
            <a target={'_blank'} key={index} href={link.link} className='project-link ml-sm-2 my-1 my-sm-1'><div key={index} className={'btn btn-outline-'+link.linkType.style}>{link.name}</div></a>) 
          : ''}  
      </div>
    </div>
  );
}

export default LinksList;
