import { Link } from 'react-router-dom';
import Task from '../models/task';
import DebugCategories from '../debug/debug-categories';
import DebugPriorities from '../debug/debug-priorities';
import DebugTasks from '../debug/debug-tasks';

import React, {useEffect,useState,createContext, useContext} from 'react';
import { getAllTasks } from '../service/task-service';
import { getAllCategories } from '../service/category-service';
import { getAllPriorities } from '../service/priority-service';
import Priority from '../models/priority';
import Category from '../models/category';
import TaskListItem from './task-list-item';
import { Grid, Typography, Button, Link as MuiLink } from '@mui/material';
import AddTaskView from './add-task';

const CategoryContext = createContext<Category[]>([]);
const PriorityContext = createContext<Priority[]>([])

const HomeScreen: React.FC = () => {

  const [categories, setCategories] = useState<Category[]>([])
  const [priorities, setPriorities] = useState<Priority[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [addVisible, setAddVisible] = useState(false)

  useEffect(() => {
    console.log("In useEffect")
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
  }, [setTasks])

const updateTask = (taskToUpdate: Task) => {
  const updatedTask = tasks.map((task) => 
  task.id === taskToUpdate.id ? taskToUpdate : task)
  setTasks(updatedTask)
}

const deleteTask = (taskToDelete: Task) => {
  const updatedTask = tasks.filter((task) => task.id !== taskToDelete.id)
  setTasks(updatedTask)
}

const addTask = (taskToAdd:Task) => {
  setTasks([taskToAdd, ...tasks])
  setAddVisible(false)
  console.log("add new todo")
}
const getCategoryById = (categoryId: string): Category | undefined => {
  return categories.find(category => category.id === categoryId)
}
const getPriorityById = (priorityId: string): Priority | undefined => {
  return priorities.find(priority => priority.id === priorityId)
}

const handleAddBtnClick = () => {
  setAddVisible(!addVisible)
}
  return(
    <div>

      <h1>Todo App</h1>
      <MuiLink href="/categories">CATEGORIES</MuiLink><span> | </span>
      <MuiLink href="/priorities">PRIORITIES</MuiLink><span> | </span> 
      <Button onClick = {handleAddBtnClick}>Add new </Button>
      {addVisible &&
      <Grid>
      <AddTaskView 
      catList={categories} 
      priList={priorities}
      onAdd={(newTask) => addTask(newTask)}
      />
      </Grid>
    }
      <div>
        {tasks.length > 0 && categories.length > 0 && priorities.length > 0 &&(
          tasks.map((currTask) => (
            <span key={currTask.id}>
              <TaskListItem
              task = {currTask}
              taskCategory = {getCategoryById(currTask.todoCategoryId)}
              taskPriority={getPriorityById(currTask.todoPriorityId)}
              onDelete={() => deleteTask(currTask)}
              onUpdate ={() => updateTask(currTask)}
              />
              </span>
          ))
        )}
      </div>

    </div>
  )
}

export default HomeScreen;