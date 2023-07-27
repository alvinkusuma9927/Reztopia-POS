import { Link, useNavigate } from "react-router-dom";
import "/public/assets/MainMenu.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { MdWallet } from "react-icons/md";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import { HStack, Text } from "@chakra-ui/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../store";
const BottomNavbar = ({
  params,
  bottomNavbarSelected,
  setBottomNavbarSelected,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="bottom-navigation-bar">
      <Link
        to="/MainMenu/dashboard"
        onClick={() => {
          setBottomNavbarSelected("dashboard");
        }}
        className="link"
      >
        <HomeOutlinedIcon
          sx={{
            color:
              params === "dashboard" || params === undefined
                ? "#6898C0"
                : "#B7B7B7",
          }}
        />
      </Link>
      <Link
        to="/MainMenu/order"
        onClick={() => {
          setBottomNavbarSelected("order");
        }}
        className="link"
      >
        <ContentPasteOutlinedIcon
          sx={{ color: params === "order" ? "#6898C0" : "#B7B7B7" }}
        />
      </Link>
      {/* <Link
        to="/MainMenu/transaksi"
        onClick={() => {
          setBottomNavbarSelected("transaksi");
        }}
        className="link"
      >
        <MdWallet
          sx={{ color: params === "transaksi" ? "#6898C0" : "#B7B7B7" }}
        />
      </Link> */}

      <Link
        to="/MainMenu/riwayat"
        onClick={() => {
          setBottomNavbarSelected("riwayat");
        }}
        className="link"
      >
        <HistoryOutlinedIcon
          sx={{ color: params === "riwayat" ? "#6898C0" : "#B7B7B7" }}
        />
      </Link>

      <Link
        to="/MainMenu/akun"
        onClick={() => {
          setBottomNavbarSelected("akun");
        }}
        className="link"
      >
        <AccountCircleIcon
          sx={{ color: params === "akun" ? "#6898C0" : "#B7B7B7" }}
        />
      </Link>
    </div>
  );
};
export default BottomNavbar;
