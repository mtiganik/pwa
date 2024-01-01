import React from "react"
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import {getAllCategories, getCategoryById, postCategory,editCategory,deleteCategory } from "../../service/category-service";
import Category from "../../models/category";
import { } from "../../service/utils";

const cat1:Category = 
{
    id: crypto.randomUUID(),
    categoryName: "Home",
    categorySort: 3,
    syncDt: new Date().toISOString(),
    tag: 'home'
}

const CategoryScreen: React.FC = () => {

  const handleGetAll = async() => {
    var response = await getAllCategories()
    console.log(response)
  }


  const handleGetById = async() => {
    var response = await getCategoryById("1e3493d4-cc39-441b-81c8-86cf995cadd8")
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
      <h1>Category Screen</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">To home</Link>
          </li>
        </ul>
        <Button onClick={handleGetAll} >get all</Button>
        <Button onClick={handleGetById}>getById</Button>
        <Button onClick={handlePost}>postCategory</Button>
        <Button onClick={handleEdit}>editCategory</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </nav>
    </div>
  )
}

export default CategoryScreen