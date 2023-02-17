// import { Formik } from "formik";

// import { useEffect, useState } from "react";
// import { NavLink, useNavigate, useParams } from "react-router-dom";
// import { Button, Form, Header, Segment } from "semantic-ui-react";
// import MySelectInput from "../../../app/common/form/MySelectInput";

// import { useStore } from "../../../app/stores/store";
// import * as Yup from 'yup';

// import { observer } from "mobx-react-lite";
// export default observer(function ProfesoriLendaEdit(){
//      const {pacientiStore,doktoriStore,profesoriLendaStore}=useStore();
//     const{loading,loadingInitial,lendaByEmri}=lendaStore;
//     const{updateProfesoriLenda,loadProfesoriLenda}=profesoriLendaStore;
//     const{profesoriByEmri}=profesoriStore;
//     const navigate = useNavigate();
//      const{LendaId,ProfesoriId} = useParams<{LendaId:string,ProfesoriId:string}>();
//       const [profesoriLenda,setLenda] = useState<ProfesoriLendaDto>({
//          profesoriId:'',
//         lendaId:''
//      });
//     useEffect(()=>{
//             loadProfesoriLenda(LendaId!,ProfesoriId!).then(profesoriLenda =>setLenda(profesoriLenda!));
//      },[LendaId,ProfesoriId, loadProfesoriLenda]);

//      function handleFormSubmit(profesroiLenda: ProfesoriLendaDto){
//             updateProfesoriLenda(profesroiLenda).then(() =>navigate(`/lendet`));
//     }
//     const validationSchema = Yup.object({
//         profesoriId:Yup.string().required('Emri i profesorit nuk mund te jete i zbrazet'),
//         lendaId:Yup.number().required('Emri i lendes nuk mund te jete i zbrazet')
//     });
//     if(loadingInitial) return <LoadingComponent/>
//     return (
        
//         <Segment>
           
//             <Header content='Shto Profesori Lenda' color='teal'/>
          
//             <Formik
//             validationSchema={validationSchema}
//             enableReinitialize
//              initialValues={profesoriLenda} 
//              onSubmit={values=>handleFormSubmit(values)}>
//                 {({handleSubmit, isValid, isSubmitting, dirty})=>(
//                     <Form className='ui form' onSubmit={handleSubmit} autoComplete='of'>
//                <MySelectInput options={lendaByEmri.map((lenda)=>{
//                             return {text:lenda.emri,value:lenda.id}
//                         })}  placeholder={profesoriLenda.lendaId} name="lendaId"/>
//                         <MySelectInput options={profesoriByEmri.map((profesori)=>{
//                             return {text:profesori.emri+' '+profesori.mbiemri,value:profesori.id}
//                         })}  placeholder={profesoriLenda.profesoriId} name="profesoriId"/>
//                 <Button 
//                  disabled={isSubmitting || !dirty || !isValid}
//                         loading={loading} 
//                         floated='right'
//                         positive type='submit' 
//                         content='Submit'/>
               
//                  <Button as={NavLink} to='/lendet' floated="right"  type="button" content='Cancle'/>
//                 </Form> 
//                 )}

//             </Formik>
           
                
                
//         </Segment>
        
// )});