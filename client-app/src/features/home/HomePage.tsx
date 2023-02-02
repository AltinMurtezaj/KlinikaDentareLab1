import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage(){
    const {userStore, modalStore} = useStore();
    return(
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as='h1' inverted>
                    <Image size ='massive' src='/assets/dhambi.png' alt='logo' style={{marginBottom:12}} />
                    Dental+
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                    <Header as='h2' inverted content='Welcome to Dental Clinic'/>

                        <Button as ={Link} to='/terminet' size='huge' inverted>
                                Go to Appointments
                        </Button>

                        <Button as ={Link} to='/doktoret' size='huge' inverted>
                            Go to Doctors
                        </Button>

                        <Button as ={Link} to='/infermjeret' size='huge' inverted>
                            Go to Nurses
                        </Button>

                        <Button as ={Link} to='/pacientet' size='huge' inverted>
                            Go to Pacients
                        </Button>

                        <Button as ={Link} to='/laborantet' size='huge' inverted>
                            Go to Laborant's
                        </Button>

                        <Button as ={Link} to='/terapistet' size='huge' inverted>
                            Go to Therapist's
                        </Button>

                        <Button as ={Link} to='/farmacistet' size='huge' inverted>
                            Go to Pharmacist's
                        </Button>

                        <Button as ={Link} to='/pastruset' size='huge' inverted>
                            Go to Cleaner's
                        </Button>
                    </>
                    
                ) : (
                    <>
                    <Button onClick={() => modalStore.openModal(<LoginForm />)}  size='huge' inverted>
                            Login!
                    </Button>
                    <Button onClick={() => modalStore.openModal(<RegisterForm/>)}  size='huge' inverted>
                            Register!
                    </Button>
                    </>
                )}
            </Container>
        </Segment>
    )

})