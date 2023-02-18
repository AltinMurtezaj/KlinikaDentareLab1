import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Doktori, DoktoriFormValues } from "../models/doktori";
import { Infermierja, InfermierjaFormValues } from "../models/infermierja";
import { Laboranti } from "../models/laboranti";
import { Pacienti, PacientiFormValues } from "../models/pacienti";
import { Termini } from "../models/termini";
import { Kontrolla } from "../models/kontrolla";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";
import { Laboratori } from "../models/laboratori";
import { Tretmani } from "../models/tretmani";
import { Udhezimi } from "../models/udhezimi";
import { XRay } from "../models/xray";
import { Pagesa } from "../models/pagesa";
import { PacientiXRayDTO } from "../models/PacientiXRayDTO";
import { PacientiDoktoriDTO } from "../models/PacientiDoktoriDTO";

const sleep=(delay: number) =>{
    return new Promise ((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
        await sleep(1000);
        return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response!;
    switch (status) {
        case 400:
           if(config.method === 'get' && data.errors.hasOwnProperty('id')){
            return 'error';
           }
           if(data.errors){
            const modalStateErrors = [];
            for(const key in data.errors){
                if(data.errors[key]){
                    modalStateErrors.push(data.errors[key])
                }
            }
            throw modalStateErrors.flat();
           }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 404:
            console.log(error.response);
            break;
        case 500:
            toast.error('/server-error');
            store.commonStore.setServerError(data);
            
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T> (response : AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string)=> axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {})=> axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {})=> axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string)=> axios.delete<T>(url).then(responseBody),
}

const Infermjeret = {
    list: () => requests.get<Infermierja[]>('/Infermierja'),
    details: (id: string) => requests.get<Infermierja>(`/Infermierja/${id}`),
    create: (infermierja: Infermierja) => axios.post<void>('/Infermierja', infermierja),
    update: (infermierja: Infermierja) => axios.put<void>(`/Infermierja/${infermierja.id}`,infermierja),
    delete: (id: string) => axios.delete<void>(`/Infermierja/${id}`)
}
const Doktoret = {
    list: () => requests.get<Doktori[]>('/Doktori'),
    details: (id: string) => requests.get<Doktori>(`/Doktori/${id}`),
    create: (doktori: Doktori) => axios.post<void>('/Doktori', doktori),
    update: (doktori: Doktori) => axios.put<void>(`/Doktori/${doktori.id}`,doktori),
    delete: (id: string) => axios.delete<void>(`/Doktori/${id}`)
}

const Pacientet = {
    list: () => requests.get<Pacienti[]>("/Pacient"),
    details: (id: string) => requests.get<Pacienti>(`/Pacient/${id}`),
    create: (pacienti: Pacienti) => axios.post<void>('/Pacient', pacienti),
    update: (pacienti: Pacienti) => axios.put<void>(`/Pacient/${pacienti.id}`,pacienti),
    delete: (id: string) => axios.delete<void>(`/Pacient/${id}`)
}

const Laborantet = {
    list: () => requests.get<Laboranti[]>('/Laboranti'),
    details: (id: string) => requests.get<Laboranti>(`/Laboranti/${id}`),
    create: (laboranti: Laboranti) => axios.post<void>('/Laboranti', laboranti),
    update: (laboranti: Laboranti) => axios.put<void>(`/Laboranti/${laboranti.id}`,laboranti),
    delete: (id: string) => axios.delete<void>(`/Laboranti/${id}`)
}

