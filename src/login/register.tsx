import React from "react"
import { Link } from "react-router-dom"

const Register: React.FC = () => {

  return(
    <div>
      <h1>Register page</h1>
      <nav>
        <Link to="/login">Login instead</Link>
      </nav>
    </div>
  )
}

export default Register;