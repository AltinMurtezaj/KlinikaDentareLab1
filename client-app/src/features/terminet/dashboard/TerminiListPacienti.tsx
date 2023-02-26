import { observer } from "mobx-react-lite";
import { SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "semantic-ui-react";
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
     <Card.Header className="lendaTitle">{pacienti?.emri}</Card.Header>
                    {pacienti?.terminet?.map((termini) => (
                      <Card>
                        <Card.Header>Termini</Card.Header>
                        <Card.Content>{termini.id}</Card.Content>
                        <Card.Content>{termini.koha}</Card.Content>   
                        <Card.Content>{termini.data}</Card.Content>
                      </Card>
                    ))}
        </Card>
    )
 }) 
