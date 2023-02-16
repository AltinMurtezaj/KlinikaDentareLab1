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
import MyDateInput from "../../terminet/Form/MyDateInput";
 
export default observer(function CreateXrayForm(){
    
    const validationSchema = Yup.object({
       
        Data: Yup.string().required('Data duhet plotesuar'),

    });
   const {xrayStore}=useStore();
    const{loading,loadingInitial,createXRay}=xrayStore;
    const navigate = useNavigate();
    const [xray] = useState<XRay>({
       Data:null,
    });
     function handleFormSubmit(xray: XRay){
     let newXray = {
        ...xray,
     }
        createXRay(newXray).then(()=> navigate(`/XRays`)); 
    }
    if(loadingInitial) return <LoadingComponent content={""}/>
    return(
         <Segment>
            <Header content='Shto XRay' color='teal'/>
            <Formik
                validationSchema={validationSchema}
            enableReinitialize
             initialValues={xray} 
             onSubmit={values=>handleFormSubmit(values)}>
                {({handleSubmit})=>(
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='of'>
                
                <MyDateInput 
                              placeholderText='Data'
                              name='Data'
                              dateFormat='d MMMM yyyy'
                         />                
                <Button loading={loading} floated="right" positive type="submit" content='Submit'/>
                <Button as={NavLink} to='/XRays' floated="right"  type="button" content='Cancel'/>
                </Form> 
                )}

            </Formik>
           
                
                
        </Segment>
    )
})

   