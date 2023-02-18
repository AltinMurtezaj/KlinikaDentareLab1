import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { Formik } from "formik";
import MySelectInput from "../../../app/common/form/MySelectInput";
import {  NavLink, useNavigate } from "react-router-dom";
import { PacientiDoktoriDTO } from "../../../app/models/PacientiDoktoriDTO";
import LoadingComponent from "../../../app/layout/LoadingComponents";



export default observer(function PacientiDoktoriForm(){
     
   const {pacientiStore,doktoriStore,pacientiDoktoriStore}=useStore();
    const{loading,loadingInitial,pacientiByEmri
    ,loadPacientet}=pacientiStore;
    const{createPacientiDoktori}=pacientiDoktoriStore;
    const{doktoriByEmri,loadDoktoret}=doktoriStore;
    const navigate = useNavigate();
    const [doktoriPacienti] = useState<PacientiDoktoriDTO>({
        DoktoriId:'',
        PacientiId:'',
    });

    useEffect(()=>{
        loadPacientet();
        loadDoktoret();
    },[loadPacientet,loadDoktoret])
    const validationSchema = Yup.object({
        PacientiId:Yup.string().required('Pacienti eshte i detyrueshem'),
        DoktoriId:Yup.string().required('Doktori eshte i detyrueshem')
    });
     function handleFormSubmit(pacienti: PacientiDoktoriDTO){
     let newPacienti = {
        ...pacienti,
     };

        createPacientiDoktori(newPacienti).then(()=>navigate('/pacientet')); 
    }

        
    
     if(loadingInitial) return <LoadingComponent content={""}/>
    return (
         <Segment>
            <Header content='Shto pacientin' color='teal'/>
            <Formik
            validationSchema={validationSchema}
            enableReinitialize
             initialValues={doktoriPacienti} 
             onSubmit={values=>handleFormSubmit(values)}>
                {({handleSubmit})=>(
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='of'>
               <MySelectInput options={pacientiByEmri.map((pacienti)=>{
                            return {text:pacienti.emri,value:pacienti.id}
                        })}  placeholder='Pacienti' name="PacientiId"/>
                        <MySelectInput options={doktoriByEmri.map((doktori)=>{
                            return {text:doktori.emri+' '+doktori.mbiemri,value:doktori.id}
                        })}  placeholder='Doktori' name="DoktoriId"/>
                        

                <Button loading={loading} floated="right" positive type="submit" content='Submit'/>
                <Button as={NavLink} to='/pacientet' floated="right"  type="button" content='Cancel'/>
                </Form> 
                )}

            </Formik>
           
                
                
        </Segment>
    )
});


