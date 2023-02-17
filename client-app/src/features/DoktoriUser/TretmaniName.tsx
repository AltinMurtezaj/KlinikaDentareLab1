import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
interface Props{
    tretmaniId:string;
}
export default observer(function TretmaniName({tretmaniId}:Props){
    const {tretmaniStore}=useStore();
    const {loadTretmani,selectedTretmani:tretmani}=tretmaniStore;
    const[tretmaniState,setTretmaniState]=useState({});

    useEffect(()=>{
       if(tretmaniId) loadTretmani(tretmaniId).then((tretmani)=>{
        setTretmaniState(tretmani!);
       });
    },[loadTretmani,tretmaniId,setTretmaniState,tretmani]);
    
    return (
        <Label>Tretmani:{tretmani?.emri}</Label>
    )
})