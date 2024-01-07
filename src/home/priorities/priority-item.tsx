import React from "react";
import { Priority } from "../../models";
import { deletePriorityIdb } from "../../idb/priority-idb";
import { Grid, Button, Typography, Box, Tooltip } from "@mui/material";
import EditPriority from "./edit-priority";


interface PriorityListItemProps{
  priority : Priority;
  canDelete: boolean;
  onDelete: () => void;
  onEdit: (pri:Priority) => void
}

const PriorityItem:React.FC<PriorityListItemProps> =
({priority,canDelete, onDelete, onEdit}) => {

  const [editVisible, setEditVisible] = React.useState(false)
  const handleDelete = async() => {
    if(canDelete){
      await deletePriorityIdb(priority.id)
      onDelete()
    }
  }

  const handleEdit= (pri:Priority) => {
    setEditVisible(false)
    onEdit(pri)
  }
  return(
    <Grid container border={2} padding={2} margin={2}>
      <Grid container>
      <Grid item xs={6}>
        <Typography variant="h4">{priority.priorityName}</Typography>
        <Typography>Priority index: {priority.prioritySort}</Typography>
      </Grid>
      <Grid item xs={4} >
        <Tooltip title= {!canDelete ? "This item can't be deleted because there are associated tasks with it. To delete this priority, you need to remove all todos that have this priority":""}>
        <Button onClick = {handleDelete}>Delete</Button>

        </Tooltip>
        <Button onClick={() => setEditVisible(!editVisible)}>Edit</Button>
      </Grid>
      {editVisible && (
        <EditPriority 
        priority={priority} 
        editPriority={
          (updatedPri) => handleEdit(updatedPri)
        }        
        /> 
      )}
      </Grid>
    </Grid>
  )
}

export default PriorityItem