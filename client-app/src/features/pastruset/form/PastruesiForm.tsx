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
import { Pastruesi } from "../../../app/models/pastruesi";




export default observer( function PastruesiForm (){
    const history = useHistory();
    const {pastruesiStore} = useStore();
    const {createPastruesi, updatePastruesi, loadPastruesi, 
    loading, loadingInitial} = pastruesiStore;
    const {id} = useParams<{id: string}>();

    const [pastruesi, setPastruesi] = useState<Pastruesi>({
        id: '',
        emri: '',
        mbiemri: '',
        datelindja: null,
        gjinia: '',
        vendbanimi: '',
        nrKontaktues: ''
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
        if (id) loadPastruesi(id).then(pastruesi => setPastruesi(pastruesi!))
    }, [id, loadPastruesi]);

    function handleFormSubmit(pastruesi: Pastruesi){
        if(pastruesi.id.length === 0){
            let newPastruesi = {
                ...pastruesi,
                id: uuid()
            };
            createPastruesi(newPastruesi).then(() => history.push(`/pastrueset/${newPastruesi.id}`))
            }else{
                updatePastruesi(pastruesi).then(() => history.push(`/pastrueset/${pastruesi.id}`))
            }
        
    }
    

    if(loadingInitial) return <LoadingComponent content='Loading pastruesi...' />

    return(
        <Segment clearing>
            <Header content='Pastruesi Details' sub color='teal' />
            <Formik
                validationSchema ={validationSchema}
                enableReinitialize 
                initialValues={pastruesi} 
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
                    <Button as={Link} to='/pastrueset' floated='right' type ='button' content='Cancel'/>
                </Form>
                )}
            </Formik>
        </Segment>
    )
})