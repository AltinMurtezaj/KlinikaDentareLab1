import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {  useParams } from "react-router-dom";
import {Grid} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import AccountantDetailedInfo from "./AccountantDetailedInfo";
import AccountantDetailedSidebar from "./AccountantDetailedSidebar";
import AccountantDetaledHeader from "./AccountantDetaledHeader";

export default observer(function AccountantDetails(){
    const {accountantStore} = useStore();
    const {selectedAccountant: accountant, loadAccountant, loadingInitial} = accountantStore;
    const {id} = useParams<{id: string}>();
    
    useEffect(() => {
      if(id) loadAccountant(id);
    }, [id, loadAccountant]);

    if(loadingInitial || !accountant) return <LoadingComponent content={""} />;

    return (
      <Grid>
        <Grid.Column width={10}>
          <AccountantDetaledHeader accountant={accountant}/>
          <AccountantDetailedInfo accountant={accountant}/>
          
        </Grid.Column>
        <Grid.Column width={6}>
          <AccountantDetailedSidebar />
        </Grid.Column>
      </Grid>
    )
})