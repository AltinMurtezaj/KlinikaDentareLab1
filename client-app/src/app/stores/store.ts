import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import DoktoriStore from "./doktoriStore";
import InfermierjaStore from "./infermierjaStore";
import KontrollaStore from "./kontrollaStore";
import LaborantiStore from "./laborantiStore";
import ModalStore from "./modalStore";
import PacientiDoktoriStore from "./PacientiDoktoriStore";
import PacientiStore from "./pacientiStore";
import PagesaStore from "./pagesaStore";
import TerminiStore from "./terminiStore";
import TretmaniStore from "./tretmaniStore";
import UdhezimiStore from "./udhezimiStore";
import UserStore from "./userStore";
import xrayStore from "./xrayStore";


interface Store{
    infermierjaStore: InfermierjaStore;
    doktoriStore: DoktoriStore;
    pacientiStore: PacientiStore;
    laborantiStore: LaborantiStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    terminiStore: TerminiStore;
    tretmaniStore: TretmaniStore;
    kontrollaStore: KontrollaStore;
    xrayStore: xrayStore;
    pagesaStore: PagesaStore;
    udhezimiStore: UdhezimiStore;
    pacientiDoktoriStore: PacientiDoktoriStore;

}

export const store: Store = {
    infermierjaStore: new InfermierjaStore(),
    doktoriStore: new DoktoriStore(),
    pacientiStore: new PacientiStore(),
    laborantiStore: new LaborantiStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    terminiStore: new TerminiStore(),
    tretmaniStore: new TretmaniStore(),
    kontrollaStore: new KontrollaStore(),
    xrayStore: new xrayStore(),
    pagesaStore: new PagesaStore(),
    udhezimiStore: new UdhezimiStore(),
    pacientiDoktoriStore: new PacientiDoktoriStore()
    
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}