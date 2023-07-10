import { HStack, Text } from "@chakra-ui/react";

const Transaksi = () => {
  return (
    <div className="main-menu">
      <HStack
        width="100%"
        justifyContent="center"
        alignItems="center"
        marginBottom="20px"
      >
        <Text fontSize="22px" as="b">
          Transaksi
        </Text>
      </HStack>
    </div>
  );
};

export default Transaksi;
