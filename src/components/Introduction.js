import React from 'react'
import { useTranslation} from 'react-i18next';

const Introduction = () => {

    const { t } = useTranslation();

    return (
        <section id="main-top">
            <p id='intro'>
                {t('introLineOne')}
                {t('introLineTwo')}
                {t('introLineThree')}
            </p>
        </section>
  )
}

export default Introduction