import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import LogoutIcon from "@mui/icons-material/Logout";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

// carousel
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import LoadingScreen from "../../../Components/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../store";
import { Link, useNavigate } from "react-router-dom";
const Dashboard = () => {
  const apiUrl = useSelector((state) => state.apiUrl);
  const isLoadingPage = useSelector((state) => state.isLoadingPage);
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState([]);
  const loginSession = useSelector((state) => state.loginSession);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    fetch(`${apiUrl}/api/tenant/index`, {
      method: "GET",
      headers: {
        Authorization: `${JSON.parse(loginSession).token.token_type} ${
          JSON.parse(loginSession).token.access_token
        }`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "POST,GET",
      },
      credentials: "include",
    })
      .then(
        (response) => response.json(),
        (err) => console.log("error")
      )
      .then(
        (response) => {
          setProducts(response.data.tenant);
          console.log("succes fetch data");
        },
        (err) => console.log("error")
      );
  }, []);
  return (
    <div className="main-menu">
      <HStack justifyContent="space-between" alignItems="center">
        <Text as="b" fontSize="22px">
          Selamat Datang di {isLoadingPage}
        </Text>
        <LogoutIcon
          sx={{
            cursor: "pointer",
            fontWeight: "bold",
            color: "rgb(201, 68, 86)",
          }}
          onClick={onOpen}
        />
      </HStack>

      <Text as="b" fontSize="22px" color="blue.500" marginBottom="20px">
        Kedai Tangsi !
      </Text>

      <InputGroup backgroundColor="white" marginBottom="20px">
        <InputLeftElement children={<SearchIcon />} />
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="search"
        />
      </InputGroup>

      <Swiper
        spaceBetween={30}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            style={{
              display: "block",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            src="/public/assets/Carousel1.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{
              display: "block",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            src="/public/assets/BaksoKomplit.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{
              display: "block",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            src="/public/assets/MieGoreng.png"
            alt=""
          />
        </SwiperSlide>
      </Swiper>

      <Text color="blue.500" as="b" marginTop="20px">
        Tenant
      </Text>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          paddingBottom: "70px",
          marginTop: "10px",
        }}
      >
        {products.map((product) =>
          product.name
            .toLowerCase()
            .includes(searchInput.toLocaleLowerCase()) ? (
            <Link
              to={`/MainMenu/OutletMenu/${product.id}`}
              style={{ marginBottom: "20px", marginRight: "20px" }}
              key={product.id}
            >
              <img
                src="/public/assets/BaksoMercon.png"
                alt=""
                style={{
                  width: "105.28px",
                  height: "171px",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              />
              <Stack maxWidth="105.28px">
                <Text as="b">{product.name}</Text>
              </Stack>
            </Link>
          ) : null
        )}
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <Text>Apakah anda yakin akan logout ? </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                dispatch(actions.logout());
                navigate(0);
              }}
            >
              Logout
            </Button>
            <Button variant="ghost" onClick={onClose}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Dashboard;
