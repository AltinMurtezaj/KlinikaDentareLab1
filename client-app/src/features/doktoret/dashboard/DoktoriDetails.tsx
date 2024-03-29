import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { SyntheticEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Container, Grid, Header, Icon, Input, Tab, Table } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";

export default observer(function DoktoriDetails() {
  const { doktoriStore, pacientiDoktoriStore, pacientiStore, userStore } = useStore();
  const {user} = userStore;
  const {deletePacientiDoktori} = pacientiDoktoriStore;
  const [target, setTarget] = useState('');
  const {
    loadingInitial,
    loadDoktori,
    selectedDoktori: Doktori,
  } = doktoriStore;

  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState(false);
  function handleDeletePacientiDoktori(e:SyntheticEvent<HTMLButtonElement>,PacientiId:string, DoktoriId:string){
    setTarget(e.currentTarget.name);
    deletePacientiDoktori(PacientiId, DoktoriId);
    setState(true);
    //reloading 
  }
  useEffect(() => {
    if (id) {
      loadDoktori(id);
      console.log(Doktori);
    }
    if (state) setState(false);
  }, [id, loadDoktori, state, setState, Doktori]);

  if (loadingInitial || !Doktori)
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
    {Doktori?.emri}
  </Input>
</div>
<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "1em" }}> 
  <Header style={{ fontSize: "1.2em", fontWeight: "bold", marginBottom: "0.5em" }}>Mbiemri:</Header>
  <Input
    readOnly
    className="Input"
    style={{ fontSize: "1.2em", padding: "0.5em" }}
  >
    {Doktori?.mbiemri}
  </Input>
</div>

<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "1em" }}> 
  <Header style={{ fontSize: "1.2em", fontWeight: "bold", marginBottom: "0.5em" }}>Ditelindja:</Header>
  <Input
    readOnly
    className="Input"
    style={{ fontSize: "1.2em", padding: "0.5em" }}
  >
    {format(new Date(Doktori?.datelindja!), "dd MMM yyyy")}
  </Input>
</div>

<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "1em" }}> 
  <Header style={{ fontSize: "1.2em", fontWeight: "bold", marginBottom: "0.5em" }}>NrKontaktues:</Header>
  <Input
    readOnly
    className="Input"
    style={{ fontSize: "1.2em", padding: "0.5em" }}
  >
    {Doktori?.nrKontaktues}
  </Input>
</div> 
<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "1em" }}> 
  <Header style={{ fontSize: "1.2em", fontWeight: "bold", marginBottom: "0.5em" }}>Gjinia:</Header>
  <Input
    readOnly
    className="Input"
    style={{ fontSize: "1.2em", padding: "0.5em" }}
  >
    {Doktori?.gjinia}
  </Input>
</div>
<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "1em" }}> 
  <Header style={{ fontSize: "1.2em", fontWeight: "bold", marginBottom: "0.5em" }}>Vendbanimi:</Header>
  <Input
    readOnly
    className="Input"
    style={{ fontSize: "1.2em", padding: "0.5em" }}
  >
    {Doktori?.vendbanimi}
  </Input>
</div>
<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "1em" }}> 
  <Header style={{ fontSize: "1.2em", fontWeight: "bold", marginBottom: "0.5em" }}>Email:</Header>
  <Input
    readOnly
    className="Input"
    style={{ fontSize: "1.2em", padding: "0.5em" }}
  >
    {Doktori?.email}
  </Input>
</div>
<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "1em" }}> 
  <Header style={{ fontSize: "1.2em", fontWeight: "bold", marginBottom: "0.5em" }}>Kualifikimi:</Header>
  <Input
    readOnly
    className="Input"
    style={{ fontSize: "1.2em", padding: "0.5em" }}
  >
    {Doktori?.kualifikimi}
  </Input>
</div>

<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "1em" }}> 
  <Header style={{ fontSize: "1.2em", fontWeight: "bold", marginBottom: "0.5em" }}>Specializimi:</Header>
  <Input
    readOnly
    className="Input"
    style={{ fontSize: "1.2em", padding: "0.5em" }}
  >
    {Doktori?.specializimi}
  </Input>
</div>
          
        
  </Container>
    </Card.Content>
  </Card>
  </Grid.Column>
  <Grid.Column width="7" style={{marginTop:"200px" }}>
  <h4>Lista e pacienteve</h4>
  <Table >
        <Table.Header>
          <Table.Row >
        <Table.HeaderCell>Emri</Table.HeaderCell>
        <Table.HeaderCell>Mbiemri</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Operations</Table.HeaderCell>

          </Table.Row>
        </Table.Header>
    
        <Table.Body>
        
        {Doktori?.pacientet?.map((pacienti) => (
          <Table.Row key={pacienti.id} >
            <Table.Cell>{pacienti.emri}</Table.Cell>
            <Table.Cell>{pacienti.mbiemri}</Table.Cell>
            <Table.Cell>{pacienti.email}</Table.Cell>
            <Button as={Link} to={`/PacientiDetails/${pacienti.id}`} primary floated='left' placeholder='Details' color="teal">Details</Button>
            {user?.discriminator === "Doktori" ?(
              <>
              
                            <Button loading={ target === pacienti.id!}  
  onClick={(e)=> handleDeletePacientiDoktori(e,pacienti.id!,Doktori.id!)}  className="button" aria-label="Delete" color="red">Delete
      </Button>
      </>) : null}

            </Table.Row>

))} </Table.Body>
         </Table>
      </Grid.Column>
        </Grid>
    )
})