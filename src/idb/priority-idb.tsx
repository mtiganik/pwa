import { idb } from "./getIdb";
import { Priority } from "../models";

const dbn = "priority"

export const getAllPrioritiesIdb =async(): Promise<Priority[]> => {
  return (await idb.db1).getAll(dbn)
}

export const getPriorityByIdIdb = async(priId: string): Promise<Priority | null> => {
  return (await idb.db1).get(dbn,priId)
}

export const postPriorityIdb = async(pri:Priority): Promise<number> => {
  (await idb.db1).add(dbn,pri,pri.id)
  return 201
}

export const editPriorityIdb = async(pri:Priority) : Promise<number> => {
  (await idb.db1).put(dbn,pri,pri.id)
  return 201
}

export const deletePriorityIdb = async(priId: string): Promise<number> => {
  (await idb.db1).delete(dbn,priId)
  return 201
}