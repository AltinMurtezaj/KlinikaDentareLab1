import { observer } from 'mobx-react-lite';
import  {  useEffect, useState } from 'react';
import { Link,  useNavigate, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import { Formik,Form} from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { Pacienti } from '../../../app/models/pacienti';
import MyDateInput from '../../infermjeret/form/MyDateInput';
import { Doktori } from '../../../app/models/doktori';





export default observer( function DoktoriForm(){
    const {doktoriStore} = useStore();
    
    const {updateDoktori,loading,loadDoktori,loadingInitial} = doktoriStore;
     const{id} = useParams<{id:string}>();
     const navigate = useNavigate();
     const [doktori,setDoktori] = useState<Doktori>({
        id:'',
        emri:'',
        mbiemri:'',
        datelindja: null,
        nrKontaktues:'',
        gjinia:'',
        vendbanimi: '',
        token:'',
        userName:'',
        email:'',
        password:'',
        kualifikimi: '',
        specializimi: '',
     });
     const validationSchema = Yup.object({
        
        emri: Yup.string().required('Emri duhet plotesuar'),
        mbiemri: Yup.string().required('Mbiemri duhet plotesuar'),
        gjinia: Yup.string().required('Gjinia duhet plotesuar'),
        datelindja: Yup.date().required('Ditelindja duhet plotesuar'),
        vendbanimi: Yup.string().required('vendlindja duhet plotesuar'),
        nrKontaktues:Yup.number().required('Numri kontaktues duhet plotesuar'),
        kualifikimi: Yup.string().required('Kualifikimi duhet plotesuar'),
        specializimi: Yup.string().required('Specializimi duhet plotesuar'),

     })
     useEffect(()=>{
        if(id) loadDoktori(id).then(doktori =>setDoktori(doktori!))
     },[id, loadDoktori]);
      
    function handleFormSubmit(Doktori: Doktori){
    updateDoktori(Doktori).then(() =>navigate(`/doktoret`))
    }
    
    if(loadingInitial)  return <LoadingComponent content={''} />
    return (
        
        
        <Segment clearing >
            <Header  content ='Doktori Details' sub color='teal'/>
            <Formik enableReinitialize 
            initialValues={doktori} 
            onSubmit={values=>handleFormSubmit(values)}
            validationSchema={validationSchema}
            >
                    {({handleSubmit, isValid, isSubmitting, dirty}) =>(
                        <Form className='ui form'onSubmit={handleSubmit} autoComplete='off'>

                        
                        <MyTextInput placeholder='Emri'  name='emri'/> 
                        <MyTextInput placeholder='Mbiemri'  name='mbiemri'/>
                        <MyTextInput placeholder='NrKontaktues'  name='nrKontaktues'/>
                        <MyTextInput placeholder='Gjinia'  name='gjinia'/>
                        <MyTextInput placeholder='Vendbanimi'  name='vendbanimi'/>
                        <MyTextInput placeholder='Kualifikimi'  name='kualifikimi'/>
                        <MyTextInput placeholder='Specializimi'  name='specializimi'/>
                        <MyDateInput 
                              placeholderText='Ditelindja'
                              name='datelindja'
                              dateFormat='d MMMM yyyy'
                         />
                        
                        <MyTextInput placeholder='Vendbanimi'  name='vendbanimi' />
                        <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={loading} 
                        floated='right'
                        positive type='submit' 
                        content='Submit'/>
                        <Button as={Link} to='/doktoret' floated='right' type='button' content='Cancel'/>
        
                    </Form>
    )}
            </Formik>
            
        </Segment>
    )
   
    
})