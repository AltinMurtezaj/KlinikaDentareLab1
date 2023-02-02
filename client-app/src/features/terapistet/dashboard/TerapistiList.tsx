import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import TerapistiListItem from "./TerapistiListItem";



export default observer(function TerapistiList(){
    const {terapistiStore} = useStore();
    const {grouperTerapistet} = terapistiStore;

    return(
        <>
            {grouperTerapistet.map(([group, terapistet])=> (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {terapistet.map(terapisti => (
                        <TerapistiListItem key= {terapisti.id} terapisti={terapisti} />
                    ))}
                </Fragment>
            ))}
        </>
    )
})