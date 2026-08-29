import React, { memo } from "react";

import InfoCard from "./InfoCard";
import Socials from "./Socials";
import ArticlesBox from "./ArticlesBox";
import Introduction from "./Introduction";

const Home = memo(() => {
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
});

Home.displayName = 'Home';

export default Home;
