
import { observer } from 'mobx-react-lite';
import React from 'react';
import  { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


export default observer(function OrariList(){
    
    const {kontrollaStore} = useStore();
    const [target,setTarget]=useState('');
    const{kontrollaByEmri,deletekontrolla,loading} = kontrollaStore;
    
    function handleOrariDelete(e:SyntheticEvent<HTMLButtonElement>,id:string){
      setTarget(e.currentTarget.name);
      deletekontrolla(id);
    }
    return (
     <Container style={{marginTop:'7em'}}>
        <Table >
        <Table.Header>
          <Table.Row >
        <Table.HeaderCell>Emri Kontrolles </Table.HeaderCell>
        <Table.HeaderCell colSpan="1">Operations</Table.HeaderCell>
          </Table.Row>
          </Table.Header>
            <Table.Body>
              
        {kontrollaByEmri.map((kontrolla) =>(
          
          <Table.Row key={kontrolla.id}>
      <Table.Cell>{kontrolla.emriKontrolles}</Table.Cell>
        <Table.Cell colSpan="3">
          
    <Button as={Link} to={`/editOrari/${kontrolla.id}`} primary  placeholder='Edit' color="blue">Edit</Button>
    
      <Button loading={loading && target === kontrolla.id!.toString()} 
    onClick={(e)=> handleOrariDelete(e,kontrolla.id!)}  className="button" aria-label="Delete" color="red">Delete
        </Button>
    
 </Table.Cell>
        </Table.Row>
        ))}
        </Table.Body>
        </Table>
        </Container>
)
});