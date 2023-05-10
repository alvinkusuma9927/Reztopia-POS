import "../../assets/MainMenu.css"
import { HStack, IconButton, Input, InputGroup, InputLeftElement, Stack, Text,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton } from '@chakra-ui/react';
import {AddIcon, MinusIcon, SearchIcon} from '@chakra-ui/icons';
import ProductImg from '../../assets/product.png'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { Image,Button} from '@chakra-ui/react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import {Table,  Thead,  Tbody,  Tfoot,  Tr,  Th,  Td,  TableCaption,  TableContainer,} from '@chakra-ui/react'
import { actions } from '../../store';

// gambar
import BaksoMercon from "../../assets/OutletMenu/BaksoMercon.png"
import Capcay from "../../assets/OutletMenu/Capcay.png"
import Churos from "../../assets/OutletMenu/Churos.png"
import MieGoreng from "../../assets/OutletMenu/MieGoreng.png"
import AyamGoreng from "../../assets/OutletMenu/AyamGoreng.png"
import BaksoKomplit from "../../assets/OutletMenu/BaksoKomplit.png"
import EmptyCart from "../../assets/EmptyCart.png"




// sessionLogin
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loginSessionAuth from '../../Auth/LoginSession';
import { Link, useNavigate } from 'react-router-dom'



