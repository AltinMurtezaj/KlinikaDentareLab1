import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Accountant } from "../models/accountant";
import { Doktori, DoktoriFormValues } from "../models/doktori";
import { Farmacisti } from "../models/farmacisti";
import { Infermierja, InfermierjaFormValues } from "../models/infermierja";
import { Laboranti } from "../models/laboranti";
import { Pacienti, PacientiFormValues } from "../models/pacienti";
import { Pastruesi } from "../models/pastruesi";
import { Terapisti } from "../models/terapisti";
import { Termini } from "../models/termini";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";

const sleep=(delay: number) =>{
    return new Promise ((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api/';

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
            history.push('/not-found');
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
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
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
    list: () => requests.get<Infermierja[]>('Infermierja'),
    details: (id: string) => requests.get<Infermierja>(`Infermierja/${id}`),
    create: (infermierja: Infermierja) => axios.post<void>('Infermierja', infermierja),
    update: (infermierja: Infermierja) => axios.put<void>(`Infermierja/${infermierja.id}`,infermierja),
    delete: (id: string) => axios.delete<void>(`Infermierja/${id}`)
}
const Doktoret = {
    list: () => requests.get<Doktori[]>('Doktori'),
    details: (id: string) => requests.get<Doktori>(`Doktori/${id}`),
    create: (doktori: Doktori) => axios.post<void>('Doktori', doktori),
    update: (doktori: Doktori) => axios.put<void>(`Doktori/${doktori.id}`,doktori),
    delete: (id: string) => axios.delete<void>(`Doktori/${id}`)
}

const Pacientet = {
    list: () => requests.get<Pacienti[]>('Pacient'),
    details: (id: string) => requests.get<Pacienti>(`Pacient/${id}`),
    create: (pacienti: Pacienti) => axios.post<void>('Pacient', pacienti),
    update: (pacienti: Pacienti) => axios.put<void>(`Pacient/${pacienti.id}`,pacienti),
    delete: (id: string) => axios.delete<void>(`Pacient/${id}`)
}

const Laborantet = {
    list: () => requests.get<Laboranti[]>('Laboranti'),
    details: (id: string) => requests.get<Laboranti>(`Laboranti/${id}`),
    create: (laboranti: Laboranti) => axios.post<void>('Laboranti', laboranti),
    update: (laboranti: Laboranti) => axios.put<void>(`Laboranti/${laboranti.id}`,laboranti),
    delete: (id: string) => axios.delete<void>(`Laboranti/${id}`)
}

const Terminet = {
    list: () => requests.get<Termini[]>('Termini'),
    details: (id: string) => requests.get<Termini>(`Termini/${id}`),
    create: (termini: Termini) => axios.post<void>('Termini', termini),
    update: (termini: Termini) => axios.put<void>(`Termini/${termini.id}`,termini),
    delete: (id: string) => axios.delete<void>(`Termini/${id}`)
}

const Pastrueset = {
    list: () => requests.get<Pastruesi[]>('Pastruesi'),
    details: (id: string) => requests.get<Pastruesi>(`Pastruesi/${id}`),
    create: (pastruesi: Pastruesi) => axios.post<void>('Pastruesi', pastruesi),
    update: (pastruesi: Pastruesi) => axios.put<void>(`Pastruesi/${pastruesi.id}`,pastruesi),
    delete: (id: string) => axios.delete<void>(`Pastruesi/${id}`)
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user),
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

const Terapistet = {
    list: () => requests.get<Terapisti[]>('Terapist'),
    details: (id: string) => requests.get<Terapisti>(`Terapist/${id}`),
    create: (terapisti: Terapisti) => axios.post<void>('Terapist', terapisti),
    update: (terapisti: Terapisti) => axios.put<void>(`Terapist/${terapisti.id}`,terapisti),
    delete: (id: string) => axios.delete<void>(`Pacient/${id}`)
}

const Accountants = {
    list: () => requests.get<Accountant[]>('Accountant'),
    details: (id: string) => requests.get<Accountant>(`Accountant/${id}`),
    create: (accountant: Accountant) => axios.post<void>('Accountant', accountant),
    update: (accountant: Accountant) => axios.put<void>(`Accountant/${accountant.id}`,accountant),
    delete: (id: string) => axios.delete<void>(`Accountant/${id}`)
}

const Farmacistet = {
    list: () => requests.get<Farmacisti[]>('Farmacisti'),
    details: (id: string) => requests.get<Farmacisti>(`Farmacisti/${id}`),
    create: (farmacisti: Farmacisti) => axios.post<void>('Farmacisti', farmacisti),
    update: (farmacisti: Farmacisti) => axios.put<void>(`Farmacisti/${farmacisti.id}`,farmacisti),
    delete: (id: string) => axios.delete<void>(`Farmacisti/${id}`)
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
    Pastrueset,
    Terapistet,
    Accountants,
    Farmacistet
}

export default agent;
