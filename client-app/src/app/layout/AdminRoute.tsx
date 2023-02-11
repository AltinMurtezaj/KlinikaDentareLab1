import { Outlet } from "react-router-dom";
import Llogaria from "../../features/users/LlogariaForm";

import { useStore } from "../stores/store";




const AdminRoute = ()=>{

    const {userStore}=useStore();


    return userStore.user?.discriminator==="Admini" ? <Outlet/>: <Llogaria/>;
};

export default AdminRoute;