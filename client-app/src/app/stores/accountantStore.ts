import {makeAutoObservable, runInAction} from "mobx"
import agent from "../api/agent";
import {format} from 'date-fns';
import { Accountant } from "../models/accountant";

export default class AccountantStore{
    accountantRegistry = new Map<string, Accountant>();
    selectedAccountant: Accountant | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    get accountantsByDate(){
        return Array.from(this.accountantRegistry.values()).sort((a, b) =>
            a.datelindja!.getTime() - b.datelindja!.getTime());
    }

    get grouperAccountants (){
        return Object.entries(
            this.accountantsByDate.reduce((accountants, accountant) =>{
                const datelindja = format(accountant.datelindja!, 'dd MMM yyyy');
                accountants[datelindja] = accountants[datelindja] ? [...accountants[datelindja], accountant] : [accountant];
                return accountants;
            }, {} as {[key: string]: Accountant[]})
        )
    }

    loadAccountants = async () => { 
        this.loadingInitial = true;
        try{
            const accountants = await agent.Accountants.list();
                accountants.forEach(accountant => {
                    this.setAccountant(accountant);
            })
            this.setLoadingInitial(false); 
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false); 
        }
    }
    loadAccountant = async (id:string) => {
        let accountant = this.getAccountant(id);
        if(accountant){
            this.selectedAccountant = accountant;
            return accountant;
        }else{
            this.loadingInitial =true;
            try {
                accountant = await agent.Accountants.details(id);
                this.setAccountant(accountant);
                runInAction(() => {
                    this.selectedAccountant = accountant;
                })
                this.setLoadingInitial(false);
                return accountant;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private setAccountant = (accountant: Accountant) => {
        accountant.datelindja = new Date(accountant.datelindja!);
        this.accountantRegistry.set(accountant.id, accountant);
    }

    private getAccountant= (id: string) => {
        return this.accountantRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createAccountant = async (accountant: Accountant) => {
        this.loading = true;
        try {
            await agent.Accountants.create(accountant);
            runInAction(() =>{
                this.accountantRegistry.set(accountant.id, accountant);
                this.selectedAccountant = accountant;
                this.editMode = false;
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            runInAction(() =>{
                this.loading = false;
            })
        }
    }

    updateAccountant = async (accountant: Accountant) => {
        this.loading = true;
        try{
            await agent.Accountants.update(accountant);
            runInAction(() =>{
                this.accountantRegistry.set(accountant.id, accountant);
                this.selectedAccountant = accountant;
                this.editMode = false;
                this.loading = false;
            })
        }catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteAccountant = async (id: string) => {
        this.loading = true;
        try{
            await agent.Accountants.delete(id);
            runInAction(() => {
                this.accountantRegistry.delete(id);
                this.loading = false;
            })

        }catch(error){
            console.log(error);
            runInAction(() =>{
                this.loading = false;
            })
            
        }
    }
}