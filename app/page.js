import { Box, Stack, Table, Typography } from "@mui/material";

let items = ["potato",'tomato','nutella','chicken'] 

export default function Home() {
  return (
    <Box
    width = '100vw'
    height = '100vh'
    display={"flex"}
    flexDirection={'column'}
    justifyContent={'center'}
    alignItems={'center'}
    >
      <Box
      width={'800px'}
      height = '10px'
      bgcolor={'#ccccff'}
      >
        <Typography >
          pantry
        </Typography>
      </Box>

      <Stack
      height='50vh'
      spacing = {2}
      overflow={'scroll'}
      display = {'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      >
        {items.map((i) => (
          <Box
            width={'800px'}
            height = '60px'
            display = {'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            bgcolor={'#cccccc'}
           
          >
            <Typography>
              {i.charAt(0).toUpperCase() + i.toLowerCase().slice(1)}
            </Typography>
          </Box>
        ))}
      </Stack>
 
    </Box>
  );
}
