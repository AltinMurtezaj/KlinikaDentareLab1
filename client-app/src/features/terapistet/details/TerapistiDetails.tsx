import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {  useParams } from "react-router-dom";
import {Grid} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import TerapistiDetailedInfo from "./TerapistiDetailedInfo";
import TerapistiDetaledHeader from "./TerapistiDetaledHeader";

export default observer(function TerapistiDetails(){
    const {terapistiStore} = useStore();
    const {selectedTerapisti: terapisti, loadTerapisti, loadingInitial} = terapistiStore;
    const {id} = useParams<{id: string}>();
    
    useEffect(() => {
      if(id) loadTerapisti(id);
    }, [id, loadTerapisti]);

    if(loadingInitial || !terapisti) return <LoadingComponent content={""} />;

    return (
      <Grid>
        <Grid.Column width={10}>
          <TerapistiDetaledHeader terapisti={terapisti}/>
          <TerapistiDetailedInfo terapisti={terapisti}/>
        </Grid.Column>
        <Grid.Column width={6}>
        </Grid.Column>
      </Grid>
    )
})