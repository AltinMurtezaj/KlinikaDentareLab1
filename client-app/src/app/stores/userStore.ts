import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { DoktoriFormValues } from "../models/doktori";
import { InfermierjaFormValues } from "../models/infermierja";
import { PacientiFormValues } from "../models/pacienti";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";

export default class userStore{
    user: UserFormValues | null =null;

    constructor(){
        makeAutoObservable(this)
    }

    get isLoggedIn(){
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try{
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() =>{
            this.user = user
            store.modalStore.closeModal();
        })
        }catch(error){
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        }catch(error){
            console.log(error);
        }
    }

    register = async (creds: UserFormValues) => {
        try{
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/infermjeret');
            store.modalStore.closeModal();
        }catch(error){
            throw error;
        }
    }
    registerInfermierja = async (creds:InfermierjaFormValues)=>{
        try{
             await agent.AccountInfermierja.register(creds);
             history.push('/infermjeret');
            
            
        }catch(error){
            throw error;
        }
    }
    registerDoktori = async (creds:DoktoriFormValues)=>{
        try{
             await agent.AccountDoktori.register(creds);
             history.push('/doktoret');
            
            
        }catch(error){
            throw error;
        }
    }
    registerPacienti = async (creds:PacientiFormValues)=>{
        try{
             await agent.AccountPacienti.register(creds);
             history.push('/pacientet');
            
            
        }catch(error){
            throw error;
        }
    }
}