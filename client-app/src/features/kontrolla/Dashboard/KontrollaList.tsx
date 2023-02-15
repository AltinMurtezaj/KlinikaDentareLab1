
import { observer } from 'mobx-react-lite';
import  { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


export default observer(function KontrollaList(){
    
    const {kontrollaStore} = useStore();
    const [target,setTarget]=useState('');
    const{kontrollat,deletekontrolla,loading} = kontrollaStore;
    
    function handleKontrollaDelete(e:SyntheticEvent<HTMLButtonElement>,id:string){
      setTarget(e.currentTarget.name);
      deletekontrolla(id);
    }
    return (
     <Container style={{marginTop:'7em'}}>
        <Table >
        <Table.Header>
          <Table.Row >
        
        <Table.HeaderCell colSpan="1">Emri i kontrolles</Table.HeaderCell>
        <Table.HeaderCell colSpan="1">Kosto</Table.HeaderCell>
        <Table.HeaderCell colSpan="1">Operations</Table.HeaderCell>
          </Table.Row>
          </Table.Header>
            <Table.Body>
        {kontrollat.map((kontrolla) =>(
          <Table.Row key={kontrolla.id}>
      
        <Table.Cell>{kontrolla.emriKontrolles}</Table.Cell>
        <Table.Cell>{kontrolla.kosto}</Table.Cell>
        <Table.Cell colSpan="3">
          
    <Button as={Link} to={`/editKontrolla/${kontrolla.id}`} primary  placeholder='Edit' color="blue">Edit</Button>
    
      <Button loading={loading && target === kontrolla.id!.toString()} 
    onClick={(e)=> handleKontrollaDelete(e,kontrolla.id!)}  className="button" aria-label="Delete" color="red">Delete
        </Button>
    
 </Table.Cell>
        </Table.Row>
        ))}
        </Table.Body>
        </Table>
        </Container>
)
});