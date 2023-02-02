import React, { useEffect } from 'react';
import {  Container, Modal} from 'semantic-ui-react';
import NavBar from './NavBar';
import InfermierjaDashboard from '../../features/infermjeret/dashboard/InfermierjaDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
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
import FarmacistiDashboard from '../../features/farmacistet/dashboard/FarmacistiDashboard';
import FarmacistiDetails from '../../features/farmacistet/details/FarmacistiDetails';
import farmacistiForm from '../../features/farmacistet/form/farmacistiForm';
import PastruesiDashboard from '../../features/pastruset/dashboard/PastruesiDashboard';
import PastruesiDetails from '../../features/pastruset/details/PastruesiDetails';
import PastruesiForm from '../../features/pastruset/form/PastruesiForm';
import TerapistiDashboard from '../../features/terapistet/dashboard/TerapistiDashboard';
import TerapistiDetails from '../../features/terapistet/details/TerapistiDetails';
import TerapistiForm from '../../features/terapistet/form/TerapistiForm';
import InfermierjaRegisterForm from '../../features/infermjeret/form/InfermierjaRegisterForm';
import DoktoriRegisterForm from '../../features/doktoret/form/DoktoriRegisterForm';
import PacientiRegisterForm from '../../features/pacientet/form/PacientiRegisterForm';


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
     <Route exact path='/' component={HomePage}/>
     <Route 
     path={'/(.+)'}
      render={()=>(
        <>
        <NavBar />
        <Container style={{marginTop: '7em'}}>
          <Switch>
            <Route exact path='/terminet' component={TerminiDashboard}/>
            <Route path='/terminet/:id' component={TerminiDetails}/>
            <Route key={location.key}path={['/createTerminet','/manageTermini/:id']} component={TerminiForm}/>
            
            <Route exact path='/doktoret' component={DoktoriDashboard}/>\
            <Route path='/doktoret/:id' component={DoktoriDetails}/>
            <Route key={location.key}path={['/manageDoktori/:id']} component={DoktoriForm}/>
            <Route key={location.key}path={['/createDoktoret']} component={DoktoriRegisterForm}/>

            <Route exact path='/pacientet' component={PacientiDashboard}/>\
            <Route path='/pacientet/:id' component={PacientiDetails}/>
            <Route key={location.key}path={['/managePacienti/:id']} component={PacientiForm}/>
            <Route key={location.key}path={['/createPacientet']} component={PacientiRegisterForm }/>
            
            <Route exact path='/laborantet' component={LaborantiDashboard}/>\
            <Route path='/laborantet/:id' component={LaborantiDetails}/>
            <Route key={location.key}path={['/createLaborantet','/manageLaboranti/:id']} component={LaborantiForm}/>

            <Route exact path='/infermjeret' component={InfermierjaDashboard}/>
            <Route path='/infermjeret/:id' component={InfermierjaDetails}/>
            <Route key={location.key}path={['/manageInfermierja/:id']} component={InfermierjaForm}/>
            <Route key={location.key}path={['/createInfermjeret']} component={InfermierjaRegisterForm}/>
           
            <Route exact path='/farmacistet' component={FarmacistiDashboard}/>
            <Route path='/farmacistet/:id' component={FarmacistiDetails}/>
            <Route key={location.key}path={['/createFarmacistet','/manageFarmacisti/:id']} component={farmacistiForm}/>

            <Route exact path='/pastruset' component={PastruesiDashboard}/>
            <Route path='/pastruset/:id' component={PastruesiDetails}/>
            <Route key={location.key}path={['/createPastrueset','/managePastruesi/:id']} component={PastruesiForm}/>
            
            <Route exact path='/terapistet' component={TerapistiDashboard}/>
            <Route path='/terapistet/:id' component={TerapistiDetails}/>
            <Route key={location.key}path={['/createTherapist','/manageTerapisti/:id']} component={TerapistiForm}/>

            <Route path='/errors' component={TestErrors}/>
            <Route path='/server-error' component={ServerError}/>
            <Route path='/login' component={LoginForm}/>
            <Route component={NotFound} />
          
          </Switch>
        </Container>
        </>
      )}
     />
    </>
  );
}

export default observer (App);
  