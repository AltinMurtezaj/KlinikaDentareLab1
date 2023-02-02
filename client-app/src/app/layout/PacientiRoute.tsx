import HomePage from "../../features/home/HomePage";
import { useStore } from "../stores/store";

const PacientiRoute = ()=>{

    const {userStore}=useStore();


   // return userStore.user?.discriminator==="Pacienti" ? <Outlet/>: <HomePage/>;
};

export default PacientiRoute;