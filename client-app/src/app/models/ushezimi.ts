import { Tretmani } from "./Tretmani";

export interface Udhezimi {
    Id?: string;
    Emri: string;
    Doza: string;
    TretmaniId: string;
    Tretmani?: Tretmani;
  }