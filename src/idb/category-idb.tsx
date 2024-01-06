import { Category } from "../models";
import { idb } from "./getIdb";

const dbn = "category"

export const getAllCategoriesIdb = async(): Promise<Category[]> => {
  return (await idb.db1).getAll(dbn)
}

export const getCategoryByIdIdb = async(catId: string): Promise<Category | null> => {
  return (await idb.db1).get(dbn,catId)
}

export const postCategoryIdb = async(cat: Category): Promise<number> => {
  (await idb.db1).add(dbn,cat, cat.id)
  return 201
}

export const editCategoryIdb = async(cat:Category): Promise<number> => {
  (await idb.db1).put(dbn,cat,cat.id)
  return 201
}

export const deleteCategoryIdb = async(catId:string): Promise<number> => {
  (await idb.db1).delete(dbn,catId)
  return 201
}