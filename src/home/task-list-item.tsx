import React from "react";
import Task from "../models/task";
import Category from "../models/category";
import Priority from "../models/priority";

interface TaskListItemProps {
  task: Task;
  taskCategory: Category | undefined;
  taskPriority: Priority | undefined;
  onDelete: () => void;
  onUpdate: () => void;
}

const TaskListItem:React.FC<TaskListItemProps> = 
({ task, taskCategory, taskPriority, onDelete, onUpdate }) => {

    return(
      <div>
        <div>{task.taskName}</div>
         <div>Category: {taskCategory ? taskCategory.categoryName : 'Unknown Category'}</div>
        <div>Priority: {taskPriority ? taskPriority.priorityName : 'Unknown Priority'}</div> 
        <button onClick={onDelete}>Delete</button>
        <button onClick={onUpdate}>Mark as done</button>
      </div>
    )
  }

  export default TaskListItem