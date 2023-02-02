import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Grid, List } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';

import TerminiList from './TerminiList';





export default observer( function TerminiDashboard () {
    const {terminiStore} = useStore();
    const {loadTerminet, terminiRegistry} = terminiStore;
  

    useEffect(() => {
     if(terminiRegistry.size <= 1) loadTerminet();
    }, [terminiRegistry.size, loadTerminet])
  
  if(terminiStore.loadingInitial) return <LoadingComponent content='Loading terminet...'/>
    return (
        <Grid>
            <Grid.Column width='10'>
                <TerminiList />
            </Grid.Column>
            <Grid.Column width ='6'>
            <Button as={NavLink} to='/createTerminet' positive content='Create Appointment'/>
            </Grid.Column>
        </Grid>
    )

})