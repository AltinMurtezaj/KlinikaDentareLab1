import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Udhezimi } from '../models/udhezimi';

export default class UdhezimiStore {
  udhezimiRegistry = new Map<string,Udhezimi>();
  selectedUdhezimi: Udhezimi | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    } 
    get UdhezimetById() {
    return Array.from(this.udhezimiRegistry.values()).sort((a, b)=> Number(a.Id) - Number(b.Id));
    }

    get lastItem(){
        return this.UdhezimetById.at(-1);
    }
    get udhezimet(){
        return Array.from(this.udhezimiRegistry.values());
    }

    get udhezimetByEmri(){
        return Array.from(this.udhezimiRegistry.values()).sort((a,b) =>{
            let fa = a.Emri.toLowerCase(),
                fb = b.Emri.toLowerCase();

                if(fa<fb){
                    return -1;
                }
                if(fa>fb){
                    return 1;
                }
                return 0;
        });
    }
    

  loadUdhezimi = async() => {
    try {
        const udhezimet = await agent.Udhezimet.list();
        udhezimet.forEach(udhezimi => {
            this.setUdhezimi(udhezimi);
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

  createUdhezimi = async(udhezimi: Udhezimi) => {
    this.loading = true;
    try {
        await agent.Udhezimet.create(udhezimi);
        runInAction(() => {
            this.udhezimiRegistry.set(udhezimi.Id!, udhezimi);
            this.selectedUdhezimi = udhezimi;
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

 updateUdhezimi = async(udhezimi: Udhezimi) => {
    this.loading = true;
    try {
        await agent.Udhezimet.update(udhezimi);
        runInAction(() => {
            this.udhezimiRegistry.set(udhezimi.Id!, udhezimi);
            this.selectedUdhezimi = udhezimi;
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

  deleteudhezimi = async(id: string) => { 
    this.loading = true;
    try {
        await agent.Udhezimet.delete(id);
        runInAction(() => {
            this.udhezimiRegistry.delete(id);
            this.loading = false;
        })
    } catch (error) {
        console.log(error);
        runInAction(() => {
            this.loading = false;
        })
    }
  }

 loadUdhezimet = async(id: string) => {
    let udhezimi = this.getUdhezimi(id);
    if (udhezimi) {
        this.selectedUdhezimi = udhezimi;
        return udhezimi;
    } else {
        this.loadingInitial = true;
        try {
            udhezimi = await agent.Udhezimet.details(id);
            this.setUdhezimi(udhezimi);
            runInAction(() => {
                this.selectedUdhezimi = udhezimi;
            })
            this.setLoadingInitial(false);
            return udhezimi;
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
            
        }
    }
 }

  private getUdhezimi = (id: string) => {
    return this.udhezimiRegistry.get(id);
  }
  private setUdhezimi = (udhezimi: Udhezimi) => {
    this.udhezimiRegistry.set(udhezimi.Id!, udhezimi);
  }
}
