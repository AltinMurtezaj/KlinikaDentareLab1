import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Grid, List } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import PacientiList from './PacientiList';

export default observer( function PacientiDashboard () {
    const {pacientiStore} = useStore();
    const {loadPacientet, pacientiRegistry} = pacientiStore;
  

    useEffect(() => {
     if(pacientiRegistry.size <= 1) loadPacientet();
    }, [pacientiRegistry.size, loadPacientet])
  
  if(pacientiStore.loadingInitial) return <LoadingComponent content='Loading pacientet...'/>
    return (
        <Grid>
            <Grid.Column width='10'>
                <PacientiList />
            </Grid.Column>
            <Grid.Column width ='6'>
            <Button as={NavLink} to='/createPacientet' positive content='Create Pacient'/>
            </Grid.Column>
        </Grid>
    )

})