const MainMenu = ()=>{
  const [products,setProducts] = useState(
    [
      {
        name:'kantin Gubeng',
        imgUrl: ''
      },
      {
        name:'kantin Tunjungan',
        imgUrl: ''
      },
      {
        name:'kantin Jemursari',
        imgUrl: ''
      },
      {
        name:'kantin Prapen',
        imgUrl: ''
      },
      {
        name:'kantin Panjang Jiwo',
        imgUrl: ''
      },
      {
        name:'kantin Keputih',
        imgUrl: ''
      },
      {
        name:'kantin Tambaksari',
        imgUrl: ''
      },
    ]
  )
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state)=>state.cart)
  const [searchInput,setSearchInput] = useState('')
  const [selectedBottomNavbar,setSelectedBottomNavbar] = useState('main-menu')
  const getTotalPayment = ()=>{
    let totalPrice = 0
    for (let item of cart) {
      totalPrice += (item.discountPrice * item.count)
    }
    return totalPrice
  }


  // Check sessionLogin
  const loginSession = useSelector((state)=>state.loginSession)
  useEffect(() => {
    if(!loginSessionAuth(window.location.href.split('/')[3],loginSession)){
      navigate('/Login')
    }
    console.log(loginSessionAuth(window.location.href.split('/')[3],loginSession))
  }, [loginSession]);
  // }
  return(
    <>
      
      {
        (selectedBottomNavbar === 'main-menu') ?
          <div className="main-menu">
            <Text as='b' fontSize='22px'>Selamat Datang di</Text>
            <Text as='b' fontSize='22px' color='blue.500' marginBottom='20px'>Kedai Tangsi !</Text>

            <InputGroup backgroundColor='white'>
              <InputLeftElement children={ <SearchIcon/> } />
              <Input value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} placeholder='search' />
            </InputGroup>


            <Text color='blue.500'>Tenant</Text>
            <div style={{ display:'flex',justifyContent:'space-between',flexWrap:'wrap',width:'100%',paddingBottom:'70px',marginTop:'20px' }}>
              {products.map((product)=>
                product.name.toLowerCase().includes(searchInput.toLocaleLowerCase())?
                <Link to={`/MainMenu/OutletMenu/${product.name}`} style={{ marginBottom:'20px' }}>
                  <div src='' style={{ width:'105.28px',height:'171px',backgroundImage:`url(${ProductImg})`,backgroundSize:'cover',backgroundPosition:'center',borderRadius:'20px' }} />    
                  <Stack maxWidth='105.28px'><Text as='b'>{product.name}</Text></Stack>
                </Link>
                :null
              )}
            </div>    
          </div>
        : (selectedBottomNavbar === 'order') ?

          <div className="main-menu">
            <HStack width='100%' justifyContent='center' alignItems='center' marginBottom='20px'>  
              <Text fontSize='22px' as='b'>Keranjang Order</Text>   
            </HStack>
            

            {/* cart Items */}

            {cart.map(
              (item)=>
                <div style={{ display:'flex',backgroundColor:'white',padding:'10px',borderRadius:'20px',marginBottom:'20px' }}>
                  <Image
                    height='154px'
                    aspectRatio='1/1'
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={item.imgUrl}
                    alt='Caffe Latte'
                    borderRadius='20px'
                    alignItems='flex-start'
                    marginRight='20px'
                  />
    
                  <div style={{ display:'flex',flexDirection:'column',justifyContent:'space-between' }}>
                      <Text fontSize='16px' as='b' >{item.name}</Text>
    
                      <Text>Rp.{item.discountPrice * item.count}</Text>
                      <InputGroup backgroundColor='white' marginBottom='10px'>
                        <InputLeftElement children={ <CreateIcon sx={{ color:'gray' }}/> } />
                        <Input onChange={
                          (e)=> dispatch(actions.writeNote({ id:item.id,note:e.target.value }))
                          } 
                          variant='flushed' value={item.note}  placeholder='search' />
                      </InputGroup>
    
                      <HStack justifyContent='space-between'>
                        <HStack>
                          <IconButton onClick={()=>dispatch(actions.editCount({id:item.id,count:item.count - 1}))} size='sm' colorScheme='blue' variant='outline' borderRadius='50%' icon={<MinusIcon />} />
                          <Text>{item.count}</Text>
                          <IconButton onClick={()=>dispatch(actions.editCount({id:item.id,count:item.count+1}))} size='sm' colorScheme='blue' variant='solid' borderRadius='50%' icon={<AddIcon/>} />
                        </HStack>
                        <IconButton onClick={()=>dispatch(actions.removeCart({id:item.id}))} colorScheme='red' variant='ghost'icon={<DeleteIcon/>} />
                      </HStack>
    
                    
                  </div>
                </div>
                
            )}
            
            {
              (cart.length >0)?
            
              <>
                <div style={{ borderRadius:'20px',backgroundColor:'rgba(159, 188, 213, 0.19)',width:'100%',padding:'16px',marginBottom:'20px' }}>
                  
                  <Table variant='simple'>
                    <Tr>
                      <Td>Nama Pemesan</Td>
                      <Td isNumeric><Input  variant='flushed' textAlign='center' defaultValue='Ara' /></Td>
                    </Tr>
                    <Tr>
                      <Td>Nomor Meja</Td>
                      <Td isNumeric>
                        <InputGroup>
                          <InputLeftElement children={ <CreateIcon sx={{ color:'lightblue' }}/> } />
                          <Input type='number' variant='flushed' textAlign='center' defaultValue='26' />
                        </InputGroup>
                        
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Kantin</Td>
                      <Td isNumeric>
                        <Input  variant='flushed' textAlign='center' defaultValue='Kedai 35' />
                      </Td>
                    </Tr>
                  </Table>
                </div>

                <div style={{ borderRadius:'20px',backgroundColor:'rgba(159, 188, 213, 0.19)',width:'100%',padding:'16px',marginBottom:'20px' }}>
                  <Table variant='simple'>
                    <Tr>
                      <Td>Total Makanan</Td>
                      <Td isNumeric><Text>{cart.length}</Text></Td>
                    </Tr>
                    <Tr>
                      <Td>Metode Pembayaran</Td>
                      <Td isNumeric>
                        <Button colorScheme='red' variant='outline'>Link Aja</Button>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Total Pembayaran</Td>
                      <Td isNumeric>Rp.{getTotalPayment()}</Td>
                    </Tr>
                    
                  </Table>
                </div>
                <Button colorScheme='blue' marginBottom='80px'>Pesan</Button>
                </>

              :
              <div style={{ height:'calc(100vh - 100px)',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center' }}>
                <img src={EmptyCart} style={{ width:'186px',objectFit:'contain' }}/>
                <Text textAlign='center'  fontSize='24px' as='b' marginTop='20px' marginBottom='20px'>Ups Kamu belum menambah menu</Text>
                <Text textAlign='center' marginBottom='20px'>Tambah makanan dulu dong</Text>
              </div>
            }
          </div>



        : (selectedBottomNavbar === 'riwayat') ?

          <div className="main-menu">
            <HStack width='100%' justifyContent='center' alignItems='center' marginBottom='20px'>  
              <Text fontSize='22px' as='b'>Riwayat</Text>   
            </HStack>
            
            {products.map(
              (item)=>
              <div style={{ backgroundColor:'white',padding:'10px',borderRadius:'20px',marginBottom:'80px' }}>

                <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px' }}>
                  <HStack>
                    <ShoppingBagIcon sx={{ color:'#6597BF' }}/>
                    <Text as='b'>01 November 2022</Text>
                  </HStack>
                  
                  <Button colorScheme='blue' variant='ghost'>Selesai</Button>
                </div>
                <div style={{ display:'flex',marginBottom:'20px' }}>
                  <Image
                    height='71px'
                    aspectRatio='1/1'
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={MieGoreng}
                    alt='Caffe Latte'
                    borderRadius='20px'
                    alignItems='flex-start'
                    marginRight='20px'
                  />
                  <div >
                      <Text fontSize='16px' as='b'>Kantin 35</Text>
                      <Text>1 x Rp.15000</Text>
                      <Text color='#7C7979' fontSize='10px'>dan 3 item lainya</Text>
                  </div>
                </div>

                <HStack justifyContent='space-between'>
                  <div>
                    <Text>Total Belanja : </Text>
                    <Text as='b'>Rp.100000</Text>
                  </div>
                  <Button colorScheme='blue' variant='outline'>Detail</Button>
                </HStack>
                
                
              </div>
            )}

          </div>
        :null
        
      }
      
      


      <div className='bottom-navigation-bar'>
        <Link className='link' onClick={()=>setSelectedBottomNavbar('main-menu')}>
          <HomeOutlinedIcon sx={{ color: (selectedBottomNavbar==='main-menu')?'#6898C0':'#B7B7B7' }} />
        </Link>
        <Link className='link' onClick={()=>setSelectedBottomNavbar('order')}>
          <ContentPasteOutlinedIcon sx={{ color:(selectedBottomNavbar==='order')?'#6898C0':'#B7B7B7' }} />
        </Link>
        <Link className='link' onClick={()=>setSelectedBottomNavbar('status-pesanan')}>
          <RestaurantOutlinedIcon  sx={{ color:(selectedBottomNavbar==='status-pesanan')?'#6898C0':'#B7B7B7' }} />
        </Link>
        <Link className='link' onClick={()=>setSelectedBottomNavbar('riwayat')}>
          <HistoryOutlinedIcon  sx={{ color:(selectedBottomNavbar==='riwayat')?'#6898C0':'#B7B7B7' }} />
        </Link>
        
      </div>
    </>
    
  )
}
export default MainMenu;