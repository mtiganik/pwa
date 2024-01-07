import { dbVer,dbName } from "./getIdb";
import { Task } from "../models";
import { openDB } from "idb";
const tn = "task"
export const getAllTasksIdb =async(): Promise<Task[]> => {
  const db1 = await openDB(dbName,dbVer)
  var result = db1.getAll(tn)
  db1.close()
  return result
}

export const getTaskByIdIdb = async(taskId: string): Promise<Task | null> => {
  const db1 = await openDB(dbName,dbVer)

  const result = db1.get(tn,taskId)
  db1.close()
  return result

}

export const postTaskIdb = async(task:Task): Promise<number> => {
  try{
    const db1 = await openDB(dbName,dbVer)
    db1.add(tn,task,task.id)
    db1.close()
    return 201
  }catch(error){
    console.error("Error adding data")
    return 0
  }
}

export const editTaskIdb = async(task:Task) : Promise<number> => {
  const db1 = await openDB(dbName,dbVer)
  db1.put(tn,task,task.id);
  db1.close()

  return 201
}

export const deleteTaskIdb = async(taskId: string): Promise<number> => {
  const db1 = await openDB(dbName,dbVer)
  db1.delete(tn,taskId)
  db1.close()
  return 201
}