import { Outlet } from "react-router-dom";
import Llogaria from "../../features/users/LlogariaForm";

import { useStore } from "../stores/store";




const AdminRoute = ()=>{

    const {userStore}=useStore();


    return userStore.user?.discriminator==="AppUser" ? <Outlet/>: <Llogaria/>;
};

export default AdminRoute;