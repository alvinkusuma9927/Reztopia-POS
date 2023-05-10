import { Button, Center, HStack, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import '../../assets/Login.css'
import { ViewIcon } from '@chakra-ui/icons'
import LogoImg from '../../assets/Logo.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import loginSessionAuth from '../../Auth/LoginSession'
const SignUp = ()=>{
  const navigate = useNavigate()
  const [namaLengkapInput,setNamaLengkapInput] = useState('')
  const [emailInput,setEmailInput] = useState('')
  const [passwordInput,setPasswordInput] = useState('')
  const [isVisiblePassword,setIsVisiblePassword] = useState(false)
  // Check sessionLogin {
    const loginSession = useSelector((state)=>state.loginSession)
    useEffect(() => {
      if(loginSessionAuth(window.location.href.split('/')[3],loginSession)){
        navigate('/MainMenu')
      }
    }, [loginSession]);
    // }

  return(
    <form action='' className="main-login" onSubmit={()=>{event.preventDefault()}}>
      <Center>
        <img src={LogoImg} className='logo-img' alt="" />
      </Center>
      

      <Text  as='b' alignSelf='flex-start' color='#6597BF' marginTop='40px'>Full Name</Text>
      <Input name='namaLengkapInput' marginBottom='20px' value={namaLengkapInput} onChange={(e)=>{setNamaLengkapInput(e.target.value)}} required/>

      <Text  as='b' alignSelf='flex-start' color='#6597BF'>Email</Text>
      <Input name='emailInput' type='email' marginBottom='20px' value={emailInput} onChange={(e)=>{setEmailInput(e.target.value)}} required/>

      <Text  as='b' alignSelf='flex-start' color='#6597BF' >Password</Text>
      <InputGroup alignItems='center' marginBottom='20px'>
        <Input  name='passwordInput' type={isVisiblePassword ? 'text' : 'password'} value={passwordInput} onChange={(e)=>{setPasswordInput(e.target.value)}}   required/>
        <InputRightElement cursor='pointer' onClick={()=>{setIsVisiblePassword(!isVisiblePassword)}} children={ <ViewIcon /> } />
      </InputGroup>

      <HStack marginBottom='20px'>
        <Text>i accept the</Text>
        <Text  as='b' color='#6597BF'>Therm & Condition</Text>
      </HStack>

      <Button type='submit' width='100%' height='64px' colorScheme='blue' marginBottom='20px'>Create Account</Button>

      <Center onClick={()=>{navigate('/Login')}} cursor='pointer' marginBottom='20px'>
        <Text marginRight='5px'>Exiting Member?</Text>
        <Text  as='b' color='#6597BF'>Sign In</Text>
      </Center>
      
    </form>
  )
}
export default SignUp