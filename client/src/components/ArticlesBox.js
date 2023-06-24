import React from 'react'
import { useTranslation} from 'react-i18next';

const ArticlesBox = () => {

    const { t } = useTranslation();

  return (
    <section id="main-right">
          <div id='cardboxheadercontainer'>
            <h1 id='card-box-header'>{t('article_title')}</h1>
          </div>          
          <div className='card-box-container'>
            <a className="card-box-link" href='https://dev.to/jeroendedauw/advice-for-junior-developers-30am' target='_blank' rel="noreferrer">
              <div className="card-box card-box-1">
                <h1 className="card-box-title card-box-1-title">{t('articleOne')}</h1>
              </div>
            </a>
          </div>

          <div className='card-box-container'>
            <a href='https://www.freecodecamp.org/news/react-helmet-examples/' target='_blank' rel="noreferrer">
              <div className="card-box card-box-2">
                <h1 className="card-box-title card-box-2-title">{t('articleTwo')}</h1>
              </div>
            </a>
          </div>
          <div className='card-box-container'>
            <a href='https://www.codementor.io/learn-programming/steve-klabniks-9-words-advice-programming-beginners' target='_blank' rel="noreferrer">
              <div className="card-box card-box-3">
                <h1 className="card-box-title card-box-3-title">{t('articleThree')}</h1>
              </div>
            </a>
          </div>
    </section>
  )
}

export default ArticlesBox