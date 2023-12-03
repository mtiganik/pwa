import React from "react"
import { Link } from "react-router-dom"

const Login:React.FC = () =>{
return(
  <div>
    <h1>Login Screen</h1>
    <nav>
      <Link to="/register">Register account</Link>
    </nav>
  </div>
)
}

export default Login;