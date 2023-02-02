import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyDateInput from "./MyDateInput";
import { Accountant } from "../../../app/models/accountant";



export default observer( function AccountantForm (){
    const history = useHistory();
    const {accountantStore} = useStore();
    const {createAccountant, updateAccountant, loadAccountant, 
    loading, loadingInitial} = accountantStore;
    const {id} = useParams<{id: string}>();

    const [accountant, setAccountant] = useState<Accountant>({
        id: '',
        emri: '',
        mbiemri:'',
        userName:'',
        email:'',
        password:'',
        datelindja: null,
        gjinia:'',
        kualifikimi: '',
        specializimi: '',
        vendbanimi: '',
        nrKontaktues: '',
        token:'',
    });

    const validationSchema = Yup.object({
        emri: Yup.string().required('This field must need to be filled'),
        mbiemri: Yup.string().required('This field must need to be filled'),
        datelindja: Yup.string().required('This field must need to be filled').nullable(),
        gjinia: Yup.string().required('This field must need to be filled'),
        vendbanimi: Yup.string().required('This field must need to be filled'),
        nrKontaktues: Yup.string().required('This field must need to be filled'),
    })

    useEffect(() => {
        if (id) loadAccountant(id).then(accountant => setAccountant(accountant!))
    }, [id, loadAccountant]);

    function handleFormSubmit(accountant: Accountant){
        if(accountant.id.length === 0){
            let newAccountant = {
                ...accountant,
                id: uuid()
            };
            createAccountant(newAccountant).then(() => history.push(`/accountants/${newAccountant.id}`))
            }else{
                updateAccountant(accountant).then(() => history.push(`/accountants/${accountant.id}`))
            }
        
    }
    

    if(loadingInitial) return <LoadingComponent content='Loading accountant...' />

    return(
        <Segment clearing>
            <Header content='Accountant Details' sub color='teal' />
            <Formik
                validationSchema ={validationSchema}
                enableReinitialize 
                initialValues={accountant} 
                onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name ='emri' placeholder='Emri' /> 
                    <MyTextInput name ='mbiemri' placeholder='Mbiemri' /> 
                    <MyDateInput
                        placeholderText='Datelindja'
                        name='datelindja'
                        showTimeSelect
                        timeCaption='time'
                        dateFormat='MMMM d, yyyy h:mm aa'
                    />
                    <MyTextInput placeholder='Gjinia' name='gjinia'/>
                    <Header content='Personal details' sub color='teal' />
                    <MyTextInput placeholder='Vendbanimi' name='vendbanimi'/>
                    <MyTextInput placeholder='nrKontaktues' name='nrKontaktues'/>
                    <Button 
                        disabled ={isSubmitting || !dirty || !isValid}
                        loading={loading} floated='right'
                        positive type ='submit' content='Submit'/>
                    <Button as={Link} to='/accountants' floated='right' type ='button' content='Cancel'/>
                </Form>
                )}
            </Formik>
        </Segment>
    )
})