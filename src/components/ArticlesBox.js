import React, { memo } from 'react'
import { useTranslation } from 'react-i18next';
import { useCMS } from '../context/CMSContext';

const ArticlesBox = memo(() => {
    const { t } = useTranslation();
    const { content } = useCMS();

    // Use CMS articles if available
    const articles = content?.articles;

    // Fallback articles for when CMS is not loaded
    const fallbackArticles = [
      { id: 1, title: t('articleOne'), url: 'https://dev.to/jeroendedauw/advice-for-junior-developers-30am', className: 'card-box-1' },
      { id: 2, title: t('articleTwo'), url: 'https://www.freecodecamp.org/news/react-helmet-examples/', className: 'card-box-2' },
      { id: 3, title: t('articleThree'), url: 'https://www.codementor.io/learn-programming/steve-klabniks-9-words-advice-programming-beginners', className: 'card-box-3' }
    ];

    const displayArticles = articles || fallbackArticles;

  return (
    <section id="main-right">
          <div id='cardboxheadercontainer'>
            <h1 id='card-box-header'>{t('article_title')}</h1>
          </div>
          
          {displayArticles.map((article, index) => (
            <div key={article.id} className='card-box-container'>
              <a 
                className="card-box-link" 
                href={article.url} 
                target='_blank' 
                rel="noreferrer"
              >
                <div 
                  className={`card-box ${article.className || `card-box-${index + 1}`}`}
                  style={article.backgroundImage ? { backgroundImage: `url(${article.backgroundImage})`, backgroundSize: 'cover' } : {}}
                >
                  <h1 className={`card-box-title ${article.className || `card-box-${index + 1}`}-title`}>
                    {article.title}
                  </h1>
                </div>
              </a>
            </div>
          ))}
    </section>
  )
});

ArticlesBox.displayName = 'ArticlesBox';

export default ArticlesBox