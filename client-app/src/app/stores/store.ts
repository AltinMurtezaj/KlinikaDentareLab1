import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import DoktoriStore from "./doktoriStore";
import InfermierjaStore from "./infermierjaStore";
import KontrollaStore from "./kontrollaStore";
import LaborantiStore from "./laborantiStore";
import ModalStore from "./modalStore";
import PacientiStore from "./pacientiStore";
import TerminiStore from "./terminiStore";
import UserStore from "./userStore";


interface Store{
    infermierjaStore: InfermierjaStore;
    doktoriStore: DoktoriStore;
    pacientiStore: PacientiStore;
    laborantiStore: LaborantiStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    terminiStore: TerminiStore;
    kontrollaStore: KontrollaStore
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
    kontrollaStore: new KontrollaStore(),
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}