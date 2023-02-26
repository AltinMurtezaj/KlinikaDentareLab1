import { Formik,} from "formik";
import { observer } from "mobx-react-lite";
import {useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { Termini } from "../../../app/models/termini";
import MyDateInput from "../../pacientet/form/MyDateInput";
 
export default observer(function CreateTerminiForm(){
    
    const validationSchema = Yup.object({
        data:Yup.date().required('Data është e detyrueshme'),
        koha:Yup.string().required('Koha është e detyrueshme'),
        pacientiId:Yup.string().required('Pacienti është i detyrueshëm'),
    });
    
   const {terminiStore, pacientiStore}=useStore();
    const {loadPacientet, pacientiByEmri}=pacientiStore;
    const{loading,loadingInitial,createTermini}=terminiStore;
    const navigate = useNavigate();
    const [termini] = useState<Termini>({
        data:'',
        koha:'',
        pacientiId:'',
    });
     useEffect(()=>{
       loadPacientet();
     },[loadPacientet]);

     function handleFormSubmit(termini: Termini){
     let newTermini = {
        ...termini,
     }
        createTermini(newTermini).then(()=> navigate(`/terminet`)); 
    }
    if(loadingInitial) return <LoadingComponent content={""}/>
    return(
         <Segment>
            <Header content='Shto terminin' color='teal'/>
            <Formik
                validationSchema={validationSchema}
            enableReinitialize
             initialValues={termini} 
             onSubmit={values=>handleFormSubmit(values)}>
                {({handleSubmit})=>(
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='of'>
                
                <MyDateInput 
                                 placeholderText='Data'
                                    name='data'
                                    dateFormat='d MMMM yyyy'
                                />
                <MyTextInput placeholder='Koha' name='koha'/>
                <MySelectInput options={pacientiByEmri.map((pacienti)=>{
                            return {text:pacienti.emri,value:pacienti.id}
                        })}  placeholder='Pacienti' name="pacientiId"/>
                <Button loading={loading} floated="right" positive type="submit" content='Submit'/>
                <Button as={NavLink} to='/terminet' floated="right"  type="button" content='Cancel'/>
                </Form> 
                )}

            </Formik>
           
                
                
        </Segment>
    )
})

   