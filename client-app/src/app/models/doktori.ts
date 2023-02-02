import { User, UserFormValues } from "./user";

export interface Doktori extends User {
    kualifikimi: string;
    specializimi: string;
    
  }
  export interface DoktoriFormValues extends UserFormValues{
    kualifikimi?: string;
    specializimi?: string;
  }
  