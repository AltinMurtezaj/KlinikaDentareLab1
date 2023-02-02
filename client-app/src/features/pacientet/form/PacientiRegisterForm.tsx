import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "./MySelectInput";
import MyDateInput from "./MyDateInput";
import { gjiniaOption } from "../../../app/common/options/gjiniaOptions";
import ValidationErrors from "../../errors/ValidationErrors";
import { useHistory } from "react-router-dom";
import { specializimiOptions } from "../../../app/common/options/specializimiOptions";



export default observer( function PacientiRegisterForm (){
    const {userStore} = useStore();
    const history = useHistory();

    const validationSchema = Yup.object({
        emri: Yup.string().required('This field must need to be filled'),
        mbiemri: Yup.string().required('This field must need to be filled'),
        datelindja: Yup.date().required('This field must need to be filled').nullable(),
        gjinia: Yup.string().required('This field must need to be filled'),
        vendbanimi: Yup.string().required('This field must need to be filled'),
        nrKontaktues: Yup.number().required('This field must need to be filled'),
        mosha: Yup.number().required('This field must need to be filled'),
        email :Yup.string().required('This field must need to be filled').email(),
        password :Yup.string().required('This field must need to be filled'),
    })
    

    return(
        <Formik
        initialValues={{
        emri: '',
        datelindja: null,
        vendbanimi: '',
        nrKontaktues: '',
        mbiemri: '',
        userName: '',
        email: '',
        password:'',
        gjinia: '',
        error:null}}
        onSubmit={(values,{setErrors})=>userStore.registerPacienti(values).then(()=>{
            history.push('/pacientet');
        }).catch(
            error=>{setErrors({error});console.log(error);}
        )}
   
>
{({handleSubmit,isSubmitting,errors,isValid,dirty})=>(
    <Form className="ui form error" onSubmit={handleSubmit} autoComplete='off'>
        <Header as='h2' content='Register Pacient' color="teal" textAlign="center"/>
        <MyTextInput name="emri" placeholder="Emri"/>
        
        <MyTextInput name="mbiemri" placeholder="Mbiemri"/>
        <MyTextInput name="username" placeholder="Username"/>
        <MyTextInput name="mosha" placeholder="Mosha"/>
        <MySelectInput options={gjiniaOption} name="gjinia" placeholder="Gjinia"/>
        <MyTextInput name="vendbanimi" placeholder="Vendbanimi"/>
        <MyDateInput 
                  placeholderText='Ditelindja' 
                  name='datelindja'
                  dateFormat='dd MM yyyy'
             />
        <MyTextInput placeholder='nrKontaktues' name='nrKontaktues'/>
        <MyTextInput name="email" placeholder="Emaili"/>
        <MyTextInput name="password" placeholder="Passwordi" type="password"/>
       <ErrorMessage
       name="error" render={()=><ValidationErrors errors={errors.error}/>} />
        <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting}
         positive content='Regjistro' type="submit" fluid />
    </Form>
)}

</Formik>
)
})
    

   