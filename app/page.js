'use client'
import { Box, Button, Modal, Stack, IconButton, TextField, Typography } from "@mui/material";
import { firestore } from "@/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import DeleteEntry from "./components/deleteEntry";

import { AddCircle } from "@mui/icons-material";


export default function Home() {
  const [removeButtonActive, setRemoveButtonActive] = useState(false)
  const [addModalActive, setAddModal] = useState(false)
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  const [inventory, setInventory] = useState(['potato', 'ground beef', 'beef jerky', 'chicken breast', 'oxtail', 'quail'])

  const updateInventory = async ()=>{
    const q = query(collection(firestore, 'inventory'))
    const docs = await getDocs(q)
    const inventoryList = []
    docs.forEach((doc)=>{
      inventoryList.push({
        id: doc.id,
        ...doc.data(),
      })
      // console.log(doc.id, doc.data())
    })
  setInventory(inventoryList)
  }
  const [inputText, setText] = useState('')

  const addNewItem = async (item) => {
    console.log("added" + item)
    // const docRef = doc(collection(firestore,'inventory'), item)
    // const docSnap = await docRef.data()
    // if (docSnap.exists()){
    //   const {quantity} = docSnap.data()
    //   await setDoc(docRef,{quantity:quantity+1})
    // }
    // else{
    //   await setDoc(docRef,{'quantity':1})
    //   updateInventory()

    // }
    // setAddModal(false)

  }

  const getQuantity = async (item) => {
    // const docRef = doc(collection(firestore,'inventory'),item)
    // const docSnap = await getDoc(docRef)
    // const {quantity} = docRef.data()
    // return quantity
  }

  const removeItem = async (item)  => {
   const docRef = doc(collection(firestore,'inventory'),item)
   const docSnap = await getDoc(docRef)
   if (docSnap.exists()){
    const {quantity} = docSnap.data() 
    if (quantity === 1){
      await deleteDoc(docRef)
    }
    else{
      await setDoc(docRef, {quantity: quantity - 1})
    }
   }
   updateInventory()
  }


  // useEffect(()=>{
  //   updateinventory()
  // },[])

  return (
    // page container
    <Box
    width = '100vw'
    height = '100vh'
    display={"flex"}
    flexDirection={'column'}
    justifyContent={'center'}
    alignItems={'center'}
    >
      {/* modal */}
      <Modal
      open = {addModalActive}
      onClose={()=>{setAddModal(false)}}
      aria-labelledby="modal-modal-title"
      aria-describedby='modal-modal-description'
      >
        <Box sx = {modalStyle}
        >
          <Typography id = 'modal-modal-title' variant = 'h6' >
            Add Item
          </Typography>
          <Stack width = "100%" direction={'row'} spacing={2}>
            <TextField 
            id="outlined-basic"
            label='item'
            variant='outlined'
            onChange={(e)=>{setText(e.target.value)}}
            >
            </TextField>
            {/* <Button variant = 'contained' onClick={()=>{setAddModal(false)}}>Add</Button> */}
            <Button variant = 'contained' onClick={()=>{addNewItem(inputText)}}>Add</Button>
          </Stack>
          
        </Box>
      </Modal>

      {/* header */}
      <Box
      border={'2px solid #333'}
      width={'inherit'}
      maxWidth='800px'
      height = '120px'
      bgcolor={'#ccccff'}
      display={"flex"}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      >
        <Typography variant = {'h1'}>
          Inventory
        </Typography>
      </Box>

      {/* Items */}
      <Stack
      border={'2px solid #333'}
      width={'inherit'}
      maxWidth='800px'
      height='40%'
      spacing = {'20px'}
      overflow={'scroll'}
      display = {'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      >
        {inventory.map((item) => (
          <Box 
            key = {item.id}
            width={'99%'}
            height = '60px'
            display = {'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            bgcolor={'#cccccc'}

          >
            <Box
            width = {'50%'}
            height={'inherit'}
            display = {'flex'}
            alignItems={'center'}
            paddingLeft={'10px'}
            gap={2}
            >
              {/* quantity */}
              <Typography>
                {/* x{item.quantity} */}
                x1
              </Typography>
              {/* add one */}
              <IconButton onClick={()=>{addNewItem(item)}}>
                <AddCircle></AddCircle>              
              </IconButton>
              {/* name */}
              <Typography>
                {item.charAt(0).toUpperCase() + item.toLowerCase().slice(1)}
                {/* {item.id.charAt(0).toUpperCase() + item.id.toLowerCase().slice(1)} */}
              </Typography>
            </Box>
            
            <DeleteEntry active = {removeButtonActive} onClick = {()=>{console.log("remove")}}></DeleteEntry>
            {/* <DeleteEntry active = {removeButtonActive} onClick = {()=>{removeItem(item)}}></DeleteEntry> */}
          </Box>
        ))}
      </Stack>

      {/* buttons */}
      <Box
      width={'800px'}
      height = {'100px'}
      display={'flex'}
      justifyContent={'space-around'}
      alignItems={'center'}
      // flexDirection={'column'}

      >
        <Button variant = 'contained' onClick={()=>{setAddModal(true)}}>
          add
        </Button>

        <Button variant = 'contained' onClick={()=>{setRemoveButtonActive(!removeButtonActive)}}>
          remove
        </Button>
      </Box>
    </Box>
  );
}
