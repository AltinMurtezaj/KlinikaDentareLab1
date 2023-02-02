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
import { Pacienti } from "../../../app/models/pacienti";




export default observer( function PacientiForm (){
    const history = useHistory();
    const {pacientiStore} = useStore();
    const {createPacienti, updatePacienti, loadPacienti, 
    loading, loadingInitial} = pacientiStore;
    const {id} = useParams<{id: string}>();

    const [pacienti, setPacienti] = useState<Pacienti>({
        id: '',
        emri: '',
        datelindja: null,
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
        mbiemri: Yup.string().required('This field must need to be filled'),
        datelindja: Yup.string().required('This field must need to be filled').nullable(),
        gjinia: Yup.string().required('This field must need to be filled'),
        vendbanimi: Yup.string().required('This field must need to be filled'),
        nrKontaktues: Yup.string().required('This field must need to be filled'),
    })

    useEffect(() => {
        if (id) loadPacienti(id).then(pacienti => setPacienti(pacienti!))
    }, [id, loadPacienti]);

    function handleFormSubmit(pacienti: Pacienti){
        if(pacienti.id.length === 0){
            let newPacienti = {
                ...pacienti,
                id: uuid()
            };
            createPacienti(newPacienti).then(() => history.push(`/pacientet/${newPacienti.id}`))
            }else{
                updatePacienti(pacienti).then(() => history.push(`/pacientet/${pacienti.id}`))
            }
        
    }
    

    if(loadingInitial) return <LoadingComponent content='Loading pacienti...' />

    return(
        <Segment clearing>
            <Header content='Pacienti Details' sub color='teal' />
            <Formik
                validationSchema ={validationSchema}
                enableReinitialize 
                initialValues={pacienti} 
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
                    <Button as={Link} to='/pacientet' floated='right' type ='button' content='Cancel'/>
                </Form>
                )}
            </Formik>
        </Segment>
    )
})