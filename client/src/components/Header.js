import React from 'react'
import '../css/Header.css'

const Header = ({imgsrc, imgwidth, imgheight, alttext}) => {

    return (
        <header>            
            <img id={'header-img'} src={require('../assets/images/' + imgsrc)} width={imgwidth} height={imgheight} alt={alttext} />          
        </header>

        
    )
}



export default Header
