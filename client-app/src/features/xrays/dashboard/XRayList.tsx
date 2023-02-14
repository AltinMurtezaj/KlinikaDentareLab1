import format from "date-fns/format";
import { observer } from "mobx-react-lite";
import React, { Fragment, SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Icon, Table} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";



export default observer(function XRayList(){
    const {xrayStore} = useStore();
    const {deleteXRay, loading, loadXRays, getXRays } = xrayStore;
    const [target, setTarget] = useState('');

    function handleXRayDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteXRay(id);
    }

    const tabela = {
        marginTop:"15px",
        marginRight:"7rem"
    }
   
   useEffect(()=>{
      loadXRays();
    },[loadXRays]);


    return (
      
        <Container style={tabela}>
        <Table >
        <Table.Header>
          <Table.Row >
          <Table.HeaderCell>Data</Table.HeaderCell>

        <Table.HeaderCell colSpan="2">Operations</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
        {getXRays.map((xray) =>(
          
          <Table.Row key={xray.Id}>
        <Table.Cell>{format(new Date(xray.Data!),'dd MMM yyy')}</Table.Cell>
        <Table.Cell colSpan="3">
        <Button as={Link} to={`/PacientiDetails/${xray.Id}`} primary floated='left' placeholder='Details' color="teal">Details</Button>
            
            <Button as={Link} to={`/manageXRay/${xray.Id}`} floated='left' color='blue'>
                                <Icon name='edit'/>
                            </Button>
                            <Button 
                        name={xray.Id}
                        loading={loading && target === xray.Id}
                        onClick={(e)=>handleXRayDelete(e, xray.Id!)} 
                        floated='left' 
                        color='red'
                        >
                                <Icon name='delete'/>
                            </Button>
                            
                        </Table.Cell>
                        
      </Table.Row>
         ))}
        </Table.Body>
      </Table>
      </Container>
    )
})