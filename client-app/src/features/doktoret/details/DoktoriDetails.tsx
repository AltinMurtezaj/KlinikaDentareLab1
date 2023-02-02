import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {  useParams } from "react-router-dom";
import {Grid} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import DoktoriDetailedInfo from "./DoktoriDetailedInfo";
import DoktoriDetaledHeader from "./DoktoriDetaledHeader";


export default observer(function DoktoriDetails(){
    const {doktoriStore} = useStore();
    const {selectedDoktori: doktori, loadDoktori, loadingInitial} = doktoriStore;
    const {id} = useParams<{id: string}>();
    
    useEffect(() => {
      if(id) loadDoktori(id);
    }, [id, loadDoktori]);

    if(loadingInitial || !doktori) return <LoadingComponent content={""} />;

    return (
      <Grid>
        <Grid.Column width={10}>
          <DoktoriDetaledHeader doktori={doktori}/>
          <DoktoriDetailedInfo doktori={doktori}/>
        </Grid.Column>
        <Grid.Column width={6}>
        </Grid.Column>
      </Grid>
    )
})