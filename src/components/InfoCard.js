import React, { memo } from 'react'
import { useCMS } from '../context/CMSContext';

import ej4 from '../assets/images/ej.jpg';
import ej3 from '../assets/images/ej.jp2';
import ej2 from '../assets/images/ej.jxr';
import ej1 from '../assets/images/ej.webp';
import ImgNextGen from "./ImgNextGen";

const InfoCard = memo(() => {
  const { content, isLoading } = useCMS();
  
  // Fallback values
  const personal = content?.personal || {
    name: 'Eric Johnson',
    phone: '(863) 510-3476',
    email: 'Ejohnsmedia@Gmail.com'
  };

  if (isLoading) {
    return <section id="main-left-top">Loading...</section>;
  }

  // Format phone for tel: link
  const phoneLink = personal.phone.replace(/[^\d]/g, '');

  return (
    <section id="main-left-top">
        <div id='img'>
            <ImgNextGen
            id='me'
            srcWebp={ej1}
            srcJxr={ej2} 
            srcJp2={ej3} 
            fallback={ej4}
            alt={`Photo of ${personal.name}.`}
            width="200"
            height="200"
            loading="eager"
            decoding="async"
            />
          </div>
          <h1>{personal.name}</h1><br />
          <p><a id='phone' href={`tel:${phoneLink}`}>{personal.phone}</a></p><br />
          <p><a id='email' href={`mailto:${personal.email}`} target='_blank' rel='noreferrer'>{personal.email}</a></p>          
        </section>
  )
});

InfoCard.displayName = 'InfoCard';

export default InfoCard