import React, { memo } from 'react'
import { useCMS } from '../context/CMSContext';

import github from '../assets/images/githubwhite.png';
import linkedin from '../assets/images/linkedin.png';

const Socials = memo(() => {
  const { content } = useCMS();
  
  const personal = content?.personal || {
    github: 'https://github.com/Ejohns48/',
    linkedin: 'https://www.linkedin.com/in/Ejohns48/'
  };

  return (
    <section id='main-left-aside'>
          <div id='socials'>        
          <a href={personal.github} target='_blank' rel='noreferrer'>
            <img src={github} alt="GitHub" width='25' height='25' loading="lazy" decoding="async" />
          </a>
          <a href={personal.linkedin} target='_blank' rel='noreferrer'>
            <img src={linkedin} alt="LinkedIn" width='25' height='25' loading="lazy" decoding="async" />
          </a>
          </div>
    </section>
  )
});

Socials.displayName = 'Socials';

export default Socials