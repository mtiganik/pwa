import UserData from "../models/user-data";
import { useNavigate } from "react-router-dom";

export const getAuthorizationHeader = () => {
  const navigate = useNavigate();
  const userData: UserData | null = JSON.parse(localStorage.getItem('userData') || 'null');
  if(!userData){
    localStorage.removeItem("userData")
    console.log("Error getting userData")
    navigate("/login")
  }else{
    return {Authorization: 'Bearer ' + userData.token}
  }
}

export const handle401Error = () => {
  //TODO: Implement method
  throw Error("Not implemented")
}