import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import OrariList from "./KontrollaList";


export default observer(function OrariDashboard(){
    const {kontrollaStore} = useStore();
    const {loadKontrollat,kontrollaRegistry} = kontrollaStore;
useEffect(()=>{
    if(kontrollaRegistry.size <= 1) loadKontrollat();
},[kontrollaRegistry.size,loadKontrollat])

if( kontrollaStore.loadingInitial)

 return <LoadingComponent content={""} />
        
    return (
        <Grid>
            <Grid.Column width='10'>
                 <OrariList/>
                    <Button as={NavLink} to='/createKontrolla' positive>+Shto Kontrollen</Button>
            </Grid.Column>
                    
        </Grid>
    )
})