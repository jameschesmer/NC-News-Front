import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div>
      <h1>404</h1>
      <p>Here's be dragons! (Do battle with the dragon go back)</p>
      <Link to='/'>
        <img src="https://pre00.deviantart.net/13a2/th/pre/f/2012/192/3/d/fire_breathing_dragon_by_sandara-d56vmyu.jpg" alt="Dragon" /></Link>
    </div>
  );
};

export default Page404;