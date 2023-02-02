import {makeAutoObservable, runInAction} from "mobx"
import agent from "../api/agent";
import {format} from 'date-fns';
import { Laboranti } from "../models/laboranti";

export default class LaborantiStore{
    laborantiRegistry = new Map<string, Laboranti>();
    selectedLaboranti: Laboranti | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    get laborantetByDate(){
        return Array.from(this.laborantiRegistry.values()).sort((a, b) =>
            a.datelindja!.getTime() - b.datelindja!.getTime());
    }

    get grouperLaborantet (){
        return Object.entries(
            this.laborantetByDate.reduce((laborantet, laboranti) =>{
                const datelindja = format(laboranti.datelindja!, 'dd MMM yyyy');
                laborantet[datelindja] = laborantet[datelindja] ? [...laborantet[datelindja], laboranti] : [laboranti];
                return laborantet;
            }, {} as {[key: string]: Laboranti[]})
        )
    }

    loadLaborantet = async () => { 
        this.loadingInitial = true;
        try{
            const laborantet = await agent.Laborantet.list();
                laborantet.forEach(laboranti => {
                    this.setLaboranti(laboranti);
            })
            this.setLoadingInitial(false); 
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false); 
        }
    }
    loadLaboranti = async (id:string) => {
        let laboranti = this.getLaboranti(id);
        if(laboranti){
            this.selectedLaboranti = laboranti;
            return laboranti;
        }else{
            this.loadingInitial =true;
            try {
                laboranti = await agent.Laborantet.details(id);
                this.setLaboranti(laboranti);
                runInAction(() => {
                    this.selectedLaboranti = laboranti;
                })
                this.setLoadingInitial(false);
                return laboranti;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private setLaboranti = (laboranti: Laboranti) => {
        laboranti.datelindja = new Date(laboranti.datelindja!);
        this.laborantiRegistry.set(laboranti.id, laboranti);
    }

    private getLaboranti= (id: string) => {
        return this.laborantiRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createLaboranti = async (laboranti: Laboranti) => {
        this.loading = true;
        try {
            await agent.Laborantet.create(laboranti);
            runInAction(() =>{
                this.laborantiRegistry.set(laboranti.id, laboranti);
                this.selectedLaboranti = laboranti;
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

    updateLaboranti = async (laboranti: Laboranti) => {
        this.loading = true;
        try{
            await agent.Laborantet.update(laboranti);
            runInAction(() =>{
                this.laborantiRegistry.set(laboranti.id, laboranti);
                this.selectedLaboranti = laboranti;
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

    deleteLaboranti = async (id: string) => {
        this.loading = true;
        try{
            await agent.Laborantet.delete(id);
            runInAction(() => {
                this.laborantiRegistry.delete(id);
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