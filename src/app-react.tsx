import React from "react";
import HomeScreen from "./home/home-screen"; 
import CategoryScreen from "./home/categories/category-home";
import PriorityScreen from "./home/priorities/priority-home";
import Login from "./login/login";
import Register from "./login/register";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App: React.FC = () => {
  return(
    <Entry/> 
)
}

const Entry: React.FC = () => {

  const isLoggedIn = true;
  return(
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        <Route index element={<HomeScreen/>} />
        <Route path="/categories" element={<CategoryScreen/>} />
        <Route path="/priorities" element={<PriorityScreen/>} /> 

        
        <Route index element={<Navigate to={isLoggedIn ? '/home' : '/login'} />} />
      </Routes>
    </Router>
  )
}
{/* <PrivateRoute path="/home" element={<HomeScreen/>} isLoggedIn={isLoggedIn} />
<PrivateRoute path="/categories" element={<CategoryScreen/>} isLoggedIn={isLoggedIn} />
<PrivateRoute path="/priorities" element={<PriorityScreen/>} isLoggedIn={isLoggedIn} /> */}

interface PrivateRouteProps {
  element: React.ReactNode;
  path: string;
  isLoggedIn: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: element, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    element=
    {isLoggedIn ? (
      element
    ) : (
      <Navigate to="/login" replace={true} />
    ) 
    }
  />
);


export default App;