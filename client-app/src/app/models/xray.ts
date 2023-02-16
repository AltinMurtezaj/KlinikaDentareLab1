import { Tretmani } from "./tretmani";

export interface XRay {
    Id?: string;
    Data: Date | null;
    TretmaniId?: string | undefined;
    Tretmani?: Tretmani;
}