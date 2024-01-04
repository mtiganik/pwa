import React, {useContext, useState} from "react";
import Task from "../models/task";
import Category from "../models/category";
import Priority from "../models/priority";
import { CategoryContext, PriorityContext } from "./home-screen";
import { Grid, Box, FormControl, Button, Select, SelectChangeEvent, MenuItem, InputLabel,TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AlignHorizontalCenter } from "@mui/icons-material";
import { editTask } from "../service/task-service";
interface EditTaskProps {
  task: Task,
  currCat: Category | undefined,
  currPri: Priority | undefined,
  onEdit: (task:Task) => void;
}

const EditTask:React.FC<EditTaskProps> =({task,currCat,currPri, onEdit}) => {
  const [taskName,setTaskName] = useState(task.taskName)
  const [catId,setCatId] = useState(task.todoCategoryId)
  const [priId,setPriId] = useState(task.todoPriorityId)
  const [dueDt,setDueDt] = useState<Dayjs | null>(dayjs(task.dueDt))
  const [errorMsg,setErrorMsg] = useState("")
  const catList = useContext(CategoryContext)
  const priList = useContext(PriorityContext)

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

  const handleClick = async() =>{
    if(taskName.length > 1 && catId.length > 1 && priId.length > 1 && dueDt){
      setErrorMsg("")
      task.taskName = taskName
      task.todoCategoryId = catId
      task.todoPriorityId = priId
      task.dueDt = dueDt.format()
      const response = await editTask(task)
      if (response >= 200 && response <300){
        onEdit(task)
      }else{
        setErrorMsg("Error editing data")
      }
    }else{
      setErrorMsg("No field can be empty, please correct them")
    }
  }
  return(
    <Grid border={1} container >
      <Grid item xs={3}>
        <Typography mb={1}>Edit name</Typography>
        <TextField 
          label="Task name:"
          value={taskName}
          required
          onChange={(e) => setTaskName(e.target.value)}
        />
      </Grid>
      <Grid item xs={2} >
        <Typography mb={1}>Edit Category</Typography>
        <FormControl>
        <InputLabel id="category-select">Select Category</InputLabel>
        <Select
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

      </Grid>
      <Grid item xs={2}>
        <Typography mb={1}>Edit Priority</Typography>
        <FormControl>
        <InputLabel id="priority-select">Select Priority</InputLabel>
        <Select
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

      </Grid>
      <Grid item xs = {2}>
      <Typography mb={1}>Select Due date</Typography>
        <DatePicker
          label="Select due date"
          value={dueDt}
          onChange={(newValue) => setDueDt(newValue)}
        />

      </Grid>
      <Grid item xs={3}>
        <Button onClick={handleClick}>Update</Button>
        <Typography color="red" >
          {errorMsg}
        </Typography>

      </Grid>

    </Grid>
  )
}


export default EditTask