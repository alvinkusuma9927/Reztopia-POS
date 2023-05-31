
import { useParams } from 'react-router-dom'
import "../../../public/assets/MainMenu.css"
import { Button, Center, HStack, Input, InputGroup, InputLeftElement, Stack, Text, useDisclosure,  Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, useToast, } from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';

import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';





// sessionLogin
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loginSessionAuth from '../../Auth/LoginSession';
import { Link, useNavigate } from 'react-router-dom'

import { actions } from '../../store';
import getStaticImg from "../../Function/getStaticImg";


const OutletMenu = ()=>{
  const outletName = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [dataMenu,setDataMenu] = useState([])
  const navigate = useNavigate()
  const [searchInput,setSearchInput] = useState('')
  const typeMenu = ['Daging','Sayuran','Snack','Mie'];

  
  const [modal,setModal] = useState('')
  const [filterDataMenu,setFilterDataMenu] = useState('') 
  const dispatch = useDispatch()
  const toast = useToast(
    {
      containerStyle: {
        width: '380px',
      },
    }
  )

  const loginSession = useSelector((state)=>state.loginSession)
  useEffect(() => {
    // Check sessionLogin
    if(!loginSessionAuth(window.location.href.split('/')[3],loginSession)){
      navigate('/Login')
    }
    else{
      fetch(`http://127.0.0.1:8000/api/menu/${outletName.idOutlet}`,{
        method:'GET',
        headers:{
          Authorization: `${JSON.parse(loginSession).token.token_type} ${JSON.parse(loginSession).token.access_token}`
        }
      })
        .then( response=> response.json() )
          .then(response=> {
              if(response.data !== undefined){
                setDataMenu(response.data);
              }
            }
          )
      
      
    }
  }, [loginSession]);

  const openModal = (modalParam)=>{
    setModal(modalParam)
    onOpen();
  }
  
  const sortingDataMenuTerendah = (arr)=>{
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < (arr.length - i - 1); j++) {
          if (arr[j].price_after_discount > arr[j + 1].price_after_discount) {
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
          if (arr[j].price_after_discount < arr[j + 1].price_after_discount) {
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
  useEffect(()=>{
    console.log(dataMenu)
  },[])


  return(
    <div className="main-menu">
      <HStack width='100%' justifyContent='space-between' alignItems='center' marginBottom='20px'>
        <ArrowBackIosOutlinedIcon  onClick={()=>navigate(-1)} cursor='pointer' />
        <Text fontSize='22px' as='b'>Menu</Text>
        <LocalGroceryStoreOutlinedIcon sx={{ color:'#6697BF' }}/>
      </HStack>
      
      {
        dataMenu.length > 0 ?
        <>
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
        </>
        :null
      }
      

      <div style={{ display:'flex',justifyContent:'space-between',flexWrap:'wrap',width:'100%',paddingBottom:'70px',marginTop:'20px' }}>
        {dataMenu.map((product)=>
          product.name_product.toLowerCase().includes(searchInput.toLocaleLowerCase()) ?
          <div key={product.id_product} onClick={()=>openModal(product)} style={{ marginBottom:'20px',cursor:'pointer' }}>
            <div src='' style={{ width:'161px',height:'171px',backgroundImage:`url('${getStaticImg('AyamGoreng')}')`,backgroundSize:'cover',backgroundPosition:'center',borderRadius:'20px' }} />    
            <Stack maxWidth='161px'>
              <Text as='b'>{product.name_product}</Text>
              <HStack>
                <Text>Rp.{product.price_after_discount}</Text>
                <Text color='#7C7979' as='del'>{product.original_price}</Text>
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
                typeMenu.map((type,index)=>
                  <Button key={index} colorScheme='blue' variant='ghost' marginBottom='20px' onClick={()=>{setFilterDataMenu(type);onClose()}}>
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
            <ModalHeader>{modal.name_product}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <img style={{ width:'100%',height:'259px',objectFit:'cover',borderRadius:'10px' }} src={getStaticImg('AyamGoreng')} alt="" />
              <Text fontSize='14px' color='#707070'>{modal.description_product}</Text>

              <HStack>
                <Text as='b'>Rp.{modal.price_after_discount}</Text>
                <Text color='#7C7979' as='del'>{modal.original_price}</Text>
              </HStack>
              
            </ModalBody>
            <ModalFooter width='100%' marginBottom='20px'>
              <Center>
                <Button onClick={ ()=>
                  {
                    dispatch(actions.insertCart(modal));
                    onClose()
                    toast({title: `Item sudah ditambahkan ke keranjang`,status: 'success',isClosable: true,duration:1500})
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

// var a = {
//   "meta": {
//       "status": "success",
//       "message": "Successfully fetch data"
//   },
//   "data": {
//     dataProducts : [
//         {
//             "price_after_discount": 40000,
//             "image_product": "http://localhost/storage/uploads/product/",
//             "name_product": "nabati",
//             "description_product": "enak tau",
//             "id_outlet": 2,
//             "id_product": 1,
//             id_category : 1,
//             name_category : "daging"
//         },
//         {
//             "price_after_discount": 20000,
//             "image_product": "http://localhost/storage/uploads/product/",
//             "name_product": "momogi",
//             "description_product": "enak tau",
//             "id_outlet": 2,
//             "id_product": 2,
//             id_category : 2,
//             name_category : "Sayur"
//         }
//     ],
//     listCategory:[
//       {
//         id_category : 1,
//         name_category : "daging"  
//       },
//       {
//         id_category : 2,
//         name_category : "Sayur"
//       }
//     ]
//   }
// }