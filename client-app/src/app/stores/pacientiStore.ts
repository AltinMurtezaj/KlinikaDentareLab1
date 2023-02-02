import {makeAutoObservable, runInAction} from "mobx"
import agent from "../api/agent";
import {format} from 'date-fns';
import { Pacienti } from "../models/pacienti";

export default class PacientiStore{
    pacientiRegistry = new Map<string, Pacienti>();
    selectedPacienti: Pacienti | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    get pacientetByDate(){
        return Array.from(this.pacientiRegistry.values()).sort((a, b) =>
            a.datelindja!.getTime() - b.datelindja!.getTime());
    }

    get grouperPacientet (){
        return Object.entries(
            this.pacientetByDate.reduce((pacientet, pacienti) =>{
                const datelindja = format(pacienti.datelindja!, 'dd MMM yyyy');
                pacientet[datelindja] = pacientet[datelindja] ? [...pacientet[datelindja], pacienti] : [pacienti];
                return pacientet;
            }, {} as {[key: string]: Pacienti[]})
        )
    }

    loadPacientet = async () => { 
        this.loadingInitial = true;
        try{
            const pacientet = await agent.Pacientet.list();
                pacientet.forEach(pacienti => {
                    this.setPacienti(pacienti);
            })
            this.setLoadingInitial(false); 
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false); 
        }
    }
    loadPacienti = async (id:string) => {
        let pacienti = this.getPacienti(id);
        if(pacienti){
            this.selectedPacienti = pacienti;
            return pacienti;
        }else{
            this.loadingInitial =true;
            try {
                pacienti = await agent.Pacientet.details(id);
                this.setPacienti(pacienti);
                runInAction(() => {
                    this.selectedPacienti = pacienti;
                })
                this.setLoadingInitial(false);
                return pacienti;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private setPacienti = (pacienti: Pacienti) => {
        pacienti.datelindja = new Date(pacienti.datelindja!);
        this.pacientiRegistry.set(pacienti.id, pacienti);
    }

    private getPacienti= (id: string) => {
        return this.pacientiRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createPacienti = async (pacienti: Pacienti) => {
        this.loading = true;
        try {
            await agent.Pacientet.create(pacienti);
            runInAction(() =>{
                this.pacientiRegistry.set(pacienti.id, pacienti);
                this.selectedPacienti = pacienti;
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

    updatePacienti = async (pacienti: Pacienti) => {
        this.loading = true;
        try{
            await agent.Pacientet.update(pacienti);
            runInAction(() =>{
                this.pacientiRegistry.set(pacienti.id, pacienti);
                this.selectedPacienti = pacienti;
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

    deletePacienti = async (id: string) => {
        this.loading = true;
        try{
            await agent.Pacientet.delete(id);
            runInAction(() => {
                this.pacientiRegistry.delete(id);
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