import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Grid, List } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import FarmacistetList from './farmacistetList';

export default observer( function FarmacistiDashboard () {
    const {farmacistiStore} = useStore();
    const {loadFarmacistet, farmacistiRegistry} = farmacistiStore;
  

    useEffect(() => {
     if(farmacistiRegistry.size <= 1) loadFarmacistet();
    }, [farmacistiRegistry.size, loadFarmacistet])
  
  if(farmacistiStore.loadingInitial) return <LoadingComponent content='Loading farmacistet...'/>
    return (
        <Grid>
            <Grid.Column width='10'>
                <FarmacistetList />
            </Grid.Column>
            <Grid.Column width ='6'>
            <Button as={NavLink} to='/createFarmacistet' positive content='Create Farmacisti'/>
            </Grid.Column>
        </Grid>
    )

})