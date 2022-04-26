import axios from '../config/axios.config';
import {URL_API_SCOT, LOAD_COMBOS_PATH} from '../utils/const';

import type {AxiosResponse} from 'axios';
import {IteratorArray} from '../common/iterator';

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

    public loadAll_combosd(): Promise<any> {
        return new Promise((resolve, reject) => {
            const iteratorCombosArray: any = new IteratorArray(this.combos_path);

            const _funcIterable = async (): Promise<void> => {

                const dataValue: IteratorResult<any> = iteratorCombosArray.next();
                const isDone: boolean | undefined = dataValue.done;
                const service_url: string = dataValue.value;

                if (!isDone) {
                    axios
                        .get(`${this.url_api}/${service_url}`)
                        .then((response: AxiosResponse<any>) => {
                            // resolve(response.data)
                        })
                        .catch((error: any) => {
                            reject(error)
                        }).finally(() => {
                        _funcIterable();
                    })
                } else {
                    resolve('')
                }

            }

            _funcIterable()


        })
    }
}