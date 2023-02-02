import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {  useParams } from "react-router-dom";
import {Grid} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import PastruesiDetailedInfo from "./PastruesiDetailedInfo";
import PastruesiDetailedHeader from "./PastruesiDetaledHeader";

export default observer(function PastruesiDetails(){
    const {pastruesiStore} = useStore();
    const {selectedPastruesi: pastruesi, loadPastruesi, loadingInitial} = pastruesiStore;
    const {id} = useParams<{id: string}>();
    
    useEffect(() => {
      if(id) loadPastruesi(id);
    }, [id, loadPastruesi]);

    if(loadingInitial || !pastruesi) return <LoadingComponent content={""} />;

    return (
      <Grid>
        <Grid.Column width={10}>
          <PastruesiDetailedHeader pastruesi={pastruesi}/>
          <PastruesiDetailedInfo pastruesi={pastruesi}/>
        </Grid.Column>
        <Grid.Column width={6}>
        </Grid.Column>
      </Grid>
    )
})