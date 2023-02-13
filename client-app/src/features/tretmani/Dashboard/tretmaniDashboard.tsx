import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import TretmaniList from "./TretmaniList";




export default observer(function TretmaniDashboard() {
    const {tretmaniStore} = useStore();
    const {tretmaniById, loadTretmanet, tretmaniRegistry, loadingInitial} = tretmaniStore;
    useEffect(() => {
        if(tretmaniRegistry.size <= 1) loadTretmanet();
    }, [tretmaniRegistry.size, loadTretmanet])
    if(tretmaniStore.loadingInitial)
     return <LoadingComponent content={""}/>

     return(
        <Grid>
            <Grid.Column width={10}>
               <TretmaniList/>
                    <Button as={NavLink} to='/createTretmani' positive>Shto Tretmanin</Button>
            </Grid.Column>
        </Grid>
     )
})