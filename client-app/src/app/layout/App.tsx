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
import PacientiDashboard from '../../features/pacientet/dashboard/PacientiDashboard';
import PacientiForm from '../../features/pacientet/form/PacientiForm';
import LaborantiDashboard from '../../features/laborantet/dashboard/LaborantiDashboard';
import LaborantiDetails from '../../features/laborantet/details/LaborantiDetails';
import LaborantiForm from '../../features/laborantet/form/LaborantiForm';
import InfermierjaRegisterForm from '../../features/infermjeret/form/infermierjaRegisterForm';
import PrivateRoute from './PrivateRoute';
import PacientiDetails from '../../features/pacientet/dashboard/PacientiDetails';
import DoktoriDetails from '../../features/doktoret/dashboard/DoktoriDetails';
import DoktoriForm from '../../features/doktoret/form/DoktoriForm';
import DoktoriDashboard from '../../features/doktoret/dashboard/DoktoriDashboard';
import DoktoriList from '../../features/doktoret/dashboard/DoktoriList';
import UdhezimiDashboard from '../../features/udhezimet/dashboard/UdhezimiDashboard';
import UdhezimiDetails from '../../features/udhezimet/dashboard/UdhezimiDetails';
import UdhezimiForm from '../../features/udhezimet/form/UdhezimiForm';
import UdhezimiList from '../../features/udhezimet/dashboard/UdhezimiList';
import CreateTretmaniForm from '../../features/tretmani/Form/CreateTretmaniForm';
import TretmaniDashboard from '../../features/tretmani/Dashboard/tretmaniDashboard';
import TretmaniForm from '../../features/tretmani/Form/TretmaniForm';
import KontrollaRegisterForm from '../../features/kontrolla/Form/KontrollaRegisterForm';
import KontrollaDashboard from '../../features/kontrolla/Dashboard/kontrollaDashboard';
import KontrollaForm from '../../features/kontrolla/Form/KontrollaForm';
import XRayForm from '../../features/xrays/form/XRayForm';
import XRayDashboard from '../../features/xrays/dashboard/XRayDashboard';
import XRryCreateForm from '../../features/xrays/form/CreateXrayForm';
import CreateXrayForm from '../../features/xrays/form/CreateXrayForm';
import PacientiDoktoriEdit from '../../features/pacientet/form/PacientiDoktoriEdit';
import PacientiDoktoriForm from '../../features/pacientet/form/PacientiDoktoriForm';
import PacientiDoktoriDetails from '../../features/DoktoriUser/PacientiDoktoriDetails';
import JoinRoute from './JoinRoute';
import TerminiDashboard from '../../features/terminet/Dashboard/TerminiDashboard';
import TerminiRegisterForm from '../../features/terminet/Form/TerminiRegisterForm';
import TerminiForm from '../../features/terminet/Form/TerminiForm';
import DoktoriRoute from './DoktoriRoute';
import AdminRoute from './AdminRoute';
import PacientiRoute from './PacientiRoute';
import TretmaniListPacienti from '../../features/tretmani/Dashboard/TretmaniListPacienti';
import JoinRoutePacientiDoktori from './JoinRoutePacientiDoktori';
import TerminiListPacienti from '../../features/terminet/Dashboard/TerminiListPacienti';
import XRayListPacienti from '../../features/xrays/dashboard/XRayListPacienti';
import UdhezimiListPacienti from '../../features/udhezimet/dashboard/UdhezimiListPacienti';

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
      <Route element={<PrivateRoute/>}>
      
      </Route>

     <Route path='/' element={<HomePage/>}/>
     <Route 
     path={'/*'}
      element={(
        <>
        <NavBar />
        <Container style={{marginTop: '7em'}}>
          <Routes>
            <Route element={<DoktoriRoute/>}>
            <Route path='/Tretmanet' element={<TretmaniDashboard/>}/>
            <Route  path='/udhezimet' element={<UdhezimiDashboard/>}/>
            <Route key={location.key}path='/manageUdhezimi/:id' element={<UdhezimiForm/>}/>
            <Route key={location.key}path='/UdhezimiDetails/:id' element={<UdhezimiDetails/> }/>
            <Route path='/createTretmani' element={<CreateTretmaniForm/>}/>
            <Route key={location.key} path='/editTretmani/:id' element={<TretmaniForm/>}/>
            <Route path='/createKontrolla' element={<KontrollaRegisterForm/>}/>
            <Route path='/Kontrollat' element={<KontrollaDashboard/>}/>
            <Route key={location.key} path='/editKontrolla/:id' element={<KontrollaForm/>}/>
            <Route path='/terminet' element={<TerminiDashboard/>}/>
            <Route path='/createTermini' element={<TerminiRegisterForm/>}/>
            <Route key={location.key}path='/editTermini/:id' element={<TerminiForm/>}/>
            <Route path='/createXray' element={<CreateXrayForm/>}/>
            <Route path='/XRays' element={<XRayDashboard/>}/>
            <Route key={location.key}path='/editXRay/:id' element={<XRayForm/>}/>
            </Route>

            <Route element={<JoinRoute/>}>
            <Route  path='/pacientet' element={<PacientiDashboard/>}/>
            <Route key={location.key}path='/managePacienti/:id' element={<PacientiForm/>}/>
            <Route key={location.key}path='/DoktoriDetails/:id' element={<DoktoriDetails/>}/>
            <Route key={location.key}path='/PacientiDetails/:id' element={<PacientiDetails/>}/>


            </Route>

            <Route element={<PacientiRoute/>}>
            <Route key={location.key}path='/PacientiDetails/:id' element={<PacientiDetails/> }/>
            <Route  path='/TretmaniPacienti/:id' element={<TretmaniListPacienti/>}/>
            <Route  path='/TerminiPacienti/:id' element={<TerminiListPacienti/>}/>
            <Route  path='/XRayPacienti/:id' element={<XRayListPacienti/>}/>
            <Route  path='/UdhezimiPacienti/:id' element={<UdhezimiListPacienti/>}/>




            </Route>


            <Route element={<JoinRoutePacientiDoktori/>}>
            <Route path='/Tretmani' element={<TretmaniListPacienti/>}/>
            <Route path='/Termini' element={<TerminiListPacienti/>}/>
            <Route path='/xray' element={<XRayListPacienti/>}/>
            <Route path='/udhezimi' element={<UdhezimiListPacienti/>}/>
            </Route>
    

            <Route element={<AdminRoute/>}>
            <Route  path='/doktoret' element={<DoktoriDashboard/>}/>
            <Route key={location.key}path='/manageDoktori/:id' element={<DoktoriForm/>}/>
            <Route  path='/laborantet' element={<LaborantiDashboard/>}/>
            <Route path='/laborantet/:id' element={<LaborantiDetails/>}/>
            <Route key={location.key}path='/createLaborantet' element={<LaborantiForm/>}/>
            <Route key={location.key}path='/manageLaboranti/:id' element={<LaborantiForm/>}/>
            <Route  path='/infermjeret' element={<InfermierjaDashboard/>}/>
            <Route path='/infermjeret/:id' element={<InfermierjaDetails/>}/>
            <Route key={location.key}path='/managePacienti/:id' element={<PacientiForm/>}/>
            <Route key={location.key}path='/manageInfermierja/:id' element={<InfermierjaForm/>}/>
            <Route key={location.key}path='/createInfermjeret' element={<InfermierjaRegisterForm/>}/>
            </Route>


            <Route key={location.key} path='/editDoktoriPacienti/:PacientiId/:DoktoriId' element={<PacientiDoktoriEdit/>}/>
            <Route key={location.key} path='/pacientiDoktoriForm' element={<PacientiDoktoriForm/>}/>
            <Route key={location.key} path='/pacientiDoktoriDetails' element={<PacientiDoktoriDetails/>}/>
            

            <Route element={<NotFound/>}/>
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
  