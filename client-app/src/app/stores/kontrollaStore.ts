import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Kontrolla } from '../models/kontrolla';

export default class KontrollaStore {
  kontrollaRegistry = new Map<string,Kontrolla>();
  selectedKontrolla: Kontrolla | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    } 
    get kontrollatById() {
    return Array.from(this.kontrollaRegistry.values()).sort((a, b)=> Number(a.id) - Number(b.id) );
    }

    get lastItem(){
        return this.kontrollatById.at(-1);
    }
    get kontrollat(){
        return Array.from(this.kontrollaRegistry.values());
    }
    get kontrollaByEmri(){
        return Array.from(this.kontrollaRegistry.values()).sort((a,b) =>{
            let fa = a.emriKontrolles!.toLowerCase(),
                fb = b.emriKontrolles!.toLowerCase();

                if(fa<fb){
                    return -1;
                }
                if(fa>fb){
                    return 1;
                }
                return 0;
        });
    }
    

  loadKontrollat = async() => {
    try {
        const kontrollat = await agent.Kontrollat.list();
        kontrollat.forEach(kontrolla => {
            this.setKontrolla(kontrolla);
        })
        this.setLoadingInitial(false);
    } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
    }
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  }

  createKontrolla = async(kontrolla: Kontrolla) => {
    this.loading = true;
    try {
        await agent.Kontrollat.create(kontrolla);
        runInAction(() => {
            this.kontrollaRegistry.set(kontrolla.id!, kontrolla);
            this.selectedKontrolla = kontrolla;
            this.editMode = false;
            this.loading = false;
        })
    } catch (error) {
        console.log(error);
        runInAction(() => {
            this.loading = false;
        })
    }
  }

 updateKontrolla = async(kontrolla: Kontrolla) => {
    this.loading = true;
    try {
        await agent.Kontrollat.update(kontrolla);
        runInAction(() => {
            this.kontrollaRegistry.set(kontrolla.id!, kontrolla);
            this.selectedKontrolla = kontrolla;
            this.editMode = false;
            this.loading = false;
        })
    } catch (error) {
        console.log(error);
        runInAction(() => {
            this.loading = false;
        })
    }
 }

  deletekontrolla = async(id: string) => { 
    this.loading = true;
    try {
        await agent.Kontrollat.delete(id);
        runInAction(() => {
            this.kontrollaRegistry.delete(id);
            this.loading = false;
        })
    } catch (error) {
        console.log(error);
        runInAction(() => {
            this.loading = false;
        })
    }
  }

 loadKontrolla = async(id: string) => {
    let kontrolla = this.getKontrolla(id);
    if (kontrolla) {
        this.selectedKontrolla = kontrolla;
        return kontrolla;
    } else {
        this.loadingInitial = true;
        try {
            kontrolla = await agent.Kontrollat.details(id);
            this.setKontrolla(kontrolla);
            runInAction(() => {
                this.selectedKontrolla = kontrolla;
            })
            this.setLoadingInitial(false);
            return kontrolla;
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
            
        }
    }
 }

  private getKontrolla = (id: string) => {
    return this.kontrollaRegistry.get(id);
  }
  private setKontrolla = (kontrolla: Kontrolla) => {
    this.kontrollaRegistry.set(kontrolla.id!, kontrolla);
  }
}
