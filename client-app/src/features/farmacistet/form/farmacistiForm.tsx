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
import { Farmacisti } from "../../../app/models/farmacisti";




export default observer( function FarmacistiForm (){
    const history = useHistory();
    const {farmacistiStore} = useStore();
    const {createFarmacisti, updateFarmacisti, loadFarmacisti, 
    loading, loadingInitial} = farmacistiStore;
    const {id} = useParams<{id: string}>();

    const [farmacisti, setFarmacisti] = useState<Farmacisti>({
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
        if (id) loadFarmacisti(id).then(farmacisti => setFarmacisti(farmacisti!))
    }, [id, loadFarmacisti]);

    function handleFormSubmit(farmacisti: Farmacisti){
        if(farmacisti.id.length === 0){
            let newFarmacisti = {
                ...farmacisti,
                id: uuid()
            };
            createFarmacisti(newFarmacisti).then(() => history.push(`/farmacistet/${newFarmacisti.id}`))
            }else{
                updateFarmacisti(farmacisti).then(() => history.push(`/farmacistet/${farmacisti.id}`))
            }
        
    }
    

    if(loadingInitial) return <LoadingComponent content='Loading farmacisti...' />

    return(
        <Segment clearing>
            <Header content='Farmacisti Details' sub color='teal' />
            <Formik
                validationSchema ={validationSchema}
                enableReinitialize 
                initialValues={farmacisti} 
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
                    <Button as={Link} to='/farmacistet' floated='right' type ='button' content='Cancel'/>
                </Form>
                )}
            </Formik>
        </Segment>
    )
})