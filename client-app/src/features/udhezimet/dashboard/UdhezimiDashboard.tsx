import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Grid, List } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import RegisterForm from '../../users/RegisterForm';
import UdhezimiList from './UdhezimiList';

export default observer( function UdhezimiDashboard(){
    const {udhezimiStore, modalStore} = useStore();
    const {loadUdhezimet} = udhezimiStore;
  

    useEffect(() => {
        loadUdhezimet();
    }, [loadUdhezimet])

  
  if(udhezimiStore.loadingInitial) <LoadingComponent content='Loading udhezimet...'/>
    return (
        <>
        <Grid>
            <Grid.Column width='16'>
                <UdhezimiList />
            </Grid.Column>
            <Grid.Column width ='16'>
            < Button onClick={()=>modalStore.openModal(<RegisterForm/>)} positive>
                    Shto udhezimin
                </Button>
            </Grid.Column>
        </Grid>
        </>
    )

})