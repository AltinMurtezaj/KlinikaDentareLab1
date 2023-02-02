import {makeAutoObservable, runInAction} from "mobx"
import agent from "../api/agent";
import {format} from 'date-fns';
import { Farmacisti } from "../models/farmacisti";

export default class FarmacistiStore{
    farmacistiRegistry = new Map<string, Farmacisti>();
    selectedFarmacisti: Farmacisti | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    get farmacistetByDate(){
        return Array.from(this.farmacistiRegistry.values()).sort((a, b) =>
            a.datelindja!.getTime() - b.datelindja!.getTime());
    }

    get grouperFarmacistet (){
        return Object.entries(
            this.farmacistetByDate.reduce((farmacistet, farmacisti) =>{
                const datelindja = format(farmacisti.datelindja!, 'dd MMM yyyy');
                farmacistet[datelindja] = farmacistet[datelindja] ? [...farmacistet[datelindja], farmacisti] : [farmacisti];
                return farmacistet;
            }, {} as {[key: string]: Farmacisti[]})
        )
    }

    loadFarmacistet = async () => { 
        this.loadingInitial = true;
        try{
            const farmacistet = await agent.Farmacistet.list();
                farmacistet.forEach(farmacisti => {
                    this.setFarmacisti(farmacisti);
            })
            this.setLoadingInitial(false); 
        }catch(error){
            console.log(error);
            this.setLoadingInitial(false); 
        }
    }
    loadFarmacisti = async (id:string) => {
        let farmacisti = this.getFarmacisti(id);
        if(farmacisti){
            this.selectedFarmacisti = farmacisti;
            return farmacisti;
        }else{
            this.loadingInitial =true;
            try {
                farmacisti = await agent.Farmacistet.details(id);
                this.setFarmacisti(farmacisti);
                runInAction(() => {
                    this.selectedFarmacisti = farmacisti;
                })
                this.setLoadingInitial(false);
                return farmacisti;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private setFarmacisti = (farmacisti: Farmacisti) => {
        farmacisti.datelindja = new Date(farmacisti.datelindja!);
        this.farmacistiRegistry.set(farmacisti.id, farmacisti);
    }

    private getFarmacisti= (id: string) => {
        return this.farmacistiRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createFarmacisti= async (farmacisti: Farmacisti) => {
        this.loading = true;
        try {
            await agent.Farmacistet.create(farmacisti);
            runInAction(() =>{
                this.farmacistiRegistry.set(farmacisti.id, farmacisti);
                this.selectedFarmacisti = farmacisti;
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

    updateFarmacisti = async (farmacisti: Farmacisti) => {
        this.loading = true;
        try{
            await agent.Farmacistet.update(farmacisti);
            runInAction(() =>{
                this.farmacistiRegistry.set(farmacisti.id, farmacisti);
                this.selectedFarmacisti = farmacisti;
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

    deleteFarmacisti = async (id: string) => {
        this.loading = true;
        try{
            await agent.Farmacistet.delete(id);
            runInAction(() => {
                this.farmacistiRegistry.delete(id);
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