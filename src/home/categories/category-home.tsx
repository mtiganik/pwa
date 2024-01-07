import React from "react"
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import { openDB } from "idb";
import { Category, Priority, Task } from "../../models";
import DebugTasks from "../../debug/debug-tasks";
import DebugCategories from "../../debug/debug-categories";
import DebugPriorities from "../../debug/debug-priorities";
import DebugDbInitialization from "../../debug/debug-db-initialization";
const cat1: Category = {
  id: crypto.randomUUID(),
  categoryName: "Work",
  categorySort: 1,
  syncDt: new Date().toISOString(),
  tag: 'work'
}

const pri1: Priority =   {
  id: crypto.randomUUID(),
  priorityName: "High",
  prioritySort: 49,
  syncDt: new Date().toISOString(),
  tag: 'high'
}
const task1: Task = 
{
  id: crypto.randomUUID(),
  taskName: "Visit Parents",
  createdDt: new Date().toISOString(),
  dueDt: new Date().toISOString(),
  isCompleted: false,
  isArchieved: false,
  todoCategoryId: crypto.randomUUID(),
  todoPriorityId: crypto.randomUUID(),
  syncDt: new Date().toISOString()
}



const CategoryScreen: React.FC = () => {





  return(
    <div>
      <h1>Category Screen</h1>
      <DebugDbInitialization/>
      <nav>
        <ul>
          <li>
            <Link to="/">To home</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default CategoryScreen