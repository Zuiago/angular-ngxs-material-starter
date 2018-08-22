/**
 * Created by iago.almeida on 05/06/2017.
 */

// Imports

import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {SelectModel} from '../models/select.model';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';

export class AbstractRestService<T> {

    private select = new BehaviorSubject<SelectModel>(new SelectModel());

    /**
     * @param {HttpClient} _http.
     * @param {string} route.
     */
    constructor(protected readonly _http: HttpClient,
                protected readonly route: string) {
        this.route = `${environment.URL_SERVER_API}` + '/' + route;
    }

    /**
     * Função que permite alterar select model já em memoria na aplicação.
     */
    setSelectModel(select: SelectModel): void {
        this.select.next(select);
    }

    /**
     * Função que permite acessar select model já em memoria na aplicação.
     * @returns {Observable<SetorModel>}
     */
    getSelectModel(): SelectModel {
        return this.select.getValue();
    }

    /**
     * Chamada rest usada para trazer a lista de <T[]> para uma entidade, sem filtros adicionais, porém pode ser
     * levada apenas ativos nesta lista quando ha exclusão lógica.
     * @param {any} params.
     * @return Observable<T[]>
     */
    getList(params: any = {}): Observable<T[] | any[]> {
        return this._http.get(this.route, {
            params: ((params == null || params === undefined) ? <any>{} : params)
        }).pipe(map(resp => {
            return resp ? resp as T[] : [] as T[];
        }));
    }

    /**
     * Chamada rest usada para trazer a lista de <SelectModel> para uma entidade, sem filtros adicionais
     * @return Observable<SelectModel[]>
     */
    getListSelect(): Observable<SelectModel[]> {
        return this._http.get(`${this.route}/select`).pipe(map(resp => resp as SelectModel[]));
    }

    /**
     * Chamada rest usada para trazer <T> para uma entidade, apenas com id como filtro, porém pode ser
     * levada apenas ativos nesta lista quando ha exclusão lógica.
     * @param {number} id.
     * @return Observable<T>
     */
    get(id: number): Observable<T | any> {
        return this._http.get(this.route + '/' + id).pipe(map(resp => resp as T));
    }

    /**
     * Responsável por decidir se o recurso será persistido ou será uma alteração do existente
     * @param {any} resource.
     * @return Observable<T> com referencia do objeto persistido/alterado
     */
    save(resource: any): Observable<T | any> {
        return resource.id ? this.update(resource) : this.create(resource);
    }

    /**
     * Chamada rest usada para alterar <T>,
     * @param {any} updatedResource.
     * @return Observable<T> com referencia do objeto alterado
     */
    update(updatedResource: any): Observable<T | any> {
        return this._http.put(this.route + '/', updatedResource).pipe(map(resp => resp as T));
    }

    /**
     * Chamada rest usada para persistir <T>,
     * @param {any} newResource.
     * @return Observable<T> com referencia do objeto persistido
     */
    create(newResource: any): Observable<T | any> {
        return this._http.post(this.route + '/', newResource).pipe(map(resp => resp as T));
    }

    /**
     * Chamada rest usada para deletar <T>, passa o id do recurso como parâmetro, porém pode ser
     * usado para inativar determinado recurso(exclusao logica) ou realizar o delete real do objeto;
     * @param {any} resource.
     */
    remove(resource: any) {
        return this._http.delete(this.route, resource.id).pipe(map(resp => resp));
    }

    /**
     * Chamada rest usada para deletar <T[]>, passa a lista de ids dos recursos como parâmetro, porém podem seren
     * usados para inativar determinados recursos(exclusao logica) ou realizar o delete real dos objetos;
     * @param {number[]} listIds.
     */
    removeAll(listIds: number[]) {
        return this._http.post(this.route + '/removeAll', listIds).pipe(map(resp => resp as T[]));
    }
}
