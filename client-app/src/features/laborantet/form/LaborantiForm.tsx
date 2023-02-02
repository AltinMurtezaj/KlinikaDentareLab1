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
import MyDateInput from "./MyDateInput";
import { Laboranti } from "../../../app/models/laboranti";


export default observer( function LaborantiForm (){
    const history = useHistory();
    const {laborantiStore} = useStore();
    const {createLaboranti, updateLaboranti, loadLaboranti, 
    loading, loadingInitial} = laborantiStore;
    const {id} = useParams<{id: string}>();

    const [laboranti, setLaboranti] = useState<Laboranti>({
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
        laboratori: '',
    });

    const validationSchema = Yup.object({
        emri: Yup.string().required('This field must need to be filled'),
        mbiemri: Yup.string().required('This field must need to be filled'),
        userName: Yup.string().required('This field must need to be filled'),
        email: Yup.string().required('This field must need to be filled').email(),
        datelindja: Yup.string().required('This field must need to be filled').nullable(),
        kualifikimi: Yup.string().required('This field must need to be filled'),
        specializimi: Yup.string().required('This field must need to be filled'),
        vendbanimi: Yup.string().required('This field must need to be filled'),
        nrKontaktues: Yup.string().required('This field must need to be filled'),
        laboratori: Yup.string().required('This field must need to be filled'),
    })

    useEffect(() => {
        if (id) loadLaboranti(id).then(laboranti => setLaboranti(laboranti!))
    }, [id, loadLaboranti]);

    function handleFormSubmit(laboranti: Laboranti){
        if(laboranti.id.length === 0){
            let newLaboranti = {
                ...laboranti,
                id: uuid()
            };
            createLaboranti(newLaboranti).then(() => history.push(`/laborantet/${newLaboranti.id}`))
            }else{
                updateLaboranti(laboranti).then(() => history.push(`/laborantet/${laboranti.id}`))
            }
        
    }
    

    if(loadingInitial) return <LoadingComponent content='Loading laboranti...' />

    return(
        <Segment clearing>
            <Header content='Laboranti Details' sub color='teal' />
            <Formik
                validationSchema ={validationSchema}
                enableReinitialize 
                initialValues={laboranti} 
                onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name ='emri' placeholder='Emri' /> 
                    <MyTextInput name ='mbiemri' placeholder='Mbiemri' /> 
                    <MyTextInput name ='userName' placeholder='Username' /> 
                    <MyDateInput
                        placeholderText='Datelindja'
                        name='datelindja'
                        showTimeSelect
                        timeCaption='time'
                        dateFormat='MMMM d, yyyy h:mm aa'
                    />
                    <Header content='Personal details' sub color='teal' />
                    <MyTextInput placeholder='Email' name='email'/>
                    <MyTextInput placeholder='Kualifikimi' name='kualifikimi'/>
                    <MyTextInput placeholder='Specializimi' name='specializimi'/>
                    <MyTextInput placeholder='Vendbanimi' name='vendbanimi'/>
                    <MyTextInput placeholder='Nr Kontaktues' name='nrKontaktues'/>
                    <MyTextInput placeholder='Laboratori' name='laboratori'/>
                    <Button 
                        disabled ={isSubmitting || !dirty || !isValid}
                        loading={loading} floated='right'
                        positive type ='submit' content='Submit'/>
                    <Button as={Link} to='/laborantet' floated='right' type ='button' content='Cancel'/>
                </Form>
                )}
            </Formik>
        </Segment>
    )
})