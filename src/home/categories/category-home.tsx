import React from "react"
import { Link } from "react-router-dom"

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