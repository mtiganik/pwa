import React,{useState} from "react";
import Category from "../models/category";
import Priority from "../models/priority";
import Task from "../models/task";
import { Grid, Box, FormControl, Button, Select, SelectChangeEvent, MenuItem, InputLabel,TextField, Typography } from "@mui/material";
import { Form } from "react-router-dom";
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

const AddTaskView:React.FC<AddTaskListProps> =({catList,priList, onAdd}) => {
  const [taskName, setTaskName] = useState("")
  const [catId,setCatId] = useState("")
  const [priId, setPriId] = useState("")
  const [dueDt, setDueDt] = useState("")

    const handleAdd = () => {
      // onAdd(task1)
    }
    const handleCategoryChange = (event: SelectChangeEvent) => {
      const selectedCatId = event.target.value as string
      const cat = catList.find(category => category.id === selectedCatId)
      console.log("Selected cat: ", cat?.categoryName)
      setCatId(cat? cat.id : "")
    }

    const handlePriorityChange = (event: SelectChangeEvent) => {
      const selectedPriId = event.target.value as string
      const pri = priList.find(priority => priority.id === selectedPriId)
      console.log("Selected priority: ", pri?.priorityName)
      setPriId(pri ? pri.id: "")
    }

    return(

      <Box
      sx={{
        marginTop: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
        <Typography component="h1" variant="h5">
            Add Task
          </Typography>
        <TextField 
          sx={{width:256}}
          label="Task name:"
          value={taskName}
          required
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Box id="Category-Select">
        <InputLabel id="category-select">Select Category</InputLabel>
        <FormControl>
        <InputLabel id="category-select">Select Category</InputLabel>
        <Select
        sx={{width:256}}
        labelId="category-select"
        placeholder="category select"
        value={catId}
        onChange={handleCategoryChange}
        >
          {catList.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>{cat.categoryName} </MenuItem>
            )
            )}
        </Select>
        </FormControl>
        </Box>

        <Box id="Priority Select">
        <InputLabel id="priority-select">Select Priority</InputLabel>
        <FormControl>
        <InputLabel id="priority-select">Select Priority</InputLabel>
        <Select
        sx={{width:256}}
        labelId="priority-select"
        placeholder="priority select"
        value={priId}
        onChange={handlePriorityChange}
        >
          {priList.map((pri) => (
            <MenuItem key={pri.id} value={pri.id}>{pri.priorityName} </MenuItem>
            )
            )}
        </Select>
        </FormControl>
        </Box>

      <Button type="submit" onClick={handleAdd}>Add new</Button>
      </Box>

          )
}

export default AddTaskView