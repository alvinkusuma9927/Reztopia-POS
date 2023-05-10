import { Button, Center, HStack, Input, Text } from '@chakra-ui/react'
import '../../assets/Login.css'
import LogoImg from '../../assets/Logo.png'
import WelcomeImg from '../../assets/Welcome.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../store'
import { useEffect } from 'react'
import loginSessionAuth from '../../Auth/LoginSession'

const Login = ()=>{
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [emailInput,setEmailInput] = useState('')
  const [passwordInput,setPasswordInput] = useState('')

  // Check sessionLogin {
  const loginSession = useSelector((state)=>state.loginSession)
  useEffect(() => {
    if(loginSessionAuth(window.location.href.split('/')[3],loginSession)){
      navigate('/MainMenu')
    }
  }, [loginSession]);
  // }

  const submitLogin = ()=>{
    event.preventDefault()
    if(emailInput === 'admin@email.com' && passwordInput === '12345'){
      dispatch(actions.login({email:emailInput,password:passwordInput}))
    }
    else{
      toast({
        title: 'Wrong email/password ! .',
        description: "Try Again input",
        status: 'error',
        duration: 3000,
        isClosable: true,
        variant:'subtle',
      })

    }
  }
  const toast = useToast()
  return(
    <form action='' className="main-login" onSubmit={()=>submitLogin()}>
      <Center>
        <img src={LogoImg} className='logo-img' alt="" />
      </Center>
      <img src={WelcomeImg} className='welcome-img' marginBottom='40px' alt="" />
      
      
      <Text as='b' alignSelf='flex-start' color='#6597BF'>Email</Text>
      <Input name='emailInput' type='email'  marginBottom='20px' value={emailInput} onChange={(e)=>{setEmailInput(e.target.value)}} required/>

      <Text as='b' alignSelf='flex-start' color='#6597BF'>Password</Text>
      <Input  name='passwordInput' type='password'  marginBottom='20px' value={passwordInput} onChange={(e)=>{setPasswordInput(e.target.value)}}   required/>


      <Text  alignSelf='flex-end' cursor='pointer' color='blue.500' marginBottom='20px'>Forgot Password?</Text>
      <Button type='submit' width='100%' height='64px' colorScheme='blue' marginBottom='20px'>Login</Button>
      <Button width='100%' height='64px' variant='outline' marginBottom='20px'>Login with SSO</Button>

      <div onClick={()=>{navigate('/SignUp')}} style={{ cursor:'pointer',display:'flex',justifyContent:'center' }}>
        <Text marginRight='5px'>New To Brand?</Text>
        <Text as='b' color='blue.500'>Sign Up</Text>
      </div>
      
    </form>
  )
}
export default Login;