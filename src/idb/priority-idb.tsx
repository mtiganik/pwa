import { dbName,dbVer } from "./getIdb";
import { Priority } from "../models";
import { openDB } from "idb";
const dbn = "priority"

export const getAllPrioritiesIdb =async(): Promise<Priority[]> => {
  const db1 = await openDB(dbName,dbVer)
  const result = db1.getAll(dbn)
  db1.close()
  return result
}

export const getPriorityByIdIdb = async(priId: string): Promise<Priority | null> => {
  const db1 = await openDB(dbName,dbVer)
  const result = db1.get(dbn,priId)
  db1.close()
  return result
}

export const postPriorityIdb = async(pri:Priority): Promise<number> => {
  const db1 = await openDB(dbName,dbVer)
  const result = db1.add(dbn,pri,pri.id)
  db1.close()
  return 201
}

export const editPriorityIdb = async(pri:Priority) : Promise<number> => {
  const db1 = await openDB(dbName,dbVer)
  const result = db1.put(dbn,pri,pri.id)
  db1.close()
  return 201
}

export const deletePriorityIdb = async(priId: string): Promise<number> => {
  const db1 = await openDB(dbName,dbVer)
  db1.delete(dbn,priId)
  db1.close()
  return 201
}