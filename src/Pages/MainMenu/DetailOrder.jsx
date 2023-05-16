import { useParams } from 'react-router-dom'
import "../../../public/assets/MainMenu.css"
import { Image,Button, Center, HStack, Input, InputGroup, InputLeftElement, Stack, Text, useDisclosure,  Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, useToast, Box, } from '@chakra-ui/react';
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

const DetailOrder = ()=>{
  const navigate = useNavigate();
  // Check sessionLogin
  const loginSession = useSelector((state)=>state.loginSession)
  useEffect(() => {
    if(!loginSessionAuth(window.location.href.split('/')[3],loginSession)){
      navigate('/Login')
    }
    console.log(loginSessionAuth(window.location.href.split('/')[3],loginSession))
  }, [loginSession]);
  // }
  return (
    <div className="main-menu">
      <HStack width='100%' justifyContent='space-between' alignItems='center' marginBottom='40px'>
        <ArrowBackIosOutlinedIcon  onClick={()=>navigate(-1)} cursor='pointer' />
        <Text fontSize='22px' as='b'>Detail Order</Text>
        <LocalGroceryStoreOutlinedIcon sx={{ color:'#6697BF' }}/>
      </HStack>
      
      <Text color='blue.600'>Sudah Dibayar</Text>
      <Text>Kode Pembayaran</Text>
      <Text fontSize='24px' as='b'>XYZKA10P</Text>

      <HStack  marginBottom='40px'  marginTop='20px' justifyContent='space-between'>
        <Text fontSize='12px' color='#7C7979'>Tanggal Pembelian</Text>
        <Text fontSize='12px'>01 November 2022, 18:15 WIB</Text>
      </HStack>

      
      <Text marginBottom='10px'  as='b'>Detail Product</Text>

      <Box marginBottom='20px' borderRadius='20px' backgroundColor='white' padding='25px' boxShadow='0px 0px 25px rgba(192, 192, 192, 0.2)' >
        <div style={{ display:'flex',marginBottom:'20px' }}>
          <Image
            height='71px'
            aspectRatio='1/1'
            objectFit='cover'
            maxW={{ base: '100%', sm: '200px' }}
            src={getStaticImg('MieGoreng')}
            alt='Caffe Latte'
            borderRadius='20px'
            alignItems='flex-start'
            marginRight='20px'
          />
          <div >
              <Text fontSize='16px' as='b'>Kantin 35</Text>
              <Text>1 x Rp.15000</Text>
              
          </div>
        </div>
        <div style={{ display:'flex',marginBottom:'20px' }}>
          <Image
            height='71px'
            aspectRatio='1/1'
            objectFit='cover'
            maxW={{ base: '100%', sm: '200px' }}
            src={getStaticImg('MieGoreng')}
            alt='Caffe Latte'
            borderRadius='20px'
            alignItems='flex-start'
            marginRight='20px'
          />
          <div >
              <Text fontSize='16px' as='b'>Kantin 35</Text>
              <Text>1 x Rp.15000</Text>
              
          </div>
        </div>
        <div style={{ display:'flex',marginBottom:'20px' }}>
          <Image
            height='71px'
            aspectRatio='1/1'
            objectFit='cover'
            maxW={{ base: '100%', sm: '200px' }}
            src={getStaticImg('MieGoreng')}
            alt='Caffe Latte'
            borderRadius='20px'
            alignItems='flex-start'
            marginRight='20px'
          />
          <div >
              <Text fontSize='16px' as='b'>Kantin 35</Text>
              <Text>1 x Rp.15000</Text>
              
          </div>
        </div>


        <hr />
        <HStack justifyContent='space-between' marginTop='10px'>
          <Text color='blue.600'>Total</Text>
          <Text color='blue.600'>100.000</Text>
        </HStack>
      </Box>

      <Box borderRadius='20px' backgroundColor='white' padding='25px' boxShadow='0px 0px 25px rgba(192, 192, 192, 0.2)' marginBottom='60px'>
        <Text as='b'>Rincian Pembayaran</Text>
        <HStack marginTop='20px' justifyContent='space-between'>
          <Text fontSize='12px' color='#7C7979'>Nama Pemesan</Text>
          <Text fontSize='12px'>Ara</Text>
        </HStack>
        <HStack justifyContent='space-between'>
          <Text fontSize='12px' color='#7C7979'>Nomor Meja</Text>
          <Text fontSize='12px'>26</Text>
        </HStack>
        <HStack justifyContent='space-between'>
          <Text fontSize='12px' color='#7C7979'>Keterangan</Text>
          <Text fontSize='12px'>Dine In</Text>
        </HStack>
        <HStack justifyContent='space-between'>
          <Text fontSize='12px' color='#7C7979'>Kantin Kedai 35</Text>
          <Text fontSize='12px'>Ara</Text>
        </HStack>
        <hr style={{ marginTop:'20px',marginBottom:'20px' }}/>
        <HStack justifyContent='space-between'>
          <Text fontSize='12px' color='#7C7979'>Metode Pembayaran</Text>
          <Text fontSize='12px'>Cash</Text>
        </HStack>
        <hr style={{ marginTop:'20px',marginBottom:'20px' }}/>
        <HStack justifyContent='space-between'>
          <Text fontSize='12px' color='#7C7979'>Total Harga</Text>
          <Text fontSize='12px'>Rp.100000</Text>
        </HStack>
        <HStack justifyContent='space-between'>
          <Text fontSize='12px' color='#7C7979'>Diskon Kode Promo</Text>
          <Text fontSize='12px'>-0</Text>
        </HStack>
        <hr style={{ marginTop:'20px',marginBottom:'20px' }}/>
        <HStack justifyContent='space-between'>
          <Text as='b' >Total Belanja</Text>
          <Text as='b' >Rp. 1000000</Text>
        </HStack>
        
        
      </Box>

    </div>
  )
}
export default DetailOrder