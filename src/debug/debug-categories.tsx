import React from "react"
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import {getAllCategories, getCategoryById, postCategory,editCategory,deleteCategory } from "../service/category-service";
import Category from "../models/category";
import { } from "../service/utils";

const cat1:Category = 
{
    id: "9e1ea3f2-108e-420c-bcd8-8b3d9ac683a5",
    categoryName: "Home",
    categorySort: 3,
    syncDt: new Date().toISOString(),
    tag: 'home'
}

const DebugCategories: React.FC = () => {

  const handleGetAll = async() => {
    var response = await getAllCategories()
    console.log(response)
  }


  const handleGetById = async() => {
    var response = await getCategoryById(cat1.id)
    console.log(response)
  }

  const handlePost = async() => {
    var response = await postCategory(cat1)
    console.log(response)
  }
  const handleEdit = async() => {
    cat1.categoryName = "new name"
    console.log(cat1)
    var response = await editCategory(cat1)
    console.log(response)
  }
  const handleDelete = async() => {
    var response = await deleteCategory(cat1.id)
    console.log(response)
  }
  return(
    <div>
      <h1>Category Debug</h1>
        <Button onClick={handleGetAll} >get all</Button>
        <Button onClick={handleGetById}>getById</Button>
        <Button onClick={handlePost}>postCategory</Button>
        <Button onClick={handleEdit}>editCategory</Button>
        <Button onClick={handleDelete}>Delete</Button>
    </div>
  )
}


export default DebugCategories;