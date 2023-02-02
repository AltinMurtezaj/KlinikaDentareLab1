import { User, UserFormValues } from "./user";

export interface Infermierja extends User {
    kualifikimi: string;
    specializimi: string;
    
  }
  export interface InfermierjaFormValues extends UserFormValues{
    kualifikimi?: string;
    specializimi?: string;

}
  