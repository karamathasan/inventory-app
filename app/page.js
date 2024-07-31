// import 
'use client'
import { Box, Button, Modal, Stack, Table, Typography } from "@mui/material";
import { firestore } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";

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
    bgcolor={'#eeeeee'}
    >
      <Box>
        {/* Modal */}

        {/* <Modal
        open = {addModalActive}
        onClose = {setAddModal(false)}
        >
        </Modal> */}

        {/* Header */}
        <Box
        border={'2px solid #333'}
        width={'800px'}
        height = '120px'
        bgcolor={'#ccccff'}
        display={"flex"}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        >
          <Typography variant = {'h1'}>
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

    </Box>
  );
}
