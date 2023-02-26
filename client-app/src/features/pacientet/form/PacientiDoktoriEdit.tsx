import { Formik } from "formik";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import { observer } from "mobx-react-lite";
import { PacientiDoktoriDTO } from "../../../app/models/PacientiDoktoriDTO";
import LoadingComponent from "../../../app/layout/LoadingComponents";

export default observer(function PacientiDoktoriEdit(){
     const {pacientiStore,doktoriStore,pacientiDoktoriStore, userStore}=useStore();
    const{loading,loadingInitial,pacientiByEmri}=pacientiStore;
    const{user} = userStore;
    const{updatePacientiDoktori,loadDoktoriPacienti}=pacientiDoktoriStore;
    const{doktoriByEmri}=doktoriStore;
    const navigate = useNavigate();
     const{PacientiId,DoktoriId} = useParams<{PacientiId:string,DoktoriId:string}>();
      const [doktoripacienti,setPacienti] = useState<PacientiDoktoriDTO>({
         DoktoriId:user?.id,
        PacientiId:''
     });
    useEffect(()=>{
            loadDoktoriPacienti(PacientiId!,DoktoriId!).then(doktoripacienti =>setPacienti(doktoripacienti!));
     },[PacientiId,DoktoriId, loadDoktoriPacienti]);

     function handleFormSubmit(doktoriPacienti: PacientiDoktoriDTO){
            updatePacientiDoktori(doktoriPacienti).then(() =>navigate(`/pacientet`));
    }
    const validationSchema = Yup.object({
        PacientiId:Yup.string().required('Pacienti eshte i detyrueshem'),
        DoktoriId:Yup.string().required('Doktori eshte i detyrueshem')
    });
    if(loadingInitial) return <LoadingComponent content={""}/>
    return (
        
        <Segment>
           
            <Header content='Shto Doktori Pacienti' color='teal'/>
          
            <Formik
            validationSchema={validationSchema}
            enableReinitialize
             initialValues={doktoripacienti} 
             onSubmit={values=>handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty})=>(
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='of'>
               <MySelectInput options={pacientiByEmri.map((pacienti)=>{
                            return {text:pacienti.emri,value:pacienti.id}
                        })}  placeholder={doktoripacienti.PacientiId} name="PacientiId"/>                       
                <Button 
                 disabled={isSubmitting || !dirty || !isValid}
                        loading={loading} 
                        floated='right'
                        positive type='submit' 
                        content='Submit'/>
               
                 <Button as={NavLink} to='/pacientet' floated="right"  type="button" content='Cancel'/>
                </Form> 
                )}

            </Formik>
           
                
                
        </Segment>
        
)});