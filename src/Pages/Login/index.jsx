import { Button, Center, Input, Stack, Text } from "@chakra-ui/react";
import "/public/assets/Login.css";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";
import { useEffect } from "react";
import loginSessionAuth from "../../Auth/LoginSession";
import axios from "axios";
import getStaticImg from "/src/Function/getStaticImg";
import LoadingScreen from "/src/Components/LoadingScreen";

const Login = () => {
  const apiUrl = useSelector((state) => state.apiUrl);
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.isLoadingPage);

  // Check sessionLogin {
  const loginSession = useSelector((state) => state.loginSession);
  useEffect(() => {
    if (loginSessionAuth(window.location.href.split("/")[3], loginSession)) {
      navigate("/MainMenu");
    }
    dispatch(actions.setIsloading({ value: false }));
  }, [loginSession]);
  // }

  const dispatch = useDispatch();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const submitLogin = async (event) => {
    dispatch(actions.setIsloading({ value: true }));
    event.preventDefault();
    const requestLoginBody = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,GET",
      },
      body: JSON.stringify({ email: emailInput, password: passwordInput }),
      // credentials : "include"
    };

    const res = await fetch(`${apiUrl}/api/login`, requestLoginBody);
    console.log("status");
    console.log(res.status);
    if (res.status === 200) {
      res.json().then((res) => {
        let dataLogin = res.data;
        dataLogin.token = res.meta;
        console.log(dataLogin);
        dispatch(actions.login({ dataLogin: dataLogin }));
      });
    } else {
      dispatch(actions.setIsloading({ value: false }));
      toast({
        title: "Wrong email/password ! .",
        description: "Try again input",
        status: "error",
        duration: 1500,
        isClosable: true,
        variant: "subtle",
      });
    }
  };
  const toast = useToast({
    containerStyle: {
      width: "380px",
    },
  });
  return (
    <>
      <form action="" className="main-login" onSubmit={(e) => submitLogin(e)}>
        <Center>
          <img src={getStaticImg("Logo")} className="logo-img" alt="" />
        </Center>
        <img src={getStaticImg("Welcome")} className="welcome-img" alt="" />

        <Stack width="335.61px" alignSelf="center">
          <Text as="b" color="#6597BF">
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
          <Text as="b" color="#6597BF">
            Password
          </Text>
        </Stack>
        <Input
          name="passwordInput"
          type="password"
          marginBottom="20px"
          value={passwordInput}
          onChange={(e) => {
            setPasswordInput(e.target.value);
          }}
          required
        />

        <Stack>
          <Text
            alignSelf="flex-end"
            cursor="pointer"
            color="blue.500"
            marginBottom="20px"
          >
            Forgot Password?
          </Text>
        </Stack>
        <Button
          type="submit"
          width="100%"
          height="64px"
          colorScheme="blue"
          marginBottom="20px"
        >
          Login
        </Button>
        <Button
          width="100%"
          height="64px"
          variant="outline"
          marginBottom="20px"
        >
          Login with SSO
        </Button>

        <div
          onClick={() => {
            navigate("/SignUp");
          }}
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Text marginRight="5px">New To Brand?</Text>
          <Text as="b" color="blue.500">
            Sign Up
          </Text>
        </div>
      </form>
    </>
  );
};
export default Login;
