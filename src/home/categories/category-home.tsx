import React from "react"
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import { openDB } from "idb";
import Task from "../../models/task";
import Category from "../../models/category";
import Priority from "../../models/priority";

const cat1: Category = {
  id: crypto.randomUUID(),
  categoryName: "Work",
  categorySort: 1,
  syncDt: new Date().toISOString(),
  tag: 'work'
}

const pri1: Priority =   {
  id: crypto.randomUUID(),
  priorityName: "High",
  prioritySort: 49,
  syncDt: new Date().toISOString(),
  tag: 'high'
}
const task1: Task = 
{
  id: crypto.randomUUID(),
  taskName: "Visit Parents",
  createdDt: new Date().toISOString(),
  dueDt: new Date().toISOString(),
  isCompleted: false,
  isArchieved: false,
  todoCategoryId: crypto.randomUUID(),
  todoPriorityId: crypto.randomUUID(),
  syncDt: new Date().toISOString()
}



const CategoryScreen: React.FC = () => {


const initializeDB = () => {
  openDB('db', 1,{
    upgrade(db){
      db.createObjectStore('priority');
      db.createObjectStore('category')
      db.createObjectStore('task')
    }
  });
  console.log("Succesfully upgraded")
}
const handleAddData = async() => {
  const db1 = await openDB('db', 1);
  db1.add('priority', pri1, pri1.id)
  db1.add('category', cat1, cat1.id)
  db1.add('task', task1, task1.id)
  db1.close();
  console.log("Succesfully added")

}

const addMoreData = async() => {
  const db2 = await openDB('db2',1);
  db2.add('store3', { id: 'cat001', strength: 10, speed: 10 });
  db2.add('store3', { id: 'cat002', strength: 11, speed: 9 });
  db2.add('store4', { id: 'cat003', strength: 8, speed: 12 });
  db2.add('store4', { id: 'cat004', strength: 12, speed: 13 });
  db2.close();

}


  return(
    <div>
      <h1>Category Screen</h1>
      <button onClick={initializeDB}>Initialize DB</button>
      <button onClick={handleAddData}>Add some data</button>
      <button onClick={addMoreData}>Add some more data</button>
      <nav>
        <ul>
          <li>
            <Link to="/">To home</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default CategoryScreen