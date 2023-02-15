
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Header, Input, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Formik,Form} from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import TerminiStore from '../../../app/stores/terminiStore';
import { Kontrolla } from '../../../app/models/kontrolla';
import LoadingComponent from '../../../app/layout/LoadingComponents';




export default observer( function KontrollaForm(){
    const {kontrollaStore} = useStore();
    
    const {updateKontrolla,loading,loadKontrolla,loadingInitial} = kontrollaStore;
     const{id} = useParams<{id:string}>();
     const navigate = useNavigate();
     const [kontrolla,setKontrolla] = useState<Kontrolla>({
        id:'',
        emriKontrolles:'',
        kosto:'',
        terminiId:'',
     });
     const validationSchema = Yup.object({
        emriKontrolles:Yup.string().required('Emri i Kontrollës është i detyrueshëm'),
        kosto:Yup.number().required('Kosto është i detyrueshëm'),
     })
     useEffect(()=>{
        if(id) loadKontrolla(id).then(kontrolla =>setKontrolla(kontrolla!))
     },[id, loadKontrolla]);
           
    function handleFormSubmit(Kontrolla: Kontrolla){
            updateKontrolla(Kontrolla).then(() =>navigate(`/kontrollat`));
    }
    
    if(loadingInitial)  return <LoadingComponent content={''} />
    return (
        <Segment clearing >
            <Header  content ='Kontrolla Details' sub color='teal'/>
            <Formik enableReinitialize 
            initialValues={kontrolla} 
            onSubmit={values=>handleFormSubmit(values)}
            validationSchema={validationSchema}
            >
                    {({handleSubmit, isValid, isSubmitting, dirty}) =>(
                        <Form className='ui form'onSubmit={handleSubmit} autoComplete='off'>
                        <Input placeholder={kontrolla.id} name='id' readOnly fluid/>
                        <MyTextInput placeholder='Emri i Kontrollës' name='emriKontrolles'/>
                        <MyTextInput placeholder='Kosto' name='kosto'/>
                        <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={loading} 
                        floated='right'
                        positive type='submit' 
                        content='Submit'/>
                        <Button as={Link} to='/kontrollat' floated='right' type='button' content='Cancel'/>
                      
                    </Form>
    )}
            </Formik>
            
        </Segment>
    )
   
    //myTextArea rows={3}  kur te kemi nevoj me shtu ni description 
})




