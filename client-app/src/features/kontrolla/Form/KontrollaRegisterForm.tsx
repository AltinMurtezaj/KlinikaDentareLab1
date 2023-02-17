import { Formik,} from "formik";
import { observer } from "mobx-react-lite";
import {useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { Kontrolla } from "../../../app/models/kontrolla";
import LoadingComponent from "../../../app/layout/LoadingComponents";
 
export default observer(function CreateKontrollaForm(){
    
    const validationSchema = Yup.object({
       
        emriKontrolles:Yup.string().required('Emri nuk mund te jete i zbrazet'),
        kosto:Yup.string().required('Kosto nuk mund te jete e zbrazet'),
        terminiId:Yup.string().required('Termini nuk mund te jete i zbrazet'),

    });
   const {kontrollaStore,terminiStore}=useStore();
    const{loading,loadingInitial,createKontrolla}=kontrollaStore;
    const {terminetById}=terminiStore
    const navigate = useNavigate();
    const [kontrolla] = useState<Kontrolla>({
        emriKontrolles:'',
        kosto:'',
        terminiId:'',
    });
     function handleFormSubmit(kontrolla: Kontrolla){
     let newKontrolla = {
        ...kontrolla,
     }
        createKontrolla(newKontrolla).then(()=> navigate(`/kontrollat`)); 
    }
    if(loadingInitial) return <LoadingComponent content={""}/>
    return(
         <Segment>
            <Header content='Shto kontrollen' color='teal'/>
            <Formik
                validationSchema={validationSchema}
            enableReinitialize
             initialValues={kontrolla} 
             onSubmit={values=>handleFormSubmit(values)}>
                {({handleSubmit})=>(
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='of'>
                
                <MyTextInput placeholder='Emri i kontrolles' name='emriKontrolles'/>
                <MyTextInput placeholder='Kosto' name='kosto'/>
                <MySelectInput options={terminetById.map((termini)=>{
                        return{text:termini.id, value:termini.id}
                        })}  placeholder='Termini' name="terminiId"/>
                <Button loading={loading} floated="right" positive type="submit" content='Submit'/>
                <Button as={NavLink} to='/kontrollat' floated="right"  type="button" content='Cancel'/>
                </Form> 
                )}
            </Formik>   
        </Segment>
    )
})

   