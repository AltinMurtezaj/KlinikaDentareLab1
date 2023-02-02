import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {  useParams } from "react-router-dom";
import {Grid} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import FarmacistiDetailedInfo from "./FarmacistiDetailedInfo";
import FarmacistiDetaledHeader from "./FarmacistiDetaledHeader";

export default observer(function FarmacistiDetails(){
    const {farmacistiStore} = useStore();
    const {selectedFarmacisti: farmacisti, loadFarmacisti, loadingInitial} = farmacistiStore;
    const {id} = useParams<{id: string}>();
    
    useEffect(() => {
      if(id) loadFarmacisti(id);
    }, [id, loadFarmacisti]);

    if(loadingInitial || !farmacisti) return <LoadingComponent content={""} />;

    return (
      <Grid>
        <Grid.Column width={10}>
          <FarmacistiDetaledHeader farmacisti={farmacisti}/>
          <FarmacistiDetailedInfo farmacisti={farmacisti}/>
        </Grid.Column>
        <Grid.Column width={6}>
        </Grid.Column>
      </Grid>
    )
})