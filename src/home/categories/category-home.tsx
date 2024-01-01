import React from "react"
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import Category from "../../models/category";


const CategoryScreen: React.FC = () => {

  return(
    <div>
      <h1>Category Screen</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">To home</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default CategoryScreen