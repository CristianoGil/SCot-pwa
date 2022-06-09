import type { AxiosError, AxiosResponse } from "axios";
import type {
    ICoDirecta,
    IPesquisarPessoaRequest,
    IPesquisarPessoaResponse,
    IPesquisarVeiculoResponse
} from "../model/contraordenacao";
import { URL_API_SCOT, VEICULOS_SEMELHANTES } from "../utils/const";
import axios from '../config/axios.config';
import { getPlatforms } from "@ionic/react";
import { LoadOfflineData } from "./LoadOfflineData";
import _ from "underscore";
import { IVeiculo, IVeiculoRequest, IVeiculoResponse } from "../model/veiculo";
import { CarregarCombosApreensaoDocumento } from "../model/documentoapreendido";
import database from "../database";
import {ApiUtils} from "./ApiUtils";
import Veiculo from "../pages/RI-Catalogo/Veiculo/Veiculo";
import {uid} from "../utils/apex-formatters";

export class Contraordenacao {
  


    prefix_url: string = 'v1/contraOrdenacao'
    prefix_local_url: string = 'v1/locais'
    prefix_alcool_url: string = 'v1/alcoolemia/carregarCombosAlcool'
    prefix_dominio_url: string = 'v1/dominio'
    apiUtils = new ApiUtils()

