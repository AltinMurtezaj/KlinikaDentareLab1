import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import XRayList from "./XRayList";



export default observer(function XRayDashboard(){
    const {xrayStore} = useStore();
    const {loadXRays,xrayRegistry} = xrayStore;
useEffect(()=>{
    if(xrayRegistry.size <= 1) loadXRays();
},[xrayRegistry.size,loadXRays])

if( xrayStore.loadingInitial)

 return <LoadingComponent content={""} />
        
    return (
        <Grid>
            <Grid.Column width='10'>
                 <XRayList/>
                    <Button as={NavLink} to='/createXray' positive>+Shto xray</Button>
            </Grid.Column>
                    
        </Grid>
    )
})