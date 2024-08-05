import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Typography } from '@mui/material';
function DeleteEntry(props){
    if (props.active == true){
        return (
            <>  
                <IconButton
                onClick={props.onClick}
                // onClick={()=>{console.log("click")}}
                >
                    <Typography>
                        Delete
                    </Typography>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            </>
            )
    }
    else{
        return (
            <>
            </>
            )
    }
    
}

export default DeleteEntry