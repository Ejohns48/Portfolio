import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useCMS } from '../context/CMSContext';

const About = memo(() => {
  const { t } = useTranslation();
  const { content } = useCMS();

  // Use CMS content if available
  const aboutContent = content?.about;
  const useCMSContent = aboutContent && aboutContent.sections && aboutContent.sections.length > 0;

  // CSS classes for sections
  const sectionClasses = ['div1', 'div2', 'div3'];

  if (useCMSContent) {
    return (
      <div className='parallax'>
        <div className="about-header">
          <h1>{aboutContent.headerMain || t('aboutHeaderMain')}</h1>
        </div>
        
        {aboutContent.sections.map((section, index) => (
          <div key={section.id} className={`parallax-layer ${sectionClasses[index % sectionClasses.length]}`}>
            <section>
              <h2>{section.header}</h2>
              <p>{section.content}</p>
            </section>
          </div>
        ))}
      </div>
    );
  }

  // Fallback to i18n translations
  return (
    <div className='parallax'>
      <div className="about-header">
        <h1>{t('aboutHeaderMain')}</h1>
      </div>
      
      <div className='parallax-layer div1'>
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
      <div className='parallax-layer div2'>
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
      <div className='parallax-layer div3'>
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
});

About.displayName = 'About';

export default About