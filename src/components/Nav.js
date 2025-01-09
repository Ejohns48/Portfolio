import { NavLink } from 'react-router-dom';
import Header from './Header';
import React from 'react'
import LanguageDropDown from "./LanguageDropDown";
import { useTranslation} from 'react-i18next';

import '../css/App.css';

function Nav() {

  const { t } = useTranslation();

  return (
    <div id='header-container'>
      
      
      <Header 
        imgsrc="logo6.png"
        imgheight= "150vh"
        imgwidth= "150vh"
        alttext="Logo Image"        
      />
      
      
      <nav>
        <NavLink to="/home" ><li>{t('home')}</li></NavLink>
        <NavLink to="/about"><li>{t('about')}</li></NavLink>     
        <NavLink to="/portfolio"><li>{t('portfolio')}</li></NavLink> 
        <LanguageDropDown />
      </nav>
      
    </div>
  );

}

export default Nav;
