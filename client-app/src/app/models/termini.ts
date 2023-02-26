import { Doktori } from "./doktori";
import { Kontrolla } from "./kontrolla";
import { Pacienti } from "./pacienti";

export interface Termini {
  id?: string;
  koha: string;
  data: string;
  pacientiId?: string;
  kontrolla?: Kontrolla[];
}