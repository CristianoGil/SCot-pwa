import axios from '../config/axios.config';
import {URL_API_SCOT, LOAD_COMBOS_PATH} from '../utils/const';

import type {AxiosResponse} from 'axios';
import {IteratorArray} from '../common/iterator';


interface IResponseDataLoad_Combos {
    key: string
    value?: any
    isFailedLoad?: any
}

export class LoadOfflineData {
    protected url_api: string
    protected combos_path: string[]

    constructor() {
        this.url_api = URL_API_SCOT
        this.combos_path = LOAD_COMBOS_PATH
    }

    public load_combos(service_url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.url_api}/${service_url}`)
                .then((response: AxiosResponse<any>) => {
                    resolve(response.data)
                })
                .catch((error: any) => {
                    reject(error)
                })
        })
    }

    public loadAll_combos(combos_path_override?: any[]): Promise<any[]> {

        const loaded_combos: IResponseDataLoad_Combos[] | PromiseLike<IResponseDataLoad_Combos[]> = [];

        return new Promise((resolve) => {

            const iteratorCombosArray: any = new IteratorArray(combos_path_override || this.combos_path);

            const _funcIterable = async (): Promise<void> => {

                const dataValue: IteratorResult<any> = iteratorCombosArray.next();
                const isDone: boolean | undefined = dataValue.done;
                const service_url: string = dataValue.value;

                if (!isDone) {

                    await this.load_combos(service_url).then((data: any) => {
                        loaded_combos.push({key: service_url, value: data})
                    }).catch((error: any) => {
                        loaded_combos.push({key: service_url, isFailedLoad: error})
                    })

                    _funcIterable();

                } else {
                    resolve(loaded_combos)
                }
            }

            _funcIterable()
        })
    }
}