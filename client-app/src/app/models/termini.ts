import { Doktori } from "./doktori";
import { Kontrolla } from "./kontrolla";
import { Pacienti } from "./pacienti";

export interface Termini {
  id?: string;
  koha: string;
  data: string;
  pacientId: string;
  pacienti?: Pacienti;
  doktoriId: string;
  doktori?: Doktori;
  terminiId: string;
  kontrolla?: Kontrolla;
}