const Terminet = {
    list: () => requests.get<Termini[]>('/Termini'),
    details: (id: string) => requests.get<Termini>(`/Termini/${id}`),
    create: (termini: Termini) => axios.post<void>('/Termini', termini),
    update: (termini: Termini) => axios.put<void>(`/Termini/${termini.id}`,termini),
    delete: (id: string) => axios.delete<void>(`/Termini/${id}`)
}
const Kontrollat = {
    list: () => requests.get<Kontrolla[]>('/Kontrolla'),
    details: (id: string) => requests.get<Kontrolla>(`/Kontrolla/${id}`),
    create: (kontrolla: Kontrolla) => axios.post<void>('/Kontrolla', kontrolla),
    update: (kontrolla: Kontrolla) => axios.put<void>(`/Kontrolla/${kontrolla.id}`,kontrolla),
    delete: (id: string) => axios.delete<void>(`/Kontrolla/${id}`)
}
const Pagesat = {
    list: () => requests.get<Pagesa[]>('/Pagesa'),
    details: (id: string) => requests.get<Pagesa>(`/Pagesa/${id}`),
    create: (pagesa: Pagesa) => axios.post<void>('/Pagesa', pagesa),
    update: (pagesa: Pagesa) => axios.put<void>(`/Pagesa/${pagesa.id}`,pagesa),
    delete: (id: string) => axios.delete<void>(`/Pagesa/${id}`)
}
const XRays = {
    list: () => requests.get<XRay[]>('/XRay'),
    details: (id: string) => requests.get<XRay>(`/XRay/${id}`),
    create: (xray: XRay) => axios.post<void>('/XRay', xray),
    update: (xray: XRay) => axios.put<void>(`/XRay/${xray.Id}`,xray),
    delete: (id: string) => axios.delete<void>(`/XRay/${id}`)
}
const Udhezimet = {
    list: () => requests.get<Udhezimi[]>('/Udhezimi'),
    details: (id: string) => requests.get<Udhezimi>(`/Udhezimi/${id}`),
    create: (udhezimi: Udhezimi) => axios.post<void>('/Udhezimi', udhezimi),
    update: (udhezimi: Udhezimi) => axios.put<void>(`/Udhezimi/${udhezimi.Id}`,udhezimi),
    delete: (id: string) => axios.delete<void>(`/Udhezimi/${id}`)
}
const Tretmanet = {
    list: () => requests.get<Tretmani[]>('/Tretmani'),
    details: (id: string) => requests.get<Tretmani>(`/Tretmani/${id}`),
    create: (tretmani: Tretmani) => axios.post<void>('/Tretmani', tretmani),
    update: (tretmani: Tretmani) => axios.put<void>(`/Tretmani/${tretmani.id}`,tretmani),
    delete: (id: string) => axios.delete<void>(`/Tretmani/${id}`)
}
const Laboratoret = {
    list: () => requests.get<Laboratori[]>('/Laboratori'),
    details: (id: string) => requests.get<Laboratori>(`/Laboratori/${id}`),
    create: (laboratori: Laboratori) => axios.post<void>('/Laboratori', laboratori),
    update: (laboratori: Laboratori) => axios.put<void>(`/Laboratori/${laboratori.id}`,laboratori),
    delete: (id: string) => axios.delete<void>(`/Laboratori/${id}`)
}
const PacientiDoktori = {
    list: () => requests.get<PacientiDoktoriDTO[]>('/PacientiDoktori'),
    listByDoktori: (doktoriId:string) => requests.get<PacientiDoktoriDTO[]>(`/PacientiDoktori/${doktoriId}/byDoktori`),
    details: (pacientiId: string, DoktoriId:string) => requests.get<PacientiDoktoriDTO>(`/PacientiDoktori/${pacientiId}/${DoktoriId}`),
    create: (doktoriDto: PacientiDoktoriDTO) => requests.post<void>('/PacientiDoktori', doktoriDto),
    update: (doktoriDto: PacientiDoktoriDTO) => axios.put<void>(`/PacientiDoktori/${doktoriDto.id}`,doktoriDto),
    delete: (pacientiId: string, DoktoriId: string) => axios.delete<void>(`/PacientiDoktori/${pacientiId}/${DoktoriId}`),
    detailsById: (id: number) => requests.get<PacientiDoktoriDTO>(`/PacientiDoktori/${id}`),
    detailsByDoktoriId: (DoktoriId: string) => requests.get<PacientiDoktoriDTO>(`/PacientiDoktori/${DoktoriId}/DoktoriId`),
    }
const PacientiXRay = {
    list: () => requests.get<PacientiXRayDTO[]>('/PacientiXRay'),
    details: (xrayId: string, pacientiId:string) => requests.get<PacientiXRayDTO>(`/PacientiXRay/${xrayId}/${pacientiId}`),
    create: (pacientixray: PacientiXRayDTO) => axios.post<void>('/PacientiXRay', pacientixray),
    update: (pacientixray: PacientiXRayDTO) => axios.put<void>(`/PacientiXRay/${pacientixray.id}`,pacientixray),
    delete: (xrayId: string, pacientiId: string) => axios.delete<void>(`/PacientiXRay/${xrayId}/${pacientiId}`),
    detailsbyId: (id: string) => requests.get<PacientiXRayDTO>(`/PacientiXRay/${id}`),
}
const Account = {
    current: () => requests.get<Pacienti>('/account'),
    login: (user: UserFormValues) => requests.post<Pacienti>('/account/login', user),
    register: (user: UserFormValues) => requests.post<PacientiFormValues>('/account/register', user),
}

const AccountInfermierja = {
    register : (user:InfermierjaFormValues)=> requests.post<InfermierjaFormValues>('InfermierjaAccount/register', user),
}
const AccountDoktori = {
    register : (user:DoktoriFormValues)=> requests.post<DoktoriFormValues>('DoktoriAccount/register', user),
}
const AccountPacienti = {
    register : (user:PacientiFormValues)=> requests.post<PacientiFormValues>('PacientiAccount/register', user),
}

const agent = {
    AccountPacienti,
    AccountDoktori,
    AccountInfermierja,
    Laborantet,
    Infermjeret,
    Account,
    Doktoret,
    Pacientet,
    Terminet,
    Kontrollat,
    Pagesat,
    XRays,
    Udhezimet,
    Tretmanet,
    Laboratoret,
    PacientiDoktori,
    PacientiXRay
};

export default agent;
