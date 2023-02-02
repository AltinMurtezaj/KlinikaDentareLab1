import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LaborantiListItem from "./LaborantiListItem";


export default observer(function LaborantiList(){
    const {laborantiStore} = useStore();
    const {grouperLaborantet} = laborantiStore;

    return(
        <>
            {grouperLaborantet.map(([group, laborantet])=> (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {laborantet.map(laboranti => (
                        <LaborantiListItem key= {laboranti.id} laboranti={laboranti} />
                    ))}
                </Fragment>
            ))}
        </>
    )
})