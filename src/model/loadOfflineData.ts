import type {AxiosError} from 'axios';

export interface IResponseDataLoad_Combos {
    key: string
    value?: any
    isFailedLoad?: AxiosError
}