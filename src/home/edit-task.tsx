import React from "react";
import Task from "../models/task";
import Category from "../models/category";
import Priority from "../models/priority";

interface EditTaskProps {
  task: Task,
  catList: Category[],
  priList: Priority[],
  onEdit: (task:Task) => void;
}

const EditTask:React.FC<EditTaskProps> =({task,catList,priList, onEdit}) => {

  const handleClick = async() =>{
    console.log("Edited")
    onEdit(task)
  }
  return(
    <div>
      <div>On edit task</div>
      <button onClick={handleClick}>Edit</button>
    </div>
  )
}


export default EditTask