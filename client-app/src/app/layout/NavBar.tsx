import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Menu, Image, Dropdown} from 'semantic-ui-react';
import { useStore } from '../stores/store';




export default observer(function NavBar(){
    const {userStore : {user, logout}} = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    Dental Clinic
                </Menu.Item>

                

                {user?.discriminator==="Doktori" ? (
                    <>
                <Menu.Item as={NavLink} to='/terminet' name ='Terminet' />
                <Menu.Item as={NavLink} to='/pacientet' name ='Pacientet' />
                <Menu.Item as={NavLink} to='/kontrollat' name ='Kontrollat' />
                <Menu.Item as={NavLink} to='/tretmanet' name ='Tretmanet' />
                <Menu.Item as={NavLink} to='/xrays' name ='XRays' />
                </>) : null}

                {user?.discriminator==="Pacienti" ? (
                    <>
                <Menu.Item as={NavLink} to='/terminet' name='Terminet'/>
                <Menu.Item as={NavLink} to='/kontrollat' name='Kontrollat'/>
                <Menu.Item as={NavLink} to='/tretmanet' name='Tretmanet'/>
                <Menu.Item as={NavLink} to='/xrays' name ='XRays' />
                </>) : null}



                {user?.discriminator==="AppUser" ? (
                    <>
                <Menu.Item as={NavLink} to='/doktoret' name ='Doktoret' />
                <Menu.Item as={NavLink} to='/pacientet' name ='Pacientet' />
                <Menu.Item as={NavLink} to='/laborantet' name ='Laborantet' />
                <Menu.Item as={NavLink} to='/infermjeret' name ='Infermjeret' />
                <Menu.Item as={NavLink} to='/errors' name='Errors' />
                </>) : null}
                
                
                <Menu.Item position='right'>
                    <Dropdown pointing='top left' text={user?.userName}>
                        <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={`/profile${user?.userName}`} text='My profile' icon='user'/>
                        <Dropdown.Item onClick={logout} text='Logout' icon='power'/>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})