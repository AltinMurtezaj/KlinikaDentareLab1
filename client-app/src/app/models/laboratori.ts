import { Laboranti } from "./laboranti";

export interface Laboratori {
    id?: string;
    emri: string;
    laboranti?: Laboranti;
    laborantiId: number;
  }