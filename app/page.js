'use client'
import { Box, Button, Modal, Stack, IconButton, TextField, Typography, InputBase } from "@mui/material";
import { firestore } from "@/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import DeleteEntry from "./components/deleteEntry";

import { AddCircle, Search } from "@mui/icons-material";


export default function Home() {
  const [removeButtonActive, setRemoveButtonActive] = useState(false)
  const [addModalActive, setAddModal] = useState(false)
  const [inventory, setInventory] = useState([])
  const [inputText, setText] = useState('')
  const [searchText, setSearchText] = useState('');

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

  const updateInventory = async ()=>{
    const q = query(collection(firestore, 'inventory'))
    const docs = await getDocs(q)
    const inventoryList = []
    docs.forEach((doc)=>{
      inventoryList.push({
        id: doc.id,
        ...doc.data(),
      })
    })
  setInventory(inventoryList)
  }

  const addNewItem = async (itemName) => {
    const docRef = doc(collection(firestore,'inventory'), itemName)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()){
      const {quantity} = docSnap.data()
      await setDoc(docRef,{quantity:quantity+1})
    }
    else{
      await setDoc(docRef,{quantity:1})
    }
    updateInventory()
    setAddModal(false)
  }

  const removeItem = async (itemName)  => {
    const docRef = doc(collection(firestore,'inventory'), itemName)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()){
      const {quantity} = docSnap.data() 
      if (quantity === 1){
        await deleteDoc(docRef)
      }
      else{
        await setDoc(docRef, {quantity: quantity - 1})
      }
      updateInventory()
   }
  }

  const SearchFound = (value) =>{
    if (value.includes(searchText)){
      return true
    }
    else return false
  }

  useEffect(()=>{
    updateInventory()
  },[])

  return (
    // page container
    <Box
    width = '100vw'
    height = '100vh'
    display={"flex"}
    flexDirection={'column'}
    justifyContent={'center'}
    alignItems={'center'}
    bgcolor={"#888888"}
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
      bgcolor={'#73a3d3'}
      display={"flex"}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      >
        <Typography variant = {'h1'}>
          Inventory
        </Typography>
      </Box>

      {/* Search */}
      <Box
      border={'2px solid #333'}
      width={'inherit'}
      maxWidth='800px'
      height = '50px'
      bgcolor={'#eeeeee'}
      display={"flex"}
      flexDirection={'row'}
      justifyContent={'space-around'}
      alignItems={'center'}
      >
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search icon">
          <Search/>
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Inventory . . ."
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e)=>{setSearchText(e.target.value)}}
        />
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
      bgcolor={'#bbbbbb'}
      
      >
        {inventory.map((item) => {
          if (SearchFound(item.id)){
            return (
              <Box 
                key = {item.id}
                width={'99%'}
                height = '60px'
                display = {'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                bgcolor={'#eeeeee'}
                borderRadius={'10px'}
                sx={{boxShadow:1}}
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
                    {/* x1 */}
                    x{item.quantity}
                  </Typography>
    
                  {/* add one */}
                  <IconButton onClick={()=>{addNewItem(item.id)}}>
                    <AddCircle></AddCircle>              
                  </IconButton>
    
                  {/* name */}
                  <Typography>
                    {item.id.charAt(0).toUpperCase() + item.id.toLowerCase().slice(1)}
                  </Typography>
                </Box>
                
                <DeleteEntry active = {removeButtonActive} onClick = {()=>{removeItem(item.id)}}></DeleteEntry>
              </Box>
            )}
          })}
      </Stack>

      {/* buttons */}
      <Box
      width={'800px'}
      height = {'100px'}
      display={'flex'}
      justifyContent={'space-around'}
      alignItems={'center'}
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
