import React from "react"
import { Link } from "react-router-dom"

const PriorityScreen: React.FC = () => {
  return(
    <div>
      <h1>Priority Screen</h1>
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

export default PriorityScreen