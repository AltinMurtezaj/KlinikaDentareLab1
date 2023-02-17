import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
interface Props{
    terminiId:string;
}
export default observer(function TerminiName({terminiId}:Props){
    const {terminiStore}=useStore();
    const {loadTermini,selectedTermini:termini}=terminiStore;
    const[terminiState,setTerminiState]=useState({});

    useEffect(()=>{
       if(terminiId) loadTermini(terminiId).then((termini)=>{
        setTerminiState(termini!);
       });
    },[loadTermini,terminiId,setTerminiState,termini]);
    
    return (
        <Label>Termini:{termini?.koha}</Label>
    )
})