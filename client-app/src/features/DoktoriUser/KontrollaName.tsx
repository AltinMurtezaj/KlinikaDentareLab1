import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
interface Props{
    kontrollaId:string;
}
export default observer(function KontrollaName({kontrollaId}:Props){
    const {kontrollaStore}=useStore();
    const {loadKontrolla,selectedKontrolla:kontrolla}=kontrollaStore;
    const[kontrollaState,setKontrollaState]=useState({});

    useEffect(()=>{
       if(kontrollaId) loadKontrolla(kontrollaId).then((kontrolla)=>{
        setKontrollaState(kontrolla!);
       });
    },[loadKontrolla,kontrollaId,setKontrollaState,kontrolla]);
    
    return (
        <Label>Kontrolla:{kontrolla?.emriKontrolles}</Label>
    )
})