    public carregarCombosAlcool(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectGetAPI(`${this.prefix_alcool_url}`).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })

        })

    }

    public pesquisarVeiculosSemelhantes(veiculo: IVeiculoRequest): Promise<IVeiculoResponse> {
        return new Promise((resolve, reject) => {
            this.apiUtils.connectPostAPI(`${VEICULOS_SEMELHANTES}`, veiculo).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                reject(error)
            })

        })
    }

    getMapAddressByPosition(arg0: { position: { lat: any; lng: any; }; apiKey: string; }) {
        return new Promise((resolve, reject) => {

            axios
                .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${arg0.position.lat},${arg0.position.lng}&key=${arg0.apiKey}`)
                .then((response: AxiosResponse<any>) => {
                    resolve(response)
                })
                .catch((error: AxiosError) => {
                    reject(error)
                })
        })
    }

    getCoordsByAddress
        (arg0: { address: string; apiKey: string; }): any {
        return new Promise((resolve, reject) => {
            let url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${arg0.address}&fields=formatted_address,geometry&key=${arg0.apiKey}`;
            axios
                .get(url)
                .then((response: AxiosResponse<any>) => {
                    resolve(response)
                })
                .catch((error: AxiosError) => {
                    reject(error)
                })
        })

    }


    private connectPostAPI(service_url: string, data: any): Promise<any> {

        return new Promise((resolve, reject) => {

            axios
                .post(`${URL_API_SCOT}/${service_url}`, data)
                .then((response: AxiosResponse<any>) => {
                    resolve(response)
                })
                .catch((error: AxiosError) => {
                    reject(error)
                })
        })
    }

    private connectGetAPI(service_url: string): Promise<any> {

        return new Promise((resolve, reject) => {

            axios
                .get(`${URL_API_SCOT}/${service_url}`)
                .then((response: AxiosResponse<any>) => {
                    resolve(response)
                })
                .catch((error: AxiosError) => {
                    reject(error)
                })
        })
    }

    public async guardarCODirectaGeneric(requestData: ICoDirecta): Promise<ICoDirecta | null> {

        if (_.contains(getPlatforms(), 'desktop')) { // Is a desktop device
            return await this.guardarCODirecta(requestData);
        } else { // Is a mobile device

            if (navigator.onLine) { // Is Online
                return await this.guardarCODirecta(requestData);
            } else { // Is onfline

                const { insertOne } = database();
                const localId = uid();
                return new Promise((resolve, reject) => {

                    insertOne('co_directa', 5, [localId, JSON.stringify(requestData), false, (new Date().toDateString()), null], ['localId', 'data', 'isSynchronized', 'createdAt', 'emitedAt']).then(() => {
                        requestData.localId = localId
                        resolve(requestData);
                    }).catch((e) => {
                        reject(e);
                    })
                })
            }
        }
    }


    public guardarCODirecta(requestData: ICoDirecta): Promise<ICoDirecta | null> {
        return new Promise((resolve, reject) => {

            const service_url = 'salvarContraOrdenacao';
            this.connectPostAPI(`${this.prefix_url}/${service_url}`, { contraOrdenacao: requestData }).then((response) => {
                resolve(response.data as unknown as ICoDirecta);
            }).catch((error: AxiosError) => {
                console.error(`${this.prefix_url}/${service_url}:`, error)
                reject(error)
            })


        })
    }

    public async emitirCODirectaGeneric(requestData: ICoDirecta): Promise<ICoDirecta | null> {

        if (_.contains(getPlatforms(), 'desktop')) { // Is a desktop device
            return await this.emitirCODirecta(requestData);
        } else { // Is a mobile device

            if (navigator.onLine) { // Is Online
                return await this.emitirCODirecta(requestData);
            } else { // Is onfline

                const {update} = database();

                return new Promise((resolve, reject) => {
                    const set = `data='${JSON.stringify(requestData)}'`;
                    const where = `localId='${requestData.localId}'`;



                    update('co_directa', set, where).then(() => {
                        resolve(requestData);
                    }).catch((e) => {
                        reject(e);
                    })
                    
                })
            }
        }
    }


    public emitirCODirecta(requestData: ICoDirecta): Promise<ICoDirecta | null> {
        return new Promise((resolve, reject) => {

            const service_url = 'emitirContraOrdenacao';
            this.connectPostAPI(`${this.prefix_url}/${service_url}`, { contraOrdenacao: requestData }).then((response) => {
                resolve(response.data as unknown as ICoDirecta);
            }).catch((error: AxiosError) => {
                console.error(`${this.prefix_url}/${service_url}:`, error)
                reject(error)
            })


        })
    }


    public async terminarCODirectaGeneric(requestData: ICoDirecta): Promise<ICoDirecta | null> {

        if (_.contains(getPlatforms(), 'desktop')) { // Is a desktop device
            return await this.terminarCODirecta(requestData);
        } else { // Is a mobile device

            if (navigator.onLine) { // Is Online
                return await this.terminarCODirecta(requestData);
            } else { // Is onfline

                const {insertOne} = database();
                const localId = uid();
                return new Promise((resolve, reject) => {
                    insertOne('co_directa', 5, [localId, JSON.stringify(requestData), false, (new Date().toDateString()), null], ['localId', 'data', 'isSynchronized', 'createdAt', 'emitedAt']).then(() => {
                        requestData.localId = localId
                        resolve(requestData);
                    }).catch((e) => {
                        reject(e);
                    })
                })
            }
        }
    }


    public terminarCODirecta(requestData: ICoDirecta): Promise<ICoDirecta | null> {
        return new Promise((resolve, reject) => {

            const service_url = 'terminarContraOrdenacao';
            this.connectPostAPI(`${this.prefix_url}/${service_url}`, {contraOrdenacao: requestData}).then((response) => {
                resolve(response.data as unknown as ICoDirecta);
            }).catch((error: AxiosError) => {
                console.error(`${this.prefix_url}/${service_url}:`, error)
                reject(error)
            })


        })
    }

    public pesquisarPessoa(requestData: IPesquisarPessoaRequest): Promise<IPesquisarPessoaResponse> {
        return new Promise((resolve, reject) => {

            const service_url = 'pesquisaNIF';
            this.connectPostAPI(`${this.prefix_url}/${service_url}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                console.error(`${this.prefix_url}/${service_url}:`, error)
                reject(error)
            })

        })
    }

    public pesquisarVeiculo(requestData: IVeiculoRequest): Promise<IPesquisarVeiculoResponse> {
        return new Promise((resolve, reject) => {

            const service_url = 'pesquisaMatricula';
            this.connectPostAPI(`${this.prefix_url}/${service_url}`, requestData).then((response) => {
                resolve(response.data);
            }).catch((error: AxiosError) => {
                console.error(`${this.prefix_url}/${service_url}:`, error)
                reject(error)
            })

        })
    }


    public carregarCombosPessoa(entity: string): Promise<any> {
        return new Promise((resolve, reject) => {

            if (!_.contains(getPlatforms(), 'desktop')) { // Load offline data

                const instanceOfflineData = new LoadOfflineData();
                instanceOfflineData.fetch_combos('contraOrdenacao_carregarCombosPessoa'.toLowerCase()).then((data: any) => {
                    const combos = _.isObject(data) ? _.has(data, entity) ? data[entity] : null : data;
                    resolve(combos);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            } else { // Go to the internet for load data

                const service_url = 'carregarCombosPessoa';
                this.connectGetAPI(`${this.prefix_url}/${service_url}`).then((response) => {
                    const data = response.data;
                    const combos = _.isObject(data) ? _.has(data, entity) ? data[entity] : null : data;
                    resolve(combos);
                }).catch((error: AxiosError) => {
                    console.error(`${service_url}:`, error);
                    reject(error);
                })

            }
        })
    }


    public carregarCombosVeiculo(entity: string): Promise<any> {
        return new Promise((resolve, reject) => {

            if (!_.contains(getPlatforms(), 'desktop')) { // Load offline data

                const instanceOfflineData = new LoadOfflineData();
                instanceOfflineData.fetch_combos('contraOrdenacao_carregarCombosVeiculo'.toLowerCase()).then((data: any) => {
                    const combos = _.isObject(data) ? _.has(data, entity) ? data[entity] : null : data;
                    resolve(combos);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            } else { // Go to the internet for load data

                const service_url = 'carregarCombosVeiculo';
                this.connectGetAPI(`${this.prefix_url}/${service_url}`).then((response) => {
                    const data = response.data;
                    const combos = _.isObject(data) ? _.has(data, entity) ? data[entity] : null : data;
                    resolve(combos);
                }).catch((error: AxiosError) => {
                    console.error(`${service_url}:`, error);
                    reject(error);
                })

            }
        })
    }


    public carregarCombosAssinaturas(): Promise<any> {
        return new Promise((resolve, reject) => {

            if (!_.contains(getPlatforms(), 'desktop')) { // Load offline data

                const instanceOfflineData = new LoadOfflineData();
                instanceOfflineData.fetch_combos('contraOrdenacao_getCombosAssinaturas'.toLowerCase()).then((data: any) => {
                    resolve(data);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            } else { // Go to the internet for load data

                const service_url = 'getCombosAssinaturas';
                this.connectGetAPI(`${this.prefix_url}/${service_url}`).then((response) => {
                    const data = response.data;
                    resolve(data);
                }).catch((error: AxiosError) => {
                    console.error(`${service_url}:`, error);
                    reject(error);
                })

            }
        })
    }

    public carregarCombosMotivoApreensao(): Promise<CarregarCombosApreensaoDocumento> {
        return new Promise((resolve, reject) => {

            if (!_.contains(getPlatforms(), 'desktop')) { // Load offline data

                const instanceOfflineData = new LoadOfflineData();
                instanceOfflineData.fetch_combos('contraOrdenacao_carregarCombosApreensaoDocumentos'.toLowerCase()).then((data: any) => {
                    resolve(data);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            } else { // Go to the internet for load data

                const service_url = 'carregarCombosApreensaoDocumentos';
                this.connectGetAPI(`${this.prefix_url}/${service_url}`).then((response) => {
                    const data = response.data;
                    resolve(data);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            }
        })
    }


    public carregarCombosInfracao(): Promise<any> {
        return new Promise((resolve, reject) => {

            if (!_.contains(getPlatforms(), 'desktop')) { // Load offline data

                const instanceOfflineData = new LoadOfflineData();
                instanceOfflineData.fetch_combos('contraOrdenacao_carregarCombosInfracao'.toLowerCase()).then((data: any) => {
                    resolve(data);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            } 
            else { // Go to the internet for load data
            // carregarCombosInfracao
            const service_url = 'carregarCombosInfracao';
            this.connectGetAPI(`${this.prefix_url}/${service_url}`).then((response) => {
                const data = response.data;
                resolve(data);
            }).catch((error: AxiosError) => {
                reject(error);
            })

            }
        })
    }

    public carregarCombosUnidade(): Promise<any> {
        return new Promise((resolve, reject) => {

            if (!_.contains(getPlatforms(), 'desktop')) { // Load offline data

                const instanceOfflineData = new LoadOfflineData();
                instanceOfflineData.fetch_combos('contraOrdenacao_carregarCombosUnidade'.toLowerCase()).then((data: any) => {
                    resolve(data);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            }
            else { // Go to the internet for load data

            const service_url = 'carregarCombosUnidade';
            this.connectGetAPI(`${this.prefix_url}/${service_url}`).then((response) => {
                const data = response.data;
                resolve(data);
            }).catch((error: AxiosError) => {
                reject(error);
            })

            }
        })
    }


    public carregarCombosLocalizacao(): Promise<any> {
        return new Promise((resolve, reject) => {

            if (!_.contains(getPlatforms(), 'desktop')) { // Load offline data

                const instanceOfflineData = new LoadOfflineData();
                instanceOfflineData.fetch_combos('locais_carregarCombosLocal'.toLowerCase()).then((data: any) => {
                    resolve(data);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            }
            else { // Go to the internet for load data

            const service_url = 'carregarCombosLocal';
            this.connectGetAPI(`${this.prefix_local_url}/${service_url}`).then((response) => {
                const data = response.data;
                resolve(data);
            }).catch((error: AxiosError) => {
                reject(error);
            })

            }
        })
    }

    public carregarComboLocalidades(idFreguesia: any): Promise<any> {
        return new Promise((resolve, reject) => {

            if (!_.contains(getPlatforms(), 'desktop')) { // Load offline data

                const instanceOfflineData = new LoadOfflineData();
                instanceOfflineData.fetch_combos('dominio_carregarComboLocalidade'.toLowerCase()).then((data: any) => {
                    resolve(data);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            }
            else { // Go to the internet for load data

            const service_url = 'carregarComboLocalidade';
            this.connectGetAPI(`${this.prefix_dominio_url}/${service_url}/${idFreguesia}`).then((response) => {
                const data = response.data;
                resolve(data);
            }).catch((error: AxiosError) => {
                reject(error);
            })

            }
        })
    }

    public carregarCombosApreensaoVeiculos(): Promise<any> {
        return new Promise((resolve, reject) => {

            if (!_.contains(getPlatforms(), 'desktop')) { // Load offline data

                const instanceOfflineData = new LoadOfflineData();
                instanceOfflineData.fetch_combos('contraOrdenacao_carregarCombosApreensaoVeiculos'.toLowerCase()).then((data: any) => {
                    resolve(data);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            } else { // Go to the internet for load data

                const service_url = 'carregarCombosApreensaoVeiculos';
                this.connectGetAPI(`${this.prefix_url}/${service_url}`).then((response) => {
                    const data = response.data;
                    resolve(data);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            }
        })
    }

    public carregarCombosAutoBloqueamentoRemocaoVeiculos(): Promise<any> {
        return new Promise((resolve, reject) => {

            if (!_.contains(getPlatforms(), 'desktop')) { // Load offline data

                const instanceOfflineData = new LoadOfflineData();
                instanceOfflineData.fetch_combos('contraOrdenacao_carregarCombosAutoBloqueamentoRemocaoVeiculos'.toLowerCase()).then((data: any) => {
                    resolve(data);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            } else { // Go to the internet for load data

                const service_url = 'carregarCombosAutoBloqueamentoRemocaoVeiculos';
                this.connectGetAPI(`${this.prefix_url}/${service_url}`).then((response) => {
                    const data = response.data;
                    resolve(data);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            }
        })
    }


    
    public carregarCombosPagamento(): Promise<any> {
        return new Promise((resolve, reject) => {

            if (!_.contains(getPlatforms(), 'desktop')) { // Load offline data

                const instanceOfflineData = new LoadOfflineData();
                instanceOfflineData.fetch_combos('contraOrdenacao_carregarCombosPagamento'.toLowerCase()).then((data: any) => {
                    resolve(data);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            } else { // Go to the internet for load data

                const service_url = 'carregarCombosPagamento';
                this.connectGetAPI(`${this.prefix_url}/${service_url}`).then((response) => {
                    const data = response.data;
                    resolve(data);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            }
        })
    }


        
    public carregarCombosSubstituicaoDocumentos(): Promise<any> {
        return new Promise((resolve, reject) => {

            if (!_.contains(getPlatforms(), 'desktop')) { // Load offline data

                const instanceOfflineData = new LoadOfflineData();
                instanceOfflineData.fetch_combos('contraOrdenacao_carregarCombosSubstituicaoDocumentos'.toLowerCase()).then((data: any) => {
                    resolve(data);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            } else { // Go to the internet for load data

                const service_url = 'carregarCombosSubstituicaoDocumentos';
                this.connectGetAPI(`${this.prefix_url}/${service_url}`).then((response) => {
                    const data = response.data;
                    resolve(data);
                }).catch((error: AxiosError) => {
                    reject(error);
                })

            }
        })
    }


    
}
