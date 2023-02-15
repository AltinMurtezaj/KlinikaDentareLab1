import format from "date-fns/format";
import { observer } from "mobx-react-lite";
import React, { Fragment, SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Icon, Table} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";



export default observer(function DoktoriLit(){
    const {doktoriStore} = useStore();
    const {deleteDoktori, loading, loadDoktoret, getDoktoret } = doktoriStore;
    const [target, setTarget] = useState('');

    function handleDoktoriDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteDoktori(id);
    }

    const tabela = {
        marginTop:"15px",
        marginRight:"7rem"
    }
   
   useEffect(()=>{
      loadDoktoret();
    },[loadDoktoret]);


    return (
      
        <Container style={tabela}>
        <Table >
        <Table.Header>
          <Table.Row >
        <Table.HeaderCell>UserName</Table.HeaderCell>
        <Table.HeaderCell>Emri</Table.HeaderCell>
        <Table.HeaderCell>Mbiemri</Table.HeaderCell>
        <Table.HeaderCell>Datelindja</Table.HeaderCell>
        <Table.HeaderCell>NrKontaktues</Table.HeaderCell>
        <Table.HeaderCell>Gjinia</Table.HeaderCell>
        <Table.HeaderCell>vendbanimi</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Kualifikimi</Table.HeaderCell>
        <Table.HeaderCell>Specializimi</Table.HeaderCell>

        <Table.HeaderCell colSpan="2">Operations</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
        {getDoktoret.map((doktori) =>(
          
          <Table.Row key={doktori.id}>
      <Table.Cell>{doktori.userName}</Table.Cell>
        <Table.Cell>{doktori.emri}</Table.Cell>
        <Table.Cell>{doktori.mbiemri}</Table.Cell>
        <Table.Cell>{format(new Date(doktori.datelindja!),'dd MMM yyy')}</Table.Cell>
        <Table.Cell>{doktori.nrKontaktues}</Table.Cell>
        <Table.Cell>{doktori.gjinia}</Table.Cell>
        <Table.Cell>{doktori.vendbanimi}</Table.Cell>
        <Table.Cell>{doktori.email}</Table.Cell>
        <Table.Cell>{doktori.kualifikimi}</Table.Cell>
        <Table.Cell>{doktori.specializimi}</Table.Cell>
        <Table.Cell colSpan="3">
        <Button as={Link} to={`/DoktoriDetails/${doktori.id}`} primary floated='left' placeholder='Details' color="teal">Details</Button>
            
            <Button as={Link} to={`/manageDoktori/${doktori.id}`} floated='left' color='blue'>
                                <Icon name='edit'/>
                            </Button>
                            <Button 
                        name={doktori.id}
                        loading={loading && target === doktori.id}
                        onClick={(e)=>handleDoktoriDelete(e, doktori.id)} 
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