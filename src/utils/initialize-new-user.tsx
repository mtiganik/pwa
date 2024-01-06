import axios from "axios"

import { postCategoryService } from "../service/category-service"
import { postPriorityService } from "../service/priority-service"
import { postTaskService } from "../service/task-service"
import { openDB } from "idb";
import { Category, Priority, Task } from "../models";

const getDateInFuture = (day: number): Date => {
  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setDate(currentDate.getDate() + day);
  return futureDate;
};

const uuidWorkCategory = crypto.randomUUID()
const uuidScoolCategory = crypto.randomUUID()
const uuidHomeCategory = crypto.randomUUID()
const uuidOtherCategory = crypto.randomUUID()

const DefaultCategories:Category[] = [
  {
    id: uuidWorkCategory,
    categoryName: "Work",
    categorySort: 1,
    syncDt: new Date().toISOString(),
    tag: 'work'
  },
  {
    id: uuidScoolCategory,
    categoryName: "School",
    categorySort: 2,
    syncDt: new Date().toISOString(),
    tag: 'school'
  },
  {
    id: uuidHomeCategory,
    categoryName: "Home",
    categorySort: 3,
    syncDt: new Date().toISOString(),
    tag: 'home'
  },
  {
    id: uuidOtherCategory,
    categoryName: "Other",
    categorySort: 3,
    syncDt: new Date().toISOString(),
    tag: 'other'
  }
]

const uuidHighPriority= crypto.randomUUID()
const uuidMediumPriority = crypto.randomUUID()
const uuidLowPriority = crypto.randomUUID()

const DefaultPriorities:Priority[] = [
  {
    id: uuidHighPriority,
    priorityName: "High",
    prioritySort: 49,
    syncDt: new Date().toISOString(),
    tag: 'high'
  },  
  {
    id: uuidMediumPriority,
    priorityName: "Medium",
    prioritySort: 25,
    syncDt: new Date().toISOString(),
    tag: 'medium'
  },
  {
    id: uuidLowPriority,
    priorityName: "Low",
    prioritySort: 8,
    syncDt: new Date().toISOString(),
    tag: 'low'
  },
]

const DefaultTasks : Task[] = [
  {
    id: crypto.randomUUID(),
    taskName: "Visit Parents",
    createdDt: new Date().toISOString(),
    dueDt: getDateInFuture(10).toISOString(),
    isCompleted: false,
    isArchieved: false,
    todoCategoryId: uuidOtherCategory,
    todoPriorityId: uuidMediumPriority,
    syncDt: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    taskName: "Play guitar",
    createdDt: new Date().toISOString(),
    dueDt: getDateInFuture(3).toISOString(),
    isCompleted: false,
    isArchieved: false,
    todoCategoryId: uuidOtherCategory,
    todoPriorityId: uuidMediumPriority,
    syncDt: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    taskName: "Write important email",
    createdDt: new Date().toISOString(),
    dueDt: getDateInFuture(1).toISOString(),
    isCompleted: false,
    isArchieved: false,
    todoCategoryId: uuidWorkCategory,
    todoPriorityId: uuidLowPriority,
    syncDt: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    taskName: "Ask more salary",
    createdDt: new Date().toISOString(),
    dueDt: getDateInFuture(2).toISOString(),
    isCompleted: false,
    isArchieved: false,
    todoCategoryId: uuidWorkCategory,
    todoPriorityId: uuidHighPriority,
    syncDt: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    taskName: "Talk with Client",
    createdDt: new Date().toISOString(),
    dueDt: getDateInFuture(5).toISOString(),
    isCompleted: false,
    isArchieved: false,
    todoCategoryId: uuidWorkCategory,
    todoPriorityId: uuidMediumPriority,
    syncDt: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    taskName: "Clean Laundry",
    createdDt: new Date().toISOString(),
    dueDt: getDateInFuture(4).toISOString(),
    isCompleted: false,
    isArchieved: false,
    todoCategoryId: uuidHomeCategory,
    todoPriorityId: uuidMediumPriority,
    syncDt: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    taskName: "Make Lunch",
    createdDt: new Date().toISOString(),
    dueDt: getDateInFuture(2).toISOString(),
    isCompleted: false,
    isArchieved: false,
    todoCategoryId: uuidHomeCategory,
    todoPriorityId: uuidLowPriority,
    syncDt: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    taskName: "Fix refridgeator",
    createdDt: new Date().toISOString(),
    dueDt: getDateInFuture(2).toISOString(),
    isCompleted: false,
    isArchieved: false,
    todoCategoryId: uuidHomeCategory,
    todoPriorityId: uuidHighPriority,
    syncDt: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    taskName: "Do Math Excercise",
    createdDt: new Date().toISOString(),
    dueDt: getDateInFuture(7).toISOString(),
    isCompleted: false,
    isArchieved: false,
    todoCategoryId: uuidScoolCategory,
    todoPriorityId: uuidMediumPriority,
    syncDt: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    taskName: "Learn for exam",
    createdDt: new Date().toISOString(),
    dueDt: getDateInFuture(10).toISOString(),
    isCompleted: false,
    isArchieved: false,
    todoCategoryId: uuidScoolCategory,
    todoPriorityId: uuidHighPriority,
    syncDt: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    taskName: "Read book",
    createdDt: new Date().toISOString(),
    dueDt: getDateInFuture(8).toISOString(),
    isCompleted: false,
    isArchieved: false,
    todoCategoryId: uuidScoolCategory,
    todoPriorityId: uuidLowPriority,
    syncDt: new Date().toISOString(),
  },



]

const InitializeNewUserData = async() => {
  const db1 = await openDB('db', 1,{
    upgrade(db){
      db.createObjectStore('priority');
      db.createObjectStore('category')
      db.createObjectStore('task')
    }
  });

  try {
    await Promise.all(
      DefaultCategories.map(async (category) => {
        try {
          await db1.add("category", category, category.id)
          await postCategoryService(category)

        } catch (categoryError) {
          console.error("Error creating category:", categoryError)
        }}))
    console.log("Created initial categories")
    await Promise.all(
        DefaultPriorities.map(async (priority) => {
        try {
          await db1.add("priority", priority,priority.id)
          await postPriorityService(priority)

        } catch (priorityError) {
          console.error("Error creating priority: ", priorityError)
        }
      })
    )
    console.log("Created initial priorities")

  } catch (error) {
    console.log(error)
  }

  try{
    await Promise.all(
      DefaultTasks.map(async (task) => {
        try {
          await db1.add("task", task, task.id)
          await postTaskService(task)

        } catch (taskError) {
          
          if(axios.isAxiosError(taskError)){
            if(taskError.response && taskError.response.data && taskError.response.data.messages)
            console.error("Task creation failed with status code:", taskError.response.status);
          }
          console.error("Error creating tasks: ", taskError)
        }})
    )
  }catch(promiseError){
    console.error("Error initializing tasks: ", promiseError)
  }
  db1.close()
  console.log("Created Todo Tasks Initial Values")
}

export default InitializeNewUserData;