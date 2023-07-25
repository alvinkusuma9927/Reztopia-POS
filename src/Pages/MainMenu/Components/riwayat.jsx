import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { actions } from "../../../store";
import axios from "axios";
import LoadingScreen from "../../../Components/LoadingScreen";
const Riwayat = () => {
  const apiUrl = useSelector((state) => state.apiUrl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const histories = useSelector((state) => state.histories);
  const [riwayat, setRiwayat] = useState([]);
  const [dataTagihan, setDataTagihan] = useState([]);
  const [selectedTab, setSelectedTab] = useState("tagihan");
  const port = useSelector((state) => state.port);
  const loginSession = useSelector((state) => state.loginSession);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [itemBatal, setItemBatal] = useState("");
  const getDataTagihan = async () => {
    try {
      setIsLoading(true);
      console.log("try");
      await axios
        .get(`${apiUrl}/api/history/index`, {
          headers: {
            Authorization: `${JSON.parse(loginSession).token.token_type} ${
              JSON.parse(loginSession).token.access_token
            }`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          setRiwayat(res.data.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getDataTagihan();
  }, []);
  return (
    <>
      {isLoading ? <LoadingScreen /> : null}
      <div className="main-menu" style={{ paddingBottom: "70px" }}>
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

        <HStack alignSelf="center" marginTop="20px" marginBottom="20px">
          <Button
            colorScheme="blue"
            variant={selectedTab === "tagihan" ? "solid" : "outline"}
            onClick={() => setSelectedTab("tagihan")}
          >
            Tagihan
          </Button>
          <Button
            colorScheme="blue"
            variant={selectedTab === "selesai" ? "solid" : "outline"}
            onClick={() => setSelectedTab("selesai")}
          >
            Selesai
          </Button>
        </HStack>
        {/* <Text>{JSON.stringify(dataTagihan)}</Text> */}

        {riwayat
          ? selectedTab === "tagihan"
            ? riwayat.map((item, index) =>
                item.payment_status !== "SUCCESS" ? (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "white",
                      padding: "10px",
                      borderRadius: "20px",
                      marginBottom: "20px",
                      boxShadow: "0px 0px 25px rgba(192, 192, 192, 0.2)",
                    }}
                  >
                    {/* <Text>{JSON.stringify(item)}</Text> */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                        flexWrap: "wrap",
                      }}
                    >
                      <HStack>
                        <ShoppingBagIcon sx={{ color: "#6597BF" }} />
                        <Text as="b">{item.date_order}</Text>
                      </HStack>

                      {item.payment_status != null ? (
                        <Button
                          color={
                            `${item.payment_status}`.toUpperCase() === "SUCCESS"
                              ? "#6aa84f"
                              : `${item.payment_status}`.toUpperCase() ===
                                "CANCELED"
                              ? "#cc0000"
                              : "#f1c232"
                          }
                          variant={"ghost"}
                        >
                          {item.payment_status.toUpperCase()}
                        </Button>
                      ) : (
                        <Button color="#3d85c6" variant={"ghost"}>
                          Belum Memilih Metode Pembayaran
                        </Button>
                      )}

                      {/* <Button
                        colorScheme={
                          item.payment_status === null ? "blue" : "red"
                        }
                        variant="ghost"
                      >
                        {item.payment_status !== null
                          ? item.status.toUpperCase()
                          : "Belum Memilih Metode Pembayaran"}
                      </Button> */}
                    </div>

                    <div style={{ display: "flex", marginBottom: "20px" }}>
                      <img
                        src={item.image_tenant.replace("localhost", port)}
                        alt="Caffe Latte"
                        style={{
                          width: "71px",
                          height: "71px",
                          aspectRatio: "1/1",
                          objectFit: "cover",
                          borderRadius: "20px",
                          alignItems: "flex-start",
                          marginRight: "20px",
                        }}
                      />
                      <div>
                        <Stack>
                          <Text fontSize="16px" as="b">
                            {item.name}
                          </Text>
                          <Text>
                            {item.quantity} x Rp.{item.price_product}
                          </Text>
                          {/* <Text color="#7C7979" fontSize="10px">
                            dan 3 item lainya
                          </Text> */}
                        </Stack>
                      </div>
                    </div>

                    <HStack
                      justifyContent="space-between"
                      flexWrap="wrap"
                      gap={4}
                    >
                      <HStack>
                        <Text>Total: </Text>
                        <Text as="b">Rp.{item.total_order}</Text>
                      </HStack>

                      <HStack>
                        {item.payment_status !== "SUCCESS" ? (
                          <HStack>
                            <Link to={item.payment_url} target="_blank">
                              <Button colorScheme="teal">Pembayaran</Button>
                            </Link>
                            <Button
                              onClick={async () => {
                                onOpen();
                                setItemBatal(item.id_order);
                              }}
                              colorScheme="red"
                            >
                              Batal
                            </Button>
                          </HStack>
                        ) : null}

                        <Link to={`/MainMenu/DetailOrder/${item.id_order}`}>
                          <Button colorScheme="blue" variant="outline">
                            Detail
                          </Button>
                        </Link>
                      </HStack>
                    </HStack>
                  </div>
                ) : null
              )
            : riwayat.map((item, index) =>
                item.payment_status === "SUCCESS" ? (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "white",
                      padding: "10px",
                      borderRadius: "20px",
                      marginBottom: "20px",
                      boxShadow: "0px 0px 25px rgba(192, 192, 192, 0.2)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                      }}
                    >
                      <HStack>
                        <ShoppingBagIcon sx={{ color: "#6597BF" }} />
                        <Text as="b">{item.date_order}</Text>
                      </HStack>

                      {item.payment_status != null ? (
                        <Button
                          color={
                            `${item.payment_status}`.toUpperCase() === "SUCCESS"
                              ? "#6aa84f"
                              : `${item.payment_status}`.toUpperCase() ===
                                "CANCELED"
                              ? "#cc0000"
                              : "#f1c232"
                          }
                          variant={"ghost"}
                        >
                          {item.payment_status.toUpperCase()}
                        </Button>
                      ) : (
                        <Button color="#3d85c6" variant={"ghost"}>
                          Belum Memilih Metode Pembayaran
                        </Button>
                      )}

                      {/* <Button colorScheme="blue" variant="ghost">
                        {item.status.toUpperCase()}
                      </Button> */}
                    </div>

                    <div style={{ display: "flex", marginBottom: "20px" }}>
                      <img
                        src={item.image_tenant.replace("localhost", port)}
                        style={{
                          width: "71px",
                          height: "71px",
                          aspectRatio: "1/1",
                          objectFit: "cover",
                          borderRadius: "20px",
                          alignItems: "flex-start",
                          marginRight: "20px",
                        }}
                      />
                      <div>
                        <Stack>
                          <Text fontSize="16px" as="b">
                            {item.name}
                          </Text>
                          <Text>
                            {item.quantity} x Rp.{item.price_product}
                          </Text>
                          {/* <Text color="#7C7979" fontSize="10px">
                            dan 3 item lainya
                          </Text> */}
                        </Stack>
                      </div>
                    </div>

                    <HStack justifyContent="space-between">
                      <HStack>
                        <Text>Total: </Text>
                        <Text as="b">Rp.{item.total_order}</Text>
                      </HStack>

                      <Link to={`/MainMenu/DetailOrder/${item.id_order}`}>
                        <Button colorScheme="blue" variant="outline">
                          Detail
                        </Button>
                      </Link>
                    </HStack>
                  </div>
                ) : null
              )
          : null}
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Batal</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <Text>Apakah anda yakin akan membatalkan pesanan ? </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={async () => {
                try {
                  setIsLoading(true);
                  await axios
                    .get(`${apiUrl}/api/cart/failed-order/${itemBatal}`, {
                      headers: {
                        Authorization: `${
                          JSON.parse(loginSession).token.token_type
                        } ${JSON.parse(loginSession).token.access_token}`,
                      },
                    })
                    .then(() => {
                      setIsLoading(false);
                      getDataTagihan();
                      onClose();
                      setItemBatal("");
                      // navigate("/MainMenu/riwayat");
                    });
                } catch (error) {
                  console.log(error);
                  setItemBatal("");
                  setIsLoading(false);
                }
              }}
            >
              Iya
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Tidak
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Riwayat;
