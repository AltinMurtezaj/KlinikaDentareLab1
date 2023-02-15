import { Doktori } from "./doktori";
import { Kontrolla } from "./kontrolla";
import { Pacienti } from "./pacienti";

export interface Termini {
  id?: string;
  koha: string;
  data: Date | null;
  kontrolla?: Kontrolla[];
}