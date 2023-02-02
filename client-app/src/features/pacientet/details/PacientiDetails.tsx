import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {  useParams } from "react-router-dom";
import {Grid} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import PacientiDetailedInfo from "./PacientiDetailedInfo";
import PacientiDetailedHeader from "./PacientiDetaledHeader";

export default observer(function PacientiDetails(){
    const {pacientiStore} = useStore();
    const {selectedPacienti: pacienti, loadPacienti, loadingInitial} = pacientiStore;
    const {id} = useParams<{id: string}>();
    
    useEffect(() => {
      if(id) loadPacienti(id);
    }, [id, loadPacienti]);

    if(loadingInitial || !pacienti) return <LoadingComponent content={""} />;

    return (
      <Grid>
        <Grid.Column width={10}>
          <PacientiDetailedHeader pacienti={pacienti}/>
          <PacientiDetailedInfo pacienti={pacienti}/>
          
        </Grid.Column>
        <Grid.Column width={6}>
        </Grid.Column>
      </Grid>
    )
})