import { Button, HStack, Text } from "@chakra-ui/react"
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { actions } from "../../../store";
const Riwayat = () => {
  const apiUrl = useSelector((state)=>state.apiUrl)
  const dispatch = useDispatch()
  const loginSession = useSelector((state)=>state.loginSession)
  const histories = useSelector((state)=>state.histories)
  useEffect(()=>{
    fetch(`${apiUrl}/api/history/index`,{
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
                // setHistories(response.data);
                dispatch(actions.setHistories({value : response.data}))
                console.log('succes fetch history');

              })
          }
          else{
            console.log('unsucces fetch history');
            // setHistories([])
            dispatch(actions.setHistories({value : []}))
          }
        }
      )
      
  },[])
  return (
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
  )
}

export default Riwayat