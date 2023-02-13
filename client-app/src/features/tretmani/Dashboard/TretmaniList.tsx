import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Tab, Table } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";




export default observer(function TretmaniList() {
     const {tretmaniStore} = useStore();
     const [target,setTarget] = useState('');
     const {tretmanet, deletetretmani, loading} = tretmaniStore;
    function handleTretmaniDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deletetretmani(id);
    }
    return(
        <Container style={{marginTop: '7em'}}>
            <Table >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Emri</Table.HeaderCell>
                        <Table.HeaderCell>Pershkrimi</Table.HeaderCell>
                        <Table.HeaderCell>Cmimi</Table.HeaderCell>
                        <Table.HeaderCell>Doktori</Table.HeaderCell>
                        <Table.HeaderCell>Pacienti</Table.HeaderCell>
                        <Table.HeaderCell>Pagesa</Table.HeaderCell>

                        <Table.HeaderCell colspan="1"> Operations </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {tretmanet.map(tretmani => (
                        <Table.Row key={tretmani.id}>

                            <Table.Cell>{tretmani.emri}</Table.Cell>
                            <Table.Cell>{tretmani.pershkrimi}</Table.Cell>
                            <Table.Cell>{tretmani.cmimi}</Table.Cell>
                            <Table.Cell>{tretmani.doktoriId}</Table.Cell>
                            <Table.Cell>{tretmani.pacientId}</Table.Cell>
                            <Table.Cell>{tretmani.pagesaId}</Table.Cell>

                            <Table.Cell colSpan="3">

                <Button as={Link} to={`/tretmani/${tretmani.id}`} primary placeholder='Edit' color='blue' content='Edit'>Edit</Button>
                <Button loading={loading && target === tretmani.id!.toString()} 
                onClick={(e) => handleTretmaniDelete(e, tretmani.id!)} placeholder='Delete' color='red' content='Delete'>Delete</Button>
                            </Table.Cell> 
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Container>
    )
}) 