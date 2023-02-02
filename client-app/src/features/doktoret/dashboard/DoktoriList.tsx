import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import DoktoriListItem from "./DoktoriListItem";


export default observer(function DoktoretList(){
    const {doktoriStore} = useStore();
    const {grouperDoktoret} = doktoriStore;

    return(
        <>
            {grouperDoktoret.map(([group, doktoret])=> (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {doktoret.map(doktori => (
                        <DoktoriListItem key= {doktori.id} doktori={doktori} />
                    ))}
                </Fragment>
            ))}
        </>
    )
})