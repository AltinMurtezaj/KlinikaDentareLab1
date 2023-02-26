import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useEffect, useState, SyntheticEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Container, Grid, Header, Input, Table } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { Kontrolla } from "../../../app/models/kontrolla";
import { useStore } from "../../../app/stores/store";

export default observer(function TretmaniListPacienti() {
  const { pacientiStore, pacientiDoktoriStore, userStore, kontrollaStore } = useStore();
  const {user} = userStore;
  const {loadKontrolla, selectedKontrolla} = kontrollaStore
  const {loadingInitial, loadPacienti, selectedPacienti:pacienti} = pacientiStore;
  const { deletePacientiDoktori, loadDoktoriPacienti, selectedPacientiDoktori:doktoriPacienti } = pacientiDoktoriStore;
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState(false);
  const [target, setTarget] = useState('');
  const [selectedKontrollaArray, setSelectedKontrollaArray] = useState<Kontrolla[]>([]);



  async function loadKontrollat(){
    const selectedKontrollaArray: Kontrolla[] = [];
  
    for (const tretmani of pacienti?.tretmanet || []) {
      const kontrolla = await loadKontrolla(tretmani.kontrollaId!);
      selectedKontrollaArray.push(kontrolla!);
    }
  
    setSelectedKontrollaArray(selectedKontrollaArray);
  }


    //me kriju nje array per me mujt me perdor me i shfaq kontrollat, kete array duhet me kriju nalt. kete array ki me mbush me vlerat e selectedKontrolla.
    //posht te return duhet me bo nje map ama per arrayn e krijuar.

  useEffect(() => {
    if (id) loadPacienti(id);
    if (state) setState(false);
    loadKontrollat();

    console.log(selectedKontrollaArray);
    

  }, [id, loadPacienti, state, setState]);

 

function handleDeletePacientiDoktori(e:SyntheticEvent<HTMLButtonElement>,PacientiId:string, DoktoriId:string, id: number){
  setTarget(e.currentTarget.name);
  deletePacientiDoktori(PacientiId, DoktoriId);
  loadDoktoriPacienti(PacientiId, DoktoriId);
  setState(true);
}
  if (loadingInitial || !pacienti)
    return <LoadingComponent content={""} />;

    console.log(selectedKontrollaArray);

    return (
        <Card fluid style={{marginTop:'50px'}}>
            <Card.Header className="lendaTitle">{pacienti?.emri}</Card.Header>
                    {pacienti?.tretmanet?.map((tretmani) => (
                      <Card>
                        <Card.Header>Tretmani</Card.Header>
                        <Card.Content>{tretmani.emri}</Card.Content>
                        <Card.Content>{tretmani.pershkrimi}</Card.Content>
                        <Card.Content>{tretmani.cmimi}</Card.Content>
                        <Card.Header>Kontrolla</Card.Header>
                        {selectedKontrollaArray.map((kontrolla) => (
                          <>
                          <Card.Content>
                            {kontrolla?.emriKontrolles}
                          </Card.Content>
                          <Card.Content>
                            {kontrolla?.kosto}
                          </Card.Content>
                          </>
                        ))}
                      </Card>
                    ))}
                
           
        </Card>
    )
})