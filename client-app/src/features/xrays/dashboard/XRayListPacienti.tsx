import { observer } from "mobx-react-lite";
import { SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import pacientiStore from "../../../app/stores/pacientiStore";
import PacientiStore from "../../../app/stores/pacientiStore";
import { useStore } from "../../../app/stores/store";



export default observer(function XRayListPacienti() {

    const {xrayStore, pacientiStore} = useStore();
    const {xrayById, xrayRegistry} = xrayStore;
    const {selectedXRay} = xrayStore;
    const {loadingInitial, loadPacienti, selectedPacienti:pacienti} = pacientiStore;
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState(false);
    const [target, setTarget] = useState('');

    useEffect(() => {
        if (id) loadPacienti(id);
        if (state) setState(false);
        console.log(pacienti);
        
    }, [id, loadPacienti, state, setState]);
    

    
    
    function handleDeleteTermini(e:SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        xrayStore.deleteXRay(id);
        setState(true);
    }
    if (loadingInitial || !pacienti)
        return <LoadingComponent content={""} />;
    return (
        <Card fluid style={{marginTop: "2em"}}>
  <Card.Header className="lendaTitle" style={{ fontSize: "24px", fontWeight: "bold" }}>{pacienti?.emri}</Card.Header>
  {pacienti?.xrays && pacienti.xrays.length > 0 ? (
    pacienti.xrays.map((xray) => (
      <Card key={xray.Id}>
        <Card.Header>X-Rays</Card.Header>
        <Card.Content>{xray.Id}</Card.Content>
        <Card.Content>{xray.Data}</Card.Content>         
      </Card>
    ))
  ) : (
    <Card.Content>No X-Rays found</Card.Content>
  )}
</Card>

    )
 }) 
