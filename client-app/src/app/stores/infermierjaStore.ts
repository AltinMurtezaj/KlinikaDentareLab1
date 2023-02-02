import {makeAutoObservable, runInAction} from "mobx"
import agent from "../api/agent";
import { Infermierja } from "../models/infermierja";
import {format} from 'date-fns';

export default class InfermierjaStore{
    infermierjaRegistry = new Map<string, Infermierja>();
    selectedInfermierja: Infermierja | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    get infermjeretByDate(){
        return Array.from(this.infermierjaRegistry.values()).sort((a, b) =>
            a.datelindja!.getTime() - b.datelindja!.getTime());
    }

    get grouperInfermjeret (){
        return Object.entries(
            this.infermjeretByDate.reduce((infermjeret, infermierja) =>{
                const datelindja = format(infermierja.datelindja!, 'dd MMM yyyy');
                infermjeret[datelindja] = infermjeret[datelindja] ? [...infermjeret[datelindja], infermierja] : [infermierja];
                return infermjeret;
            }, {} as {[key: string]: Infermierja[]})
        )
    }

    loadInfermjeret = async () => { 
        this.loadingInitial = true;
        try{
            const infermjeret = await agent.Infermjeret.list();
                infermjeret.forEach(infermierja => {
                    this.setInfermierja(infermierja);
            })
            this.setLoadingInitial(false); 
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false); 
        }
    }
    loadInfermierja = async (id:string) => {
        let infermierja = this.getInfermierja(id);
        if(infermierja){
            this.selectedInfermierja = infermierja;
            return infermierja;
        }else{
            this.loadingInitial =true;
            try {
                infermierja = await agent.Infermjeret.details(id);
                this.setInfermierja(infermierja);
                runInAction(() => {
                    this.selectedInfermierja = infermierja;
                })
                this.setLoadingInitial(false);
                return infermierja;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private setInfermierja = (infermierja: Infermierja) => {
        infermierja.datelindja = new Date(infermierja.datelindja!);
        this.infermierjaRegistry.set(infermierja.id, infermierja);
    }

    private getInfermierja= (id: string) => {
        return this.infermierjaRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    createInfermierja = async (infermierja: Infermierja) => {
        this.loading = true;
        try {
            await agent.Infermjeret.create(infermierja);
            runInAction(() =>{
                this.infermierjaRegistry.set(infermierja.id, infermierja);
                this.selectedInfermierja = infermierja;
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

    updateInfermierja = async (infermierja: Infermierja) => {
        this.loading = true;
        try{
            await agent.Infermjeret.update(infermierja);
            runInAction(() =>{
                this.infermierjaRegistry.set(infermierja.id, infermierja);
                this.selectedInfermierja = infermierja;
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

    deleteInfermierja = async (id: string) => {
        this.loading = true;
        try{
            await agent.Infermjeret.delete(id);
            runInAction(() => {
                this.infermierjaRegistry.delete(id);
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