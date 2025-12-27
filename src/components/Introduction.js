import React, { memo } from 'react'
import { useTranslation } from 'react-i18next';
import { useCMS } from '../context/CMSContext';

const Introduction = memo(() => {
    const { t } = useTranslation();
    const { content } = useCMS();

    // Use CMS content if available, otherwise fall back to i18n
    const introLines = content?.home?.introLines;

    return (
        <section id="main-top">
            <p id='intro'>
                {introLines ? (
                    introLines.map((line, index) => (
                        <span key={index}>{line} </span>
                    ))
                ) : (
                    <>
                        {t('introLineOne')}
                        {t('introLineTwo')}
                        {t('introLineThree')}
                    </>
                )}
            </p>
        </section>
  )
});

Introduction.displayName = 'Introduction';

export default Introduction