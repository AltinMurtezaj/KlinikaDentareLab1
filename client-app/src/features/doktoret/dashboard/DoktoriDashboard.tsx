import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Grid, List } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import RegisterForm from '../../users/RegisterForm';
import RegisterDoktoriForm from '../form/RegisterDoktoriForm';
import DoktoriList from './DoktoriList';

export default observer( function DoktoriDashboard(){
    const {doktoriStore, modalStore} = useStore();
    const {loadDoktoret} = doktoriStore;
  

    useEffect(() => {
        loadDoktoret();
    }, [loadDoktoret])

  
  if(doktoriStore.loadingInitial) <LoadingComponent content='Loading doktoret...'/>
    return (
        <>
        <Grid>
            <Grid.Column width='16'>
                <DoktoriList />
            </Grid.Column>
            <Grid.Column width ='16'>
            < Button onClick={()=>modalStore.openModal(<RegisterDoktoriForm/>)} positive>
                    Shto doktorin
                </Button>
            </Grid.Column>
        </Grid>
        </>
    )

})