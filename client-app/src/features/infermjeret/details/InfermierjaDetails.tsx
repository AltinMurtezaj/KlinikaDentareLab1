import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {  useParams } from "react-router-dom";
import {Grid} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import InfermierjaDetailedInfo from "./InfermierjaDetailedInfo";
import InfermierjaDetailedHeader from "./InfermierjaDetaledHeader";

export default observer(function InfermierjaDetails(){
    const {infermierjaStore} = useStore();
    const {selectedInfermierja: infermierja, loadInfermierja, loadingInitial} = infermierjaStore;
    const {id} = useParams<{id: string}>();
    
    useEffect(() => {
      if(id) loadInfermierja(id);
    }, [id, loadInfermierja]);

    if(loadingInitial || !infermierja) return <LoadingComponent content={""} />;

    return (
      <Grid>
        <Grid.Column width={10}>
          <InfermierjaDetailedHeader infermierja={infermierja}/>
          <InfermierjaDetailedInfo infermierja={infermierja}/>
        </Grid.Column>
        <Grid.Column width={6}>
        </Grid.Column>
      </Grid>
    )
})