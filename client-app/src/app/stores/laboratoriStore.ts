import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Laboratori } from '../models/laboratori';

export default class LaboratoriStore {
  laboratoriRegistry = new Map<string,Laboratori>();
  selectedLaboratori: Laboratori | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    } 
    get laboratoretById() {
    return Array.from(this.laboratoriRegistry.values()).sort((a, b)=> Number(a.id) - Number(b.id) );
    }

    get lastItem(){
        return this.laboratoretById.at(-1);
    }
    get laboratoret(){
        return Array.from(this.laboratoriRegistry.values());
    }
    

  loadLaboratoret = async() => {
    try {
        const laboratoret = await agent.Laboratoret.list();
        laboratoret.forEach(laboratori => {
            this.setLaboratori(laboratori);
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

  createLaboratori = async(laboratori: Laboratori) => {
    this.loading = true;
    try {
        await agent.Laboratoret.create(laboratori);
        runInAction(() => {
            this.laboratoriRegistry.set(laboratori.id!, laboratori);
            this.selectedLaboratori = laboratori;
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

 updateLaboratori = async(laboratori: Laboratori) => {
    this.loading = true;
    try {
        await agent.Laboratoret.update(laboratori);
        runInAction(() => {
            this.laboratoriRegistry.set(laboratori.id!, laboratori);
            this.selectedLaboratori = laboratori;
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

  deletelaboratori = async(id: string) => { 
    this.loading = true;
    try {
        await agent.Laboratoret.delete(id);
        runInAction(() => {
            this.laboratoriRegistry.delete(id);
            this.loading = false;
        })
    } catch (error) {
        console.log(error);
        runInAction(() => {
            this.loading = false;
        })
    }
  }

 loadLaboratori = async(id: string) => {
    let laboratori = this.getLaboratori(id);
    if (laboratori) {
        this.selectedLaboratori = laboratori;
        return laboratori;
    } else {
        this.loadingInitial = true;
        try {
            laboratori = await agent.Laboratoret.details(id);
            this.setLaboratori(laboratori);
            runInAction(() => {
                this.selectedLaboratori = laboratori;
            })
            this.setLoadingInitial(false);
            return laboratori;
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
            
        }
    }
 }

  private getLaboratori = (id: string) => {
    return this.laboratoriRegistry.get(id);
  }
  private setLaboratori = (laboratori: Laboratori) => {
    this.laboratoriRegistry.set(laboratori.id!, laboratori);
  }
}
