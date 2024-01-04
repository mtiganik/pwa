import React from "react";
import Task from "../models/task";
import Category from "../models/category";
import Priority from "../models/priority";
import { deleteTask, editTask } from "../service/task-service";
import { Grid, Button, Typography } from "@mui/material";
import ShowIcon from "../utils/show-icon";
import { formatDateToUI } from "../utils/format-date";
import EditTask from "./edit-task";
interface TaskListItemProps {
  task: Task;
  taskCategory: Category | undefined;
  taskPriority: Priority | undefined;
  onDelete: () => void;
  onUpdate: () => void;
}

const TaskListItem:React.FC<TaskListItemProps> = 
({ task, taskCategory, taskPriority, onDelete, onUpdate }) => {
  const [editViewVisible, setEditViewVisible] = React.useState(false)
  const handleMarkAsDone = async() => {
    task.isCompleted = !task.isCompleted
    var result = await editTask(task)
    if(200 <= result && result < 300){
      onUpdate()
    }
  }
  const handleTaskDelete = async() => {
    var result = await deleteTask(task.id)
    if(200 <= result && result < 300){
      onDelete()
    }
  }
  const showEditViewClick = () => {
    setEditViewVisible(!editViewVisible)
  }

    return(
      <Grid container>
      <Grid border={1} container margin={2}>
        <Grid item xs={3} style = {{justifyContent:'center'}}>
          <ShowIcon categoryName={taskCategory?.categoryName} isDone={task.isCompleted}/>
          <Typography style={{
            
            color:task.isCompleted ? "lightGreen": "#ff5722"}}
            >{task.isCompleted ? "Completed":"Needs work"}</Typography>
       {/* < AgricultureIcon  style={{color: "red", fontSize: 100}} /> */}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">{task.taskName}</Typography>
          <Typography>{taskPriority ? taskPriority.priorityName : 'Unknown '} Priority</Typography>

          <Typography>Created: {formatDateToUI(task.createdDt)} </Typography>
          <Typography>Due: {formatDateToUI(task.dueDt)} </Typography>

        </Grid>
        <Grid item xs={3} alignContent={"flex-start"}>
          <Button onClick={handleMarkAsDone}>Mark as done</Button>
          <Button onClick={handleTaskDelete}>Delete</Button>
          <Button onClick={showEditViewClick}>Edit</Button>
        </Grid>
      </Grid>
      {editViewVisible &&(
        <EditTask 
        task={task} 
        catList={[]} 
        priList={[]} 
        onEdit={function (task: Task): void {
            throw new Error("Function not implemented.");
          } }          
        />
      )}
      </Grid>
    )
  }

  export default TaskListItem