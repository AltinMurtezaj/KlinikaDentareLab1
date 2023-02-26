import { Outlet } from "react-router-dom";
import DoktoriDetails from "../../features/doktoret/dashboard/DoktoriDetails";
import DoktoriList from "../../features/doktoret/dashboard/DoktoriList";

import Llogaria from "../../features/users/LlogariaForm";
import { useStore } from "../stores/store";




const DoktoriRoute = ()=>{

    const {userStore}=useStore();


    return userStore.user?.discriminator==="Doktori" ? <Outlet/>: <Llogaria/>;
};

export default DoktoriRoute;