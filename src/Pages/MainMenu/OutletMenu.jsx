
import { useParams } from 'react-router-dom'
import "../../assets/MainMenu.css"
import { Button, Center, HStack, Input, InputGroup, InputLeftElement, Stack, Text, useDisclosure,  Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, useToast, } from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';

import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

// gambar
import BaksoMercon from "../../assets/OutletMenu/BaksoMercon.png"
import Capcay from "../../assets/OutletMenu/Capcay.png"
import Churos from "../../assets/OutletMenu/Churos.png"
import MieGoreng from "../../assets/OutletMenu/MieGoreng.png"
import AyamGoreng from "../../assets/OutletMenu/AyamGoreng.png"
import BaksoKomplit from "../../assets/OutletMenu/BaksoKomplit.png"



// sessionLogin
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loginSessionAuth from '../../Auth/LoginSession';
import { Link, useNavigate } from 'react-router-dom'

import { actions } from '../../store';


const OutletMenu = ()=>{
  const outletName = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const [searchInput,setSearchInput] = useState('')
  const typeMenu = ['Daging','Sayuran','Snack','Mie'];
  const [modal,setModal] = useState('')
  const [filterDataMenu,setFilterDataMenu] = useState('') 
  const dispatch = useDispatch()
  const toast = useToast()

  // Check sessionLogin
  const loginSession = useSelector((state)=>state.loginSession)
  useEffect(() => {
    if(!loginSessionAuth(window.location.href.split('/')[3],loginSession)){
      navigate('/Login')
    }
    console.log(loginSessionAuth(window.location.href.split('/')[3],loginSession))
  }, [loginSession]);
  // }
  const openModal = (modalParam)=>{
    setModal(modalParam)
    onOpen();
  }
  const [dataMenu,setDataMenu] = useState(
    [
      {
        id:1,
        outletName:outletName.idOutlet,
        name:'Bakso Mercon',
        imgUrl:BaksoMercon,
        normalPrice:18300,
        discountPrice:15400,
        type:'Daging',
        description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, nemo!',
      },
      {
        id:2,
        outletName:outletName.idOutlet,
        name:'Capcay',
        imgUrl:Capcay,
        normalPrice:16800,
        discountPrice:15300,
        type:'Sayuran',
        description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, nemo!'
      },
      {
        id:3,
        outletName:outletName.idOutlet,
        name:'Churos',
        imgUrl:Churos,
        normalPrice:19300,
        discountPrice:14300,
        type:'Snack',
        description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, nemo!'
      },
      {
        id:4,
        outletName:outletName.idOutlet,
        name:'Mie Goreng',
        imgUrl:MieGoreng,
        normalPrice:23300,
        discountPrice:20300,
        type:'Mie',
        description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, nemo!'
      },
      {
        id:5,
        outletName:outletName.idOutlet,
        name:'Ayam Goreng',
        imgUrl:AyamGoreng,
        normalPrice:20300,
        discountPrice:15200,
        type:'Daging',
        description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, nemo!'
      },
      {
        id:6,
        outletName:outletName.idOutlet,
        name:'Bakso Komplit',
        imgUrl:BaksoKomplit,
        normalPrice:17300,
        discountPrice:11300,
        type:'Daging',
        description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, nemo!'
      }
    ]
  )
  const sortingDataMenuTerendah = (arr)=>{
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < (arr.length - i - 1); j++) {
          if (arr[j].discountPrice > arr[j + 1].discountPrice) {
              var temp = arr[j]
              arr[j] = arr[j + 1]
              arr[j + 1] = temp
          }
      }
    }
    setDataMenu(arr);
  }
  const sortingDataMenuTertinggi = (arr)=>{
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < (arr.length - i - 1); j++) {
          if (arr[j].discountPrice < arr[j + 1].discountPrice) {
              var temp = arr[j]
              arr[j] = arr[j + 1]
              arr[j + 1] = temp
          }
      }
    }
    setDataMenu(arr);
  }
  const [urutanData,setUrutanData] = useState('');
  useEffect(() => {
    if(urutanData === 'terendah'){
      sortingDataMenuTerendah(dataMenu)
    }
    else if(urutanData === 'tertinggi'){
      sortingDataMenuTertinggi(dataMenu)
    }
    onClose()
  }, [urutanData]);
  return(
    <div className="main-menu">
      <HStack width='100%' justifyContent='space-between' alignItems='center' marginBottom='20px'>
        <ArrowBackIosOutlinedIcon  onClick={()=>navigate(-1)} cursor='pointer' />
        <Text fontSize='22px' as='b'>Menu</Text>
        <LocalGroceryStoreOutlinedIcon sx={{ color:'#6697BF' }}/>
      </HStack>

      <InputGroup backgroundColor='white' marginBottom='20px'>
        <InputLeftElement children={ <SearchIcon/> } />
        <Input value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} placeholder='search' />
      </InputGroup>
      
      <HStack>
        <Button colorScheme='blue' onClick={()=>openModal('filter')  }>
          <TuneOutlinedIcon/>
          Filter
        </Button>
        <Button colorScheme='blue' onClick={()=>openModal('urutan')  } >
          <FilterAltOutlinedIcon />
          Urutkan
        </Button>
      </HStack>

      <div style={{ display:'flex',justifyContent:'space-between',flexWrap:'wrap',width:'100%',paddingBottom:'70px',marginTop:'20px' }}>
        {dataMenu.map((product)=>
          product.name.toLowerCase().includes(searchInput.toLocaleLowerCase()) && product.type.toLowerCase().includes(filterDataMenu.toLocaleLowerCase())  ?
          <div onClick={()=>openModal(product)} style={{ marginBottom:'20px',cursor:'pointer' }}>
            <div src='' style={{ width:'161px',height:'171px',backgroundImage:`url(${product.imgUrl})`,backgroundSize:'cover',backgroundPosition:'center',borderRadius:'20px' }} />    
            <Stack maxWidth='161px'>
              <Text as='b'>{product.name}</Text>
              <HStack>
                <Text>Rp.{product.discountPrice}</Text>
                <Text color='#7C7979' as='del'>{product.normalPrice}</Text>
              </HStack>
              
            </Stack>
          </div>
          :null
        )}
      </div> 


      {
        modal ==='urutan' ?
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent width='414px'>
            <ModalHeader>Urutkan Menu</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Button colorScheme='blue' variant='ghost' marginBottom='20px' onClick={()=>{setUrutanData('terendah')}}>
                Berdasarkan Harga Terendah
              </Button>
              <Button colorScheme='blue' variant='ghost' marginBottom='20px' onClick={()=>{setUrutanData('tertinggi')}}>
                Berdasarkan Harga Tertinggi
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>:

        modal === 'filter' ? 
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent width='414px'>
            <ModalHeader>
              Filter
              
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {
                typeMenu.map((type)=>
                  <Button colorScheme='blue' variant='ghost' marginBottom='20px' onClick={()=>{setFilterDataMenu(type);onClose()}}>
                    {type}
                  </Button>
                )
              }
              <Center>
                <Button onClick={()=>{setFilterDataMenu('');onClose()}} colorScheme='blue' variant='outline' >Hapus Filter</Button>
              </Center>
              
            </ModalBody>
          </ModalContent>
        </Modal>

        :
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent width='414px'>
            <ModalHeader>{modal.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <img style={{ width:'100%',height:'259px',objectFit:'cover',borderRadius:'10px' }} src={modal.imgUrl} alt="" />
              <Text fontSize='14px' color='#707070'>{modal.description}</Text>

              <HStack>
                <Text as='b'>Rp.{modal.discountPrice}</Text>
                <Text color='#7C7979' as='del'>{modal.normalPrice}</Text>
              </HStack>
              
            </ModalBody>
            <ModalFooter width='100%'>
              <Center>
                <Button onClick={ ()=>
                  {
                    dispatch(actions.insertCart(modal));
                    onClose()
                    toast({title: `Item sudah ditambahkan ke keranjang`,status: 'success',isClosable: true,duration:2000})
                  }
                } colorScheme='blue'>Tambah</Button>
              </Center>
              
            </ModalFooter>
          </ModalContent>
        </Modal>
      }
      


      
      
      

    </div>
  )
}
export default OutletMenu