import {makeAutoObservable, runInAction} from "mobx"
import agent from "../api/agent";
import { Doktori } from "../models/doktori";
import {format} from 'date-fns';

export default class DoktoriStore{
    doktoriRegistry = new Map<string, Doktori>();
    selectedDoktori: Doktori | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    get doktoretByDate(){
        return Array.from(this.doktoriRegistry.values()).sort((a, b) =>
            a.datelindja!.getTime() - b.datelindja!.getTime());
    }

    get grouperDoktoret (){
        return Object.entries(
            this.doktoretByDate.reduce((doktoret, doktori) =>{
                const datelindja = format(doktori.datelindja!, 'dd MMM yyyy');
                doktoret[datelindja] = doktoret[datelindja] ? [...doktoret[datelindja], doktori] : [doktori];
                return doktoret;
            }, {} as {[key: string]: Doktori[]})
        )
    }

    loadDoktoret = async () => { 
        this.loadingInitial = true;
        try{
            const doktoret = await agent.Doktoret.list();
                doktoret.forEach(doktori => {
                    this.setDoktori(doktori);
            })
            this.setLoadingInitial(false); 
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false); 
        }
    }
    loadDoktori = async (id:string) => {
        let doktori = this.getDoktori(id);
        if(doktori){
            this.selectedDoktori = doktori;
            return doktori;
        }else{
            this.loadingInitial =true;
            try {
                doktori = await agent.Doktoret.details(id);
                this.setDoktori(doktori);
                runInAction(() => {
                    this.selectedDoktori = doktori;
                })
                this.setLoadingInitial(false);
                return doktori;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private setDoktori = (doktori: Doktori) => {
        doktori.datelindja = new Date(doktori.datelindja!);
        this.doktoriRegistry.set(doktori.id, doktori);
    }

    private getDoktori= (id: string) => {
        return this.doktoriRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createDoktori = async (doktori: Doktori) => {
        this.loading = true;
        try {
            await agent.Doktoret.create(doktori);
            runInAction(() =>{
                this.doktoriRegistry.set(doktori.id, doktori);
                this.selectedDoktori = doktori;
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

    updateDoktori = async (doktori: Doktori) => {
        this.loading = true;
        try{
            await agent.Doktoret.update(doktori);
            runInAction(() =>{
                this.doktoriRegistry.set(doktori.id, doktori);
                this.selectedDoktori = doktori;
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

    deleteDoktori = async (id: string) => {
        this.loading = true;
        try{
            await agent.Doktoret.delete(id);
            runInAction(() => {
                this.doktoriRegistry.delete(id);
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