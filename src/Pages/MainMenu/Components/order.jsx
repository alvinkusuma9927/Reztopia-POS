import { Button, HStack, IconButton, Input, InputGroup, InputLeftElement, Select, Table, Td, Text, Tr, useDisclosure, useToast } from "@chakra-ui/react"
import {AddIcon, MinusIcon} from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
const Order = () => {
  const apiUrl = useSelector((state)=>state.apiUrl)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const cart = useSelector((state)=>state.cart)
  const [nomorMeja,setNomorMeja] = useState('')
  const loginSession = useSelector((state)=>state.loginSession)

  const dispatch = useDispatch()

  const [totalPayment,setTotalPayment] = useState(0)

  
  useEffect(()=>{
    let count = 0
    for (let item of cart) {
      count += item.total;
    }
    console.log(cart)
    setTotalPayment(count)
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
                <Text fontSize='16px' as='b' >{item.name}</Text>

                <Text fontSize='14px'>Rp. {item.total}</Text>
                <InputGroup backgroundColor='white' marginBottom='10px'>
                  <InputLeftElement children={ <CreateIcon sx={{ width:'14px',color:'gray' }}/> } />
                  <Input 
                    // onChange={
                    //   (e)=> dispatch(actions.writeNote({ id_product:item.id_product,id_outlet:item.id_outlet,note:e.target.value }))
                    // } 
                    variant='flushed' fontSize='14px' value={item.note}  placeholder='search' />
                </InputGroup>

                <HStack justifyContent='space-between'>
                  <HStack>
                    <IconButton size='xs' colorScheme='blue' variant='outline' borderRadius='50%' icon={<MinusIcon />} aria-label={""}
                      onClick={async() => {
                        await fetch(`http://${apiUrl}/api/cart/quantity`,
                          {
                            method:'POST',
                            headers:{
                              Authorization: `${JSON.parse(loginSession).token.token_type} ${JSON.parse(loginSession).token.access_token}`
                            },
                            body: JSON.stringify(
                              { 
                                id_product:item.id_product,
                                min:1
                              }
                            )
                          }
                        ).then(response=>{
                          if(response.status === 200){
                            response.json().then(
                              response=> console.log(response)
                            )
                          }
                        })
                      }} 
                    />
                    {/* <Text>{item.count}</Text> */}
                    <Text>{item.quantity}</Text>
                    <IconButton size='xs' colorScheme='blue' variant='solid' borderRadius='50%' icon={<AddIcon/>}  aria-label={""}
                      onClick={async() => {
                        await fetch(`http://${apiUrl}/api/cart/quantity`,
                          {
                            method:'POST',
                            headers:{
                              Authorization: `${JSON.parse(loginSession).token.token_type} ${JSON.parse(loginSession).token.access_token}`
                            },
                            body: JSON.stringify(
                              { 
                                id_product:item.id_product,
                                plus:1
                              }
                            )
                          }
                        ).then(response=>{
                          if(response.status === 200){
                            response.json().then(
                              response=> console.log(response)
                            )
                          }
                        })
                      }} 
                    />
                  </HStack>
                  <IconButton colorScheme='red' variant='ghost'icon={<DeleteIcon/>}  aria-label={""}
                    onClick={() => {dispatch(actions.removeCart({id_product:item.id_product,id_outlet:item.id_outlet}))}}
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
                <Td></Td>
                <Td isNumeric>
                  <Select size='sm' defaultValue='dine_in'>
                    <option value='dineIn' selected>Dine In</option>
                    <option value='takeAway'>Take Away</option>
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
                  <Button colorScheme='red' variant='outline'>Link Aja</Button>
                </Td>
              </Tr>
              <Tr>
                <Td>Total Pembayaran</Td>
                <Td isNumeric>Rp. {totalPayment}</Td>
              </Tr>
              
            </Table>
          </div>
          <Button onClick={()=>{
            if(nomorMeja === ''){
              toast({
                title: 'Error',
                description: "Harap mengisi nomor meja~",
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