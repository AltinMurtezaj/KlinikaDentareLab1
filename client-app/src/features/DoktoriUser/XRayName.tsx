import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
interface Props{
    xrayId:string;
}
export default observer(function XRayName({xrayId}:Props){
    const {xrayStore}=useStore();
    const {loadXRay,selectedXRay:xray}=xrayStore;
    const[tretmaniState,setXRayState]=useState({});

    useEffect(()=>{
       if(xrayId) loadXRay(xrayId).then((xray)=>{
        setXRayState(xray!);
       });
    },[loadXRay,xrayId,setXRayState,xray]);
    
    return (
        <Label>XRay:{xray?.Id}</Label>
    )
})