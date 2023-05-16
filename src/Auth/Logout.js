import { useDispatch } from "react-redux"
import { actions } from "../store"

const Logout = ()=>{
  const dispatch = useDispatch()
  dispatch(actions.logout())
}
export default Logout