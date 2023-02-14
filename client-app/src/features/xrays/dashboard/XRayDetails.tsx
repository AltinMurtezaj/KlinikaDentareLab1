import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  Card, Container, Grid, Header, Input, Table } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";



export default observer(function XRayDetails(){
    const {xrayStore} = useStore();
    const {loadingInitial,loadXRay,selectedXRay:XRay}=xrayStore;

    const {id} = useParams<{id:string}>();
    const [state ,setState]=useState(false);

    useEffect(()=>{
        if(id){loadXRay(id);console.log(XRay);}
        if(state) setState(false);

    },[id,loadXRay,state,setState,XRay]);


    if(loadingInitial|| !XRay) return <LoadingComponent content={""}/>
    


    


    return (
        <Grid>

       <Grid.Column width="8" style={{marginTop:"200px" }}> <Card >
    <Card.Content >
    <Container >

<div className="container" > 
        <Header>Data:</Header>
        <Input readOnly className='Input'>{format(new Date(XRay?.Data!),'dd MMM yyyy')}</Input>
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
         </Table>
      </Grid.Column>
        </Grid>
    )
})