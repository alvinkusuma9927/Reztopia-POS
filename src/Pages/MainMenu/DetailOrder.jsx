import { useParams } from "react-router-dom";
import "../../../public/assets/MainMenu.css";
import {
  Image,
  Button,
  Center,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  Box,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";

// sessionLogin
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import loginSessionAuth from "../../Auth/LoginSession";
import { Link, useNavigate } from "react-router-dom";

import { actions } from "../../store";
import getStaticImg from "../../Function/getStaticImg";
import axios from "axios";
import LoadingScreen from "../../Components/LoadingScreen";

const DetailOrder = () => {
  const params = useParams();
  const apiUrl = useSelector((state) => state.apiUrl);
  const port = useSelector((state) => state.port);
  const navigate = useNavigate();
  const [detailOrder, setDetailOrder] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // Check sessionLogin
  const loginSession = useSelector((state) => state.loginSession);
  useEffect(() => {
    if (!loginSessionAuth(window.location.href.split("/")[3], loginSession)) {
      navigate("/Login");
    } else {
      getDetailOrder();
    }
    console.log(
      loginSessionAuth(window.location.href.split("/")[3], loginSession)
    );
  }, [loginSession]);
  // }

  const getDetailOrder = async () => {
    try {
      setIsLoading(true);
      await axios
        .get(`${apiUrl}/api/history/history-detail/${params.idOrder}`, {
          headers: {
            Authorization: `${JSON.parse(loginSession).token.token_type} ${
              JSON.parse(loginSession).token.access_token
            }`,
          },
        })
        .then((res) => {
          setDetailOrder(res.data.data);
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading ? <LoadingScreen /> : null}
      {/* <Text>{JSON.stringify(detailOrder.history)}</Text> */}
      <div className="main-menu">
        <HStack
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="40px"
        >
          <ArrowBackIosOutlinedIcon
            onClick={() => navigate(-1)}
            cursor="pointer"
          />
          <Text fontSize="22px" as="b">
            Detail Order
          </Text>
          <LocalGroceryStoreOutlinedIcon sx={{ color: "#f6fbfd" }} />
        </HStack>
        {/* <Text>{JSON.stringify(detailOrder)}</Text> */}

        {/* <Text color="blue.600">
          {detailOrder.history[0].payment_status.toUpperCase()}
        </Text> */}
        <Text>Status Pembayaran</Text>

        {detailOrder.history ? (
          <>
            {detailOrder.history[0].payment_status != null ? (
              <Text
                fontSize="24px"
                as="b"
                color={
                  detailOrder.history[0].payment_status.toUpperCase() ===
                  "SUCCESS"
                    ? "#6aa84f"
                    : detailOrder.history[0].payment_status.toUpperCase() ===
                      "CANCELLED"
                    ? "#cc0000"
                    : "#f1c232"
                }
              >
                {detailOrder.history[0].payment_status.toUpperCase()}
              </Text>
            ) : (
              <Text fontSize="16px" as="b" color="#3d85c6">
                Belum Memilih Metode Pembayaran
              </Text>
            )}

            <HStack
              marginBottom="20px"
              marginTop="15px"
              justifyContent="space-between"
            >
              <Text fontSize="12px" color="#7C7979">
                Tanggal Pembelian
              </Text>
              {/* <Text fontSize="12px">01 November 2022, 18:15 WIB</Text> */}
              <Text fontSize="12px">{detailOrder.history[0].date_order}</Text>
            </HStack>

            <Text marginBottom="10px" as="b">
              Detail Product
            </Text>

            <Box
              marginBottom="20px"
              borderRadius="20px"
              backgroundColor="white"
              padding="25px"
              boxShadow="0px 0px 25px rgba(192, 192, 192, 0.2)"
            >
              {/* <Text>{JSON.stringify(detailOrder.product)}</Text> */}

              {detailOrder.product.map((item, index) => (
                <div
                  key={index}
                  style={{ display: "flex", marginBottom: "20px" }}
                >
                  <Image
                    height="71px"
                    aspectRatio="1/1"
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "200px" }}
                    src={item.image_product.replace("localhost", port)}
                    borderRadius="20px"
                    alignItems="flex-start"
                    marginRight="20px"
                  />
                  <div>
                    <Text fontSize="16px" as="b">
                      {item.product_name}
                    </Text>
                    <Text>
                      {item.quantity_order} x Rp.{item.price_product}
                    </Text>
                  </div>
                </div>
              ))}

              <hr />
              <HStack justifyContent="space-between" marginTop="10px">
                <Text color="blue.600">Total</Text>
                <Text color="blue.600">
                  Rp.{detailOrder.history[0].total_order}
                </Text>
              </HStack>
            </Box>

            <Box
              borderRadius="20px"
              backgroundColor="white"
              padding="25px"
              boxShadow="0px 0px 25px rgba(192, 192, 192, 0.2)"
              marginBottom="60px"
            >
              <Text as="b">Rincian Pembayaran</Text>
              <HStack marginTop="20px" justifyContent="space-between">
                <Text fontSize="12px" color="#7C7979">
                  Nama Pemesan
                </Text>
                <Text fontSize="12px">
                  {detailOrder.history[0].name_user_order}
                </Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text fontSize="12px" color="#7C7979">
                  Nomor Meja
                </Text>
                <Text fontSize="12px">
                  {detailOrder.history[0].table_number_order}
                </Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text fontSize="12px" color="#7C7979">
                  Tipe Pesanan
                </Text>
                <Text fontSize="12px">
                  {/* {detailOrder.history[0].order_type.replace("_", " ")} */}
                  {detailOrder.history[0].order_type == "take_away"
                    ? "Dibungkus"
                    : detailOrder.history[0].order_type == "dine_in"
                    ? "makan di tempat"
                    : detailOrder.history[0].order_type}
                </Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text fontSize="12px" color="#7C7979">
                  Tenant
                </Text>
                <Text fontSize="12px">
                  {detailOrder.history[0].tenant_name_order}
                </Text>
              </HStack>
              <hr style={{ marginTop: "20px", marginBottom: "20px" }} />
              {/* <HStack justifyContent="space-between">
                <Text fontSize="12px" color="#7C7979">
                  Metode Pembayaran
                </Text>
                <Text fontSize="12px">
                  {detailOrder.history[0].payment_method_order}
                </Text>
              </HStack>
              <hr style={{ marginTop: "20px", marginBottom: "20px" }} /> */}
              <HStack justifyContent="space-between">
                <Text fontSize="12px" color="#7C7979">
                  Total Harga
                </Text>
                <Text fontSize="12px">
                  Rp.{detailOrder.history[0].total_order}
                </Text>
              </HStack>

              <hr style={{ marginTop: "20px", marginBottom: "20px" }} />
              <HStack justifyContent="space-between">
                <Text as="b">Total Belanja</Text>
                <Text as="b">
                  Rp.{JSON.stringify(detailOrder.history[0].total_order)}
                </Text>
              </HStack>
            </Box>
          </>
        ) : null}
      </div>
    </>
  );
};
export default DetailOrder;
