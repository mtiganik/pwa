import React from "react";
import HomeScreen from "./home/home-screen"; 
import CategoryScreen from "./home/categories/category-home";
import PriorityScreen from "./home/priorities/priority-home";
import Login from "./login/login";
import Register from "./login/register";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserData from "./models/user-data";

const App: React.FC = () => {
  return(
    <Entry/> 
)
}

const Entry: React.FC = () => {

  return(
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route index element={<PrivateRoute component={HomeScreen} />} />
        <Route path="/categories" element={<PrivateRoute component={CategoryScreen} />} />
        <Route path="/priorities" element={<PrivateRoute component={PriorityScreen} />} />
      </Routes>
    </Router>
  )
}

interface PrivateRouteProps{
  component: React.ComponentType<any>
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  
  const userData: UserData | null = JSON.parse(localStorage.getItem('userData') || 'null');

  return userData !== null ? <Component {...rest}/> : <Navigate to="/login" />;
};


// interface PrivateRouteProps {
//   element: React.ReactNode;
//   path: string;
//   isLoggedIn: boolean;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: element, isLoggedIn, ...rest }) => (
//   <Route
//     {...rest}
//     element=
//     {isLoggedIn ? (
//       element
//     ) : (
//       <Navigate to="/login" replace={true} />
//     ) 
//     }
//   />
// );


export default App;