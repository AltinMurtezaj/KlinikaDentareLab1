import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid, List } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import AccountantStore from '../../../app/stores/accountantStore';
import { useStore } from '../../../app/stores/store';
import AccountantList from './AccountantList';

export default observer( function AccountantDashboard () {
    const {accountantStore} = useStore();
    const {loadAccountants, accountantRegistry} = accountantStore;
  

    useEffect(() => {
     if(accountantRegistry.size <= 1) loadAccountants();
    }, [accountantRegistry.size, loadAccountants])
  
  if(accountantStore.loadingInitial) return <LoadingComponent content='Loading accountants...'/>
    return (
        <Grid>
            <Grid.Column width='10'>
                <AccountantList />
            </Grid.Column>
            <Grid.Column width ='6'>
            
            </Grid.Column>
        </Grid>
    )

})