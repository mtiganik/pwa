import React from "react";
import { Category, Priority, Task } from '../models';
// import { deleteTaskService, editTaskService } from "../service/task-service";
import { deleteTaskIdb, editTaskIdb } from "../idb/task-idb";
import { Grid, Button, Typography } from "@mui/material";
import ShowIcon from "../utils/show-icon";
import { formatDateToUI } from "../utils/format-date";
import EditTask from "./edit-task";
interface TaskListItemProps {
  task: Task;
  taskCategory: Category ;
  taskPriority: Priority ;
  onDelete: () => void;
  onUpdate: (task:Task) => void;
}

const TaskListItem:React.FC<TaskListItemProps> = 
({ task, taskCategory, taskPriority, onDelete, onUpdate }) => {
  const [editViewVisible, setEditViewVisible] = React.useState(false)
  const handleMarkAsDone = async() => {
    task.isCompleted = !task.isCompleted
    task.syncDt = new Date().toISOString()
    var result = await editTaskIdb(task)
    if(200 <= result && result < 300){
      onUpdate(task)
    }
  }
  const handleTaskDelete = async() => {
    var result = await deleteTaskIdb(task.id)
    if(200 <= result && result < 300){
      onDelete()
    }
  }
  const showEditViewClick = () => {
    setEditViewVisible(!editViewVisible)
  }

  const handleEdit = (newTask:Task) => {
    setEditViewVisible(false)
    onUpdate(newTask)
  }

    return(
      <Grid container margin={2}>
      <Grid border={1} container >
        <Grid item xs={3} style = {{justifyContent:'center'}}>
          <ShowIcon categoryName={taskCategory?.categoryName} isDone={task.isCompleted}/>
          <Typography style={{
            
            color:task.isCompleted ? "lightGreen": "#ff5722"}}
            >{task.isCompleted ? "Completed":"Needs work"}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">{task.taskName}</Typography>
          <Typography fontWeight={"bold"} color={taskPriority.prioritySort > 40 ? "orange" : (taskPriority.prioritySort > 10 ?"GrayText" :  "green")}>{taskPriority ? taskPriority.priorityName : 'Unknown '} Priority</Typography>

          <Typography>Created: {formatDateToUI(task.createdDt)} </Typography>
          <Typography>Due: {formatDateToUI(task.dueDt)} </Typography>

        </Grid>
        <Grid item xs={3} alignContent={"flex-start"}>
        <Grid item xs={12}><Button onClick={handleMarkAsDone}>{task.isCompleted? "Mark as not done": "Mark as done"}</Button></Grid>
        <Grid item xs={12}><Button onClick={handleTaskDelete}>Delete</Button></Grid>
        <Grid item xs={12}><Button onClick={showEditViewClick}>Edit</Button></Grid>
        </Grid>
      </Grid>
      {editViewVisible &&(
        <EditTask 
        task={task} 
        currCat= {taskCategory}
        currPri= {taskPriority} 
        onEdit={(newTask) => handleEdit(newTask)}  
        />
      )}
      </Grid>
    )
  }

  export default TaskListItem