import React from 'react';
import { Link } from 'react-router-dom';



const HomeScreen = () => {

  return(
    <div>
      <h1>Todo App</h1>
      <nav>
        <ul>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/priorities">Priorities</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default HomeScreen;