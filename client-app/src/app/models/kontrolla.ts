import { Pacienti } from "./pacienti";
import { Termini } from "./termini";
import { Tretmani } from "./tretmani";

export interface Kontrolla {
    id?: string;
    emriKontrolles: string;
    kosto: string;
    pacientiId?: string;
    pacienti?: Pacienti;
    tretmaniId?: string;
    tretmani?: Tretmani;
    terminiId: string;
    termini?: Termini;
  }