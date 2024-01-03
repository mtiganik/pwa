import React from 'react';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import CabinIcon from '@mui/icons-material/Cabin';
import SchoolIcon from '@mui/icons-material/School';
import HelpIcon from '@mui/icons-material/Help';
import PublicIcon from '@mui/icons-material/Public';


interface ShowIconProps{
  categoryName: string | undefined,
  isDone: boolean
}

const ShowIcon:React.FC<ShowIconProps>=({categoryName, isDone}) => {
  const iconColor:string = isDone ? "lightGreen":"#ff5722"
  if (categoryName == "Home"){
    return (<CabinIcon  style={{color:iconColor, fontSize: 100}}/> )
  }else if(categoryName == "Work"){
    return <AgricultureIcon style={{color:iconColor, fontSize: 100}}/>
  }else if(categoryName == "School"){
    return <SchoolIcon style={{color:iconColor, fontSize: 100}}/>
  }else if(categoryName == "Other"){
    return <HelpIcon style={{color:iconColor, fontSize: 100}}/> 
  }
  return <PublicIcon style={{color:iconColor, fontSize: 100}} />
  }

  export default ShowIcon