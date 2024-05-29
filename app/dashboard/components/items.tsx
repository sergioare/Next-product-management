import { Box, Typography } from "@mui/material";
import CreateUpdateItem from "./create-update-item-form";

const Items = () => {
    return (  
        <>
        <Box sx={{
            display:"flex",
            justifyContent:"space-between",
            margin:"10px",
            marginBottom:"20px"
        }}>
            <Typography variant="h3" sx={{marginLeft:"5px"}}>Mis productos</Typography> 
            <CreateUpdateItem/>
        </Box>
        </>
    );
}
 
export default Items;