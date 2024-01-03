import React from "react";
import Task from "../models/task";
import Category from "../models/category";
import Priority from "../models/priority";
import { editTask } from "../service/task-service";
import { Grid, Button, Typography } from "@mui/material";
import ShowIcon from "../utils/show-icon";
interface TaskListItemProps {
  task: Task;
  taskCategory: Category | undefined;
  taskPriority: Priority | undefined;
  onDelete: () => void;
  onUpdate: () => void;
}

const TaskListItem:React.FC<TaskListItemProps> = 
({ task, taskCategory, taskPriority, onDelete, onUpdate }) => {

  const OnMarkAsDone = async() => {
    task.isCompleted = !task.isCompleted
    var result = await editTask(task)
    if(200 <= result && result < 300){
      onUpdate()
    }
  }

    return(
      <Grid border={1} container margin={2}>
        <Grid item xs={3} style = {{justifyContent:'center'}}>
          <ShowIcon categoryName={taskCategory?.categoryName} isDone={task.isCompleted}/>
       {/* < AgricultureIcon  style={{color: "red", fontSize: 100}} /> */}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">{task.taskName}</Typography>
          <Typography>is completed: {task.isCompleted ? "True": "False"}</Typography>
          <Typography>{taskPriority ? taskPriority.priorityName : 'Unknown '} Priority</Typography>

          <Typography>Created: {task.createdDt} </Typography>
          <Typography>Due: {task.dueDt} </Typography>

        </Grid>
        <Grid item xs={3}>
          <Button onClick={onDelete}>Delete</Button>
          <Button onClick={OnMarkAsDone}>Mark as done</Button>
        </Grid>
      </Grid>
    )
  }

  export default TaskListItem