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
import { Doktori } from "../../../app/models/doktori";




export default observer( function DoktoriForm (){
    const history = useHistory();
    const {doktoriStore} = useStore();
    const {createDoktori, updateDoktori, loadDoktori, 
    loading, loadingInitial} = doktoriStore;
    const {id} = useParams<{id: string}>();

    const [doktori, setDoktori] = useState<Doktori>({
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
        datelindja: Yup.string().required('This field must need to be filled').nullable(),
        kualifikimi: Yup.string().required('This field must need to be filled'),
        specializimi: Yup.string().required('This field must need to be filled'),
        vendbanimi: Yup.string().required('This field must need to be filled'),
        nrKontaktues: Yup.string().required('This field must need to be filled'),
    })

    useEffect(() => {
        if (id) loadDoktori(id).then(doktori => setDoktori(doktori!))
    }, [id, loadDoktori]);

    function handleFormSubmit(doktori: Doktori){
        if(doktori.id.length === 0){
            let newDoktori = {
                ...doktori,
                id: uuid()
            };
            createDoktori(newDoktori).then(() => history.push(`/doktoret/${newDoktori.id}`))
            }else{
                updateDoktori(doktori).then(() => history.push(`/doktoret/${doktori.id}`))
            }
        
    }
    

    if(loadingInitial) return <LoadingComponent content='Loading doktori...' />

    return(
        <Segment clearing>
            <Header content='Doktori Details' sub color='teal' />
            <Formik
                validationSchema ={validationSchema}
                enableReinitialize 
                initialValues={doktori} 
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
                        showTimeSelect
                        timeCaption='time'
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
                    <Button as={Link} to='/doktoret' floated='right' type ='button' content='Cancel'/>
                </Form>
                )}
            </Formik>
        </Segment>
    )
})