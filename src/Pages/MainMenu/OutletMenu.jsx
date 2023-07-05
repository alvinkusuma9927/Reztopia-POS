import { useParams } from "react-router-dom";
import "../../../public/assets/MainMenu.css";
import {
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
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import CreateIcon from "@mui/icons-material/Create";

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
import LoadingScreen from "../../Components/LoadingScreen";

const OutletMenu = () => {
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = useSelector((state) => state.apiUrl);
  const outletName = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataMenu, setDataMenu] = useState([]);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [typeMenu, setTypeMenu] = useState([
    { id: 1, name: "Daging" },
    { id: 1, name: "Sayuran" },
    { id: 1, name: "Snack" },
    { id: 1, name: "Mie" },
  ]);
  const [note, setNote] = useState("");

  const [modal, setModal] = useState("");
  const [filterDataMenu, setFilterDataMenu] = useState("");
  const dispatch = useDispatch();
  const toast = useToast({
    containerStyle: {
      width: "380px",
    },
  });

  const loginSession = useSelector((state) => state.loginSession);
  const port = useSelector((state) => state.port);
  useEffect(() => {
    // Check sessionLogin
    if (!loginSessionAuth(window.location.href.split("/")[3], loginSession)) {
      navigate("/Auth/Login");
    } else {
      fetch(`${apiUrl}/api/menu/${outletName.idOutlet}`, {
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
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.data !== undefined) {
            setDataMenu(response.data);
            let newTypeMenu = [];
            for (let item of response.data) {
              newTypeMenu.push({
                id: item.id_category,
                name: item.name_category,
              });
            }
            setTypeMenu(newTypeMenu);
          }
        })
        .then(() => setIsLoading(false));
    }
  }, [loginSession]);

  const openModal = (modalParam) => {
    console.log(modalParam);
    if (modalParam === "filter" || modalParam === "urutan") {
      let new_value = modal;
      new_value.modal_type = modalParam;
      setModal(new_value);
    } else {
      modalParam.modal_type = "modal product";
      setModal(modalParam);
    }

    onOpen();
  };
  const sortingDataMenuTerendah = (arr) => {
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length - i - 1; j++) {
        if (arr[j].price_after_discount > arr[j + 1].price_after_discount) {
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    setDataMenu(arr);
  };
  const sortingDataMenuTertinggi = (arr) => {
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length - i - 1; j++) {
        if (arr[j].price_after_discount < arr[j + 1].price_after_discount) {
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    setDataMenu(arr);
  };
  const [urutanData, setUrutanData] = useState("");
  useEffect(() => {
    if (urutanData === "terendah") {
      sortingDataMenuTerendah(dataMenu);
    } else if (urutanData === "tertinggi") {
      sortingDataMenuTertinggi(dataMenu);
    }
    onClose();
  }, [urutanData]);
  // useEffect(()=>{
  //   console.log(dataMenu)
  // },[])

  return (
    <>
      {isLoading ? <LoadingScreen /> : null}
      <div className="main-menu">
        <HStack
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="20px"
        >
          <ArrowBackIosOutlinedIcon
            onClick={() => {
              setIsLoading(true);
              navigate("/MainMenu");
            }}
            cursor="pointer"
          />
          <Text fontSize="22px" as="b">
            Menu {modal.modal_type}
          </Text>
          {/* <LocalGroceryStoreOutlinedIcon sx={{ color:'#6697BF' }}/> */}
          <LocalGroceryStoreOutlinedIcon sx={{ color: "rgba(0,0,0,0)" }} />
        </HStack>

        {dataMenu.length > 0 ? (
          <>
            <InputGroup backgroundColor="white" marginBottom="20px">
              <InputLeftElement children={<SearchIcon />} />
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="search"
              />
            </InputGroup>

            <HStack>
              <Button colorScheme="blue" onClick={() => openModal("filter")}>
                <TuneOutlinedIcon />
                Filter
              </Button>
              <Button colorScheme="blue" onClick={() => openModal("urutan")}>
                <FilterAltOutlinedIcon />
                Urutkan
              </Button>
            </HStack>
          </>
        ) : null}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            paddingBottom: "70px",
            marginTop: "20px",
          }}
        >
          {dataMenu.map((product) =>
            product.name_product
              .toLowerCase()
              .includes(searchInput.toLocaleLowerCase()) ? (
              <div
                key={product.id_product}
                onClick={() => openModal(product)}
                style={{
                  marginBottom: "20px",
                  marginRight: "20px",
                  cursor: "pointer",
                }}
              >
                <img
                  src={product.image_product.replace("localhost", port)}
                  style={{
                    width: "161px",
                    height: "171px",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                />
                <Stack maxWidth="161px">
                  <Text as="b">{product.name_product}</Text>
                  <HStack>
                    <Text>Rp.{product.price_after_discount}</Text>
                    <Text color="#7C7979" as="del">
                      {product.original_price}
                    </Text>
                    {/* <Text>{product.image_product.replace('localhost',port)}</Text> */}
                  </HStack>
                </Stack>
              </div>
            ) : null
          )}
        </div>

        {modal.modal_type === "urutan" ? (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent width="414px">
              <ModalHeader>Urutkan Menu</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Button
                  colorScheme="blue"
                  variant="ghost"
                  marginBottom="20px"
                  onClick={() => {
                    setUrutanData("terendah");
                  }}
                >
                  Berdasarkan Harga Terendah
                </Button>
                <Button
                  colorScheme="blue"
                  variant="ghost"
                  marginBottom="20px"
                  onClick={() => {
                    setUrutanData("tertinggi");
                  }}
                >
                  Berdasarkan Harga Tertinggi
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
        ) : modal.modal_type === "filter" ? (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent width="414px">
              <ModalHeader>Filter</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {typeMenu.map((type, index) => (
                  <Button
                    key={index}
                    colorScheme="blue"
                    variant="ghost"
                    marginBottom="20px"
                    onClick={() => {
                      setFilterDataMenu(type.id);
                      onClose();
                    }}
                  >
                    {type.name}
                  </Button>
                ))}
                <Center>
                  <Button
                    onClick={() => {
                      setFilterDataMenu("");
                      onClose();
                    }}
                    colorScheme="blue"
                    variant="outline"
                  >
                    Hapus Filter
                  </Button>
                </Center>
              </ModalBody>
            </ModalContent>
          </Modal>
        ) : (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent width="414px">
              <ModalHeader>{modal.name_product}</ModalHeader>
              <ModalCloseButton
                onClick={() => {
                  setNote("");
                  setModal("");
                }}
              />
              <ModalBody>
                <img
                  style={{
                    width: "100%",
                    height: "259px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "20px",
                  }}
                  src="/assets/AyamGoreng.png"
                  alt=""
                />
                <Text fontSize="14px" color="#707070">
                  {modal.description_product}
                </Text>

                <HStack marginBottom="20px">
                  <Text as="b">Rp.{modal.price_after_discount}</Text>
                  <Text color="#7C7979" as="del">
                    {modal.original_price}
                  </Text>
                </HStack>
                <InputGroup backgroundColor="white" marginBottom="10px">
                  <InputLeftElement
                    children={
                      <CreateIcon sx={{ width: "14px", color: "gray" }} />
                    }
                  />
                  <Input
                    placeholder="catatan"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </InputGroup>
              </ModalBody>
              <ModalFooter width="100%" marginBottom="20px">
                <Center>
                  <Button
                    onClick={() => {
                      let bodyRequest = {
                        id_outlet: modal.id_outlet,
                        id_user: JSON.parse(localStorage.loginSession).id,
                        id_product: modal.id_product,
                        quantity: 1,
                        order_type: "take_away",
                        note: note,
                      };
                      fetch(`${apiUrl}/api/cart/add-cart`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${
                            JSON.parse(localStorage.loginSession).token
                              .access_token
                          }`,
                        },
                        body: JSON.stringify(bodyRequest),
                      }).then((res) => {
                        if (res.status === 200) {
                          res.json().then((res) => {
                            toast({
                              title: JSON.stringify(res.meta.message),
                              status: "success",
                              isClosable: true,
                              duration: 1500,
                            });
                          });
                        } else {
                          console.log("error");
                        }
                      });
                      setNote("");
                      onClose();
                    }}
                    colorScheme="blue"
                  >
                    Tambah
                  </Button>
                </Center>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </div>
    </>
  );
};
export default OutletMenu;
