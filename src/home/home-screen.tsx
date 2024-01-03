import { Link } from 'react-router-dom';
import Task from '../models/task';
import DebugCategories from '../debug/debug-categories';
import DebugPriorities from '../debug/debug-priorities';
import DebugTasks from '../debug/debug-tasks';

import React, {useEffect,useState} from 'react';
import { getAllTasks } from '../service/task-service';
import { getAllCategories } from '../service/category-service';
import { getAllPriorities } from '../service/priority-service';
import Priority from '../models/priority';
import Category from '../models/category';
import TaskListItem from './task-list-item';

const HomeScreen: React.FC = () => {

  const [categories, setCategories] = useState<Category[]>([])
  const [priorities, setPriorities] = useState<Priority[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  useEffect(() => {
    const fetchTasks = async() => {
      try{
        const [categoriesResponse, prioritiesResponse, taskResponse] =
        await Promise.all([
          getAllCategories(),
          getAllPriorities(),
          getAllTasks(),
        ])
        if(categoriesResponse && prioritiesResponse && taskResponse){
          setCategories(categoriesResponse)
          setPriorities(prioritiesResponse)
          setTasks(taskResponse)
        }
      }catch(error){
        console.log(error)
    }}
    fetchTasks()
  }, [])

const updateTask = (taskToUpdate: Task) => {
  console.log("On task update")
}

const deleteTask = (taskToDelete: Task) => {
  console.log("On task delete")

}

const getCategoryById = (categoryId: string): Category | undefined => {
  return categories.find(category => category.id === categoryId)
}
const getPriorityById = (priorityId: string): Priority | undefined => {
  return priorities.find(priority => priority.id === priorityId)
}


  return(
    <div>
      <h1>Todo App</h1>
      <nav>
        <ul>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/priorities">Priorities</Link>
          </li>
        </ul>
      </nav>
      <div>
        {tasks.length > 0 && categories.length > 0 && priorities.length > 0 &&(
          tasks.map((currTask) => (
            <div key={currTask.id}>
              <TaskListItem
              task = {currTask}
              taskCategory = {getCategoryById(currTask.todoCategoryId)}
              taskPriority={getPriorityById(currTask.todoPriorityId)}
              onDelete={() => deleteTask(currTask)}
              onUpdate ={() => updateTask(currTask)}
              />
              </div>
          ))
        )}
      </div>

    </div>
  )
}

export default HomeScreen;