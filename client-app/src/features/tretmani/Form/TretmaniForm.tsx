import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import { Tretmani } from "../../../app/models/tretmani";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { Formik } from "formik";
import MySelectInput from "../../infermjeret/form/MySelectInput";
import LoadingComponent from "../../../app/layout/LoadingComponents";










export default observer(function TretmaniForm() {
    const { tretmaniStore, pacientiStore, doktoriStore, kontrollaStore, pagesaStore  } = useStore();

    const { updateTretmani, loading, loadTretmani, loadingInitial } = tretmaniStore;

    const{id} = useParams<{id: string}>();
    const navigate = useNavigate();
    const{loadPacientet, pacientiByEmri} = pacientiStore;
    const{loadDoktoret, doktoriByEmri} = doktoriStore;
    const{loadKontrollat, kontrollatById} = kontrollaStore;
    const{loadPagesat, pagesatById} = pagesaStore;

    const[ tretmani, setTretmani ] = useState({
        emri: '',
        pershkrimi: '',
        cmimi: '',
        doktoriId: '',
        pacientId: '',
    });
    const validationSchema = Yup.object({
        pacientiId: Yup.string().required('Pacienti eshte i detyrueshem'),
        doktoriId: Yup.string().required('Doktori eshte i detyrueshem'),
        kontrollaId: Yup.string().required('Kontrolla eshte e detyrueshme'),
        emri: Yup.string().required('Emri eshte i detyrueshem'),
        koha: Yup.string().required('Koha eshte e detyrueshme'),
        cmimi: Yup.string().required('Cmimi eshte i detyrueshem'),
        pershkrimi: Yup.string().required('Pershkrimi eshte i detyrueshem')
    })

    useEffect(() => {
        if(id) loadTretmani(id).then(tretmani => setTretmani(tretmani!))
    }, [id, loadTretmani])
    useEffect(() => {
        loadPacientet();
        loadDoktoret();
        loadKontrollat();
        loadPagesat();
    }, [loadPacientet, loadDoktoret, loadKontrollat, loadPagesat])
    function handleSubmitTretmani(tretmani: Tretmani) {
        updateTretmani(tretmani).then(() => navigate('/tretmani'))
    }
    if(loadingInitial) return <LoadingComponent content={""}/>
    return (
        <Segment clearing>
            <Header content='Tretmani' sub color='teal' />
            <Formik
            enableReinitialize 
            initialValues={tretmani}
            onSubmit={values => handleSubmitTretmani(values)}
            validationSchema={validationSchema}
            >
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MySelectInput name='pacientiId' placeholder='Pacienti' options={pacientiByEmri.map((pacienti)=>{
                            return {value: pacienti.id, text: pacienti.emri}
                        })} />
                        <MySelectInput name='doktoriId' placeholder='Doktori' options={doktoriByEmri.map((doktori)=>{
                            return {value: doktori.id, text: doktori.emri}
                        })} />
                        <MySelectInput name='kontrollaId' placeholder='Kontrolla' options={kontrollatById.map((kontrolla)=>{
                            return {value: kontrolla.id, text: kontrolla.id}
                        })} />
                        <MySelectInput name='pagesaId' placeholder='Pagesa' options={pagesatById.map((pagesa)=>{
                            return {value: pagesa.id, text: pagesa.id}
                        })} />
                        <MyTextInput name='emri' placeholder='Emri' />
                        <MyTextInput name='koha' placeholder='Koha' />
                        <MyTextInput name='cmimi' placeholder='Cmimi' />
                        <MyTextInput name='pershkrimi' placeholder='Pershkrimi' />
                        <Button
                        loading={loading}
                        floated='right'
                        positive type='submit'
                        content='Submit'
                        disabled={isSubmitting || !dirty || !isValid}
                        />
                        <Button as={Link} to='/tretmanet' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})


