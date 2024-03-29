import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Grid, Header, List } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import RegisterForm from '../../users/RegisterForm';
import PacientiList from './PacientiList';

export default observer( function PacientiDashboard(){
    const {pacientiStore, modalStore, userStore} = useStore();
    const {user} = userStore;
    const {loadPacientet} = pacientiStore;
  

    useEffect(() => {
        loadPacientet();
    }, [loadPacientet])

  
  if(pacientiStore.loadingInitial) <LoadingComponent content='Loading pacientet...'/>
    return (
        <>
        <Grid>
            <Grid.Column width='16'>
                <PacientiList />
                < Button onClick={()=>modalStore.openModal(<RegisterForm/>)} positive>
                    Shto pacientin
                </Button>
            </Grid.Column>
            <Grid.Column width ='16'>
            {user?.discriminator==="Doktori" ? (
                    <>
                    <Header style={{color:'teal'}}>Doktoret e pacienteve specifike</Header>
                        <Button as={NavLink} to='/pacientiDoktoriForm' primary positive>+Vendosi pacientin doktorit</Button>
                        
                    </>) : null}
                        
            </Grid.Column>
        </Grid>
        </>
    )

})