import React from 'react'

import github from '../assets/images/githubwhite.png';
import linkedin from '../assets/images/linkedin.png';

const Socials = () => {
  return (
    <section id='main-left-aside'>
          <div id='socials'>        
          <a href="https://github.com/Ejohns48/" target='_blank' rel='noreferrer'><img src={github} alt="" width='25px' height='25px' /></a>
          <a href="https://www.linkedin.com/in/Ejohns48/" target='_blank' rel='noreferrer'><img src={linkedin} alt="" width='25px' height='25px' /></a>
          </div>
    </section>
  )
}

export default Socials