import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { getAllTasks, getTaskById, postTask, editTask,deleteTask } from '../service/task-service';
import Task from '../models/task';
import DebugCategories from '../debug/debug-categories';
import DebugPriorities from '../debug/debug-priorities';
import DebugTasks from '../debug/debug-tasks';

const HomeScreen: React.FC = () => {


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
      <DebugCategories />
      <DebugPriorities /> 
      <DebugTasks />
    </div>
  )
}

export default HomeScreen;