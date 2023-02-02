import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import TerminiListItem from "./TerminiListItem";


export default observer(function TerminetList(){
    const {terminiStore} = useStore();
    const {grouperTerminet} = terminiStore;

    return(
        <>
            {grouperTerminet.map(([group, terminet])=> (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {terminet.map(termini => (
                        <TerminiListItem key= {termini.id} termini={termini} />
                    ))}
                </Fragment>
            ))}
        </>
    )
})