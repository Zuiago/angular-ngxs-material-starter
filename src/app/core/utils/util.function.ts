/**
 * Created by iago.almeida on 23/06/2017.
 */
import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import 'zone.js';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class UtilFunction {

    /**
     * Faz o chamado destroy em subscriptions criadas, com o objetivo de reduzir possíveis memory leaks
     */
    stopSubscription(subscription: Subscription): void {
        if (subscription !== null && subscription !== undefined) {
            subscription.unsubscribe();
        }
    }

    /**
     * Retorna string de paramentros em url baseado em atributos e valores de um objeto
     */
    get_gueryparams_from_object(obj: any, complete?: boolean): string {
        let url = complete ? '?' : '';
        Object.keys(obj).forEach((key: any, index: number) => {
            if (obj[key] !== null && obj[key] !== '' && obj[key] !== undefined) {
                url = url.concat((complete && index === 0 ? '' : '&')
                    + key + '='
                    + obj[key].toString());
            }
        });
        return url;
    }

    /**
     * Retorna objeto HttpParams em url baseado em atributos e valores de um objeto
     */
    get_http_params_from_object(obj: any): HttpParams {

        let params = new HttpParams();
        Object.keys(obj).forEach((key: any, index: number) => {
            if (obj[key] !== null && obj[key] !== '' && obj[key] !== undefined) {
                params = params.append(key, obj[key].toString());
            }
        });
        return params;
    }

    /**
     * Retorna string de parametros em url baseado em atributos e valores de uma lista de objeto literal
     */
    get_gueryparams_from_array_primitive(array: any[], key): string {
        let url = '?';
        array.forEach((value: any, index: number) => {
            if (value !== null && value !== '' && value !== undefined) {
                url = url.concat((index === 0 ? '' : '&') + key + '=' + value.toString());
            }
        });
        return url;
    }

    /**
     * Retorna objeto HttpParams em url baseado em atributos e valores de uma lista de objeto literal
     */
    get_http_params_from_array_primitive(array: any[], key): HttpParams {
        let params = new HttpParams();
        array.forEach((value: any) => {
            if (value !== null && value !== '' && value !== undefined) {
                params = params.append(key, value.toString());
            }
        });
        return params;
    }


    /**
     * Retorna objeto HttpParams em url baseado em atributos e valores de uma lista de objeto literal
     */
    append_http_params(arrayHttpParams: HttpParams[]): HttpParams {
        let params = new HttpParams();
        arrayHttpParams.forEach((httpParam: any) => {
            if (httpParam && httpParam.updates && httpParam.updates.length > 0) {
                httpParam.updates.forEach((update: any) => {
                    if (httpParam.has(update.param)) {
                        params = params.append(update.param, update.value);
                    }
                });
            }
        });
        return params;
    }

    /**
     * Cria e retorna ids randomicos de uso no front-end
     */
    new_guid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Realiza iteração em dois objetos e faz reflexão em propriedades com mesmo nome e tipo
     */
    extend(target, src): any {
        Object.keys(src).forEach(function (key) {
            if (target.hasOwnProperty(key)) {
                target[key] = src[key];
            }
        });
        return target;
    }

    /**
     * Facilita a conversão de um atributo em base64 para buffer de bytes
     *
     * @example
     *  imprimir() {
     *      this.relatorioService.imprimir(this.resumoPedido.numero).subscribe((response: any) => {
     *          if (response.value) {
     *              console.log(response);
     *              const file = new Blob([this.utilFunction.base64ToArrayBuffer(response.value)], {type: 'application/pdf'});
     *              const fileURL  = window.URL.createObjectURL(file);
     *              window.open(fileURL);
     *          }
     *      });
     *  }
     */
    base64_to_array_buffer(base64): ArrayBufferLike {
        const binary_string = window.atob(base64);
        const len = binary_string.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    array_move(arr: any[], old_index: number, new_index: number): any[] {
        while (old_index < 0) {
            old_index += arr.length;
        }
        while (new_index < 0) {
            new_index += arr.length;
        }
        if (new_index >= arr.length) {
            let k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing purposes
    }


    syntaxHighlight(json): string {
        if (typeof json !== 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            function (match) {
                let cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            });
    }

    getFirstDayMonth(): Date {
        const datainicial = new Date();
        datainicial.setDate(1);
        datainicial.setHours(0);
        datainicial.setMinutes(0);
        datainicial.setSeconds(0);
        return datainicial;
    }

    getCurrentDay(dataAtual: Date) {
        dataAtual.setHours(23);
        dataAtual.setMinutes(59);
        dataAtual.setSeconds(59);
        return dataAtual;
    }

    unique(array, propertyName): any {
        return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
    }
}
