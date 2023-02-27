import { observer } from "mobx-react-lite";
import { SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, CardContent } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import pacientiStore from "../../../app/stores/pacientiStore";
import PacientiStore from "../../../app/stores/pacientiStore";
import { useStore } from "../../../app/stores/store";



export default observer(function TerminiListPacienti() {

    const {terminiStore, pacientiStore} = useStore();
    const {terminetById, terminiRegistry} = terminiStore;
    const {selectedTermini} = terminiStore;
    const {loadingInitial, loadPacienti, selectedPacienti:pacienti} = pacientiStore;
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState(false);
    const [target, setTarget] = useState('');

    useEffect(() => {
        if (id) loadPacienti(id);
        if (state) setState(false);
    }, [id, loadPacienti, state, setState]);

    
    function handleDeleteTermini(e:SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        terminiStore.deleteTermini(id);
        setState(true);
    }

    if (loadingInitial || !pacienti)
        return <LoadingComponent content={""} />;
        return (
            <Card fluid style={{marginTop: "2em"}}>
<Card.Header className="lendaTitle" style={{ fontSize: "24px", fontWeight: "bold" }}>{pacienti?.emri}</Card.Header>
              <Card.Content>
                {pacienti?.terminet?.map((termini) => (
                  <Card key={termini.id}>
                    <Card.Content>
                      <Card.Header>Termini</Card.Header>
                      <Card.Description>ID: {termini.id}</Card.Description>
                      <Card.Description>Koha: {termini.koha}</Card.Description>   
                      <Card.Description>Data: {termini.data}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Button
                        name={termini.id}
                        onClick={(e) => handleDeleteTermini(e, termini.id!)}
                        loading={target === termini.id && state}
                        color='red'
                        content='Anulo terminin'
                        style={{marginTop: "1em"}}
                      />
                    </Card.Content>
                  </Card>
                ))}
              </Card.Content>
            </Card>
          );
          
 }) 
