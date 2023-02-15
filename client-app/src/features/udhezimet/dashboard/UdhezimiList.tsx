import format from "date-fns/format";
import { observer } from "mobx-react-lite";
import React, { Fragment, SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Icon, Table} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";



export default observer(function UdhezimiList(){
    const {udhezimiStore} = useStore();
    const {deleteudhezimi, loading, loadUdhezimet, getUdhezimet } = udhezimiStore;
    const [target, setTarget] = useState('');

    function handleUdhezimiDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteudhezimi(id);
    }

    const tabela = {
        marginTop:"15px",
        marginRight:"7rem"
    }
   
   useEffect(()=>{
      loadUdhezimet();
    },[loadUdhezimet]);


    return (
      
        <Container style={tabela}>
        <Table >
        <Table.Header>
          <Table.Row >
        <Table.HeaderCell>Emri</Table.HeaderCell>
        <Table.HeaderCell>Doza</Table.HeaderCell>
        <Table.HeaderCell colSpan="2">Operations</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
        {getUdhezimet.map((udhezimi) =>(
          
          <Table.Row key={udhezimi.Id}>
      <Table.Cell>{udhezimi.Emri}</Table.Cell>
        <Table.Cell>{udhezimi.Doza}</Table.Cell>
        
        <Table.Cell colSpan="3">
        <Button as={Link} to={`/UdhezimiDetails/${udhezimi.Id}`} primary floated='left' placeholder='Details' color="teal">Details</Button>
            
            <Button as={Link} to={`/manageUdhezimi/${udhezimi.Id}`} floated='left' color='blue'>
                                <Icon name='edit'/>
                            </Button>
                            <Button 
                        name={udhezimi.Id}
                        loading={loading && target === udhezimi.Id}
                        onClick={(e)=>handleUdhezimiDelete(e, udhezimi.Id!)} 
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