import React from "react";
import Category from "../models/category";
import Priority from "../models/priority";
import Task from "../models/task";

const task1:Task = {
  id: "crypto.randomUUID()",
  taskName: "Visit Parents",
  createdDt: new Date().toISOString(),
  dueDt: new Date().toISOString(),
  isCompleted: false,
  isArchieved: false,
  todoCategoryId: "dsasd",
  todoPriorityId: "fdsfdsf",
  syncDt: new Date().toISOString()
}

interface AddTaskListProps{
  catList: Category[],
  priList: Priority[],
  onAdd: (task:Task) => void;
}

const AddTaskView:React.FC<AddTaskListProps> =(
  {catList,priList, onAdd}) => {

    const handleAdd = () => {
      // if adding is succesfull, send new Task item back to parent element
      onAdd(task1)
    }
    return(<div>
       {/* All form elements go here */}
      <div>Hello from add view</div>
      <button onClick={handleAdd}>Add new</button>
      </div>
          )
}

export default AddTaskView