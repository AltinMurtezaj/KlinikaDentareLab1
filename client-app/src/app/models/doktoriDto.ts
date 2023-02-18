import { Pacienti } from "./pacienti";

export interface DoktoriDto{
    id?: string;
    emri: string;
    mbiemri: string;
    email: string;
    pacientet?: Pacienti[];
}