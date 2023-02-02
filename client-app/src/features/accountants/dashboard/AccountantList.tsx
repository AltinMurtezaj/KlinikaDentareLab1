import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import AccountantListItem from "./AccountantListItem";



export default observer(function AccountantList(){
    const {accountantStore} = useStore();
    const {grouperAccountants} = accountantStore;

    return(
        <>
            {grouperAccountants.map(([group, accountants])=> (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {accountants.map(accountant => (
                        <AccountantListItem key= {accountant.id} accountant={accountant} />
                    ))}
                </Fragment>
            ))}
        </>
    )
})