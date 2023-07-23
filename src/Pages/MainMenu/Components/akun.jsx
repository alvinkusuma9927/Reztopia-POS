import {
  Button,
  FocusLock,
  HStack,
  IconButton,
  Image,
  Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Table,
  Td,
  Text,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { actions } from "../../../store";
import { useNavigate } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import axios from "axios";
import LoadingScreen from "../../../Components/LoadingScreen";

const Akun = (props) => {
  const apiUrl = useSelector((state) => state.apiUrl);
  const loginSession = JSON.parse(props.loginSession);
  const loginSessionSelector = useSelector((state) => state.loginSession);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const firstFieldRef = React.useRef(null);
  const [modalType, setModalType] = useState("");
  const [isLoadingPage, setLoading] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const toast = useToast({
    containerStyle: {
      width: "380px",
    },
  });

  const updateUser = async () => {
    setLoading(true);
    let post_object = {
      id: loginSessionSelector.id,
      name: document.getElementsByName("name")[0].value,
      email: document.getElementsByName("email")[0].value,
      phone: document.getElementsByName("phone")[0].value,
    };
    console.log(post_object);
    console.log({
      headers: {
        Authorization: `${JSON.parse(loginSessionSelector).token.token_type} ${
          JSON.parse(loginSessionSelector).token.access_token
        }`,
      },
    });

    try {
      await axios
        .post(
          `${apiUrl}/api/user/update`,
          {
            id: loginSession.id,
            name: document.getElementsByName("name")[0].value,
            email: document.getElementsByName("email")[0].value,
            phone: document.getElementsByName("phone")[0].value,
          },
          {
            headers: {
              Authorization: `${
                JSON.parse(loginSessionSelector).token.token_type
              } ${JSON.parse(loginSessionSelector).token.access_token}`,
            },
          }
        )
        .then((res) => {
          let dataLogin = res.data.data;
          dataLogin.token = JSON.parse(loginSessionSelector).token;
          dispatch(actions.login({ dataLogin: dataLogin }));
          toast({
            title: "Berhasil memperbarui datamu",
            status: "success",
            variant: "subtle",
            position: "top",
            isClosable: true,
            duration: 9500,
          });
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      toast({
        title: "Gagal memperbarui datamu",
        status: "error",
        variant: "subtle",
        position: "top",
        isClosable: true,
        duration: 9500,
      });
      setLoading(false);
    }
  };

  const updatePassword = async () => {
    setLoading(true);
    const newDataPassword = {
      id: loginSession.id,
      password_old: document.getElementsByName("old_password")[0].value,
      password: document.getElementsByName("new_password")[0].value,
    };

    if (newDataPassword.password.length >= 8) {
      try {
        await axios
          .post(`${apiUrl}/api/user/change-password`, newDataPassword, {
            headers: {
              Authorization: `${
                JSON.parse(loginSessionSelector).token.token_type
              } ${JSON.parse(loginSessionSelector).token.access_token}`,
            },
          })
          .then(() => {
            toast({
              title: "Berhasil memperbarui datamu",
              status: "success",
              variant: "subtle",
              position: "top",
              isClosable: true,
              duration: 9500,
            });
            onClose();
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
        toast({
          title: "Gagal memperbarui datamu | password lama tidak sesuai",
          status: "error",
          variant: "subtle",
          position: "top",
          isClosable: true,
          duration: 9500,
        });
        setLoading(false);
      }
    } else {
      toast({
        title: "Panjang password minimal 8",
        status: "error",
        variant: "subtle",
        position: "top",
        isClosable: true,
        duration: 9500,
      });
      setLoading(false);
    }
  };
  return (
    <>
      {isLoadingPage ? <LoadingScreen /> : null}
      <div className="main-menu" style={{ paddingBottom: "70px" }}>
        <Stack minHeight="100vh">
          <HStack
            position="relative"
            width="100%"
            justifyContent="center"
            alignItems="center"
            marginBottom="20px"
          >
            <Text fontSize="22px" as="b">
              Profil
            </Text>

            <Stack position="absolute" right="10px" cursor="pointer">
              <Menu>
                <MenuButton>
                  <AiFillSetting
                    as={Button}
                    color="#6898C0"
                    fontSize={"22px"}
                    alignSelf="flex-end"
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => setIsEdit(true)}>
                    Edit Profil
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setModalType("ubah-password");
                      onOpen();
                    }}
                  >
                    Ubah Password
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setModalType("logout");
                      onOpen();
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </HStack>

          <Image
            width="100px"
            height="100px"
            borderRadius="50%"
            objectFit="cover"
            alignSelf="center"
            src="/assets/Welcome.png"
          />

          <Stack justifyContent="space-between" minHeight="50vh">
            <Table>
              <Tr>
                <Td>
                  <Text as="b">Nama</Text>
                </Td>

                {!isEdit ? (
                  <Td>
                    <Text phone="" as="b">
                      {loginSession.name}
                    </Text>
                  </Td>
                ) : null}

                {isEdit ? (
                  <Td>
                    <Input name="name" defaultValue={loginSession.name} />
                  </Td>
                ) : null}
              </Tr>
              <Tr>
                <Td>
                  <Text as="b">Email</Text>
                </Td>

                {!isEdit ? (
                  <Td>
                    {" "}
                    <Text as="b">{loginSession.email}</Text>
                  </Td>
                ) : null}

                {isEdit ? (
                  <Td>
                    <Input name="email" defaultValue={loginSession.email} />
                  </Td>
                ) : null}
              </Tr>
              <Tr>
                <Td>
                  <Text as="b">Telepon</Text>
                </Td>
                {!isEdit ? (
                  <Td>
                    <Text as="b">{loginSession.phone}</Text>
                  </Td>
                ) : null}

                {isEdit ? (
                  <Td>
                    <Input name="phone" defaultValue={loginSession.phone} />
                  </Td>
                ) : null}
              </Tr>
            </Table>

            {isEdit ? (
              <Button onClick={updateUser} colorScheme="blue">
                Perbarui Data
              </Button>
            ) : null}

            {/* <Button
            colorScheme="red"
            variant="outline"
            onClick={onOpen}
            marginBottom="50px"
          >
            Logout
          </Button> */}
          </Stack>
        </Stack>

        {modalType === "logout" ? (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Logout</ModalHeader>
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
        ) : (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Atur Kata Sandi</ModalHeader>
              <ModalBody>
                <Stack gap={4}>
                  <Stack>
                    <Text as="b">Password Lama</Text>
                    <Input type="password" name="old_password" />
                  </Stack>
                  <Stack>
                    <Text as="b">Password Baru</Text>
                    <Input type="password" name="new_password" />
                  </Stack>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={updatePassword}>
                  Simpan
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Akun;
