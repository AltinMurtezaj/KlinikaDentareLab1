import { Tretmani } from "./tretmani";

export interface Pagesa {
    id: string;
    shuma: string;
    metodaPageses: string;
    dataPageses: Date;
    tretmaniId: string;
    tretmani?: Tretmani;
  }