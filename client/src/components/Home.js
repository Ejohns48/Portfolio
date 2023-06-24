import React from "react";

import InfoCard from "./InfoCard";
import Socials from "./Socials";
import ArticlesBox from "./ArticlesBox";
import Introduction from "./Introduction";

const Home = () => {

  return (
    <main>
      <section id="grid-container">
        <Introduction />
        <Socials />
        <InfoCard />
        <ArticlesBox />
      </section>
    </main>
  );
};

export default Home;
