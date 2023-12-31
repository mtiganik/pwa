import Priority from "../models/priority";
import axios from "axios";

export const getAllPriorities = async(): Promise<Priority[]> => {
  return []
}

export const getPriorityById = async(priorityId: string): Promise<Priority> => {
  throw Error("Not implemented")
}

export const postPriority = async(pri: Priority): Promise<number> => {
  return 0
}

export const editPriority = async(pri: Priority): Promise<number> => {
  return 0
}

export const deletePriority = async(priId: string): Promise<number> => {
  return 0
}



