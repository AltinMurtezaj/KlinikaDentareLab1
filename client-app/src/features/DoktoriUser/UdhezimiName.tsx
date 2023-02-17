import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
interface Props{
    udhezimiId:string;
}
export default observer(function UdhezimiName({udhezimiId}:Props){
    const {udhezimiStore}=useStore();
    const {loadUdhezimi,selectedUdhezimi:udhezimi}=udhezimiStore;
    const[udhezimiState,setUdhezimiState]=useState({});

    useEffect(()=>{
       if(udhezimiId) loadUdhezimi(udhezimiId).then((udhezimi)=>{
        setUdhezimiState(udhezimi!);
       });
    },[loadUdhezimi,udhezimiId,setUdhezimiState,udhezimi]);
    
    return (
        <Label>Udhezimi:{udhezimi?.Emri}</Label>
    )
})