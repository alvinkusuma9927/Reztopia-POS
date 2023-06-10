import { HStack, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"

const Akun = () => {
  const bottomNavbarSelected = useSelector((state)=>state.bottomNavbarSelected)
  return (
    <div className="main-menu">
      <HStack width='100%' justifyContent='center' alignItems='center' marginBottom='20px'>  
        <Text fontSize='22px' as='b'>Akun</Text>   
      </HStack>
    </div>
  )
}

export default Akun