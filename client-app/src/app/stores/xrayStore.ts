import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { XRay } from '../models/xray';

export default class XRayStore {
  xrayRegistry = new Map<string,XRay>();
  selectedXRay: XRay | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    } 
    get xrayById() {
    return Array.from(this.xrayRegistry.values()).sort((a, b)=> Number(a.Id) - Number(b.Id) );
    }

    get lastItem(){
        return this.xrayById.at(-1);
    }
    get xrays(){
        return Array.from(this.xrayRegistry.values());
    }
    

  loadXRays = async() => {
    try {
        const xrays = await agent.XRays.list();
        xrays.forEach(xray => {
            this.setXRay(xray);
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

  createXRay = async(xray: XRay) => {
    this.loading = true;
    try {
        await agent.XRays.create(xray);
        runInAction(() => {
            this.xrayRegistry.set(xray.Id!, xray);
            this.selectedXRay = xray;
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

 updateXRay = async(xray: XRay) => {
    this.loading = true;
    try {
        await agent.XRays.update(xray);
        runInAction(() => {
            this.xrayRegistry.set(xray.Id!, xray);
            this.selectedXRay = xray;
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

  deleteXRay = async(id: string) => { 
    this.loading = true;
    try {
        await agent.XRays.delete(id);
        runInAction(() => {
            this.xrayRegistry.delete(id);
            this.loading = false;
        })
    } catch (error) {
        console.log(error);
        runInAction(() => {
            this.loading = false;
        })
    }
  }

 loadXRay = async(id: string) => {
    let xray = this.getXRay(id);
    if (xray) {
        this.selectedXRay = xray;
        return xray;
    } else {
        this.loadingInitial = true;
        try {
            xray = await agent.XRays.details(id);
            this.setXRay(xray);
            runInAction(() => {
                this.selectedXRay = xray;
            })
            this.setLoadingInitial(false);
            return xray;
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
            
        }
    }
 }

  private getXRay = (id: string) => {
    return this.xrayRegistry.get(id);
  }
  private setXRay = (xray: XRay) => {
    this.xrayRegistry.set(xray.Id!, xray);
  }
}
