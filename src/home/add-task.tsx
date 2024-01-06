import React,{useContext, useState} from "react";
import { Category, Priority, Task } from '../models';
import { Grid, Box, FormControl, Button, Select, SelectChangeEvent, MenuItem, InputLabel,TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import {Dayjs} from "dayjs";
import { postTaskService } from "../service/task-service";
import { CategoryContext, PriorityContext } from "./home-screen";

interface AddTaskListProps{
  onAdd: (task:Task) => void;
}

const AddTaskView:React.FC<AddTaskListProps> =({onAdd}) => {
  const catList = useContext(CategoryContext) 
  const priList = useContext(PriorityContext)
  const [taskName, setTaskName] = useState("")
  const [catId,setCatId] = useState("")
  const [priId, setPriId] = useState("")
  const [dueDt, setDueDt] = useState<Dayjs | null>(null)
  const [errorMsg, setErrorMsg] = useState("")
    const handleAdd = async() => {
      if(taskName.length > 1 && catId.length > 1 && priId.length > 1 && dueDt){
        setErrorMsg("")
        const t1:Task = {
          id: crypto.randomUUID(),
          taskName: taskName,
          createdDt: new Date().toISOString(),
          dueDt: dueDt.format(),
          isCompleted: false,
          isArchieved: false,
          todoCategoryId: catId,
          todoPriorityId: priId,
          syncDt: new Date().toISOString()
        }
        var result = await postTaskService(t1)
        if(result >= 200 && result <300){
          setTaskName("")
          setCatId("")
          setPriId("")
          setDueDt(null)
          onAdd(t1)
        }else{
          setErrorMsg("Error posting data")
        }
      }else{
        setErrorMsg("Form has errors, please correct them")
      }
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
        <Typography component="h1" variant="h5"> Add Task</Typography>
        <Typography>Enter Task name</Typography>

        <TextField 
          sx={{width:256}}
          label="Task name:"
          value={taskName}
          required
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Typography>Select Category</Typography>
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

        <Typography>Select Priority</Typography>
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

        <Typography>Select Due date</Typography>
        <DatePicker
          label="Select due date"
          value={dueDt}
          onChange={(newValue) => setDueDt(newValue)}
        />
        <Typography color="red" >
          {errorMsg}
        </Typography>

        <Button type="submit" onClick={handleAdd}>Add new</Button>
      </Box>

          )
}

export default AddTaskView