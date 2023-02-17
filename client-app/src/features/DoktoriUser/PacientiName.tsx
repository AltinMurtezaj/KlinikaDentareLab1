import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

interface Props{
    pacientiId:string
}
export default observer(function PacientiName({pacientiId}:Props){
    const{pacientiStore}=useStore();
    const{loadPacienti,selectedPacienti:pacienti}=pacientiStore;

    useEffect(()=>{
        loadPacienti(pacientiId);
    },[loadPacienti,pacientiId])

    return (
        <>
    <Label>{pacienti?.emri} {pacienti?.mbiemri}</Label>
        </>
    )
})