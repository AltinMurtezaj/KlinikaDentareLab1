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
import { XRay } from "../../../app/models/xray";
import MyDateInput from "./MyDateInput";
import { Udhezimi } from "../../../app/models/udhezimi";
 
export default observer(function CreateUdhezimiForm(){
    
    const validationSchema = Yup.object({
       
        Data: Yup.string().required('Data duhet plotesuar'),

    });
   const {udhezimiStore, pacientiStore, tretmaniStore}=useStore();
   const {loadPacientet, pacientiRegistry, pacientiByEmri}=pacientiStore;
    const {loadTretmanet, tretmaniRegistry, tretmaniById}=tretmaniStore;
    const{loading,loadingInitial,createUdhezimi}=udhezimiStore;
    const navigate = useNavigate();
    const [udhezimi] = useState<Udhezimi>({
       Emri: '',
       Doza: '',
       TretmaniId: '',
       pacientiId: '',
    });
     function handleFormSubmit(udhezimi: Udhezimi){
     let newUdhezimi = {
        ...udhezimi,
     }
        createUdhezimi(newUdhezimi).then(()=> navigate(`/Udhezimi`)); 
    }
    if(loadingInitial) return <LoadingComponent content={""}/>
    return(
         <Segment>
            <Header content='Shto Udhezimin' color='teal'/>
            <Formik
                validationSchema={validationSchema}
            enableReinitialize
             initialValues={udhezimi} 
             onSubmit={values=>handleFormSubmit(values)}>
                {({handleSubmit})=>(
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='of'>
                
                <MyDateInput 
                              placeholderText='Data'
                              name='Data'
                              dateFormat='d MMMM yyyy'
                         />  
                         <MySelectInput options={pacientiByEmri.map((pacienti)=>{
                            return {text:pacienti.emri,value:pacienti.id}
                        })}  placeholder='Pacienti' name="pacientiId"/>
                        <MySelectInput options={tretmaniById.map((tretmani)=>{
                            return {text:tretmani.emri,value:tretmani.id}
                        })}  placeholder='Tretmani' name="TretmaniId"/>            
                <Button loading={loading} floated="right" positive type="submit" content='Submit'/>
                <Button as={NavLink} to='/Udhezimi' floated="right"  type="button" content='Cancel'/>
                </Form> 
                )}

            </Formik>
           
                
                
        </Segment>
    )
})

   