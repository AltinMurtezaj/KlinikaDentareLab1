import { PacientiDoktoriDTO } from "./PacientiDoktoriDTO";
import { Tretmani } from "./tretmani";
import { User, UserFormValues } from "./user";



export interface Doktori extends User {
    kualifikimi: string;
    specializimi: string;
    pacientiDoktori?: PacientiDoktoriDTO[];
    tretmanet?: Tretmani[];
    
  }
  export interface DoktoriFormValues extends UserFormValues{
    kualifikimi?: string;
    specializimi?: string;

    pacientet?: Pacienti [];
  }
  