import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"
import { getAllPrioritiesService,getPriorityByIdService,postPriorityService,editPriorityService,deletePriorityService } from "../service/priority-service"
import { Priority } from "../models"
export const priId = "2339d796-bc6f-47a4-bdb9-3490483a3d81"

const pri1:Priority = 
{
    id: priId,
    priorityName: "High",
    prioritySort: 60,
    syncDt: new Date().toISOString(),
    tag: 'high'
}


const DebugPriorities: React.FC = () => {

  const handleGetAll = async() => {
    var response = await getAllPrioritiesService()
    console.log(response)
  }

  const handleGetById = async() => {
    var response = await getPriorityByIdService(pri1.id)
    console.log(response)
  }

  const handlePost = async() => {
    var response = await postPriorityService(pri1)
    console.log(response)
  }
  const handleEdit = async() => {
    pri1.priorityName = "Medium"
    pri1.prioritySort = 20
    var result = await editPriorityService(pri1)
    console.log(result)
  }

  const handleDelete = async() => {
    var response = await deletePriorityService(pri1.id)
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