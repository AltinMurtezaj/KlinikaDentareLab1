export interface User {
    id: string;
    emri: string;
    datelindja: Date | null;
    vendbanimi: string;
    nrKontaktues: string;
    mbiemri: string,
    userName: string,
    email: string,
    password: string,
    gjinia: string
    token:string | null;
    discriminator?:string;
}

export interface UserFormValues {
    emri?: string;
    datelindja?: Date | null;
    kualifikimi?: string;
    specializimi?: string;
    vendbanimi?: string;
    nrKontaktues?: string;
    mbiemri?: string,
    userName?: string,
    email: string,
    password: string,
    id?:string;
    gjinia?: string;
    token?:string | null;
    discriminator?:string;
}