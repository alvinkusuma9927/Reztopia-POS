
import { Button, HStack, Input, Stack, Table, Td, Text, Tr, useDisclosure } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { actions } from "../../../store"
import { useNavigate } from "react-router-dom"

const Akun = (props) => {
  const loginSession = JSON.parse(props.loginSession)
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  return (
    <div className="main-menu" style={{ paddingBottom:'70px',minHeight:'70vh' }}>
      <HStack width='100%' justifyContent='center' alignItems='center' marginBottom='20px'>  
        <Text fontSize='22px' as='b'>Akun</Text>   
      </HStack>


      <Stack justifyContent='space-between' minHeight='70vh'>
        <Table>
          <Tr>
            <Td><Text as='b'>Name</Text></Td>
            <Td><Input value={loginSession.name} /></Td>
          </Tr>
          <Tr>
            <Td><Text as='b'>Email</Text></Td>
            <Td><Input value={loginSession.email} /></Td>
          </Tr>
          <Tr>
            <Td><Text as='b'>Phone</Text></Td>
            <Td><Input value='081231526295' /></Td>
          </Tr>
        </Table>
        <Button colorScheme="red" variant='outline' 
          onClick={onOpen} >
          Logout
        </Button>
      </Stack>
      

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <Text>Apakah anda yakin akan logout ? </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} 
              onClick={
                ()=>{
                  dispatch(actions.logout());
                  navigate(0)
                }
              }
            >
              Logout
            </Button>
            <Button variant='ghost' onClick={onClose}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Akun