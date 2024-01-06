import { idb } from "./getIdb";
import { Task } from "../models";

export const getAllTasksIdb =async(): Promise<Task[]> => {
  return []
}

export const getTaskByIdIdb = async(): Promise<Task | null> => {
  return null
}

export const postTaskIdb = async(task:Task): Promise<number> => {
  return 0
}

export const editTaskIdb = async(task:Task) : Promise<number> => {
  return 0
}

export const deleteTaskIdb = async(taskId: string): Promise<number> => {
  return 0
}