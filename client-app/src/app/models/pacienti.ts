import { PacientiDoktoriDTO } from "./PacientiDoktoriDTO";
import { Tretmani } from "./tretmani";
import { User, UserFormValues } from "./user";
import { XRay } from "./xray";

export interface Pacienti extends User {

  pacientiDoktori?: PacientiDoktoriDTO[];
  tretmanet?: Tretmani[];
  xrays?: XRay[];

  }
  export interface PacientiFormValues extends UserFormValues{

  }