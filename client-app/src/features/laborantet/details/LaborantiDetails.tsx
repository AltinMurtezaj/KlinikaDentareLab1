import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {  useParams } from "react-router-dom";
import {Grid} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import LaborantiDetailedInfo from "./LaborantiDetailedInfo";
import LaborantiDetaledHeader from "./LaborantiDetaledHeader";

export default observer(function LaborantiDetails(){
    const {laborantiStore} = useStore();
    const {selectedLaboranti: laboranti, loadLaboranti, loadingInitial} = laborantiStore;
    const {id} = useParams<{id: string}>();
    
    useEffect(() => {
      if(id) loadLaboranti(id);
    }, [id, loadLaboranti]);

    if(loadingInitial || !laboranti) return <LoadingComponent content={""} />;

    return (
      <Grid>
        <Grid.Column width={10}>
          <LaborantiDetaledHeader laboranti={laboranti}/>
          <LaborantiDetailedInfo laboranti={laboranti}/>
       
        </Grid.Column>
        <Grid.Column width={6}>
        </Grid.Column>
      </Grid>
    )
})