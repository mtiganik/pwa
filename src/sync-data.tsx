import { Button } from "@mui/material";
import React from "react";
// import { getAllCategoriesIdb, postCategoryIdb,editCategoryIdb,deleteCategoryIdb } from "./idb/category-idb";
// import { getAllPrioritiesIdb, postPriorityIdb,editPriorityIdb,deletePriorityIdb } from "./idb/priority-idb";
// import { getAllCategoriesService,postCategoryService,editCategoryService,deleteCategoryService } from "./service/category-service";
// import { getAllPrioritiesService, postPriorityService,editPriorityService,deletePriorityService } from "./service/priority-service";
// const catIdb = await getAllCategoriesIdb()
// const priIdb = await getAllPrioritiesIdb()
// const catServ = await getAllCategoriesService()
// const priServ = await getAllPrioritiesService()
import { getAllTasksIdb, postTaskIdb,editTaskIdb,deleteTaskIdb } from "./idb/task-idb";
import { getAllTasksService,postTaskService,editTaskService,deleteTaskService } from "./service/task-service";
import { Task } from "./models";

const SyncData:React.FC = () => {

  const handleSync = async() => {
    console.log("Syncing")
    const taskIdb = await getAllTasksIdb()
    const taskServ = await getAllTasksService()

    syncTasks(taskIdb, taskServ)
  }

  const syncTasks =(tasksIdb:Task[], tasksService:Task[]) => {
    tasksIdb.forEach((taskIdb) => {
      const mathcingTaskService = tasksService.find((taskService) => taskService.id === taskIdb.id)

      if(!mathcingTaskService){
        console.log(`Task ${taskIdb.taskName} is in IDB but not in the server`)
      }else if(!areTasksEqual(taskIdb, mathcingTaskService)){
        console.log(`Task ${taskIdb.taskName} is different in IDB and server`)
      }
    });

    tasksService.forEach((taskService) => {
      const mathingTaskIdb = tasksIdb.find((task) => task.id === taskService.id)
      if(!mathingTaskIdb){
        console.log(`Task ${taskService.taskName} is in the server but not in IDB`)
      }
    })

  }

  const areTasksEqual = (task1:Task,task2:Task):boolean=> {
    return (
      task1.taskName === task2.taskName &&
      task1.isCompleted === task2.isCompleted &&
      task1.dueDt === task2.dueDt &&
      task1.todoCategoryId === task2.todoCategoryId &&
      task1.todoPriorityId === task2.todoPriorityId
    )
  }
  return(
    <Button onClick={handleSync}>Sync</Button>
  )
}

export default SyncData