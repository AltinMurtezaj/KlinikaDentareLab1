import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid, List } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import TerapistiList from './TerapistiList';

export default observer( function TerapistiDashboard () {
    const {terapistiStore} = useStore();
    const {loadTerapistet, terapistiRegistry} = terapistiStore;
  

    useEffect(() => {
     if(terapistiRegistry.size <= 1) loadTerapistet();
    }, [terapistiRegistry.size, loadTerapistet])
  
  if(terapistiStore.loadingInitial) return <LoadingComponent content='Loading therapists...'/>
    return (
        <Grid>
            <Grid.Column width='10'>
                <TerapistiList />
            </Grid.Column>
            <Grid.Column width ='6'>
            </Grid.Column>
        </Grid>
    )

})