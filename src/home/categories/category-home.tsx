import React from "react"
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import Category from "../../models/category";


const CategoryScreen: React.FC = () => {

  const handleInitialize = () => {
    let db;
    const openOrCreateDB = window.indexedDB.open('todo_db', 1);
    openOrCreateDB.addEventListener('error', () => console.error('Error opening DB'));
    
    openOrCreateDB.addEventListener('success', () => {
      console.log('Successfully opened DB');
      db = openOrCreateDB.result;
      console.log(db)
    });

    openOrCreateDB.addEventListener('upgradeneeded', (event) => {
      console.log("upgradeneeded")
      const request = event.target as IDBRequest<IDBDatabase>;
      db = request.result

      if(!db.objectStoreNames.contains("todo_idb")){
        const table = db.createObjectStore('todo_tb', 
        {keyPath: 'id', autoIncrement:true})
        table.createIndex('title','title', {unique: false})
        table.createIndex('desc', 'desc', {unique:false})
        console.log("Created table")
      }
    })
  }

  const handleAddData = () => {
    const openOrCreateDB = window.indexedDB.open('todo_db', 1);
    openOrCreateDB.addEventListener('error', () => console.error('Error opening DB'));
    
    openOrCreateDB.addEventListener('success', () => {
      const db = openOrCreateDB.result;
      const newTodo = {title:"Hello", body:"Mihkel"}
      const transaction = db.transaction(['todo_tb'], 'readwrite')
      const objectStore = transaction.objectStore('todo_tb')
      const query = objectStore.add(newTodo)
      query.addEventListener('success', () => console.log("query store was succesfull"))
      transaction.addEventListener('complete', () => console.log("transaction was success"))
      transaction.addEventListener('error', () => console.log("transaction error"))
    });

  }


  return(
    <div>
      <h1>Category Screen</h1>
      <button onClick={handleInitialize}>Initialize indexedDb</button>
      <button onClick={handleAddData}>Add some data</button>
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