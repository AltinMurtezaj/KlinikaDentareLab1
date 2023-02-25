import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "../../app/stores/store";

import { Header, Table } from "semantic-ui-react";


export default observer(function PacientiDoktoriDetails(){
    const {userStore,doktoriStore} = useStore();
    const {user}=userStore;
    const {loadDoktori,selectedDoktori:Doktori}=doktoriStore;
    const[state,setState] = useState(true);

    useEffect(()=>{
        loadDoktori(user?.id!);
        if(state) setState(false);
    },[loadDoktori,user?.id,state,setState]); 

/*
    export default observer(function PacientiDoktoriDetails(){
        const {userStore,pacientiDoktoriStore,pacientiStore} = useStore();
        const {user}=userStore;
    
        const {loadPacienti}=pacientiStore
        const {loadDoktoriPacientiByDoktori,selectedPacientiDoktori:PacientiDoktori}=pacientiDoktoriStore;
    
        const {doktoriPacientet}=pacientiDoktoriStore;
    
        
        useEffect(()=>{
    
            loadDoktoriPacientiByDoktori(user?.id!);
            console.log(PacientiDoktori);
        },[loadDoktoriPacientiByDoktori,PacientiDoktori,user?.id]);
    
    
    
        useEffect(()=>{
            if(PacientiDoktori?.id) loadPacienti(PacientiDoktori?.PacientiId);
        },[loadPacienti,PacientiDoktori?.id,PacientiDoktori?.PacientiId]); */
    
    return( 
        <>
         <Header>Pacientet</Header>
         
         <Table >
        <Table.Header>
          <Table.Row >
          <Table.HeaderCell>Emri i Pacientit</Table.HeaderCell>
        <Table.HeaderCell>Mbiemri i Pacientit</Table.HeaderCell>
        <Table.HeaderCell>Gjinia e Pacientit</Table.HeaderCell>
        <Table.HeaderCell>Email i Pacientit</Table.HeaderCell>
        <Table.HeaderCell>nrKontaktues i Pacientit</Table.HeaderCell>
        <Table.HeaderCell>vendbanimi i Pacientit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
        {Doktori?.pacientet!.map((pacienti) =>(
          
        <Table.Row key={pacienti.id}>
        <Table.Cell>{pacienti.emri}</Table.Cell>
        <Table.Cell>{pacienti.mbiemri}</Table.Cell>
        <Table.Cell>{pacienti.gjinia}</Table.Cell>
        <Table.Cell>{pacienti.email}</Table.Cell>
        <Table.Cell>{pacienti.nrKontaktues}</Table.Cell>
        <Table.Cell>{pacienti.vendbanimi}</Table.Cell>
        
      
        
        
        </Table.Row>
        ))}
        </Table.Body>
        </Table>
        </>

        
    )
})
