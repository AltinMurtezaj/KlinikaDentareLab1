import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useEffect, useState, SyntheticEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Container, Grid, Header, Input, Table } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";

export default observer(function PacientiDetails() {
  const { pacientiStore, pacientiDoktoriStore, userStore } = useStore();
  const {user} = userStore;
  const {loadingInitial, loadPacienti, selectedPacienti:pacienti} = pacientiStore;
  const { deletePacientiDoktori, loadDoktoriPacienti, selectedPacientiDoktori:doktoriPacienti } = pacientiDoktoriStore;
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState(false);
  const [target, setTarget] = useState('');

  useEffect(() => {
    if (id) loadPacienti(id);
    if (state) setState(false);

  }, [id, loadPacienti, state, setState]);
function handleDeletePacientiDoktori(e:SyntheticEvent<HTMLButtonElement>,PacientiId:string, DoktoriId:string, id: number){
  setTarget(e.currentTarget.name);
  deletePacientiDoktori(PacientiId, DoktoriId, id);
  loadDoktoriPacienti(PacientiId, DoktoriId);
  setState(true);
}
  if (loadingInitial || !pacienti)
    return <LoadingComponent content={""} />;

    return (
      <Card fluid style={{marginTop:'50px'}}>
          <Card.Header className="lendaTitle">{pacienti?.emri}</Card.Header>
          
                  <Table>
                    <Table.Header>
                      <Table.Row>
                          <Table.HeaderCell>Emri </Table.HeaderCell>
                          <Table.HeaderCell>Mbiemri</Table.HeaderCell>
                          <Table.HeaderCell>Kontakti</Table.HeaderCell>
                          <Table.HeaderCell colSpan="1">Operations</Table.HeaderCell>
                      </Table.Row>
                  </Table.Header>
                  <Table.Body>
                      {pacienti?.doktoret?.map((doktori) => (
                          <Table.Row key={doktori.id} >
                              <Table.Cell>{doktori.emri}</Table.Cell>
                              <Table.Cell>{doktori.mbiemri}</Table.Cell>
                              <Table.Cell>{doktori.email}</Table.Cell>
                              <Table.Cell> 
                                {
                                 (user!.discriminator === "Doktori")? 
                                  
                                    <div>
                                      <Button as={Link} to={`/editDoktoriPacienti/${pacienti.id}/${doktori.id}`} primary  placeholder='Edit' color="blue">Edit</Button>
                                  <Button loading={ target === pacienti.id!} 
  onClick={(e)=> handleDeletePacientiDoktori(e,pacienti.id!,doktori.id!,doktoriPacienti?.id!)}  className="button" aria-label="Delete" color="red">Delete
      </Button>
                                    </div>
                                  : null
                        
                      }
                        </Table.Cell>
                          </Table.Row>
                      ))}</Table.Body>
                     
              </Table>
      </Card>
  )
})
