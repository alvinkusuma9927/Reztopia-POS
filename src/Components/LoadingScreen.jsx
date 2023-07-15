import { Button, Image, Stack, Text } from "@chakra-ui/react";

const LoadingScreen = () => {
  return (
    <Stack
      width="100%"
      height="100vh"
      position="absolute"
      top="0px"
      backgroundColor="rgb(255,255,255,1)"
      align="center"
      justifyContent="center"
      zIndex="1000"
    >
      <Image
        src="/assets/Loading.png"
        width="186px"
        height="100px"
        objectFit="contain"
      />
      <Text
        textAlign="center"
        fontSize="24px"
        as="b"
        marginTop="20px"
        marginBottom="20px"
      >
        Tunggu Sebentar
      </Text>
      <Text textAlign="center" marginBottom="20px">
        Sistem sedang diproses
      </Text>
    </Stack>
  );
};

export default LoadingScreen;
