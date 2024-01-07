import React,{useState} from "react";
import { Button, Grid, TextField,Typography } from "@mui/material";
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import { Priority } from "../../models";
import { editPriorityIdb } from "../../idb/priority-idb";
interface PriorityEditProps{
  priority: Priority;
  editPriority: (pri:Priority) => void
}

const EditPriority:React.FC<PriorityEditProps> =
({priority, editPriority}) => {
  const [priName, setPriName] = useState(priority.priorityName)
  const [priSort, setPriSort] = useState<number | undefined>(priority.prioritySort)
  const [error, setError] = useState("")

  const handleEdit= async() => {
      if(priName.length >0 && priSort){
        setError("")
        priority.priorityName = priName
        priority.prioritySort = priSort
        var result = await editPriorityIdb(priority)
        if(result >= 200 && result <300){
          editPriority(priority)
        }else{
          setError("Error saving data")
        }
      }else{
        setError("Error with inputs, please correct them")
      }
  }

  return(
    <Grid container>
      <Grid item xs = {3}>
        <Typography mb={1}>Edit name</Typography>
        <TextField 
          label="Priority name:"
          value={priName}
          required
          onChange={(e) => setPriName(e.target.value)}
        />

      </Grid>
      <Grid item xs={3}>
        <Typography mb={1}>Priority weight</Typography>
      <NumberInput 
        placeholder="Type a number…"
        value={priSort}
        onChange={(event,val) => setPriSort(val)}
      />
      </Grid>
    <Grid item xs={3}>
      <Button onClick={handleEdit}>Edit</Button>
      <Typography color="red" >
          {error}
      </Typography>
    </Grid>
    </Grid>
  )
}

export default EditPriority;