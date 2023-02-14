import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { Kontrolla } from "../../../app/models/kontrolla";




export default observer( function KontrollaForm (){
    const navigate = useNavigate();
    const {kontrollaStore, pacientiStore, tretmaniStore, terminiStore} = useStore();
    const {createKontrolla, updateKontrolla, loadKontrolla, 
    loading, loadingInitial} = kontrollaStore;
    
    const {id} = useParams<{id: string}>();
    const {loadPacientet, pacientiByEmri} = pacientiStore;
    const {loadTretmanet, tretmaniById} = tretmaniStore;
    const {loadTerminet} = terminiStore;
    


    const [kontrolla, setKontrolla] = useState({
        emriKontrolles: '',
        kosto: '',
    });
    const validationSchema = Yup.object({
        emriKontrolles: Yup.string().required('Emri i kontrolles eshte i detyrueshem'),
        kosto: Yup.string().required('Kosto eshte e detyrueshme'),
        pacientiId: Yup.string().required('Pacienti eshte i detyrueshem'),
        tretmaniId: Yup.string().required('Tretmani eshte i detyrueshem')
    })

    useEffect(() => {
        if (id) loadKontrolla(id).then(kontrolla => setKontrolla(kontrolla!))
    }, [id, loadKontrolla]);
    useEffect(() => {
        loadPacientet();
        loadTretmanet();
        loadTerminet();
    }, [loadPacientet, loadTretmanet, loadTerminet]);
        function handleSubmitKontrolla(kontrolla: Kontrolla){
            updateKontrolla(kontrolla).then(() => navigate('/kontrollat'))
        }
        if (loadingInitial) return <LoadingComponent content='Loading kontrolla...' />
    return(
        <Segment clearing>
            <Header content='Doktori Details' sub color='teal' />
            <Formik
                validationSchema ={validationSchema}
                enableReinitialize 
                initialValues={kontrolla} 
                onSubmit={values => handleSubmitKontrolla(values)}>
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