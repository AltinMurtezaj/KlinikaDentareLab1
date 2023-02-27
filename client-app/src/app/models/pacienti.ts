import { Doktori } from "./doktori";
import { DoktoriDto } from "./doktoriDto";
import { PacientiDoktoriDTO } from "./PacientiDoktoriDTO";
import { Termini } from "./termini";
import { Tretmani } from "./tretmani";
import { Udhezimi } from "./udhezimi";
import { User, UserFormValues } from "./user";
import { XRay } from "./xray";

export interface Pacienti extends User {

  pacientiDoktori?: PacientiDoktoriDTO[];
  tretmanet?: Tretmani[];
  xrays?: XRay[];
  doktoret?: DoktoriDto[];
  terminet?: Termini[];
  udhezimet?: Udhezimi[];

  }
  export interface PacientiFormValues extends UserFormValues{
    pacientiDoktori?: PacientiDoktoriDTO[];
  tretmanet?: Tretmani[];
  xrays?: XRay[];
  doktoret?: DoktoriDto[];
  terminet?: Termini[];
  udhezimet?: Udhezimi[];
  }