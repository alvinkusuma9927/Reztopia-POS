import { Button, Stack } from '@chakra-ui/react'

const LoadingScreen = () => {
  return (
    <Stack width='100%' height='100vh' position='fixed' backgroundColor='rgb(255,255,255,0.5)' align='center' justifyContent='center' zIndex='1000'>
      <Button isLoading colorScheme='blue' variant='solid' disabled>
      </Button>
    </Stack>
  )
}

export default LoadingScreen