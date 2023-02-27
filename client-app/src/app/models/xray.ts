import { Tretmani } from "./tretmani";

export interface XRay {
    Id?: string;
    Data: string;
    TretmaniId?: string | undefined;
    Tretmani?: Tretmani;
    pacientiId?: string;
}