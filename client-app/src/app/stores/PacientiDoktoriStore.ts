import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { PacientiDoktoriDTO } from "../models/PacientiDoktoriDTO";


export default class PacientiDoktoriStore{
    pacientiDoktoriRegistry = new Map<number, PacientiDoktoriDTO>();
    pacientiDoktoriRegistryByDoktori = new Map<number, PacientiDoktoriDTO[]>();
    selectedPacientiDoktori: PacientiDoktoriDTO | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get doktoriPacientet() {
        return Array.from(this.pacientiDoktoriRegistry.values());
    }

    get doktoriPacientetByDoktori() {
        return Array.from(this.pacientiDoktoriRegistryByDoktori.values());
    }

    loadDoktoriPacientet = async () => {
        this.loadingInitial = true;
        try {
            const pacientiDoktori = await agent.PacientiDoktori.list();
            pacientiDoktori.forEach(pacientiDoktori => {
                this.setDoktoriPacienti(pacientiDoktori);
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

    loadDoktoriPacientetByDoktori = async (DoktoriId: string) => {
        try{
            const pacientiDoktori = await agent.PacientiDoktori.listByDoktori(DoktoriId);
            pacientiDoktori.forEach(pacientiDoktori => {
                this.setDoktoriPacientiByDoktori(pacientiDoktori);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            this.setLoadingInitial(false);
            console.log(error);
        }
    }

    createPacientiDoktori = async (doktoriDto: PacientiDoktoriDTO) => {
        this.loading = true;
        try {
            await agent.PacientiDoktori.create(doktoriDto);
            runInAction(() => {
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
    loadDoktoriPacientiById = async (id: number) => {
        let pacientiDoktori = this.getDoktoriPacienti(id);
        if (pacientiDoktori) {
            this.selectedPacientiDoktori = pacientiDoktori;
            return pacientiDoktori;
        } else {
            this.loadingInitial = true;
            try {
                let pacientiDoktori = await agent.PacientiDoktori.detailsById(id);
                this.setDoktoriPacienti(pacientiDoktori);
                runInAction(() => {
                    this.selectedPacientiDoktori = pacientiDoktori;
                })
                this.setLoadingInitial(false);
                return pacientiDoktori;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    updatePacientiDoktori = async (pacientiDoktori: PacientiDoktoriDTO) => {
        this.loading = true;
        try {
            await agent.PacientiDoktori.update(pacientiDoktori);
            runInAction(() => {
                this.pacientiDoktoriRegistry.set(pacientiDoktori.id!, pacientiDoktori);
                this.selectedPacientiDoktori = pacientiDoktori;
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
    deletePacientiDoktori = async (pacientiId: string, doktoriid: string, id: number) => {
        this.loading = true;
        try {
            await agent.PacientiDoktori.delete(pacientiId, doktoriid);
            runInAction(() => {
                this.pacientiDoktoriRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    loadDoktoriPacienti = async (pacientiId: string, doktoriid: string) => {
        try{
            let pacientiDoktori = await agent.PacientiDoktori.details(pacientiId, doktoriid);
            this.setDoktoriPacienti(pacientiDoktori);
            console.log(pacientiDoktori);

            runInAction(() => {
                this.selectedPacientiDoktori = pacientiDoktori;
            })
            this.setLoadingInitial(false);
            return pacientiDoktori;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadDoktoriPacientiByDoktori = async (doktoriid: string) => {
        try{
            let pacientiDoktori = await agent.PacientiDoktori.detailsByDoktoriId(doktoriid);
            this.setDoktoriPacientiByDoktori(pacientiDoktori);
            console.log(pacientiDoktori);

            runInAction(() => {
                this.selectedPacientiDoktori = pacientiDoktori;
            })
            this.setLoadingInitial(false);
            return pacientiDoktori;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    private getDoktoriPacienti = (id: number) => {
        return this.pacientiDoktoriRegistry.get(id);
    }
    
    private setDoktoriPacienti = (pacientiDoktori: PacientiDoktoriDTO) => {
        this.pacientiDoktoriRegistry.set(pacientiDoktori.id!, pacientiDoktori);
    }

    private setDoktoriPacientiByDoktori = (pacientiDoktori: PacientiDoktoriDTO) => {
        this.pacientiDoktoriRegistry.set(pacientiDoktori.id!, pacientiDoktori);
    }
}