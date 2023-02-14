import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Grid, Header, Input, Table } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";

export default observer(function PacientiDetails() {
  const { pacientiStore } = useStore();
  const {
    loadingInitial,
    loadPacienti,
    selectedPacienti: Pacienti,
  } = pacientiStore;

  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState(false);

  useEffect(() => {
    if (id) {
      loadPacienti(id);
      console.log(Pacienti);
    }
    if (state) setState(false);
  }, [id, loadPacienti, state, setState, Pacienti]);

  if (loadingInitial || !Pacienti)
    return <LoadingComponent content={""} />;

  return (
    <Grid>
      <Grid.Column width="8" style={{ marginTop: "200px" }}>
        <Card>
        
          <Card.Content>
            <Container>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "1em" }}> 
  <Header style={{ fontSize: "1.2em", fontWeight: "bold", marginBottom: "0.5em" }}>Emri:</Header>
  <Input
    readOnly
    className="Input"
    style={{ fontSize: "1.2em", padding: "0.5em" }}
  >
    {Pacienti?.emri}
  </Input>
</div>
<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "1em" }}> 
  <Header style={{ fontSize: "1.2em", fontWeight: "bold", marginBottom: "0.5em" }}>Mbiemri:</Header>
  <Input
    readOnly
    className="Input"
    style={{ fontSize: "1.2em", padding: "0.5em" }}
  >
    {Pacienti?.mbiemri}
  </Input>
</div>

<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "1em" }}> 
  <Header style={{ fontSize: "1.2em", fontWeight: "bold", marginBottom: "0.5em" }}>Ditelindja:</Header>
  <Input
    readOnly
    className="Input"
    style={{ fontSize: "1.2em", padding: "0.5em" }}
  >
    {format(new Date(Pacienti?.datelindja!), "dd MMM yyyy")}
  </Input>
</div>

<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "1em" }}> 
  <Header style={{ fontSize: "1.2em", fontWeight: "bold", marginBottom: "0.5em" }}>NrKontaktues:</Header>
  <Input
    readOnly
    className="Input"
    style={{ fontSize: "1.2em", padding: "0.5em" }}
  >
    {Pacienti?.nrKontaktues}
  </Input>
</div> 
<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "1em" }}> 
  <Header style={{ fontSize: "1.2em", fontWeight: "bold", marginBottom: "0.5em" }}>Gjinia:</Header>
  <Input
    readOnly
    className="Input"
    style={{ fontSize: "1.2em", padding: "0.5em" }}
  >
    {Pacienti?.gjinia}
  </Input>
</div>
<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "1em" }}> 
  <Header style={{ fontSize: "1.2em", fontWeight: "bold", marginBottom: "0.5em" }}>Vendbanimi:</Header>
  <Input
    readOnly
    className="Input"
    style={{ fontSize: "1.2em", padding: "0.5em" }}
  >
    {Pacienti?.vendbanimi}
  </Input>
</div>
          
        
  </Container>
    </Card.Content>
  </Card>
  </Grid.Column>
  <Grid.Column width="7" style={{marginTop:"200px" }}>
  <Table >
        <Table.Header>
          <Table.Row >
        <Table.HeaderCell>Pershkrimi</Table.HeaderCell>
          <Table.HeaderCell>Data</Table.HeaderCell>
       
        

        
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
        </Table.Body>
         </Table>
      </Grid.Column>
        </Grid>
    )
})