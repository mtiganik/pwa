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
import { Grid, Typography, Button, Link as MuiLink, ButtonGroup, ToggleButtonGroup, ToggleButton } from '@mui/material';
import AddTaskView from './add-task';
import { getDefaultCategory, getDefaultPriority } from '../utils/defaultEntities';

export const CategoryContext = createContext<Category[]>([]);
export const PriorityContext = createContext<Priority[]>([])

const HomeScreen: React.FC = () => {

  const [categories, setCategories] = useState<Category[]>([])
  const [priorities, setPriorities] = useState<Priority[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [addVisible, setAddVisible] = useState(false)
  const [allTasks, setAllTasks] = useState<Task[]>([])
  const [doneNotDone, setdoneNotDone] = React.useState('all');

  const [sortConfig, setSortConfig] = useState<{ index: number; ascending: boolean } | null>(null);

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
          setAllTasks(taskResponse)
        }
      }catch(error){
        console.log(error)
    }}
    fetchTasks()
  }, [setTasks])

const updateTask = (taskToUpdate: Task) => {
  console.log("On update")
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
const getCategoryById = (categoryId: string): Category => {
  var category = categories.find(category => category.id === categoryId)
  if(category){
    return category 
  }else {
    return getDefaultCategory()
  }
}
const getPriorityById = (priorityId: string): Priority => {
  var priority =  priorities.find(priority => priority.id === priorityId)
  if(priority){
    return priority
  }else{
    return getDefaultPriority()
  }
}

const handleAddBtnClick = () => {
  setAddVisible(!addVisible)
}

const handleSortToggle = (index: number) => {
  if (tasks !== null) {
    if (sortConfig?.index === index) {
      const ascending = !sortConfig.ascending;
      setSortConfig({ index, ascending });
      setTasks(sortTasks(tasks, index, ascending));
    } else {
      setSortConfig({ index, ascending: true });
      setTasks(sortTasks(tasks, index, true));
    }
  }
};

const handledoneNotDoneChange = (
  event: React.MouseEvent<HTMLElement>,
  newAlignment: string,
) => {
  setdoneNotDone(newAlignment);

  if(sortConfig){
    setAllTasks(sortTasks(allTasks, sortConfig.index, !sortConfig.ascending))
  }
  if(newAlignment == "all"){
    setTasks(allTasks)
  }else if(newAlignment == "notDone"){
    setTasks(() => allTasks.filter((el) => el.isCompleted==false))
  }else{
    setTasks(() => allTasks.filter((el) => el.isCompleted==true))
  }
};


const sortTasks = (tasks: Task[], index: number, ascending: boolean): Task[] => {
  const sortFunction = getSortFunction(index, ascending);
  return [...tasks].sort(sortFunction);
};

const getSortFunction = (index: number, ascending: boolean) => {
  switch (index) {
    case 1:
      return (a: Task, b: Task) => ascending
        ? a.todoCategoryId.localeCompare(b.todoCategoryId)
        : b.todoCategoryId.localeCompare(a.todoCategoryId);

    case 2:
      return (a: Task, b: Task) => ascending
        ? a.todoPriorityId.localeCompare(b.todoPriorityId)
        : b.todoPriorityId.localeCompare(a.todoPriorityId);

    case 3:
      return (a: Task, b: Task) => ascending
        ? new Date(a.dueDt).getTime() - new Date(b.dueDt).getTime()
        : new Date(b.dueDt).getTime() - new Date(a.dueDt).getTime();

    default:
      return (a: Task, b: Task) => 0; // Default case for invalid index
  }
};

const getArrowSymbol = (index: number) => {
  if (sortConfig?.index === index) {
    return sortConfig.ascending ? '↓' : '↑';
  }
  return ' ';
};



  return(
    <CategoryContext.Provider value={categories}>
      <PriorityContext.Provider value = {priorities}>

      <h1>Todo App</h1>
      <MuiLink href="/categories">CATEGORIES</MuiLink><span> | </span>
      <MuiLink href="/priorities">PRIORITIES</MuiLink><span> | </span> 
      <Button onClick = {handleAddBtnClick}>Add new </Button>
      {addVisible &&
      <Grid>
      <AddTaskView 
      onAdd={(newTask) => addTask(newTask)}
      />
      </Grid>
    }
    <Grid container>
      <Grid><Button  color='success'>Sort by</Button></Grid>

          <ToggleButtonGroup color="primary" value={doneNotDone} aria-label="doneNotDone" onChange={handledoneNotDoneChange} exclusive>
          <ToggleButton value="all">All Tasks</ToggleButton>
          <ToggleButton value="notDone">Not done</ToggleButton>
          <ToggleButton value="done">Done</ToggleButton>
          </ToggleButtonGroup>

          <ButtonGroup variant="text" aria-label="text button group">
            <Button onClick={() => handleSortToggle(1)}>Category <span>{getArrowSymbol(1)}</span></Button>
            <Button onClick={() => handleSortToggle(2)}>Priority <span>{getArrowSymbol(2)}</span></Button>
            <Button onClick={() => handleSortToggle(3)}>Due date <span>{getArrowSymbol(3)}</span></Button>
          </ButtonGroup>
    </Grid>
      <div>
        {tasks.length > 0 && categories.length > 0 && priorities.length > 0 &&(
          tasks.map((currTask) => (
            <span key={currTask.id}>
              <TaskListItem
              task = {currTask}
              taskCategory = {getCategoryById(currTask.todoCategoryId)}
              taskPriority={getPriorityById(currTask.todoPriorityId)}
              onDelete={() => deleteTask(currTask)}
              onUpdate ={(newTask) => updateTask(newTask)}
              />
              </span>
          ))
          )}
        </div>
      </PriorityContext.Provider>
    </CategoryContext.Provider>
  )
}

export default HomeScreen;