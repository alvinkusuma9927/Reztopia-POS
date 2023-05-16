const loginSessionAuth = (url,loginSession)=>{
  try {
    loginSession = JSON.parse(loginSession)
  } catch (error) {
    return false
  }
  
  if(url === 'Login' || url === 'SignUp'){
    if(  (loginSession.hasOwnProperty('token')) ){
      return true
    }
    else{
      return false
    }
    
  }
  else{
    if(  (loginSession.hasOwnProperty('token')) ){
      return true
    }
    else{
      return false
    }
  }
}
export default loginSessionAuth