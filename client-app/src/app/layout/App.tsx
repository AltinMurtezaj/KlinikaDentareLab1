import React, { useEffect } from 'react';
import {  Container, Modal} from 'semantic-ui-react';
import NavBar from './NavBar';
import InfermierjaDashboard from '../../features/infermjeret/dashboard/InfermierjaDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import InfermierjaForm from '../../features/infermjeret/form/InfermierjaForm';
import TestErrors from '../../features/errors/TestError';
import {ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import InfermierjaDetails from '../../features/infermjeret/details/InfermierjaDetails';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponents';
import ModalContainer from '../common/modals/ModalContainer';
import DoktoriDashboard from '../../features/doktoret/dashboard/DoktoriDashboard';
import DoktoriDetails from '../../features/doktoret/details/DoktoriDetails';
import DoktoriForm from '../../features/doktoret/form/DoktoriForm';
import PacientiDashboard from '../../features/pacientet/dashboard/PacientiDashboard';
import PacientiDetails from '../../features/pacientet/details/PacientiDetails';
import PacientiForm from '../../features/pacientet/form/PacientiForm';
import LaborantiDashboard from '../../features/laborantet/dashboard/LaborantiDashboard';
import LaborantiDetails from '../../features/laborantet/details/LaborantiDetails';
import LaborantiForm from '../../features/laborantet/form/LaborantiForm';
import TerminiDashboard from '../../features/terminet/dashboard/TerminiDashboard';
import TerminiDetails from '../../features/terminet/details/TerminiDetails';
import TerminiForm from '../../features/terminet/form/TerminiForm';
import DoktoriRegisterForm from '../../features/doktoret/form/DoktoriRegisterForm';
import PacientiRegisterForm from '../../features/pacientet/form/PacientiRegisterForm';
import InfermierjaRegisterForm from '../../features/infermjeret/form/infermierjaRegisterForm';

function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if(commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    }else{
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar/>
    <ModalContainer />
    <Routes>
     <Route path='/' element={<HomePage/>}/>
     <Route 
     path={'/*'}
      element={(
        <>
        <NavBar />
        <Container style={{marginTop: '7em'}}>
          <Routes>
            <Route path='/terminet' element={<TerminiDashboard/>}/>
            <Route path='/terminet/:id' element={<TerminiDetails/>}/>
            <Route key={location.key}path='/createTerminet' element={<TerminiForm/>}/>
            <Route key={location.key}path='/manageTermini/:id' element={<TerminiForm/>}/>
            
            <Route  path='/doktoret' element={<DoktoriDashboard/>}/>\
            <Route path='/doktoret/:id' element={<DoktoriDetails/>}/>
            <Route key={location.key}path='/manageDoktori/:id' element={<DoktoriForm/>}/>
            <Route key={location.key}path='/createDoktoret' element={<DoktoriRegisterForm/>}/>

            <Route  path='/pacientet' element={<PacientiDashboard/>}/>\
            <Route path='/pacientet/:id' element={<PacientiDetails/>}/>
            <Route key={location.key}path='/managePacienti/:id' element={<PacientiForm/>}/>
            <Route key={location.key}path='/createPacientet' element={<PacientiRegisterForm/> }/>
            
            <Route  path='/laborantet' element={<LaborantiDashboard/>}/>\
            <Route path='/laborantet/:id' element={<LaborantiDetails/>}/>
            <Route key={location.key}path='/createLaborantet' element={<LaborantiForm/>}/>
            <Route key={location.key}path='/manageLaboranti/:id' element={<LaborantiForm/>}/>


            <Route  path='/infermjeret' element={<InfermierjaDashboard/>}/>
            <Route path='/infermjeret/:id' element={<InfermierjaDetails/>}/>
            <Route key={location.key}path='/manageInfermierja/:id' element={<InfermierjaForm/>}/>
            <Route key={location.key}path='/createInfermjeret' element={<InfermierjaRegisterForm/>}/>

            <Route path='/errors' element={<TestErrors/>}/>
            <Route path='/server-error' element={<ServerError/>}/>
            <Route path='/login' element={<LoginForm/>}/>
            <Route element={<NotFound/>} />
          
          </Routes>
        </Container>
        </>
      )}
     />
    </Routes>
    </>
  );
}

export default observer (App);
  