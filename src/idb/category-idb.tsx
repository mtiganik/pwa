import { Category } from "../models";
import { dbName,dbVer } from "./getIdb";
import { openDB } from "idb";
const tn = "category"

export const getAllCategoriesIdb = async(): Promise<Category[]> => {
  const db1 = await openDB(dbName,dbVer)
  var result =  db1.getAll(tn)
  db1.close()
  return result
}

export const getCategoryByIdIdb = async(catId: string): Promise<Category | null> => {
  const db1 = await openDB(dbName,dbVer)
  var result = db1.get(tn,catId)
  db1.close()
  return result
}

export const postCategoryIdb = async(cat: Category): Promise<number> => {
  const db1 = await openDB(dbName,dbVer)
  db1.add(tn,cat, cat.id)
  db1.close()
  return 201
}

export const editCategoryIdb = async(cat:Category): Promise<number> => {
  const db1 = await openDB(dbName,dbVer)
  db1.put(tn,cat,cat.id)
  db1.close()
  return 201
}

export const deleteCategoryIdb = async(catId:string): Promise<number> => {
  const db1 = await openDB(dbName,dbVer)
  db1.delete(tn,catId)
  db1.close()
  return 201
}