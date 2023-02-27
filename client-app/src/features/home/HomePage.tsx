import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage(){
    const {userStore, userStore:{user}, modalStore} = useStore();
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
                    {user?.discriminator==="Pacienti" ?(
                        <>
                        <Button as ={Link} to='/pacientet' size='huge' inverted>
                                Go to Pacienti Details
                        </Button>
                            </>):null}

                        {user?.discriminator==="Doktori" ?(
                        <>
                            
                        <Button as ={Link} to='/doktoret' size='huge' inverted>
                            Go to Doctor Details
                        </Button>

                        </>):null}
                        {user?.discriminator==="AppUser" ?(
                        <>
                            
                        <Button as ={Link} to='/doktoret' size='huge' inverted>
                            Go to Doctors
                        </Button>
                        <Button as ={Link} to='/pacientet' size='huge' inverted>
                            Go to Patients
                        </Button>
                        <Button as ={Link} to='/laborantet' size='huge' inverted>
                            Go to Laborants
                        </Button>
                        <Button as ={Link} to='/infermjeret' size='huge' inverted>
                            Go to Nurses
                        </Button>

                        </>):null}
                        </>
                        
                    
                    
                ) : (
                    <>
                    <Button onClick={() => modalStore.openModal(<LoginForm />)}  size='huge' inverted>
                            Login!
                    </Button>
                    </>
                )}
            </Container>
        </Segment>
    )

})