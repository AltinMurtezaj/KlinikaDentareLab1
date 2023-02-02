import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import FarmacistiListItem from "./FarmacistiListItem";


export default observer(function FarmacistetList(){
    const {farmacistiStore} = useStore();
    const {grouperFarmacistet} = farmacistiStore;

    return(
        <>
            {grouperFarmacistet.map(([group, farmacistet])=> (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {farmacistet.map(farmacisti => (
                        <FarmacistiListItem key= {farmacisti.id} farmacisti={farmacisti} />
                    ))}
                </Fragment>
            ))}
        </>
    )
})