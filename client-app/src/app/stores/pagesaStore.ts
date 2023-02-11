import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Pagesa } from '../models/pagesa';

export default class PagesaStore {
  pagesaRegistry = new Map<string,Pagesa>();
  selectedPagesa: Pagesa | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    } 
    get pagesatById() {
    return Array.from(this.pagesaRegistry.values()).sort((a, b)=> Number(a.id) - Number(b.id) );
    }

    get lastItem(){
        return this.pagesatById.at(-1);
    }
    get pagesat(){
        return Array.from(this.pagesaRegistry.values());
    }
    

  loadPagesat = async() => {
    try {
        const pagesat = await agent.Pagesat.list();
        pagesat.forEach(pagesa => {
            this.setPagesa(pagesa);
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

  createPagesa = async(pagesa: Pagesa) => {
    this.loading = true;
    try {
        await agent.Pagesat.create(pagesa);
        runInAction(() => {
            this.pagesaRegistry.set(pagesa.id!, pagesa);
            this.selectedPagesa = pagesa;
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

 updatePagesa = async(pagesa: Pagesa) => {
    this.loading = true;
    try {
        await agent.Pagesat.update(pagesa);
        runInAction(() => {
            this.pagesaRegistry.set(pagesa.id!, pagesa);
            this.selectedPagesa = pagesa;
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

  deletepagesa = async(id: string) => { 
    this.loading = true;
    try {
        await agent.Pagesat.delete(id);
        runInAction(() => {
            this.pagesaRegistry.delete(id);
            this.loading = false;
        })
    } catch (error) {
        console.log(error);
        runInAction(() => {
            this.loading = false;
        })
    }
  }

 loadPagesa = async(id: string) => {
    let pagesa = this.getPagesa(id);
    if (pagesa) {
        this.selectedPagesa = pagesa;
        return pagesa;
    } else {
        this.loadingInitial = true;
        try {
            pagesa = await agent.Pagesat.details(id);
            this.setPagesa(pagesa);
            runInAction(() => {
                this.selectedPagesa = pagesa;
            })
            this.setLoadingInitial(false);
            return pagesa;
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
            
        }
    }
 }

  private getPagesa = (id: string) => {
    return this.pagesaRegistry.get(id);
  }
  private setPagesa = (pagesa: Pagesa) => {
    this.pagesaRegistry.set(pagesa.id!, pagesa);
  }
}
