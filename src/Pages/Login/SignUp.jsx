import {
  Button,
  Center,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import "/public/assets/Login.css";
import { ViewIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import loginSessionAuth from "../../Auth/LoginSession";
import getStaticImg from "../../Function/getStaticImg";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import LoadingScreen from "../../Components/LoadingScreen";
import { actions } from "../../store";

const SignUp = () => {
  const apiUrl = useSelector((state) => state.apiUrl);
  const isLoading = useSelector((state) => state.isLoadingPage);
  const navigate = useNavigate();
  const [namaLengkapInput, setNamaLengkapInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const loginSession = useSelector((state) => state.loginSession);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const dispatch = useDispatch();
  // Check sessionLogin {

  useEffect(() => {
    if (loginSessionAuth(window.location.href.split("/")[3], loginSession)) {
      navigate("/MainMenu");
    }
    dispatch(actions.setIsloading({ value: false }));
  }, [loginSession]);
  // }

  const submitSignUp = async (event) => {
    event.preventDefault();
    const requestBody = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: namaLengkapInput,
        email: emailInput,
        password: passwordInput,
      }),
    };
    await fetch(`${apiUrl}/api/register`, requestBody).then((response) =>
      response.json().then((response) => {
        if (response.meta.status === "success") {
          onOpen();
        } else {
          toast({
            title: `${response.data[0]}`,
            description: "Try again input",
            status: "error",
            duration: 1500,
            isClosable: true,
            variant: "subtle",
          });
        }
      })
    );
  };
  const toast = useToast({
    containerStyle: {
      width: "380px",
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {isLoading ? <LoadingScreen /> : null}
      <form action="" className="main-login" onSubmit={(e) => submitSignUp(e)}>
        <Center>
          <img src={getStaticImg("Logo")} className="logo-img" alt="" />
        </Center>

        <Stack width="335.61px" alignSelf="center">
          <Text as="b" alignSelf="flex-start" color="#6597BF" marginTop="40px">
            Full Name
          </Text>
        </Stack>
        <Input
          name="namaLengkapInput"
          marginBottom="20px"
          value={namaLengkapInput}
          onChange={(e) => {
            setNamaLengkapInput(e.target.value);
          }}
          required
        />

        <Stack width="335.61px" alignSelf="center">
          <Text as="b" alignSelf="flex-start" color="#6597BF">
            Email
          </Text>
        </Stack>
        <Input
          name="emailInput"
          type="email"
          marginBottom="20px"
          value={emailInput}
          onChange={(e) => {
            setEmailInput(e.target.value);
          }}
          required
        />

        <Stack width="335.61px" alignSelf="center">
          <Text as="b" alignSelf="flex-start" color="#6597BF">
            Password
          </Text>
        </Stack>
        <InputGroup alignItems="center" marginBottom="20px">
          <Input
            name="passwordInput"
            type={isVisiblePassword ? "text" : "password"}
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value);
            }}
            required
          />
          <InputRightElement
            cursor="pointer"
            onClick={() => {
              setIsVisiblePassword(!isVisiblePassword);
            }}
            children={<ViewIcon />}
          />
        </InputGroup>

        <HStack marginBottom="20px">
          <Text>i accept the</Text>
          <Text as="b" color="#6597BF">
            Therm & Condition
          </Text>
        </HStack>

        <Button
          onClick={submitSignUp}
          type="submit"
          width="100%"
          height="64px"
          colorScheme="blue"
          marginBottom="20px"
        >
          Create Account
        </Button>

        <Center
          onClick={() => {
            dispatch(actions.setIsloading({ value: true }));
            navigate("/Login");
          }}
          cursor="pointer"
          marginBottom="20px"
        >
          <Text marginRight="5px">Exiting Member?</Text>
          <Text as="b" color="#6597BF">
            Sign In
          </Text>
        </Center>
      </form>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up Success</ModalHeader>
          <ModalBody>{/* <Lorem count={2} /> */}</ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                dispatch(actions.setIsloading({ value: true }));
                navigate("/Login");
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default SignUp;
