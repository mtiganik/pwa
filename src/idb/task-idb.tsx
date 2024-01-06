import { idb } from "./getIdb";
import { Task } from "../models";

const dbn = "task"
export const getAllTasksIdb =async(): Promise<Task[]> => {
  return (await idb.db1).getAll(dbn)
}

export const getTaskByIdIdb = async(taskId: string): Promise<Task | null> => {
  return (await idb.db1).get(dbn,taskId)
}

export const postTaskIdb = async(task:Task): Promise<number> => {
  try{
    (await idb.db1).add(dbn,task,task.id)
    return 201
  }catch(error){
    console.error("Error adding data")
    return 0
  }
}

export const editTaskIdb = async(task:Task) : Promise<number> => {
  (await idb.db1).put(dbn,task,task.id);
  return 201
}

export const deleteTaskIdb = async(taskId: string): Promise<number> => {
  (await idb.db1).delete(dbn,taskId)
  return 201
}