import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid, Header} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import KontrollaList from "./KontrollaList";



export default observer(function KOntrollaDashboard(){
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
                 <KontrollaList/>
                    <Button as={NavLink} to='/createKontrolla' positive>+Shto Kontrollen</Button>
              </Grid.Column>
        </Grid>
    )
})