import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Grid, List } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import PastruesiList from './PastruesiList';

export default observer( function PastruesiDashboard () {
    const {pastruesiStore} = useStore();
    const {loadPastrueset, pastruesiRegistry} = pastruesiStore;
  

    useEffect(() => {
     if(pastruesiRegistry.size <= 1) loadPastrueset();
    }, [pastruesiRegistry.size, loadPastrueset])
  
  if(pastruesiStore.loadingInitial) return <LoadingComponent content='Loading pastrueset...'/>
    return (
        <Grid>
            <Grid.Column width='10'>
                <PastruesiList />
            </Grid.Column>
            <Grid.Column width ='6'>
            <Button as={NavLink} to='/createPastrueset' positive content='Create Pastruesi'/>
            </Grid.Column>
        </Grid>
    )

})