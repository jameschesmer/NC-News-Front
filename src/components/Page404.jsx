import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Page404.css'

const Page404 = () => {
  return (
    <div>
      <h1>404</h1>
      <h1>Here's be dragons! (Do battle with the dragon to go back)</h1>
      <Link to='/'>
        <img className='dragon' src="https://vignette.wikia.nocookie.net/teenwolf-next-generation/images/f/ff/Fire-dragon-wallpaper.jpg/revision/latest/scale-to-width-down/752?cb=20160125012201" alt="Dragon" /></Link>
    </div>
  );
};

export default Page404;