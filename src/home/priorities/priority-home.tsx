import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"
import Priority from "../../models/priority"


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