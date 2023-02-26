import format from "date-fns/format";
import { observer } from "mobx-react-lite";
import React, { Fragment, SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Icon, Table} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";



export default observer(function PacientiList(){
    const {pacientiStore, userStore} = useStore();
    const {user} = userStore;
    const {deletePacienti, loading, loadPacientet, getPacientet } = pacientiStore;
    const [target, setTarget] = useState('');

    function handlePacientiDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deletePacienti(id);
    }

    const tabela = {
        marginTop:"15px",
        marginRight:"7rem"
    }
   
   useEffect(()=>{
      loadPacientet();
    },[loadPacientet]);


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

        <Table.HeaderCell colSpan="2">Operations</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
        {getPacientet.map((pacienti) =>(
          
          <Table.Row key={pacienti.id}>
      <Table.Cell>{pacienti.userName}</Table.Cell>
        <Table.Cell>{pacienti.emri}</Table.Cell>
        <Table.Cell>{pacienti.mbiemri}</Table.Cell>
        <Table.Cell>{format(new Date(pacienti.datelindja!),'dd MMM yyy')}</Table.Cell>
        <Table.Cell>{pacienti.nrKontaktues}</Table.Cell>
        <Table.Cell>{pacienti.gjinia}</Table.Cell>
        <Table.Cell>{pacienti.vendbanimi}</Table.Cell>
        <Table.Cell>{pacienti.email}</Table.Cell>
        <Table.Cell colSpan="3">
        {user?.discriminator==="Doktori" ? (
                    <>
                     <Button as={Link} to={`/managePacienti/${pacienti.id}`} floated='left' color='blue'>
                                <Icon name='edit'/>
                            </Button>
                            <Button 
                        name={pacienti.id}
                        loading={loading && target === pacienti.id}
                        onClick={(e)=>handlePacientiDelete(e, pacienti.id)} 
                        floated='left' 
                        color='red'
                        >
                                <Icon name='delete'/>
                            </Button>
                            </>) : <Button as={Link} to={`/PacientiDetails/${pacienti.id}`} primary floated='left' placeholder='Details' color="teal">Details</Button>}
        
            
           
                            
                            
                        </Table.Cell>
                        
      </Table.Row>
         ))}
        </Table.Body>
      </Table>
      </Container>
    )
})