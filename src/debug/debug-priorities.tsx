import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"
import { getAllPriorities,getPriorityById,postPriority,editPriority,deletePriority } from "../service/priority-service"
import Priority from "../models/priority"
const pri1:Priority = 
{
    id: "2339d795-bc6f-47a4-bdb9-3490483a3d81",
    priorityName: "High",
    prioritySort: 60,
    syncDt: new Date().toISOString(),
    tag: 'high'
}


const DebugPriorities: React.FC = () => {

  const handleGetAll = async() => {
    var response = await getAllPriorities()
    console.log(response)
  }

  const handleGetById = async() => {
    var response = await getPriorityById(pri1.id)
    console.log(response)
  }

  const handlePost = async() => {
    var response = await postPriority(pri1)
    console.log(response)
  }
  const handleEdit = async() => {
    pri1.priorityName = "Medium"
    pri1.prioritySort = 20
    var result = await editPriority(pri1)
    console.log(result)
  }

  const handleDelete = async() => {
    var response = await deletePriority(pri1.id)
    console.log(response)
  }
  return(
    <div>
      <h1>Priority Debug</h1>
        <Button onClick={handleGetAll}>Get all</Button>
        <Button onClick={handleGetById}>get by id</Button>
        <Button onClick={handlePost}>post</Button>
        <Button onClick={handleEdit}>edit</Button>
        <Button onClick={handleDelete}>delete</Button>
    </div>
  )
}

export default DebugPriorities