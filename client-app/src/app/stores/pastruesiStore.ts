import {makeAutoObservable, runInAction} from "mobx"
import agent from "../api/agent";
import {format} from 'date-fns';
import { Pastruesi } from "../models/pastruesi";

export default class PastruesiStore{
    pastruesiRegistry = new Map<string, Pastruesi>();
    selectedPastruesi: Pastruesi | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    get pastruesetByDate(){
        return Array.from(this.pastruesiRegistry.values()).sort((a, b) =>
            a.datelindja!.getTime() - b.datelindja!.getTime());
    }

    get grouperPastrueset (){
        return Object.entries(
            this.pastruesetByDate.reduce((pastrueset, pastruesi) =>{
                const datelindja = format(pastruesi.datelindja!, 'dd MMM yyyy');
                pastrueset[datelindja] = pastrueset[datelindja] ? [...pastrueset[datelindja], pastruesi] : [pastruesi];
                return pastrueset;
            }, {} as {[key: string]: Pastruesi[]})
        )
    }

    loadPastrueset = async () => { 
        this.loadingInitial = true;
        try{
            const pastrueset = await agent.Pastrueset.list();
                pastrueset.forEach(pastruesi => {
                    this.setPastruesi(pastruesi);
            })
            this.setLoadingInitial(false); 
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false); 
        }
    }
    loadPastruesi = async (id:string) => {
        let pastruesi = this.getPastruesi(id);
        if(pastruesi){
            this.selectedPastruesi = pastruesi;
            return pastruesi;
        }else{
            this.loadingInitial =true;
            try {
                pastruesi = await agent.Pastrueset.details(id);
                this.setPastruesi(pastruesi);
                runInAction(() => {
                    this.selectedPastruesi = pastruesi;
                })
                this.setLoadingInitial(false);
                return pastruesi;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private setPastruesi = (pastruesi: Pastruesi) => {
        pastruesi.datelindja = new Date(pastruesi.datelindja!);
        this.pastruesiRegistry.set(pastruesi.id, pastruesi);
    }

    private getPastruesi= (id: string) => {
        return this.pastruesiRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createPastruesi = async (pastruesi: Pastruesi) => {
        this.loading = true;
        try {
            await agent.Pastrueset.create(pastruesi);
            runInAction(() =>{
                this.pastruesiRegistry.set(pastruesi.id, pastruesi);
                this.selectedPastruesi = pastruesi;
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

    updatePastruesi = async (pastruesi: Pastruesi) => {
        this.loading = true;
        try{
            await agent.Pastrueset.update(pastruesi);
            runInAction(() =>{
                this.pastruesiRegistry.set(pastruesi.id, pastruesi);
                this.selectedPastruesi = pastruesi;
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

    deletePastruesi = async (id: string) => {
        this.loading = true;
        try{
            await agent.Pastrueset.delete(id);
            runInAction(() => {
                this.pastruesiRegistry.delete(id);
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