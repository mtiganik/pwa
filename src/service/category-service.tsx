import Category from "../models/category";
import axios from "axios";
import {getAuthorizationHeader } from "./utils";
import GetUrl from "../utils/get-url";

const url = GetUrl() + "TodoCategories"
const contentType = {'Content-Type': 'application/json'}

export const getAllCategories = async(): Promise<Category[]> => {
  try{
    const AuthHeader = getAuthorizationHeader();
    var response = await axios.get(url, {headers:{...AuthHeader,...contentType}})
    return response.data
  }catch(error){
    console.error("Error getting categories:", error)
    return []
  }
  return []
}
export const getCategoryById = async(catId: string): Promise<Category | null> => {
  try{
    const AuthHeader = getAuthorizationHeader();
    var response = await axios.get(`${url}/${catId}`,
    {headers:{...AuthHeader,...contentType}})
    return response.data
  }catch(error){
    console.error("Error getting category: ", error)
    return null
  }
}

export const postCategory = async( cat: Category): Promise<number> => {
  try{
    const AuthHeader = getAuthorizationHeader();
    var response = await axios.post(url,cat, {headers:{...AuthHeader,...contentType}})
    return response.status
  }catch(error){
    console.log("Error posting category:",error)
  }
  return 0
}

export const editCategory = async(cat: Category): Promise<number> => {
  try{
    const AuthHeader = getAuthorizationHeader();
    const id = cat.id
    var response = await axios.put(`${url}/${id}`,cat,{headers:{...AuthHeader,...contentType}})
    console.log(response.data)
    return response.status
  }catch(error){
    console.error("Error updating category", error)
    return 0
  }
}

export const deleteCategory = async(catId: string): Promise<number> => {
  try{
    const AuthHeader = getAuthorizationHeader();
    var response = await axios.delete(`${url}/${catId}`,{headers:{...AuthHeader,...contentType}})
    return response.status
  }catch(error){
    console.error("Error deleting category", error)
    return 0
  }
}