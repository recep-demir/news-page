import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"



const PrivateRouter = () => {

const {email,password}=useSelector((state)=>state.yetkiSlice)


  return email && password ? (<Outlet/>):<Navigate to="/login"/>
}

export default PrivateRouter