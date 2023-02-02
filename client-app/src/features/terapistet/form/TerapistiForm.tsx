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
import { Terapisti } from "../../../app/models/terapisti";


export default observer( function TerapistiForm (){
    const history = useHistory();
    const {terapistiStore} = useStore();
    const {createTerapisti, updateTerapisti, loadTerapisti, 
    loading, loadingInitial} = terapistiStore;
    const {id} = useParams<{id: string}>();

    const [terapisti, setTerapisti] = useState<Terapisti>({
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
        if (id) loadTerapisti(id).then(terapisti => setTerapisti(terapisti!))
    }, [id, loadTerapisti]);

    function handleFormSubmit(terapisti: Terapisti){
        if(terapisti.id.length === 0){
            let newTerapisti = {
                ...terapisti,
                id: uuid()
            };
            createTerapisti(newTerapisti).then(() => history.push(`/terapistet/${newTerapisti.id}`))
            }else{
                updateTerapisti(terapisti).then(() => history.push(`/terapistet/${terapisti.id}`))
            }
        
    }
    

    if(loadingInitial) return <LoadingComponent content='Loading therapists...' />

    return(
        <Segment clearing>
            <Header content='Therapist Details' sub color='teal' />
            <Formik
                validationSchema ={validationSchema}
                enableReinitialize 
                initialValues={terapisti} 
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