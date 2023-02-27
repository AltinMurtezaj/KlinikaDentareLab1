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
  deletePacientiDoktori(PacientiId, DoktoriId);
  loadDoktoriPacienti(PacientiId, DoktoriId);
  setState(true);
}
  if (loadingInitial || !pacienti)
    return <LoadingComponent content={""} />;

    return (
      <Card fluid style={{marginTop:'50px'}}>
           <Card.Header className="lendaTitle" style={{ fontSize: "24px", fontWeight: "bold" }}>{pacienti?.emri}</Card.Header>
          
                  <Table>
                    <Table.Header>
                      <Table.Row>
                          <Table.HeaderCell>Emri </Table.HeaderCell>
                          <Table.HeaderCell>Pershkrimi</Table.HeaderCell>
                          <Table.HeaderCell>Cmimi</Table.HeaderCell>
                      </Table.Row>
                  </Table.Header>
                  <Table.Body>
                      {pacienti?.tretmanet?.map((tretmani) => (
                          <Table.Row key={tretmani.id} >
                              <Table.Cell>{tretmani.emri}</Table.Cell>
                              <Table.Cell>{tretmani.pershkrimi}</Table.Cell>
                              <Table.Cell>{tretmani.cmimi}</Table.Cell>
                          </Table.Row>
                      ))}</Table.Body>
                     
              </Table>
      </Card>
  )
})
