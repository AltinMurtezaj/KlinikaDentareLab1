import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Grid, Header, Input, Table } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";

export default observer(function UdhezimiDetails() {
  const { udhezimiStore } = useStore();
  const {
    loadingInitial,
    loadUdhezimi,
    selectedUdhezimi: Udhezimi,
  } = udhezimiStore;

  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState(false);

  useEffect(() => {
    if (id) {
      loadUdhezimi(id);
      console.log(Udhezimi);
    }
    if (state) setState(false);
  }, [id, loadUdhezimi, state, setState, Udhezimi]);

  if (loadingInitial || !Udhezimi)
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
    {Udhezimi?.Emri}
  </Input>
</div>
<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "1em" }}> 
  <Header style={{ fontSize: "1.2em", fontWeight: "bold", marginBottom: "0.5em" }}>Doza:</Header>
  <Input
    readOnly
    className="Input"
    style={{ fontSize: "1.2em", padding: "0.5em" }}
  >
    {Udhezimi?.Doza}
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