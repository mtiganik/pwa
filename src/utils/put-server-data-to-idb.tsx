import { Category, Priority, Task } from "../models"
import { getAllCategoriesService } from "../service/category-service"
import { getAllPrioritiesService } from "../service/priority-service"
import { getAllTasksService } from "../service/task-service"
import { openDB } from "idb"
import { dbName,dbVer } from "../idb/getIdb"
import { postCategoryIdb } from "../idb/category-idb"
import { postPriorityIdb } from "../idb/priority-idb"
import { postTaskIdb } from "../idb/task-idb"

const PutServerDataToIDB = async() => {
  await openDB(dbName, dbVer,{
    upgrade(db){
      db.createObjectStore('category')
      db.createObjectStore('priority');
      db.createObjectStore('task')
    }
  });

  const categories: Category[] = await getAllCategoriesService()
  const priorities: Priority[] = await getAllPrioritiesService()
  const tasks: Task[] = await getAllTasksService()
  
  categories.map(async(cat) => {
      await postCategoryIdb(cat);
      // await db1.add("category", cat, cat.id)
    })
    priorities.map(async(pri) => {
      await postPriorityIdb(pri)
        // await db1.add("priority", pri, pri.id)
      })
      tasks.map(async(task) => {
        await postTaskIdb(task)
        })
}

export default PutServerDataToIDB