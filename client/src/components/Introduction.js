import React, { memo } from 'react'
import { useTranslation} from 'react-i18next';

const Introduction = memo(() => {
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
});

Introduction.displayName = 'Introduction';

export default Introduction