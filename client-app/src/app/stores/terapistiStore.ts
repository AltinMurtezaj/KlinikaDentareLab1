import {makeAutoObservable, runInAction} from "mobx"
import agent from "../api/agent";
import {format} from 'date-fns';
import { Terapisti } from "../models/terapisti";

export default class TerapistiStore{
    terapistiRegistry = new Map<string, Terapisti>();
    selectedTerapisti: Terapisti | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    get terapistetByDate(){
        return Array.from(this.terapistiRegistry.values()).sort((a, b) =>
            a.datelindja!.getTime() - b.datelindja!.getTime());
    }

    get grouperTerapistet (){
        return Object.entries(
            this.terapistetByDate.reduce((terapistet, terapisti) =>{
                const datelindja = format(terapisti.datelindja!, 'dd MMM yyyy');
                terapistet[datelindja] = terapistet[datelindja] ? [...terapistet[datelindja], terapisti] : [terapisti];
                return terapistet;
            }, {} as {[key: string]: Terapisti[]})
        )
    }

    loadTerapistet = async () => { 
        this.loadingInitial = true;
        try{
            const terapistet = await agent.Terapistet.list();
                terapistet.forEach(terapisti => {
                    this.setTerapisti(terapisti);
            })
            this.setLoadingInitial(false); 
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false); 
        }
    }
    loadTerapisti = async (id:string) => {
        let terapisti = this.getTerapisti(id);
        if(terapisti){
            this.selectedTerapisti = terapisti;
            return terapisti;
        }else{
            this.loadingInitial =true;
            try {
                terapisti = await agent.Terapistet.details(id);
                this.setTerapisti(terapisti);
                runInAction(() => {
                    this.selectedTerapisti = terapisti;
                })
                this.setLoadingInitial(false);
                return terapisti;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private setTerapisti = (terapisti: Terapisti) => {
        terapisti.datelindja = new Date(terapisti.datelindja!);
        this.terapistiRegistry.set(terapisti.id, terapisti);
    }

    private getTerapisti= (id: string) => {
        return this.terapistiRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createTerapisti = async (terapisti: Terapisti) => {
        this.loading = true;
        try {
            await agent.Terapistet.create(terapisti);
            runInAction(() =>{
                this.terapistiRegistry.set(terapisti.id, terapisti);
                this.selectedTerapisti = terapisti;
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

    updateTerapisti = async (terapisti: Terapisti) => {
        this.loading = true;
        try{
            await agent.Terapistet.update(terapisti);
            runInAction(() =>{
                this.terapistiRegistry.set(terapisti.id, terapisti);
                this.selectedTerapisti = terapisti;
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

    deleteTerapisti = async (id: string) => {
        this.loading = true;
        try{
            await agent.Terapistet.delete(id);
            runInAction(() => {
                this.terapistiRegistry.delete(id);
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