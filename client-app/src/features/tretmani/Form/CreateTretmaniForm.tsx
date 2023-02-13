import { observer, Observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import * as Yup from 'yup';
import { Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { Tretmani } from "../../../app/models/tretmani";
import { useStore } from "../../../app/stores/store";
import MySelectInput from "../../infermjeret/form/MySelectInput";
import PacientiList from "../../pacientet/dashboard/PacientiList";




export default  observer(function CreateTretmaniForm(){
const validationSchema = Yup.object({
    emri: Yup.string().required('Emri eshte i detyrueshem'),
    pershkrimi: Yup.string().required('Pershkrimi eshte i detyrueshem'),
    cmimi: Yup.string().required('Cmimi eshte i detyrueshem'),
    koha: Yup.string().required('Koha eshte e detyrueshme'),
    doktoriId: Yup.string().required('Doktori eshte i detyrueshem'),
    pacientiId: Yup.string().required('Pacienti eshte i detyrueshem')
})
const {tretmaniStore, pacientiStore, doktoriStore, kontrollaStore, pagesaStore} = useStore();
const {loading, loadingInitial, createTretmani} = tretmaniStore;
const{loadPacientet, pacientiByEmri} = pacientiStore;
const{loadDoktoret, doktoriByEmri} = doktoriStore;
const{loadKontrollat, kontrollatById} = kontrollaStore;
const{loadPagesat, pagesatById} = pagesaStore;


    const navigate = useNavigate();
    const[tretmani] = useState({
        emri: '',
        pershkrimi: '',
        cmimi: '',
        koha: '',
        doktoriId: '',
        pacientId: '',
        kontrollaId: '',
        pagesaId: ''
    });
    useEffect(() => {
        loadPacientet();
        loadDoktoret();
        loadKontrollat();
        loadPagesat();
    }, [loadPacientet, loadDoktoret, loadKontrollat, loadPagesat]);
    function handleFormSubmit(tretmani: Tretmani){
        let newTretmani = {
            ...tretmani,
        }
        createTretmani(tretmani).then(() => navigate('/tretmanet'));
    }
    if(loadingInitial) return <LoadingComponent content={""}/>
    return(
        <Segment>
            <Header content='Krijo Tretmanin' sub color='teal'/>
            <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={tretmani}
            onSubmit={values => handleFormSubmit(values)}>
            {({handleSubmit}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name='emri' placeholder='Emri'/>
                    <MyTextInput name='pershkrimi' placeholder='Pershkrimi'/>
                    <MyTextInput name='cmimi' placeholder='Cmimi'/>
                    <MyTextInput name='koha' placeholder='Koha'/>
                    <MySelectInput name='doktoriId' options={doktoriByEmri.map((doktori)=>{
                        return{text:doktori.emri, value:doktori.id}
                       })}   placeholder='Doktori' />
                    <MySelectInput name='pacientiId'  options={pacientiByEmri.map((pacienti)=>{
                        return{text:pacienti.emri, value:pacienti.id}
                    })}  placeholder='Pacienti'/>
                    <MySelectInput name='kontrollaId'  options={kontrollatById.map((kontrolla)=>{
                        return{text:kontrolla.id, value:kontrolla.id}
                    })} placeholder='Kontrolla' />
                    <MySelectInput name='pagesaId'  options={pagesatById.map((pagesa)=>{
                        return{text:pagesa.id, value:pagesa.id}
                    })}  placeholder='Pagesa' />
                    <Button loading={loading} floated='right' positive type='submit' content='Krijo'/>
                    <Button as={NavLink} to='/tretmanet' floated='right' type='button' content='Anulo'/>
                </Form>
            )}
            </Formik>
        </Segment>

    )
})
