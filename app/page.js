import { Box, Button, Modal, Stack, Table, Typography } from "@mui/material";
import { firestore } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Box, Stack, Table, Typography } from "@mui/material";

export default function Home() {
  const [addModalActive, setAddModal] = useState(false)
  const addOpen = ()=>{

  }

  const addClose = ()=>{

  }

  const [pantry, setPantry] = useState([])
  useEffect(()=>{
    // const items = collection(firestore, 'pantry')
    const getData = async ()=>{
      const q = query(collection(firestore, 'pantry'))
      const docs = await getDocs(q)
      const pantryList = []
      docs.forEach((doc)=>{
        pantryList.push(doc.id)
        // console.log(doc.id, doc.data())
      })
    setPantry(pantryList)
    }
    getData()

  })
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

{/* Items */}
<Stack
        border={'2px solid #333'}
        width={'800px'}
        height='240px'
        spacing = {'20px'}
        overflow={'scroll'}
        display = {'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        >
          {pantry.map((i) => (
            <Box 
              key = {i}
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

        {/* buttons */}
                <Box
        display={'flex'}
        justifyContent={'space-around'}
        >
          <Button onClick={()=>{setAddModal(true)}}>
            add
          </Button>

          <Button>
            remove
          </Button>
        </Box>
 
    </Box>
  );
}
