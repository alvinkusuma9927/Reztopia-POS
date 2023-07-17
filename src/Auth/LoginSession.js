import axios from "axios";
import { useDispatch } from "react-redux";
import { actions } from "../store";

const loginSessionAuth = async (url, loginSession) => {
  const dispatch = useDispatch();
  try {
    loginSession = JSON.parse(loginSession);
    if (url === "Login" || url === "SignUp") {
      if (loginSession.hasOwnProperty("token")) {
        await axios.post(`${apiUrl}/api/user/check-token`);
      } else {
        dispatch(actions.logout());
        return false;
      }
    } else {
      if (loginSession.hasOwnProperty("token")) {
        return true;
      } else {
        dispatch(actions.logout());
        return false;
      }
    }
  } catch (error) {
    dispatch(actions.logout());
    return false;
  }
};
export default loginSessionAuth;
