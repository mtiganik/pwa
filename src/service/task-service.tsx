import Task from "../models/task";
import axios from "axios";
import { getAuthorizationHeader } from "./utils";
import GetUrl from "../utils/get-url";

const url = GetUrl() + "TodoTasks"
const contentType = {'Content-Type': 'application/json'}
const AuthHeader = getAuthorizationHeader();
export const getAllTasks = async(): Promise<Task[]> => {
  try{
    var response = await axios.get(url, {headers:{...AuthHeader,...contentType}})
    return response.data
  }catch(error){
    console.error("Error getting tasks")
    return []
  }
}

export const getTaskById = async(taskId: string): Promise<Task | null> => {
  try{
    var response = await axios.get(`${url}/${taskId}`,{headers:{...AuthHeader,...contentType}})
    return response.data
  }catch(error){
    console.error("Error getting task")
    return null
  }
}

export const postTask = async(task: Task): Promise<number> => {
  try{
    var response = await axios.post(url,task,{headers:{...AuthHeader,...contentType}})
    return response.status
  }catch(error){
    console.error("Error posting task")
    return 0
  }
}

export const editTask = async(task: Task): Promise<number> => {
  try{
    var response = await axios.put(`${url}/${task.id}`,task, {headers:{...AuthHeader,...contentType}})
    return response.status
  }catch(error){
    console.error("Error editing task")
    return 0
  }
}

export const deleteTask = async(taskId: string): Promise<number> => {
  try{
    var response = await axios.delete(`${url}/${taskId}`,{headers:{...AuthHeader,...contentType}})
    return response.status
  }catch(error){
    console.error("Error deleting task")
    return 0
  }
}