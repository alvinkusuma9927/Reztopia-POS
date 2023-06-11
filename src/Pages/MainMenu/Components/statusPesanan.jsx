
import {Step,StepDescription,StepIcon,StepIndicator,StepNumber,StepSeparator,StepStatus,StepTitle,Stepper,useSteps,} from '@chakra-ui/react'
import { HStack, IconButton, Input, InputGroup, InputLeftElement, Stack, Text,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, Box, Select,Center, useToast,useDisclosure } from '@chakra-ui/react';
import { Button} from '@chakra-ui/react'

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star'; 
const StatusPesanan = () => {
  const steps = [
    { title: 'Pesanan sedang Diantar', description: 'Atas : nama Ara - Meja no 26', time:'11.05' },
    { title: 'Pesanan sedang Dimasak', description: 'Atas : nama Ara - Meja no 26', time:'10.05' },
    { title: 'Pesanan Dikonfirmasi', description: 'Atas : nama Ara - Meja no 26', time:'09.05' },
    { title: 'Pembayaran Berhasil', description: 'Melalui QR Code, Atas : nama Ara - Meja no 26', time:'08.05' },
    { title: 'Pembayaran Menunggu Konfirmasi', description: 'Atas : nama Ara - Meja no 26', time:'07.05' },
  ]
  const [stepActive,setStepActive] = useState(5);
  const { activeStep } = useSteps({
    index: stepActive,
    count: steps.length,
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalPenilaian,setModalPenilaian] = useState({
    foodRate : 3,
    serviceRate : 2,
    modalPenilaianContent:'rate'
  })
  const  starIconSelected = [1,2,3,4,5]

  return (
    <div className="main-menu">
            <HStack width='100%' justifyContent='center' alignItems='center' marginBottom='20px'>  
              <Text fontSize='22px' as='b'>Status Pesanan</Text>   
            </HStack>

            <Stack>
              <Text as='b'>Status Pemesanan</Text>
            </Stack>
            <Stepper index={activeStep} orientation='vertical' gap='0' marginTop='20px' marginBottom='40px'  width='100%' minHeight='400px'>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box flexShrink='0'>
                    <StepTitle>
                        <HStack>
                          <Text fontSize='12px'>{step.title}</Text>
                          <Text fontSize='12px' color='#7C7979'> ({step.time})</Text>
                        </HStack>
                        
                    </StepTitle>
                    <StepDescription><Text fontSize='10px'>{step.description}</Text></StepDescription>
                  </Box>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>

            {
              stepActive === steps.length ?
              <>
                <Button onClick={onOpen} colorScheme="blue">Beri Penilaian</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />

                  {modalPenilaian.modalPenilaianContent === 'rate' ? 
                    <ModalContent width='414px'>
                      <ModalHeader>Beri Penilaian</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>

                        <Text fontSize='14px' color='#707070'>Bagaimana Masakan Kami?</Text>

                        <HStack>
                          {starIconSelected.map(index=>
                            index <= modalPenilaian.foodRate ?
                            <StarIcon key={index} onClick={()=>
                              setModalPenilaian((modalPenilaian) => ({
                                  ...modalPenilaian,
                                  foodRate:index
                                }))
                            } sx={{ color:'#FFD201',fontSize:'40px',cursor:'pointer' }} />
                            :
                            <StarBorderIcon key={index} onClick={()=>
                              setModalPenilaian((modalPenilaian) => ({
                                ...modalPenilaian,
                                foodRate:index
                              }))
                            } sx={{ color:'#FFD201',fontSize:'40px',cursor:'pointer' }} />
                          )}
                        </HStack>

                        <hr style={{ marginBottom:'20px',marginTop:'20px' }}/>
                        <Text fontSize='14px' color='#707070'>Bagaimana Pelayanan Kami?</Text>

                        <HStack>
                          {starIconSelected.map(index=>
                            index <= modalPenilaian.serviceRate ?
                            <StarIcon key={index} onClick={()=>
                              setModalPenilaian((modalPenilaian) => ({
                                ...modalPenilaian,
                                serviceRate:index
                              }))
                            } sx={{ color:'#FFD201',fontSize:'40px',cursor:'pointer' }} />
                            :
                            <StarBorderIcon key={index} onClick={()=>
                              setModalPenilaian((modalPenilaian) => ({
                                ...modalPenilaian,
                                serviceRate:index
                              }))
                            } sx={{ color:'#FFD201',fontSize:'40px',cursor:'pointer' }} />
                          )}
                        </HStack>

                      </ModalBody>
                      <ModalFooter width='100%'>
                        <Center>
                          <Button onClick={ ()=> {
                            setModalPenilaian((modalPenilaian) => ({
                              ...modalPenilaian,
                              modalPenilaianContent:'ucapan terimakasih'
                            }))
                          } } colorScheme='blue'>Kirim Penilaian</Button>
                        </Center>
                      </ModalFooter>
                    </ModalContent>

                    :
                    <ModalContent width='414px' height='300px'>
                      <ModalCloseButton />
                      <ModalBody display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='100%'>
                        <img src='/public/assets/UcapanTerimakasih'  alt="" style={{ width:'100px',height:'100px',objectFit:'contain' }} />
                        <Text fontSize='22px' as='b'>Terimakasih</Text>
                        <Text>sudah memberikan penilaian</Text>
                      </ModalBody>
                    </ModalContent>
                  }
                  

                  
                </Modal>
              </>
              :null
            }
            
          </div>
  )
}

export default StatusPesanan