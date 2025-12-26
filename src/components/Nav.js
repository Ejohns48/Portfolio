import { NavLink } from 'react-router-dom';
import Header from './Header';
import React, { memo } from 'react'
import LanguageDropDown from "./LanguageDropDown";
import { useTranslation} from 'react-i18next';

import '../css/App.css';

const Nav = memo(() => {
  const { t } = useTranslation();

  return (
    <div id='header-container'>
      <Header 
        imgsrc="logo6.png"
        imgheight="150"
        imgwidth="150"
        alttext="Logo Image"        
      />
      
      <nav>
        <NavLink to="/home"><li>{t('home')}</li></NavLink>
        <NavLink to="/about"><li>{t('about')}</li></NavLink>     
        <NavLink to="/portfolio"><li>{t('portfolio')}</li></NavLink> 
        <LanguageDropDown />
      </nav>
    </div>
  );
});

Nav.displayName = 'Nav';

export default Nav;
