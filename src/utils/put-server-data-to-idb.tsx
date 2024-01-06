import { getAllCategoriesService } from "../service/category-service"
import { getAllPrioritiesService } from "../service/priority-service"
import { getAllTasksService } from "../service/task-service"
import Category from "../models/category"
import Task from "../models/task"
import Priority from "../models/priority"
import { openDB } from "idb"


const PutServerDataToIDB = async() => {
  const categories: Category[] = await getAllCategoriesService()
  const priorities: Priority[] = await getAllPrioritiesService()
  const tasks: Task[] = await getAllTasksService()

  const db1 = await openDB('db', 1,{
    upgrade(db){
      db.createObjectStore('category')
      db.createObjectStore('priority');
      db.createObjectStore('task')
    }
  });
  categories.map(async(cat) => {
    await db1.add("category", cat, cat.id)
  })
  priorities.map(async(pri) => {
    await db1.add("priority", pri, pri.id)
  })
  tasks.map(async(task) => {
    await db1.add("task", task,task.id)
  })
  db1.close()
}

export default PutServerDataToIDB