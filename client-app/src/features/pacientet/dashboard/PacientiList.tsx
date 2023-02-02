import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import PacientiListItem from "./PacientiListItem";



export default observer(function PacientiList(){
    const {pacientiStore} = useStore();
    const {grouperPacientet} = pacientiStore;

    return(
        <>
            {grouperPacientet.map(([group, pacientet])=> (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {pacientet.map(pacienti => (
                        <PacientiListItem key= {pacienti.id} pacienti={pacienti} />
                    ))}
                </Fragment>
            ))}
        </>
    )
})