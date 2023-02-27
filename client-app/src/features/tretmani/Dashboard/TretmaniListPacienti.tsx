import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useEffect, useState, SyntheticEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Container, Grid, Header, Input, Table } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { Kontrolla } from "../../../app/models/kontrolla";
import { Tretmani } from "../../../app/models/tretmani";
import { Udhezimi } from "../../../app/models/udhezimi";
import { useStore } from "../../../app/stores/store";

export default observer(function TretmaniListPacienti() {
  const { pacientiStore, pacientiDoktoriStore, userStore, kontrollaStore, udhezimiStore} = useStore();
  const {user} = userStore;
  const {loadKontrolla, selectedKontrolla} = kontrollaStore
  const {loadUdhezimi, selectedUdhezimi} = udhezimiStore

  const {loadingInitial, loadPacienti, selectedPacienti:pacienti} = pacientiStore;
  const { deletePacientiDoktori, loadDoktoriPacienti, selectedPacientiDoktori:doktoriPacienti } = pacientiDoktoriStore;
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState(false);
  const [target, setTarget] = useState('');
  const [selectedKontrollaArray, setSelectedKontrollaArray] = useState<Kontrolla[]>([]);
  const [selectedTretmanetArray, setSelectedTretmanetArray] = useState<Tretmani[]>([]);



  async function loadKontrollat(){
    const selectedKontrollaArray: Kontrolla[] = [];
  
    for (const tretmani of pacienti?.tretmanet || []) {
      const kontrolla = await loadKontrolla(tretmani.kontrollaId!);
      selectedKontrollaArray.push(kontrolla!);
    }
  
    setSelectedKontrollaArray(selectedKontrollaArray);
  }
  async function loadTretmanet() {
    const selectedTretmanetArray: Tretmani[] = [];
  
    for (const tretmani of pacienti?.tretmanet || []) {
      let updatedTretmani = tretmani;
      for (const udhezimiId of tretmani.udhezimet || []) {
        const udhezimi = await loadUdhezimi(udhezimiId.toString());
        if (udhezimi) {
          updatedTretmani.udhezimet?.push(udhezimi);
        }
      }
      selectedTretmanetArray.push(updatedTretmani);
    }
  
    setSelectedTretmanetArray(selectedTretmanetArray);
  }

  
    //me kriju nje array per me mujt me perdor me i shfaq kontrollat, kete array duhet me kriju nalt. kete array ki me mbush me vlerat e selectedKontrolla.
    //posht te return duhet me bo nje map ama per arrayn e krijuar.

  useEffect(() => {
    if (id) loadPacienti(id);
    if (state) setState(false);
    loadKontrollat();
    loadTretmanet();
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
      <Card fluid style={{marginTop: "2em", padding: "1em"}}>
        <Card.Header className="lendaTitle" style={{ fontSize: "24px", fontWeight: "bold" }}>{pacienti?.emri}</Card.Header>
        {pacienti?.tretmanet?.map((tretmani) => (
          <Card style={{marginTop: '1em'}}>
            <Card.Header style={{ fontSize: "15px", fontWeight: "bold", padding: "5px" }}>Tretmani</Card.Header>
            <Card.Content>Emri: {tretmani.emri}</Card.Content>
            <Card.Content>Pershkrimi: {tretmani.pershkrimi}</Card.Content>
            <Card.Content>Cmimi: {tretmani.cmimi}</Card.Content>
    
            <Card.Header style={{ fontSize: "15px", fontWeight: "bold", padding: "5px"}}>Kontrolla</Card.Header>
            {selectedKontrollaArray.map((kontrolla) => (
              <>
                <Card.Content style={{marginTop: '0.5em'}}>
                  Emri: {kontrolla?.emriKontrolles}
                </Card.Content>
                <Card.Content>
                  Kosto: {kontrolla?.kosto}
                </Card.Content>
              </>
            ))}
            <Card.Header style={{ fontSize: "15px", fontWeight: "bold" , padding: "5px"}}>Udhëzimet</Card.Header>
            {tretmani.udhezimet?.map((udhezimi) => (
              <>
                <Card.Content>{udhezimi.Emri}</Card.Content>
                <Card.Content>
                  {udhezimi.Doza}
                </Card.Content>
              </>
            ))}
          </Card>
        ))}
      </Card>
    )
            }
)
    