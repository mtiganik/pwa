import Category from "../models/category";
import axios from "axios";

export const getAllCategories = async(): Promise<Category[]> => {
  return []
}
export const getCategoryById = async(catId: string): Promise<Category> => {
  throw Error("Not implemented")
}

export const postCategory = async( cat: Category): Promise<number> => {
  return 0
}

export const editCategory = async(cat: Category): Promise<number> => {
  return 0
}

export const deleteCategory = async(catId: string): Promise<number> => {
  return 0
}