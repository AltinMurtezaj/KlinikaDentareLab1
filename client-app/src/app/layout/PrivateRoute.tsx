import { Outlet } from "react-router-dom";
import { useStore } from "../stores/store";
import Homepage from "../../features/home/HomePage";



const PrivateRoute = ()=>{

    const {userStore}=useStore();


    return userStore.isLoggedIn ? <Outlet/>: <Homepage/>;
};

export default PrivateRoute;