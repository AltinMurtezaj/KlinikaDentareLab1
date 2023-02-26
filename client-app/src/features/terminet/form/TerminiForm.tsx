
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
import { Termini } from '../../../app/models/termini';
import MyDateInput from '../../pacientet/form/MyDateInput';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import internal from 'stream';




export default observer( function TerminiForm(){
    const {terminiStore, pacientiStore} = useStore();
    
    const {updateTermini,loading,loadTermini,loadingInitial} = terminiStore;
    const {loadPacientet, pacientiByEmri} = pacientiStore;
     const{id} = useParams<{id:string}>();   
     const navigate = useNavigate();
     const [termini,setTermini] = useState<Termini>({
        id:'',
        data:'',
        koha:'',
        pacientiId:'',
     });
     const validationSchema = Yup.object({
        data:Yup.date().required('Data është e detyrueshme'),
        koha:Yup.string().required('Koha është e detyrueshme'),
        pacientiId:Yup.string().required('Pacienti është i detyrueshëm'),
     })
     useEffect(()=>{
       loadPacientet();
        if(id) loadTermini(id).then(termini =>setTermini(termini!))
     },[id, loadTermini, loadPacientet]);
           
    function handleFormSubmit(Termini: Termini){
            updateTermini(Termini).then(() =>navigate(`/terminet`));
    }
    
    if(loadingInitial) return <LoadingComponent content={''} />
    return (
        <Segment clearing >
            <Header  content ='Termini Details' sub color='teal'/>
            <Formik enableReinitialize 
            initialValues={termini} 
            onSubmit={values=>handleFormSubmit(values)}
            validationSchema={validationSchema}
            >
                    {({handleSubmit, isValid, isSubmitting, dirty}) =>(
                        <Form className='ui form'onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder='Termini ID' name='id' value={termini.id} disabled/>
                        <MyDateInput 
                              placeholderText='Data'
                              name='data'
                              dateFormat='d MMMM yyyy'
                         />
                        <MyTextInput placeholder='Koha' name='koha'/>
                        <MySelectInput options={pacientiByEmri.map((pacienti)=>{
                            return {text:pacienti.emri,value:pacienti.id}
                        })}  placeholder='Pacienti' name="pacientiId"/>
                        <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={loading} 
                        floated='right'
                        positive type='submit' 
                        content='Submit'/>
                        <Button as={Link} to='/terminet' floated='right' type='button' content='Cancel'/>
                      
                    </Form>
    )}
            </Formik>
            
        </Segment>
    )
   
})




