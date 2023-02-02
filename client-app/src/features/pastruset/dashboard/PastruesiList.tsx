import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import PastruesiListItem from "./PastruesiListItem";



export default observer(function PacientiList(){
    const {pastruesiStore} = useStore();
    const {grouperPastrueset} = pastruesiStore;

    return(
        <>
            {grouperPastrueset.map(([group, pastrueset])=> (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {pastrueset.map(pastruesi => (
                        <PastruesiListItem key= {pastruesi.id} pastruesi={pastruesi} />
                    ))}
                </Fragment>
            ))}
        </>
    )
})