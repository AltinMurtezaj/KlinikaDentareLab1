import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "../../app/stores/store";

import { Table } from "semantic-ui-react";

export default observer(function PacientiDoktoriDetails(){
    const {userStore,doktoriStore} = useStore();
    const {user}=userStore;
    const {loadDoktori,selectedDoktori:Doktori}=doktoriStore;
    const[state,setState] = useState(true);

    useEffect(()=>{
        loadDoktori(user?.id!);
        if(state) setState(false);
    },[loadDoktori,user?.id,state,setState]);
    return( 
        <>
         <Table >
        <Table.Header>
          <Table.Row >
          <Table.HeaderCell>Emri i Pacientit</Table.HeaderCell>
        <Table.HeaderCell>Mbiemri i Pacientit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
        {Doktori?.pacientet!.map((pacienti) =>(
          
          <Table.Row key={pacienti.id}>
      <Table.Cell>{pacienti.emri}</Table.Cell>
        <Table.Cell>{pacienti.mbiemri}</Table.Cell>
      
        
        
        </Table.Row>
        ))}
        </Table.Body>
        </Table>
        </>

        
    )
})

