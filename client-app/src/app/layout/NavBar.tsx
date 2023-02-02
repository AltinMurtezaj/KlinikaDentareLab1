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
                    Klinika Dentare
                </Menu.Item>
                <Menu.Item as={NavLink} to='/terminet' name ='Appointments' />
                <Menu.Item as={NavLink} to='/pacientet' name ='Pacients' />
                <Menu.Item as={NavLink} to='/doktoret' name ='Doctors' />
                <Menu.Item as={NavLink} to='/infermjeret' name ='Nurses' />
                <Menu.Item as={NavLink} to='/laborantet' name ='Laborants' />
                <Menu.Item as={NavLink} to='/farmacistet' name ='Pharmacists' />
                <Menu.Item as={NavLink} to='/pastruset' name ='Cleaners' />
                <Menu.Item as={NavLink} to='/terapistet' name ='Therapists' />
                <Menu.Item as={NavLink} to='/errors' name='Errors' />
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