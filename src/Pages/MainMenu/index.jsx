"use client";
import "/public/assets/MainMenu.css";

import { actions } from "../../store";

// sessionLogin
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import loginSessionAuth from "../../Auth/LoginSession";

import LoadingScreen from "../../Components/LoadingScreen";
import { Link, useNavigate, useParams } from "react-router-dom";
import BottomNavbar from "./Components/BottomNavbar";
import Dashboard from "./Components/dashboard";
import Order from "./Components/order";
import Riwayat from "./Components/riwayat";
import Akun from "./Components/akun";
import Transaksi from "./Components/transaksi";

const MainMenu = () => {
  const apiUrl = useSelector((state) => state.apiUrl);
  const isLoadingPage = useSelector((state) => state.isLoadingPage);
  const url = useParams();
  // const bottomNavbarSelected = useSelector(
  //   (state) => state.bottomNavbarSelected
  // );
  const [bottomNavbarSelected, setBottomNavbarSelected] = useState(
    url?.section
  );
  const dispatch = useDispatch();
  // dispatch(actions.setBottomNavbar({ value: url.section }));

  const navigate = useNavigate();

  const loginSession = useSelector((state) => state.loginSession);

  useEffect(() => {
    // Check sessionLogin
    if (!loginSessionAuth(window.location.href.split("/")[3], loginSession)) {
      navigate("/Login");
    } else {
      if (bottomNavbarSelected === "dashboard") {
        setBottomNavbarSelected("dashboard");
      } else if (bottomNavbarSelected === "order") {
        setBottomNavbarSelected("order");
      } else if (bottomNavbarSelected === "transaksi") {
        setBottomNavbarSelected("transaksi");
      } else if (bottomNavbarSelected === "riwayat") {
        setBottomNavbarSelected("riwayat");
      } else if (bottomNavbarSelected === "akun") {
        setBottomNavbarSelected("akun");
      } else {
        setBottomNavbarSelected("dashboard");
        navigate("/MainMenu/");
      }
    }
  }, [bottomNavbarSelected]);

  return (
    <>
      {bottomNavbarSelected === "dashboard" ||
      bottomNavbarSelected === undefined ? (
        <Dashboard />
      ) : bottomNavbarSelected === "order" ? (
        <Order setBottomNavbarSelected={setBottomNavbarSelected} />
      ) : // Status Pesanan
      bottomNavbarSelected === "transaksi" ? (
        <Transaksi />
      ) : // Riwayat
      bottomNavbarSelected === "riwayat" ? (
        <Riwayat />
      ) : bottomNavbarSelected === "akun" ? (
        <Akun loginSession={loginSession} />
      ) : null}

      <BottomNavbar
        params={url.section}
        bottomNavbarSelected={bottomNavbarSelected}
        setBottomNavbarSelected={setBottomNavbarSelected}
      />
    </>
  );
};
export default MainMenu;
