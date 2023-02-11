import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Tretmani } from '../models/tretmani';

export default class TretmaniStore {
  tretmaniRegistry = new Map<string,Tretmani>();
  selectedTretmani: Tretmani | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    } 
    get tretmaniById() {
    return Array.from(this.tretmaniRegistry.values()).sort((a, b)=> Number(a.id) - Number(b.id) );
    }

    get lastItem(){
        return this.tretmaniById.at(-1);
    }
    get tretmanet(){
        return Array.from(this.tretmaniRegistry.values());
    }
    

  loadTretmanet = async() => {
    try {
        const tretmanet = await agent.Tretmanet.list();
        tretmanet.forEach(tretmani => {
            this.setTretmani(tretmani);
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

  createTretmani = async(tretmani: Tretmani) => {
    this.loading = true;
    try {
        await agent.Tretmanet.create(tretmani);
        runInAction(() => {
            this.tretmaniRegistry.set(tretmani.id!, tretmani);
            this.selectedTretmani = tretmani;
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

 updateTretmani = async(tretmani: Tretmani) => {
    this.loading = true;
    try {
        await agent.Tretmanet.update(tretmani);
        runInAction(() => {
            this.tretmaniRegistry.set(tretmani.id!, tretmani);
            this.selectedTretmani = tretmani;
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

  deletetretmani = async(id: string) => { 
    this.loading = true;
    try {
        await agent.Tretmanet.delete(id);
        runInAction(() => {
            this.tretmaniRegistry.delete(id);
            this.loading = false;
        })
    } catch (error) {
        console.log(error);
        runInAction(() => {
            this.loading = false;
        })
    }
  }

 loadTretmani = async(id: string) => {
    let tretmani = this.getTretmani(id);
    if (tretmani) {
        this.selectedTretmani = tretmani;
        return tretmani;
    } else {
        this.loadingInitial = true;
        try {
            tretmani = await agent.Tretmanet.details(id);
            this.setTretmani(tretmani);
            runInAction(() => {
                this.selectedTretmani = tretmani;
            })
            this.setLoadingInitial(false);
            return tretmani;
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
            
        }
    }
 }

  private getTretmani = (id: string) => {
    return this.tretmaniRegistry.get(id);
  }
  private setTretmani = (tretmani: Tretmani) => {
    this.tretmaniRegistry.set(tretmani.id!, tretmani);
  }
}
