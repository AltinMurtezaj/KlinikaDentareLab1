import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Grid, List } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';


import InfermjeretList from './InfermjeretList';

export default observer( function InfermierjaDashboard () {
    const {infermierjaStore} = useStore();
    const {loadInfermjeret, infermierjaRegistry} = infermierjaStore;
  

    useEffect(() => {
     loadInfermjeret();
    }, [ loadInfermjeret])
  
  if(infermierjaStore.loadingInitial) return <LoadingComponent content='Loading infermjeret...'/>
    return (
        <Grid>
            <Grid.Column width='10'>
                <InfermjeretList />
            </Grid.Column>
            <Grid.Column width ='6'>
            <Button as={NavLink} to='/createInfermjeret' positive content='Create Nurse'/>
            </Grid.Column>
        </Grid>
    )

})