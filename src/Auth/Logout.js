import { useDispatch } from "react-redux"
import { actions } from "../store"

const Logout = async ()=>{
  const dispatch = useDispatch()
  await dispatch(actions.logout())
}
export default Logout