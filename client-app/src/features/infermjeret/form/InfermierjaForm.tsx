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
import MySelectInput from "./MySelectInput";
import { specializimiOptions } from "../../../app/common/options/specializimiOptions";
import MyDateInput from "./MyDateInput";
import { Infermierja } from "../../../app/models/infermierja";




export default observer( function InfermierjaForm (){
    const history = useHistory();
    const {infermierjaStore} = useStore();
    const {createInfermierja, updateInfermierja, loadInfermierja, 
    loading, loadingInitial} = infermierjaStore;
    const {id} = useParams<{id: string}>();

    const [infermierja, setInfermierja] = useState<Infermierja>({
        id: '',
        emri: '',
        datelindja: null,
        kualifikimi: '',
        specializimi: '',
        vendbanimi: '',
        nrKontaktues: '',
        mbiemri: '',
        userName: '',
        email: '',
        password: '',
        gjinia: '',
        token:''
    });

    const validationSchema = Yup.object({
        emri: Yup.string().required('This field must need to be filled'),
        datelindja: Yup.string().required('This field must need to be filled').nullable(),
        kualifikimi: Yup.string().required('This field must need to be filled'),
        specializimi: Yup.string().required('This field must need to be filled'),
        vendbanimi: Yup.string().required('This field must need to be filled'),
        nrKontaktues: Yup.string().required('This field must need to be filled'),
    })

    useEffect(() => {
        if (id) loadInfermierja(id).then(infermierja => setInfermierja(infermierja!))
    }, [id, loadInfermierja]);

    function handleFormSubmit(infermierja: Infermierja)
   {
        if(infermierja.id.length === 0){
            let newInfermierja = {
                ...infermierja,
                id: uuid()
            };
            createInfermierja(newInfermierja).then(() => history.push(`/infermjeret/${newInfermierja.id}`))
            }else{
                updateInfermierja(infermierja).then(() => history.push(`/infermjeret/${infermierja.id}`))  
    }
}
    

    if(loadingInitial) return <LoadingComponent content='Loading infermierja...' />

    return(
        <Segment clearing>
            <Header content='Infermierja Details' sub color='teal' />
            <Formik
                validationSchema ={validationSchema}
                enableReinitialize 
                initialValues={infermierja} 
                onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name ='emri' placeholder='Emri' /> 
                    <MyTextInput name ='mbiemri' placeholder='Mbiemri' /> 
                    <MyTextInput name ='email' placeholder='Email' /> 
                    <MyTextInput name ='gjinia' placeholder='Gjinia' /> 
                    <MyDateInput
                        placeholderText='Datelindja'
                        name='datelindja'
                        dateFormat='MMMM d, yyyy'
                    />
                    <Header content='Personal details' sub color='teal' />
                    <MyTextInput placeholder='Kualifikimi' name='kualifikimi'/>
                    <MySelectInput options={specializimiOptions} placeholder='Specializimi' name='specializimi'/>
                    <MyTextInput placeholder='Vendbanimi' name='vendbanimi'/>
                    <MyTextInput placeholder='nrKontaktues' name='nrKontaktues'/>
                    <Button 
                        disabled ={isSubmitting || !dirty || !isValid}
                        loading={loading} floated='right'
                        positive type ='submit' content='Submit'/>
                    <Button as={Link} to='/infermierja' floated='right' type ='button' content='Cancel'/>
                </Form>
                )}
            </Formik>
        </Segment>
    )
})