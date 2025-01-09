import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  return (
    <div  className='parallax'>
      <div className="about-header">
        <h1>{t('aboutHeaderMain')}</h1>
      </div>
      
      <div className='parallax-layer div1' >
        <section>
          <h2>{t('aboutHeaderOne')}</h2> 
          <p>
          {t('about11')}
          {t('about12')}
          {t('about13')}
          {t('about14')}
          {t('about15')}
          </p>
        </section>
      </div>   
      <div  className='parallax-layer div2'>
        <section>
          <h2>{t('aboutHeaderTwo')}</h2>
          <p>
          {t('about21')}
          {t('about22')}
          {t('about23')}
          {t('about24')}
          {t('about25')}
          {t('about26')}
          {t('about27')}
          {t('about28')}
          {t('about29')}
          {t('about210')}
          {t('about211')}
          </p>
        </section>
        
      </div>
      <div  className='parallax-layer div3'>
        <section>
          <h2>{t('aboutHeaderThree')}</h2>
          <p>
          {t('about31')}
          {t('about32')}
          {t('about33')}
          {t('about34')}
          {t('about35')}
          </p>
        </section>
      </div>
    </div>
    
  )
}

export default About