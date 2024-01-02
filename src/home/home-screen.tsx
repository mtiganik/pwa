import { Link } from 'react-router-dom';
import Task from '../models/task';
import DebugCategories from '../debug/debug-categories';
import DebugPriorities from '../debug/debug-priorities';
import DebugTasks from '../debug/debug-tasks';

import React, {useEffect,useState} from 'react';
import { getAllTasks } from '../service/task-service';

const HomeScreen: React.FC = () => {

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchTasks = async() => {
      try{
        const response = await getAllTasks()
        setTasks(response)
      }catch(error){
        console.log(error)
    }
    }
    fetchTasks()
  }, [])
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
      <ul>
        {tasks &&
          tasks.map((task) => (
            <li key={task.id}>{task.taskName}</li>
          ))}
      </ul>
    </div>
  )
}

export default HomeScreen;