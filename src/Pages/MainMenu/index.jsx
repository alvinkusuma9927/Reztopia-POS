"use client"
import "/public/assets/MainMenu.css"





import { actions } from "../../store"; 






// sessionLogin
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loginSessionAuth from "../../Auth/LoginSession";


import LoadingScreen from "../../Components/LoadingScreen";
import { Link, useNavigate, useParams } from "react-router-dom";
import BottomNavbar from "./Components/BottomNavbar";
import Dashboard from "./Components/dashboard";
import Order from "./Components/order";
import Riwayat from "./Components/riwayat";
import Akun from "./Components/akun";


const MainMenu = ()=>{
  const apiUrl = useSelector((state)=>state.apiUrl)
  const isLoadingPage = useSelector((state)=>state.isLoadingPage)
  const url = useParams()
  const bottomNavbarSelected = useSelector((state)=>state.bottomNavbarSelected)
  const dispatch = useDispatch()
  dispatch(actions.setBottomNavbar({value:url.section}))
  
  
  const navigate = useNavigate()
  

  
  
  const loginSession = useSelector((state)=>state.loginSession)
  
  useEffect(() => {
    // Check sessionLogin
    if(!loginSessionAuth(window.location.href.split('/')[3],loginSession)){
      navigate('/Login')
    }
    else{
      if (bottomNavbarSelected === 'dashboard'){
        dispatch(actions.setBottomNavbar({value : 'dashboard'}))
      }
      else if (bottomNavbarSelected === 'order'){
        dispatch(actions.setBottomNavbar({value : 'order'}))
      }
      else if (bottomNavbarSelected === 'riwayat'){
        dispatch(actions.setBottomNavbar({value : 'riwayat'}))
      }
      else if(bottomNavbarSelected === 'akun'){
        
        dispatch(actions.setBottomNavbar({value : 'akun'}))
      }
      else{
        dispatch(actions.setBottomNavbar({value : 'dashboard'}))
        navigate('/MainMenu/')
      }  
    }
    dispatch(actions.setIsloading({value:false}))
    
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
          <></>

        // Riwayat
        : (bottomNavbarSelected === 'riwayat') ?

          <Riwayat />
        


        : (bottomNavbarSelected === 'akun') ?
        
            <Akun loginSession = {loginSession} />

        :null
        
      }
      
      


      <BottomNavbar params={url.section} />
    </>
    
  )
}
export default MainMenu;