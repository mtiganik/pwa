import Task from "../models/task";
import axios from "axios";

export const getAllTasks = async(): Promise<Task[]> => {
  return []
}

export const getTaskById = async(taskId: string): Promise<Task> => {
  throw Error("Not implemented")
}

export const postTask = async(task: Task): Promise<number> => {
  return 0
}

export const editTask = async(task: Task): Promise<number> => {
  return 0
}

export const deleteTask = async(taskId: string): Promise<number> => {
  return 0
}