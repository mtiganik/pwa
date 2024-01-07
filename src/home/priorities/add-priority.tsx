import React, {useEffect, useState} from "react";
import { Button, Grid, Typography, TextField } from "@mui/material";
import NumberInput from "../../utils/number-input";
import { Priority } from "../../models";
import { postPriorityIdb } from "../../idb/priority-idb";

interface AddPriorityProps {
  onAdd : (pri:Priority) => void
} 

const AddPriority:React.FC<AddPriorityProps> =({onAdd}) => {
  const [priName, setPriName] = useState("");
  const [priSort, setPriSort] = useState<number | undefined>()
  const [error, setError] = useState("")

  const handleAdd =async() => {
    if(priName.length > 0 && priSort){
      setError("")
      const pri:Priority = {
        id: crypto.randomUUID(),
        priorityName: priName,
        prioritySort: priSort,
        syncDt: new Date().toISOString(),
        tag: ""
      }
      var result = await postPriorityIdb(pri)
      if (result >= 200 && result < 300){
        onAdd(pri)
      }
    }else{
      setError("Error with inputs, please correct them")
    }
  }

  return(
    <Grid container border={2} margin={2} padding={2}>
      <Grid container>
        <Grid item xs={3}>
        <Typography mb={1}>Priority name</Typography>
        <TextField 
          label="Priority name:"
          value={priName}
          required
          onChange={(e) => setPriName(e.target.value)}
        />
        </Grid>
        <Grid item xs={6} ml={2}>
        <Typography mb={1}>Priority weight</Typography>
      <NumberInput 
        placeholder="Type a number…"
        value={priSort}
        onChange={(event,val) => setPriSort(val)}
      />
        </Grid>
      <Grid item xs={1}>
        <Button onClick={handleAdd}>Add</Button>
      </Grid>

      </Grid>
      <Typography color="red" >
        {error}
      </Typography>

    </Grid>
  )
}

export default AddPriority