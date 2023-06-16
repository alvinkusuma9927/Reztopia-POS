import { Button, HStack, IconButton, Input, InputGroup, InputLeftElement, Select, Table, Td, Text, Tr, useDisclosure, useToast } from "@chakra-ui/react"
import {AddIcon, MinusIcon} from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { actions } from "../../../store";
import axios from 'axios';
const Order = () => {
  const apiUrl = useSelector((state)=>state.apiUrl)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const cart = useSelector((state)=>state.cart)
  const [nomorMeja,setNomorMeja] = useState('')
  const loginSession = useSelector((state)=>state.loginSession)
  const order_type_option = useState([
    {value:'',title:'Choose One'},
    {value:'dine_in',title:'Dine In'},
    {value:'take_away',title:'Take Away'}
  ])
  const dispatch = useDispatch()

  

  const getCart = ()=>{
    fetch(`${apiUrl}/api/cart/index`,{
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
                console.log(cart)
              })
          }
          else{
            // console.log(response.status)
            dispatch(actions.setCartValue({newDataCart:[]}))
          }
        }
      )
  }
  

  useEffect(()=>{
    getCart()
  },[])
  useEffect(()=>{
    let count = 0
    for (let item of cart) {
      count += item.total;
    }
  },[cart])

  const toast = useToast(
    {
      containerStyle: {
        width: '380px',
      },
    }
  )
  return (
    <div className="main-menu">
      <HStack width='100%' justifyContent='center' alignItems='center' marginBottom='20px'>  
        <Text fontSize='22px' as='b'>Keranjang Order</Text>   
      </HStack>
      

      {/* cart Items */}
      {cart.map(
        (item,index)=>
          <div key={item.id_product} style={{ display:'flex',backgroundColor:'white',padding:'10px',borderRadius:'20px',marginBottom:'20px',boxShadow:'0px 0px 25px rgba(192, 192, 192, 0.2)' }}>
            <img
              src='/public/assets/AyamGoreng.png'
              alt=''
              style={{ 
                width:'154px',
                height:'154px',
                aspectRatio:'1/1',
                objectFit:'cover',
                borderRadius:'20px',
                alignItems:'flex-start',
                marginRight:'20px'
                }}
              
            />

            <div style={{ display:'flex',flexDirection:'column',justifyContent:'space-between' }}>
                <Text fontSize='16px' as='b' >{item.product_name}</Text>

                <Text fontSize='14px'>Rp. {item.price_final * item.quantity}</Text>
                <InputGroup backgroundColor='white' marginBottom='10px'>
                  <InputLeftElement children={ <CreateIcon sx={{ width:'14px',color:'gray' }}/> } />
                  <Input 
                    variant='flushed' fontSize='14px' defaultValue={item.note}  placeholder='note' />
                </InputGroup>

                <HStack justifyContent='space-between'>
                  <HStack>
                    <IconButton size='xs' colorScheme='blue' variant='outline' borderRadius='50%' icon={<MinusIcon />} aria-label={""}
                      onClick={async() => {
                        
                        await axios.post(`http://${apiUrl}/api/cart/quantity`, 
                          { 
                            id_product:item.id_product,
                            min:1
                          }, 
                          {
                            headers: {
                              Authorization: `${JSON.parse(loginSession).token.token_type} ${JSON.parse(loginSession).token.access_token}`
                            }
                          }
                        ).then(response=>{
                          if(response.status === 200){
                            // response=> console.log(response)
                            getCart()
                          }
                          else{
                            
                          }
                        })
                        
                      }} 
                    />
                    <Text>{item.quantity}</Text>
                    <IconButton size='xs' colorScheme='blue' variant='solid' borderRadius='50%' icon={<AddIcon/>}  aria-label={""}
                      onClick={async() => {
                        
                        await axios.post(`http://${apiUrl}/api/cart/quantity`, 
                          { 
                            id_product:item.id_product,
                            plus:1
                          }, 
                          {
                            headers: {
                              Authorization: `${JSON.parse(loginSession).token.token_type} ${JSON.parse(loginSession).token.access_token}`
                            }
                          }
                        ).then(response=>{
                          if(response.status === 200){
                            // response=> console.log(response)
                            getCart()
                          }
                          else{
                            
                          }
                        })
                        
                      }}
                    />
                  </HStack>
                  <IconButton colorScheme='red' variant='ghost'icon={<DeleteIcon/>}  aria-label={""}
                    onClick={async() => {
                        await axios.post(`http://${apiUrl}/api/cart/delete`,{
                          id_order_detail : item.id
                        },
                        {
                          headers:{
                            Authorization: `${JSON.parse(loginSession).token.token_type} ${JSON.parse(loginSession).token.access_token}`
                          }
                        }
                      ).then(response => {
                        if(response.status === 200){
                          // response=> console.log(response)
                          getCart()
                        }
                        else{
                          
                        }
                      })
                    }}
                  />
                </HStack>

              
            </div>
          </div>
          
      )}
      
      {
        (cart.length >0)?
      
        <>
          <div style={{ borderRadius:'20px',backgroundColor:'rgba(159, 188, 213, 0.19)',width:'100%',padding:'16px',marginBottom:'20px' }}>
            
            <Table variant='simple' width='100%'>
              <Tr>
                <Td>Nama Pemesan</Td>
                <Td isNumeric>{JSON.parse(loginSession).name}</Td>
              </Tr>
              <Tr>
                <Td>Order Type</Td>
                <Td isNumeric>
                  <Select size='sm' id='order_type'>
                    {
                      order_type_option[0].map(
                        (type,index) => 
                          <option key={index} value={type.value} >{type.title}</option>
                      )
                    }
                    
                  </Select>
                </Td>
              </Tr>
              <Tr>
                <Td>Nomor Meja</Td>
                <Td isNumeric><Input value={nomorMeja} onChange={(e)=>setNomorMeja(e.target.value)} placeholder="Nomor Meja"/></Td>
              </Tr>
              <Tr>
                <Td>Kantin</Td>
                <Td isNumeric>
                  {cart[0].name}
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
                  <Button colorScheme='teal' variant='solid'
                    onClick={ async()=>{
                      if(nomorMeja === '' || document.getElementById('order_type').value === ''){
                        toast({
                          title: 'Error',
                          description: `Harap mengisi nomor meja dan tipe order!`,
                          status: 'error',
                          duration: 2500,
                          isClosable: true,
                          variant:'subtle',
                          position: 'top',
                        })
                      }
                      else{
                        console.log({
                          id_order : cart[0].id_order,
                          table_number : nomorMeja,
                          order_type : document.getElementById('order_type').value,
                        })
                        // await axios.post(`http://${apiUrl}/api/cart/checkout`, 
                        //   {
                        //     id_order : cart[0].id_order,
                        //     table_number : nomorMeja,
                        //     order_type : document.getElementById('order_type').value,
                        //   }, 
                        //   {
                        //     headers: {
                        //       Authorization: `${JSON.parse(loginSession).token.token_type} ${JSON.parse(loginSession).token.access_token}`
                        //     }
                        //   }
                        // ).then(response=>{
                        //   if(response.status === 200){
                        //     // response=> console.log(response)
                        //     getCart()
                        //   }
                        //   else{
                            
                        //   }
                        // })
                        
                      }
                      
                    }}
                  >Bayar</Button>
                </Td>
              </Tr>
              <Tr>
                <Td>Total Pembayaran</Td>
                <Td isNumeric>Rp. {cart[0].total}</Td>
              </Tr>
              
            </Table>
          </div>
          <Button onClick={()=>{
            if(nomorMeja === '' || document.getElementById('order_type').value === ''){
              toast({
                title: 'Error',
                description: `Harap mengisi nomor meja dan tipe order!`,
                status: 'error',
                duration: 2500,
                isClosable: true,
                variant:'subtle',
                position: 'top',
              })
            }
          }} colorScheme='blue' marginBottom='80px'>Pesan</Button>
          </>

        :
        <div style={{ height:'calc(100vh - 100px)',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center' }}>
          <img src='/public/assets/EmptyCart.png' alt="EmptyCart" style={{ width:'186px',height:'100px',objectFit:'contain' }} />
          <Text textAlign='center'  fontSize='24px' as='b' marginTop='20px' marginBottom='20px'>Ups Kamu belum menambah menu</Text>
          <Text textAlign='center' marginBottom='20px'>Tambah makanan dulu dong</Text>
        </div>
      }
    </div>
  )
}

export default Order