import { observer } from 'mobx-react-lite';
import  {  useEffect, useState } from 'react';
import { Link,  useNavigate, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import { Formik,Form} from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { XRay } from '../../../app/models/xray';
import MyDateInput from './MyDateInput';
import MySelectInput from './MySelectInput';


export default observer( function XRayForm(){
    const {xrayStore, pacientiStore} = useStore();

    const {updateXRay,loading,loadXRay,loadingInitial} = xrayStore;
    const {pacientiByEmri, loadPacientet} = pacientiStore;
     const{id} = useParams<{id:string}>();
     const navigate = useNavigate();
     const [xray,setXRay] = useState<XRay>({
        Id: '',
        Data: '',
        pacientiId:'',
     });
     const validationSchema = Yup.object({
        
        data: Yup.string().required('Data duhet plotesuar'),
        pacientiId:Yup.string().required('Pacienti duhet plotesuar'),
     })
     useEffect(()=>{
        loadPacientet();
        if(id) loadXRay(id).then(xray =>setXRay(xray!))
     },[id, loadXRay, loadPacientet]);
      
    function handleFormSubmit(XRay: XRay){
    updateXRay(XRay).then(() =>navigate(`/XRays`))
    }
    
    if(loadingInitial)  return <LoadingComponent content={''} />
    return (
        
        
        <Segment clearing >
            <Header  content ='XRay Details' sub color='teal'/>
            <Formik enableReinitialize 
            initialValues={xray} 
            onSubmit={values=>handleFormSubmit(values)}
            validationSchema={validationSchema}
            >
                    {({handleSubmit, isValid, isSubmitting, dirty}) =>(
                        <Form className='ui form'onSubmit={handleSubmit} autoComplete='off'>

<MyDateInput 
                              placeholderText='Data'
                              name='data'
                              dateFormat='d MMMM yyyy'
                         />
                          <MySelectInput options={pacientiByEmri.map((pacienti)=>{
                            return {text:pacienti.emri,value:pacienti.id}
                        })}  placeholder='Pacienti' name="pacientiId"/>
                    

                        <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={loading} 
                        floated='right'
                        positive type='submit' 
                        content='Submit'/>
                        <Button as={Link} to='/XRays' floated='right' type='button' content='Cancel'/>
                    </Form>
    )}
            </Formik>
            
        </Segment>
    )
   
    
})




