import { Link, useNavigate } from 'react-router-dom'
import "/public/assets/MainMenu.css"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { HStack, Text } from '@chakra-ui/react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../../store'
const BottomNavbar = (props)=>{
  const dispatch = useDispatch()
  return(
    <div className='bottom-navigation-bar'>
        <Link to='/MainMenu/dashboard' onClick={()=>{dispatch(actions.setBottomNavbar({value : 'dashboard'}))}} className="link" >
          <HomeOutlinedIcon sx={{ color: (props.params === 'dashboard' || props.params === undefined)?'#6898C0':'#B7B7B7'   }} />
        </Link>
        <Link to='/MainMenu/order' onClick={()=>{dispatch(actions.setBottomNavbar({value : 'order'}))}} className="link" >
          <ContentPasteOutlinedIcon sx={{ color:(props.params === 'order')?'#6898C0':'#B7B7B7' }} />
        </Link>
      
        <Link to='/MainMenu/riwayat' onClick={()=>{dispatch(actions.setBottomNavbar({value : 'riwayat'}))}} className="link" >
          <HistoryOutlinedIcon  sx={{ color:(props.params === 'riwayat')?'#6898C0':'#B7B7B7' }} />
        </Link>

        <Link to='/MainMenu/akun' onClick={()=>{dispatch(actions.setBottomNavbar({value : 'akun'}))}} className="link" >
          <AccountCircleIcon  sx={{ color:(props.params === 'akun')?'#6898C0':'#B7B7B7' }} />
        </Link>
    </div>
  )
}
export default BottomNavbar