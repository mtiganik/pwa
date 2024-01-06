import { Category } from "../models";
import { idb } from "./getIdb";

export const getAllCategoriesIdb = async(): Promise<Category[]> => {
  return []
}

export const getCategoryByIdIdb = async(catId: string): Promise<Category | null> => {
  return null
}

export const postCategoryIdb = async(cat: Category): Promise<number> => {
  return 0
}

export const editCategoryIdb = async(cat:Category): Promise<number> => {
  return 0
}

export const deleteCategoryIdb = async(catId:string): Promise<number> => {
  return 0
}