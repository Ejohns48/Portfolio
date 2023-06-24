import React from 'react'

import ej4 from '../assets/images/ej.jpg';
import ej3 from '../assets/images/ej.jp2';
import ej2 from '../assets/images/ej.jxr';
import ej1 from '../assets/images/ej.webp';
import ImgNextGen from "./ImgNextGen";

const InfoCard = () => {
  return (
    <section id="main-left-top">
        <div id='img'>
            <ImgNextGen
            id='me'
            srcWebp={ej1}
            srcJxr={ej2} 
            srcJp2={ej3} 
            fallback={ej4}
            alt="Photo of Eric Johnson."
            width="200px"
            height="200px"
            />
          </div>
          <h1>Eric Johnson</h1><br />
          <p><a id='phone' href='tel:8635103476'>(863) 510-3476</a></p><br />
          <p><a id='email' href='mailto:Ejohnsmedia@Gmail.com' target='_blank' rel='noreferrer'>Ejohnsmedia@Gmail.com</a></p>          
        </section>
  )
}

export default InfoCard