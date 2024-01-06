import Priority from "../models/priority";
import axios from "axios";
import { getAuthorizationHeader } from "./utils";
import GetUrl from "../utils/get-url";

const url = GetUrl() + "TodoPriorities"
const contentType = {'Content-Type': 'application/json'}

export const getAllPrioritiesService = async(): Promise<Priority[]> => {
  try{
    const AuthHeader = getAuthorizationHeader();
    var response = await axios.get(url,{headers:{...AuthHeader,...contentType}})
    return response.data
  }catch(error){
    console.error("Error getting priorities", error)
    return []
  }
}

export const getPriorityByIdService = async(priorityId: string): Promise<Priority | null> => {
  try{
    const AuthHeader = getAuthorizationHeader();
    var response = await axios.get(`${url}/${priorityId}`,{headers:{...AuthHeader,...contentType}})
    return response.data
  }catch(error){
    console.error("Error getting priority", error)
    return null
  }
}

export const postPriorityService = async(pri: Priority): Promise<number> => {
  try{
    const AuthHeader = getAuthorizationHeader();
    var response = await axios.post(url,pri,{headers:{...AuthHeader,...contentType}})
    return response.status
  }catch(error){
    console.error("Error posting priority", error)
    return 0
  }
}

export const editPriorityService = async(pri: Priority): Promise<number> => {
  try{
    const AuthHeader = getAuthorizationHeader();
    const priId = pri.id
    var response = await axios.put(`${url}/${priId}`,pri,{headers:{...AuthHeader,...contentType}})
    return response.status
  }catch(error){
    console.error("Error updating priority", error)
    return 0
  }
}

export const deletePriorityService = async(priId: string): Promise<number> => {
  try{
    const AuthHeader = getAuthorizationHeader();
    var response = await axios.delete(`${url}/${priId}`,{headers:{...AuthHeader,...contentType}})
    return response.status
  }catch(error){
    console.error("Error deleting priority", error)
    return 0
  }
}



