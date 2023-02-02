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
import { Termini } from "../../../app/models/termini";





export default observer( function TerminiForm (){
    const history = useHistory();
    const {terminiStore} = useStore();
    const {createTermini, updateTermini, loadTermini, 
    loading, loadingInitial} = terminiStore;
    const {id} = useParams<{id: string}>();

    const [termini, setTermini] = useState<Termini>({
        id: '',
        emri: '',
        data: null,
        orari: '',
        pershkrimi: ''
    });

    const validationSchema = Yup.object({
        emri: Yup.string().required('This field must need to be filled'),
        data: Yup.string().required('This field must need to be filled').nullable(),
        orari: Yup.string().required('This field must need to be filled'),
        pershkrimi: Yup.string().required('This field must need to be filled'),
       
    })

    useEffect(() => {
        if (id) loadTermini(id).then(termini => setTermini(termini!))
    }, [id, loadTermini]);

    function handleFormSubmit(termini: Termini){
        if(termini.id.length === 0){
            let newTermini = {
                ...termini,
                id: uuid()
            };
            createTermini(newTermini).then(() => history.push(`/terminet/${newTermini.id}`))
            }else{
                updateTermini(termini).then(() => history.push(`/terminet/${termini.id}`))
            }
        
    }
    

    if(loadingInitial) return <LoadingComponent content='Loading termini...' />

    return(
        <Segment clearing>
            <Header content='Termini Details' sub color='teal' />
            <Formik
                validationSchema ={validationSchema}
                enableReinitialize 
                initialValues={termini} 
                onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name ='emri' placeholder='Emri' /> 
                    <MyDateInput
                        placeholderText='Data'
                        name='data'
                        showTimeSelect
                        timeCaption='time'
                        dateFormat='MMMM d, yyyy h:mm aa'
                    />
                    <MyTextInput placeholder='Orari' name='orari'/>
                    <MyTextInput placeholder='Pershkrimi' name='pershkrimi'/>
                    <Button 
                        disabled ={isSubmitting || !dirty || !isValid}
                        loading={loading} floated='right'
                        positive type ='submit' content='Submit'/>
                    <Button as={Link} to='/terminet' floated='right' type ='button' content='Cancel'/>
                </Form>
                )}
            </Formik>
        </Segment>
    )
})