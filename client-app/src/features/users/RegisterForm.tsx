import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import ValidationErrors from "../errors/ValidationErrors";
import { gjiniaOption } from "../../app/common/options/gjiniaOptions";
import MySelectInput from "../infermjeret/form/MySelectInput";

export default observer(function RegisterForm(){
    const{userStore} = useStore();

    return(
        <Formik
            initialValues={{displayName: '', username: '', email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.register(values).catch(error =>
                 setErrors({error}))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),

            })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to Dental+' color="teal" textAlign="center"/>
                    <MyTextInput name='displayName' placeholder="Display Name"/>
                    <MyTextInput name='emri' placeholder="Name"/>
                    <MyTextInput name='mbiemri' placeholder="Surname"/>
                    <MyTextInput name='username' placeholder="Username"/>
                    <MySelectInput name='gjinia'options={gjiniaOption} placeholder="Gender"/>
                    <MyTextInput name='datelindja' placeholder="Date of birth"/>
                    <MyTextInput name='vendbanimi' placeholder="Place of birth"/>
                    <MyTextInput name='nrKontaktues' placeholder="Phone"/>
                    <MyTextInput name='email' placeholder="Email"/>
                    <MyTextInput name='password' placeholder="Password" type='password'/>
                    <ErrorMessage
                        name='error' render={() =>
                         <ValidationErrors errors={errors.error}/>}
                    
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting}
                     loading={isSubmitting} positive content='Register' type='submit' fluid/>

                </Form>
            )}

        </Formik>
    )
})