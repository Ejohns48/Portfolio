import React, { memo, useMemo } from 'react'
import '../css/Header.css'

// Import logo directly for better tree-shaking and caching
import logo6 from '../assets/images/logo6.png';

// Map of available images for dynamic loading
const imageMap = {
  'logo6.png': logo6,
};

const Header = memo(({ imgsrc, imgwidth, imgheight, alttext }) => {
    // Use pre-imported image if available, fallback to dynamic require
    const imageSrc = useMemo(() => {
      return imageMap[imgsrc] || require('../assets/images/' + imgsrc);
    }, [imgsrc]);

    return (
        <header>            
            <img 
              id={'header-img'} 
              src={imageSrc} 
              width={imgwidth} 
              height={imgheight} 
              alt={alttext}
              loading="eager"
              decoding="async"
            />          
        </header>
    )
});

Header.displayName = 'Header';

export default Header
