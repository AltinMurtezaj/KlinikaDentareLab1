import { observer } from 'mobx-react-lite';
import  {  useEffect, useState } from 'react';
import { Link,  useNavigate, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import { Formik,Form} from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { Udhezimi } from '../../../app/models/udhezimi';
import MySelectInput from './MySelectInput';





export default observer( function UdhezimiForm(){
    const {udhezimiStore, pacientiStore} = useStore();
    
    const {updateUdhezimi,loading,loadUdhezimi,loadingInitial} = udhezimiStore;
    const {loadPacientet, pacientiByEmri} = pacientiStore;
     const{id} = useParams<{id:string}>();
     const navigate = useNavigate();
     const [udhezimi,setUdhezimi] = useState<Udhezimi>({
        Id: '',
        Emri: '',
        Doza: '',
        TretmaniId: '',
        pacientiId: ''

     });
     const validationSchema = Yup.object({
        
        emri: Yup.string().required('Emri duhet plotesuar'),
        doza: Yup.string().required('Doza duhet plotesuar')
     })
     useEffect(()=>{
        if(id) loadUdhezimi(id).then(udhezimi =>setUdhezimi(udhezimi!))
     },[id, loadUdhezimi]);
      
    function handleFormSubmit(Udhezimi: Udhezimi){
    updateUdhezimi(Udhezimi).then(() =>navigate(`/udhezimet`))
    }
    
    if(loadingInitial)  return <LoadingComponent content={''} />
    return (
        
        
        <Segment clearing >
            <Header  content ='Udhezimi Details' sub color='teal'/>
            <Formik enableReinitialize 
            initialValues={udhezimi} 
            onSubmit={values=>handleFormSubmit(values)}
            validationSchema={validationSchema}
            >
                    {({handleSubmit, isValid, isSubmitting, dirty}) =>(
                        <Form className='ui form'onSubmit={handleSubmit} autoComplete='off'>

                        
                        <MyTextInput placeholder='Emri'  name='emri'/> 
                        <MyTextInput placeholder='Doza'  name='doza'/>
                        <MySelectInput options={pacientiByEmri.map((pacienti)=>{
                            return {text:pacienti.emri,value:pacienti.id}
                        })}  placeholder='Pacienti' name="pacientiId"/>
                        <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={loading} 
                        floated='right'
                        positive type='submit' 
                        content='Submit'/>
                        <Button as={Link} to='/udhezimet' floated='right' type='button' content='Cancel'/>
        
                    </Form>
    )}
            </Formik>
            
        </Segment>
    )
   
    
})