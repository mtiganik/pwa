import Category from "../models/category";
import axios from "axios";
import { getAuthorizationHeader,handle401Error } from "./utils";
import GetUrl from "../utils/get-url";

const AuthHeader = getAuthorizationHeader()
const url = GetUrl() + "TodoCategories"
const contentType = {'Content-Type': 'application/json'}
export const getAllCategories = async(): Promise<Category[]> => {
  try{
    var response = await axios.get(url, {headers:{...AuthHeader, ...contentType}})
    if(response.status === 401) {handle401Error()}
    return response.data
  }catch(error){
    console.error("Error getting categories:", error)
    return []
  }
  return []
}
export const getCategoryById = async(catId: string): Promise<Category> => {
  throw Error("Not implemented")
}

export const postCategory = async( cat: Category): Promise<number> => {
  try{
    const AuthHeader = getAuthorizationHeader()
    var response = await axios.post(url,
      )
  }catch(error){

  }
  return 0
}

export const editCategory = async(cat: Category): Promise<number> => {
  return 0
}

export const deleteCategory = async(catId: string): Promise<number> => {
  return 0
}