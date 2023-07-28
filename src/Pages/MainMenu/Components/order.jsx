import {
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { actions } from "../../../store";
import axios from "axios";
import LoadingScreen from "../../../Components/LoadingScreen";
const Order = ({ setBottomNavbarSelected }) => {
  const apiUrl = useSelector((state) => state.apiUrl);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const cart = useSelector((state) => state.cart);
  const [nomorMeja, setNomorMeja] = useState("");
  const loginSession = useSelector((state) => state.loginSession);
  const order_type_option = useState([
    { value: "", title: "Pilih Tipe Pesanan" },
    { value: "dine_in", title: "Makan Ditempat" },
    { value: "take_away", title: "Dibungkus" },
  ]);
  const dispatch = useDispatch();

  const getCart = async () => {
    setIsLoading(true);
    await fetch(`${apiUrl}/api/cart/index`, {
      method: "GET",
      headers: {
        Authorization: `${JSON.parse(loginSession).token.token_type} ${
          JSON.parse(loginSession).token.access_token
        }`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((response) => {
          dispatch(actions.setCartValue({ newDataCart: response.data }));
          console.log("succes fetch cart");
          console.log(cart);
          setIsLoading(false);
        });
      } else {
        // console.log(response.status)
        dispatch(actions.setCartValue({ newDataCart: [] }));
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    getCart();
    // setTimeout(getCart, 4000);
  }, []);
  useEffect(() => {
    let count = 0;
    for (let item of cart) {
      count += item.total;
    }
  }, [cart]);

  const toast = useToast({
    containerStyle: {
      width: "380px",
    },
  });
  return (
    <>
      {isLoading ? <LoadingScreen /> : null}
      <div className="main-menu">
        <HStack
          width="100%"
          justifyContent="center"
          alignItems="center"
          marginBottom="20px"
        >
          <Text fontSize="22px" as="b">
            Keranjang Order
          </Text>
        </HStack>

        {/* cart Items */}
        {cart.map((item, index) => (
          <div
            key={item.id_product}
            style={{
              display: "flex",
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "20px",
              marginBottom: "20px",
              boxShadow: "0px 0px 25px rgba(192, 192, 192, 0.2)",
            }}
          >
            <img
              src={`${apiUrl}/storage/uploads/products/${item.image}`}
              alt=""
              style={{
                width: "154px",
                height: "154px",
                aspectRatio: "1/1",
                objectFit: "cover",
                borderRadius: "20px",
                alignItems: "flex-start",
                marginRight: "20px",
              }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Text fontSize="16px" as="b">
                {item.product_name}
              </Text>

              <Text fontSize="14px">
                Rp. {item.price_final * item.quantity}
              </Text>
              <HStack>
                <CreateIcon sx={{ width: "14px", color: "gray" }} />
                <Input
                  variant="flushed"
                  fontSize="14px"
                  defaultValue={item.note}
                  placeholder="note"
                />
              </HStack>

              <HStack justifyContent="space-between">
                <HStack>
                  <IconButton
                    size="xs"
                    colorScheme="blue"
                    variant="outline"
                    borderRadius="50%"
                    icon={<MinusIcon />}
                    aria-label={""}
                    onClick={async () => {
                      setIsLoading(true);
                      try {
                        await axios
                          .post(
                            `${apiUrl}/api/cart/quantity`,
                            {
                              id_product: item.id_product,
                              min: 1,
                            },
                            {
                              headers: {
                                Authorization: `${
                                  JSON.parse(loginSession).token.token_type
                                } ${
                                  JSON.parse(loginSession).token.access_token
                                }`,
                              },
                            }
                          )
                          .then((response) => {
                            if (response.status === 200) {
                              setIsLoading(false);
                              getCart();
                            }
                          });
                      } catch (error) {
                        setIsLoading(false);
                      }
                    }}
                  />
                  <Text>{item.quantity}</Text>
                  <IconButton
                    size="xs"
                    colorScheme="blue"
                    variant="solid"
                    borderRadius="50%"
                    icon={<AddIcon />}
                    aria-label={""}
                    onClick={async () => {
                      setIsLoading(true);
                      try {
                        await axios
                          .post(
                            `${apiUrl}/api/cart/quantity`,
                            {
                              id_product: item.id_product,
                              plus: 1,
                            },
                            {
                              headers: {
                                Authorization: `${
                                  JSON.parse(loginSession).token.token_type
                                } ${
                                  JSON.parse(loginSession).token.access_token
                                }`,
                              },
                            }
                          )
                          .then((response) => {
                            if (response.status === 200) {
                              setIsLoading(false);
                              getCart();
                            }
                          });
                      } catch (error) {
                        setIsLoading(false);
                      }
                    }}
                  />
                </HStack>
                <IconButton
                  colorScheme="red"
                  variant="ghost"
                  icon={<DeleteIcon />}
                  aria-label={""}
                  onClick={async () => {
                    await axios
                      .post(
                        `${apiUrl}/api/cart/delete`,
                        {
                          id_order_detail: item.id,
                        },
                        {
                          headers: {
                            Authorization: `${
                              JSON.parse(loginSession).token.token_type
                            } ${JSON.parse(loginSession).token.access_token}`,
                          },
                        }
                      )
                      .then((response) => {
                        if (response.status === 200) {
                          // response=> console.log(response)
                          getCart();
                        } else {
                        }
                      });
                  }}
                />
              </HStack>
            </div>
          </div>
        ))}

        {cart.length > 0 ? (
          <>
            <Table
              padding={"16px"}
              marginBottom={"20px"}
              variant="simple"
              width="100%"
              borderRadius={"20px"}
              backgroundColor={"rgba(159, 188, 213, 0.19)"}
            >
              <Tbody>
                <Tr>
                  <Td>Nama Pemesan</Td>
                  <Td isNumeric>{JSON.parse(loginSession).name}</Td>
                </Tr>
                <Tr>
                  <Td>Tipe Pesanan</Td>
                  <Td isNumeric>
                    <Select size="sm" id="order_type">
                      {order_type_option[0].map((type, index) => (
                        <option key={index} value={type.value}>
                          {type.title}
                        </option>
                      ))}
                    </Select>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Nomor Meja</Td>
                  <Td isNumeric>
                    <NumberInput>
                      <NumberInputField
                        value={nomorMeja}
                        onChange={(e) => setNomorMeja(e.target.value)}
                        placeholder="Nomor Meja"
                      />
                    </NumberInput>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Kantin</Td>
                  <Td isNumeric>{cart[0].outlet_name}</Td>
                </Tr>
              </Tbody>
            </Table>

            <div
              style={{
                borderRadius: "20px",
                backgroundColor: "rgba(159, 188, 213, 0.19)",
                width: "100%",
                padding: "16px",
                marginBottom: "20px",
              }}
            >
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Td>Total Makanan</Td>
                    <Td isNumeric>
                      <Text>{cart.length}</Text>
                    </Td>
                  </Tr>

                  <Tr>
                    <Td>Total Pembayaran</Td>
                    <Td isNumeric>Rp. {cart[0].total}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </div>
            <Button
              onClick={async () => {
                if (
                  nomorMeja === "" ||
                  document.getElementById("order_type").value === ""
                ) {
                  toast({
                    title: "Error",
                    description: `Harap mengisi nomor meja dan tipe order!`,
                    status: "error",
                    duration: 2500,
                    isClosable: true,
                    variant: "subtle",
                    position: "top",
                  });
                } else {
                  console.log({
                    id_order: cart[0].id_order,
                    table_number: nomorMeja,
                    order_type: document.getElementById("order_type").value,
                  });
                  setIsLoading(true);
                  try {
                    await axios
                      .post(
                        `${apiUrl}/api/cart/checkout`,
                        {
                          id_order: cart[0].id_order,
                          table_number: nomorMeja,
                          order_type:
                            document.getElementById("order_type").value,
                        },
                        {
                          headers: {
                            Authorization: `${
                              JSON.parse(loginSession).token.token_type
                            } ${JSON.parse(loginSession).token.access_token}`,
                          },
                        }
                      )
                      .then((response) => {
                        if (response.status === 200) {
                          // response=> console.log(response)
                          // getCart();
                          navigate("/MainMenu/riwayat");
                          setBottomNavbarSelected("riwayat");
                          setIsLoading(false);
                        } else {
                          setIsLoading(false);
                        }
                      });
                  } catch (error) {
                    setIsLoading(false);
                  }
                }
              }}
              colorScheme="blue"
              marginBottom="80px"
            >
              Pesan
            </Button>
          </>
        ) : (
          <div
            style={{
              height: "calc(100vh - 100px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/assets/EmptyCart.png"
              alt="EmptyCart"
              style={{ width: "186px", height: "100px", objectFit: "contain" }}
            />
            <Text
              textAlign="center"
              fontSize="20px"
              as="b"
              marginTop="20px"
              marginBottom="5px"
            >
              Ups Kamu belum menambah menu
            </Text>
            <Text textAlign="center" marginBottom="20px">
              Tambah makanan dulu dong
            </Text>
          </div>
        )}
      </div>
    </>
  );
};

export default Order;
