
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import  { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


export default observer(function TerminiList(){
    
    const {terminiStore} = useStore();
    const [target,setTarget]=useState('');
    const{terminet,deleteTermini,loading} = terminiStore;
    
    function handleTerminiDelete(e:SyntheticEvent<HTMLButtonElement>,id:string){
      setTarget(e.currentTarget.name);
      deleteTermini(id);
    }
    return (
     <Container style={{marginTop:'7em'}}>
        <Table >
        <Table.Header>
          <Table.Row >
            <Table.HeaderCell colSpan="1">Data</Table.HeaderCell>
            <Table.HeaderCell colSpan="1">Koha</Table.HeaderCell>
          </Table.Row>
          </Table.Header>
            <Table.Body>
        {terminet.map((termini) =>(
          <Table.Row key={termini.id}>
      
      <Table.Cell>{format(new Date(termini.data!),'dd MMM yyy')}</Table.Cell>
        <Table.Cell>{termini.koha}</Table.Cell>
        <Table.Cell colSpan="3">      
    <Button as={Link} to={`/editTermini/${termini.id}`} primary  placeholder='Edit' color="blue">Edit</Button>
    
      <Button loading={loading && target === termini.id!.toString()} 
    onClick={(e)=> handleTerminiDelete(e,termini.id!)}  className="button" aria-label="Delete" color="red">Delete
        </Button>
    
 </Table.Cell>
        </Table.Row>
        ))}
        </Table.Body>
        </Table>
        </Container>
)
});