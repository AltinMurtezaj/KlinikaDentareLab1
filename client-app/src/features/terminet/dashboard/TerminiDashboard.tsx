import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid, Header} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import TerminiListt from "./TerminiListt";



export default observer(function TerminiDashboard(){
    const {terminiStore} = useStore();
    const {loadTerminet,terminiRegistry} = terminiStore;
useEffect(()=>{
    if(terminiRegistry.size <= 1) loadTerminet();
},[terminiRegistry.size,loadTerminet])

if( terminiStore.loadingInitial)

 return <LoadingComponent content={""} />
        
    return (
        <Grid>
            <Grid.Column width='10'>
                 <TerminiListt />
                    <Button as={NavLink} to='/createTermini' positive>Shto Terminin</Button>
              </Grid.Column>
        </Grid>
    )
})