import { Pacienti } from "./pacienti";
import { User, UserFormValues } from "./user";



export interface Doktori extends User {
    kualifikimi: string;
    specializimi: string;

    pacientet?: Pacienti [];
  }
  export interface DoktoriFormValues extends UserFormValues{
    kualifikimi?: string;
    specializimi?: string;

    pacientet?: Pacienti [];
  }
  