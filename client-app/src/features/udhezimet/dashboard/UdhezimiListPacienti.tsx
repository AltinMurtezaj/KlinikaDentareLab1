import { observer } from "mobx-react-lite";
import { SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, CardContent } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import pacientiStore from "../../../app/stores/pacientiStore";
import PacientiStore from "../../../app/stores/pacientiStore";
import { useStore } from "../../../app/stores/store";



export default observer(function TerminiListPacienti() {

    const {udhezimiStore, pacientiStore} = useStore();
    const {UdhezimetById, udhezimetByEmri,udhezimiRegistry} =udhezimiStore;
    const {selectedUdhezimi} = udhezimiStore;
    const {loadingInitial, loadPacienti, selectedPacienti:pacienti} = pacientiStore;
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState(false);
    const [target, setTarget] = useState('');

    useEffect(() => {
        if (id) loadPacienti(id);
        if (state) setState(false);
    }, [id, loadPacienti, state, setState]);

    
    function handleDeleteUdhezimi(e:SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        udhezimiStore.deleteudhezimi(id);
        setState(true);
    }
 console.log(pacienti);
 
    if (loadingInitial || !pacienti)
        return <LoadingComponent content={""} />;
        return (
            <Card fluid style={{ marginTop: "2em" }}>
              <Card.Header
                className="lendaTitle"
                style={{ fontSize: "24px", fontWeight: "bold" }}
              >
                {pacienti?.emri}
              </Card.Header>
              <Card.Content>
                {pacienti?.udhezimet?.map((udhezimi) => (
                  <Card key={udhezimi.Id}>
                    <Card.Content>
                      <Card.Header>Udhezimi</Card.Header>
                      <Card.Description>Emri: {udhezimi.Emri}</Card.Description>
                      <Card.Description>Doza: {udhezimi.Doza}</Card.Description>
                      <Card.Description>Tretman Id: {udhezimi.TretmaniId}</Card.Description>
                    </Card.Content>
                  </Card>
                ))}
              </Card.Content>
            </Card>
          )
        }
)
          
          
          
          
          

                   
