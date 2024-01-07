import React from 'react'
// import PutServerDataToIDB from '../utils/put-server-data-to-idb'
// import { idb } from "../idb/getIdb"
import { openDB, deleteDB } from 'idb'

const DebugDbInitialization:React.FC = () => {

  const handleDeleteDb = async () => {
    deleteDB('db')
  }
  const createEmptyDb = async() => {
    const db1 = await  openDB("db")
    db1.close()
  }

  const handleDbInitialization = async() => {
    // await deleteDB('db')

    await openDB('db', 2,{
      upgrade(db){
        db.createObjectStore('category')
        db.createObjectStore('priority');
        db.createObjectStore('task')
      }
    });
  }
  return(
    <div>
      <h3>From Db init debug</h3>
      <button onClick={handleDbInitialization}>init Db</button>
      <button onClick={handleDeleteDb}>delete Db</button>
      <button onClick={createEmptyDb}>CreateEmptyDb</button>
    </div>
  )
}

export default DebugDbInitialization;