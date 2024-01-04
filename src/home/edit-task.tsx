import React, {useContext, useState} from "react";
import Task from "../models/task";
import Category from "../models/category";
import Priority from "../models/priority";
import { CategoryContext, PriorityContext } from "./home-screen";
import { Grid } from "@mui/material";

interface EditTaskProps {
  task: Task,
  currCat: Category | undefined,
  currPri: Priority | undefined,
  onEdit: (task:Task) => void;
}

const EditTask:React.FC<EditTaskProps> =({task,currCat,currPri, onEdit}) => {
  const catList = useContext(CategoryContext)
  const priList = useContext(PriorityContext)
  const handleClick = async() =>{
    console.log("Edited")
    onEdit(task)
  }
  return(
    <Grid border={1} container >
    <div>On edit task</div>
      <button onClick={handleClick}>Edit</button>
      </Grid>
  )
}


export default EditTask