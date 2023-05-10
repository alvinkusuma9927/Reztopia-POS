const loginSessionAuth = (url,loginSession)=>{
  if(url === 'Login'){
    if(  (loginSession.email !== undefined && loginSession.password !== undefined) && (loginSession.email !== '' && loginSession.password !== '') ){
      return true
    }
    else{
      return false
    }
  }
  else{
    if(  (loginSession.email !== undefined && loginSession.password !== undefined) && (loginSession.email !== '' && loginSession.password !== '') ){
      return true
    }
    else{
      return false
    }
  }
}
export default loginSessionAuth