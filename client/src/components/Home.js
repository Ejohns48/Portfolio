import React from "react";
import "../css/Homepage.css";
import ej4 from '../media/images/ej.jpg';
import ej3 from '../media/images/ej.jp2';
import ej2 from '../media/images/ej.jxr';
import ej1 from '../media/images/ej.webp';
import ImgNextGen from "./ImgNextGen";

const Home = () => {
  return (
    <main>
      <h1>Welcome to my site</h1>
      <section id="grid-container">
        <section id="main-top">
          <p>Main Top</p>
        </section>

        <section id="main-left">
          <p>Main Left</p>
        </section>
        <section id="main-bottom">
          <p>Main Bottom</p>
        </section>
        
        <section id="main-right">
          <div id='img'>
            {/* <img src={ej} alt="Girl in a jacket" width="50" height="60" ></img> */}
            <ImgNextGen
            id='me'
            srcWebp={ej1}
            srcJxr={ej2} 
            srcJp2={ej3} 
            fallback={ej4}
            alt="Photo of Eric Johnson."
            width="175px"
            height="180px"
            />
          </div>
        </section>
      </section>
    </main>
  );
};

export default Home;
