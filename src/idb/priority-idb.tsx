import { idb } from "./getIdb";
import { Priority } from "../models";

export const getAllPrioritiesIdb =async(): Promise<Priority[]> => {
  return []
}

export const getPriorityByIdIdb = async(): Promise<Priority | null> => {
  return null
}

export const postPriorityIdb = async(pri:Priority): Promise<number> => {
  return 0
}

export const editPriorityIdb = async(pri:Priority) : Promise<number> => {
  return 0
}

export const deletePriorityIdb = async(priId: string): Promise<number> => {
  return 0
}