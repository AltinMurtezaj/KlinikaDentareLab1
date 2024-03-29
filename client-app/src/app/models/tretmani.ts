import { Doktori } from "./doktori";
import { Kontrolla } from "./kontrolla";
import { Pacienti } from "./pacienti";
import { Pagesa } from "./pagesa";
import { Udhezimi } from "./udhezimi";
import { XRay } from "./xray";

export interface Tretmani {
    id?: string;
    emri: string;
    pershkrimi: string;
    cmimi: string;
    doktoriId?: string;
    doktori?: Doktori;
    pagesaId?: string;
    pagesa?: Pagesa;
    pacientId: string;
    pacienti?: Pacienti;
    kontrollaId?: string;
    kontrollat?: Kontrolla[];
    udhezimet?: Udhezimi[];
    xrays?: XRay[];
}