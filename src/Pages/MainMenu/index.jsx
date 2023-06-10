"use client"
import "/public/assets/MainMenu.css"
import { HStack, IconButton, Input, InputGroup, InputLeftElement, Stack, Text,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, Box, Select,Center, useToast,useDisclosure } from '@chakra-ui/react';



import { Button} from '@chakra-ui/react'

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import { actions } from "../../store"; 


import {Step,StepDescription,StepIcon,StepIndicator,StepNumber,StepSeparator,StepStatus,StepTitle,Stepper,useSteps,
} from '@chakra-ui/react'



// sessionLogin
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loginSessionAuth from "../../Auth/LoginSession";


import LoadingScreen from "../../Components/LoadingScreen";
import { Link, useNavigate, useParams } from "react-router-dom";
import BottomNavbar from "./Components/BottomNavbar";
import Akun from "./Akun";
import Dashboard from "./Components/dashboard";
import Order from "./Components/order";


const MainMenu = ()=>{
  const apiUrl = useSelector((state)=>state.apiUrl)
  const isLoadingPage = useSelector((state)=>state.isLoadingPage)
  const url = useParams()
  const bottomNavbarSelected = useSelector((state)=>state.bottomNavbarSelected)
  const dispatch = useDispatch()
  dispatch(actions.setBottomNavbar({value:url.section}))
  
  
  const navigate = useNavigate()
  
  
  const [histories,setHistories] = useState([]) 
  
  
  const steps = [
    { title: 'Pesanan sedang Diantar', description: 'Atas : nama Ara - Meja no 26', time:'11.05' },
    { title: 'Pesanan sedang Dimasak', description: 'Atas : nama Ara - Meja no 26', time:'10.05' },
    { title: 'Pesanan Dikonfirmasi', description: 'Atas : nama Ara - Meja no 26', time:'09.05' },
    { title: 'Pembayaran Berhasil', description: 'Melalui QR Code, Atas : nama Ara - Meja no 26', time:'08.05' },
    { title: 'Pembayaran Menunggu Konfirmasi', description: 'Atas : nama Ara - Meja no 26', time:'07.05' },
  ]
  const [stepActive,setStepActive] = useState(5);
  const { activeStep } = useSteps({
    index: stepActive,
    count: steps.length,
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalPenilaian,setModalPenilaian] = useState({
    foodRate : 3,
    serviceRate : 2,
    modalPenilaianContent:'rate'
  })
  const  starIconSelected = [1,2,3,4,5]
  const loginSession = useSelector((state)=>state.loginSession)
  
  useEffect(() => {
    // Check sessionLogin
    if(!loginSessionAuth(window.location.href.split('/')[3],loginSession)){
      navigate('/Login')
    }
    else{
      if (bottomNavbarSelected === 'order'){
        // fetch cart
        fetch(`http://${apiUrl}/api/cart/index`,{
          method:'GET',
          headers:{
            Authorization: `${JSON.parse(loginSession).token.token_type} ${JSON.parse(loginSession).token.access_token}`
          }
        })
          .then(
            response => {
              if(response.status === 200){
                response.json()
                  .then(response => {
                    dispatch(actions.setCartValue({newDataCart:response.data}))
                    console.log('succes fetch cart');
                  })
              }
              else{
                console.log(response.status)
                dispatch(actions.setCartValue({newDataCart:[]}))
              }
            }
          )
        dispatch(actions.setBottomNavbar({value : 'order'}))

      }
      else if (bottomNavbarSelected === 'riwayat'){
        
          fetch(`http://${apiUrl}/api/history/index`,{
            method:'GET',
            headers:{
              Authorization: `${JSON.parse(loginSession).token.token_type} ${JSON.parse(loginSession).token.access_token}`
            }
          })
          .then(
            response => {
              if(response.status === 200){
                response.json() 
                  .then(response => {
                    setHistories(response.data);
                    console.log('succes fetch history');
                  })
              }
              else{
                console.log('unsucces fetch history');
                setHistories([])
              }
            }
          )
          dispatch(actions.setBottomNavbar({value : 'riwayat'}))
      }
      else if(bottomNavbarSelected === 'akun'){
        
        dispatch(actions.setBottomNavbar({value : 'akun'}))
      }
      else{
        dispatch(actions.setBottomNavbar({value : 'dashboard'}))
        navigate('/MainMenu/')
      }  
      dispatch(actions.setIsloading({value:false}))
    }
    
  }, [bottomNavbarSelected]);

  


  
  return(
    <>
      {
        isLoadingPage ? <LoadingScreen/> : null
      }
      {
        (bottomNavbarSelected === 'dashboard' || bottomNavbarSelected === undefined) ?
          <Dashboard/>
        : (bottomNavbarSelected === 'order') ?

          <Order/>


        // Status Pesanan
        : (bottomNavbarSelected === 'status-pesanan')?
        
          <div className="main-menu">
            <HStack width='100%' justifyContent='center' alignItems='center' marginBottom='20px'>  
              <Text fontSize='22px' as='b'>Status Pesanan</Text>   
            </HStack>

            <Stack>
              <Text as='b'>Status Pemesanan</Text>
            </Stack>
            <Stepper index={activeStep} orientation='vertical' gap='0' marginTop='20px' marginBottom='40px'  width='100%' minHeight='400px'>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box flexShrink='0'>
                    <StepTitle>
                        <HStack>
                          <Text fontSize='12px'>{step.title}</Text>
                          <Text fontSize='12px' color='#7C7979'> ({step.time})</Text>
                        </HStack>
                        
                    </StepTitle>
                    <StepDescription><Text fontSize='10px'>{step.description}</Text></StepDescription>
                  </Box>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>

            {
              stepActive === steps.length ?
              <>
                <Button onClick={onOpen} colorScheme="blue">Beri Penilaian</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />

                  {modalPenilaian.modalPenilaianContent === 'rate' ? 
                    <ModalContent width='414px'>
                      <ModalHeader>Beri Penilaian</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>

                        <Text fontSize='14px' color='#707070'>Bagaimana Masakan Kami?</Text>

                        <HStack>
                          {starIconSelected.map(index=>
                            index <= modalPenilaian.foodRate ?
                            <StarIcon key={index} onClick={()=>
                              setModalPenilaian((modalPenilaian) => ({
                                  ...modalPenilaian,
                                  foodRate:index
                                }))
                            } sx={{ color:'#FFD201',fontSize:'40px',cursor:'pointer' }} />
                            :
                            <StarBorderIcon key={index} onClick={()=>
                              setModalPenilaian((modalPenilaian) => ({
                                ...modalPenilaian,
                                foodRate:index
                              }))
                            } sx={{ color:'#FFD201',fontSize:'40px',cursor:'pointer' }} />
                          )}
                        </HStack>

                        <hr style={{ marginBottom:'20px',marginTop:'20px' }}/>
                        <Text fontSize='14px' color='#707070'>Bagaimana Pelayanan Kami?</Text>

                        <HStack>
                          {starIconSelected.map(index=>
                            index <= modalPenilaian.serviceRate ?
                            <StarIcon key={index} onClick={()=>
                              setModalPenilaian((modalPenilaian) => ({
                                ...modalPenilaian,
                                serviceRate:index
                              }))
                            } sx={{ color:'#FFD201',fontSize:'40px',cursor:'pointer' }} />
                            :
                            <StarBorderIcon key={index} onClick={()=>
                              setModalPenilaian((modalPenilaian) => ({
                                ...modalPenilaian,
                                serviceRate:index
                              }))
                            } sx={{ color:'#FFD201',fontSize:'40px',cursor:'pointer' }} />
                          )}
                        </HStack>

                      </ModalBody>
                      <ModalFooter width='100%'>
                        <Center>
                          <Button onClick={ ()=> {
                            setModalPenilaian((modalPenilaian) => ({
                              ...modalPenilaian,
                              modalPenilaianContent:'ucapan terimakasih'
                            }))
                          } } colorScheme='blue'>Kirim Penilaian</Button>
                        </Center>
                      </ModalFooter>
                    </ModalContent>

                    :
                    <ModalContent width='414px' height='300px'>
                      <ModalCloseButton />
                      <ModalBody display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='100%'>
                        <img src='/public/assets/UcapanTerimakasih'  alt="" style={{ width:'100px',height:'100px',objectFit:'contain' }} />
                        <Text fontSize='22px' as='b'>Terimakasih</Text>
                        <Text>sudah memberikan penilaian</Text>
                      </ModalBody>
                    </ModalContent>
                  }
                  

                  
                </Modal>
              </>
              :null
            }
            
          </div>




        // Riwayat
        : (bottomNavbarSelected === 'riwayat') ?

          <div className="main-menu" style={{ paddingBottom:'70px' }}>
            <HStack width='100%' justifyContent='center' alignItems='center' marginBottom='20px'>  
              <Text fontSize='22px' as='b'>Riwayat</Text>   
            </HStack>
            
            {histories.map(
              (item,index)=>
              <div key={index} style={{ backgroundColor:'white',padding:'10px',borderRadius:'20px',marginBottom:'20px',boxShadow:'0px 0px 25px rgba(192, 192, 192, 0.2)' }}>

                <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px' }}>
                  <HStack>
                    <ShoppingBagIcon sx={{ color:'#6597BF' }}/>
                    <Text as='b'>01 November 2022</Text>
                  </HStack>
                  
                  <Button colorScheme='blue' variant='ghost'>Selesai</Button>
                </div>

                <div style={{ display:'flex',marginBottom:'20px' }}>
                  <img
                    src='/public/assets/MieGoreng.png'
                    alt='Caffe Latte'

                    style={{ 
                      width:'71px',
                      height:'71px',
                      aspectRatio:'1/1',
                      objectFit:'cover',
                      borderRadius:'20px',
                      alignItems:'flex-start',
                      marginRight:'20px'
                     }}
                    
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

                  <Link to='/DetailOrder' >
                    <Button   colorScheme='blue' variant='outline'>Detail</Button>
                  </Link>
                  
                </HStack>
              </div>
            )}

          </div>
        


        : (bottomNavbarSelected === 'akun') ?
        
            <Akun/>

        :null
        
      }
      
      


      <BottomNavbar params={url.section} />
    </>
    
  )
}
export default MainMenu;