import {makeAutoObservable, runInAction} from "mobx"
import agent from "../api/agent";
import {format} from 'date-fns';
import { Termini } from "../models/termini";

export default class TerminiStore{
    terminiRegistry = new Map<string, Termini>();
    selectedTermini: Termini | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    loadTerminet = async () => { 
        this.loadingInitial = true;
        try{
            const terminet = await agent.Terminet.list();
                terminet.forEach(termini => {
                    this.setTermini(termini);
            })
            this.setLoadingInitial(false); 
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false); 
        }
    }
    loadTermini = async (id:string) => {
        let termini = this.getTermini(id);
        if(termini){
            this.selectedTermini = termini;
            return termini;
        }else{
            this.loadingInitial =true;
            try {
                termini = await agent.Terminet.details(id);
                this.setTermini(termini);
                runInAction(() => {
                    this.selectedTermini = termini;
                })
                this.setLoadingInitial(false);
                return termini;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private setTermini = (termini: Termini) => { 
        this.terminiRegistry.set(termini.id!, termini);
    }

    private getTermini= (id: string) => {
        return this.terminiRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createTermini = async (termini: Termini) => {
        this.loading = true;
        try {
            await agent.Terminet.create(termini);
            runInAction(() =>{
                this.terminiRegistry.set(termini.id!, termini);
                this.selectedTermini = termini;
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

    updateTermini = async (termini: Termini) => {
        this.loading = true;
        try{
            await agent.Terminet.update(termini);
            runInAction(() =>{
                this.terminiRegistry.set(termini.id!, termini);
                this.selectedTermini = termini;
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

    deleteTermini = async (id: string) => {
        this.loading = true;
        try{
            await agent.Terminet.delete(id);
            runInAction(() => {
                this.terminiRegistry.delete(id);
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