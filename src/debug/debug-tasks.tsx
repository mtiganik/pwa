import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { getAllTasks, getTaskById, postTask, editTask,deleteTask } from '../service/task-service';
import { catId } from './debug-categories';
import { priId } from './debug-priorities';
import Task from '../models/task';

const task1: Task = {
  id: "a62cdd9c-d7eb-44d9-a4dc-2487a935641b",
  taskName: "Write important email",
  createdDt: new Date().toISOString(),
  dueDt: new Date().toISOString(),
  isCompleted: false,
  isArchieved: false,
  todoCategoryId: catId,
  todoPriorityId: priId,
  syncDt: new Date().toISOString()
}

const DebugTasks: React.FC = () => {

  const handleGetAll= async() => {
    var response = await getAllTasks()
    console.log(response)
  }

  const handleGetById = async() => {
    var response = await getTaskById(task1.id)
    console.log(response)
  }

  const handlePost = async() => {
    var response = await postTask(task1)
    console.log(response)
  }
  const handleEdit = async() => {
    task1.isCompleted = true
    task1.taskName = task1.taskName + " DONE"
    var response = await editTask(task1)
    console.log(response)
  }
  const handleDelete = async() => {
    var response = await deleteTask(task1.id)
    console.log(response)
  }

  return(
    <div>
      <h1>Tasks Debug</h1>
        <Button onClick={handleGetAll} >get all</Button>
        <Button onClick={handleGetById}>getById</Button>
        <Button onClick={handlePost}>post Task</Button>
        <Button onClick={handleEdit}>edit Task</Button>
        <Button onClick={handleDelete}>Delete</Button>
    </div>
  )
}

export default DebugTasks;