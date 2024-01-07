import React, {useState} from "react"
import { Link } from "react-router-dom"
import { Priority, Task } from "../../models"
import { Grid, Box, FormControl, Button, Select, SelectChangeEvent, MenuItem, InputLabel,TextField, Typography } from "@mui/material";
// import { getAllPrioritiesIdb } from "../../idb/priority-idb";
import { getAllPrioritiesService } from "../../service/priority-service";
import PriorityItem from "./priority-item";
import { getAllPrioritiesIdb } from "../../idb/priority-idb";
import { getAllTasksIdb } from "../../idb/task-idb";

const PriorityScreen: React.FC = () => {
  const [priorities, setPriorities] = useState<Priority[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [error, setError] = useState("")
  React.useEffect(() => {
    const fetchData = async() => {
      try{
        var pris = await getAllPrioritiesIdb()
        var todos = await getAllTasksIdb()
        setPriorities(pris)
        setTasks(todos)
      }catch(error){
        console.error("Error recieving data:", error)
        setError("Error loading data")
      }
    }
    fetchData()
  },[])
  const handleDelete = (priToDelete:Priority) => {
    const updatedPriorities = priorities.filter((pri) => pri.id !== priToDelete.id)
    setPriorities(updatedPriorities)
  }
  const handleEdit = (priToUpdate:Priority) => {
    const updatedPriorities = priorities.map((pri) => 
    pri.id === priToUpdate.id ? priToUpdate : pri)
    setPriorities(updatedPriorities)
  }

  const getCanDeletePriority = (priId: string): boolean => {
    return !tasks.some((task) => task.todoPriorityId === priId)
  }
  return(
    <div>
      <h1>Priority Screen</h1>
      <Link to="/">To home</Link>
      {priorities.length > 0 && (
        priorities.map((pri) => (
          <span key={pri.id}>
            <PriorityItem 
            priority={pri}
            canDelete = {getCanDeletePriority(pri.id)}
            onDelete={() =>handleDelete(pri)} 
            onEdit={(newPri) => handleEdit(newPri)}            
            />

          </span>

        )))
      }
    </div>
  )
}

export default PriorityScreen