import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Grid, List } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import RegisterForm from '../../users/RegisterForm';
import PacientiList from './PacientiList';

export default observer( function PacientiDashboard(){
    const {pacientiStore, modalStore} = useStore();
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
            </Grid.Column>
            <Grid.Column width ='16'>
            < Button onClick={()=>modalStore.openModal(<RegisterForm/>)} positive>
                    Shto pacientin
                </Button>
            </Grid.Column>
        </Grid>
        </>
    )

})