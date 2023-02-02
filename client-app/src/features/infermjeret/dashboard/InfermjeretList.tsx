import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import InfermierjaListItem from "./InfermierjaListItem";


export default observer(function InfermjeretList(){
    const {infermierjaStore} = useStore();
    const {grouperInfermjeret} = infermierjaStore;

    return(
        <>
            {grouperInfermjeret.map(([group, infemjeret])=> (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {infemjeret.map(infermierja => (
                        <InfermierjaListItem key= {infermierja.id} infermierja={infermierja} />
                    ))}
                </Fragment>
            ))}
        </>
    )
})