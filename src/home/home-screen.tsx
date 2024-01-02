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
      {/* <DebugCategories />
      <DebugPriorities /> 
      <DebugTasks /> */}
      <div>
        {categories &&
          categories.map((category) => (
            <div key={category.id}>
              {category.categoryName}</div>
          ))}
      </div>
      <div>
        {priorities &&
          priorities.map((priority) => (
            <div key={priority.id}>
              {priority.priorityName}</div>
          ))}
      </div>
      <div>
        {tasks &&
          tasks.map((task) => (
            <div key={task.id}>
              {task.taskName}</div>
          ))}
      </div>

    </div>
  )
}

export default HomeScreen;