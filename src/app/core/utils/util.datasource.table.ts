import {MatPaginator, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {Observable, of} from 'rxjs';

export class UtilDatasourceTable<T> extends DataSource<any>{
    private _columns: string[];
    private _dataSource = new MatTableDataSource();
    private _paginator: MatPaginator;
    private _list: T[] = [];
    private data: any;

    constructor(columns: string[], paginator: MatPaginator) {
        super();
        this._columns = columns;
        this._paginator = paginator;
        this._dataSource.paginator = paginator;
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]> {
        const rows = [];
        this.dataSource.data.forEach(element => rows.push(element, { detailRow: true, element }));
        return of(rows);
    }

    disconnect() { }

    get columns(): string[] {
        return this._columns;
    }

    get dataSource(): MatTableDataSource<any> {
        return this._dataSource;
    }

    setData(list: any): void {
        this._list = list;
        this._dataSource.data = list;
    }

    push(item: any): void {
        this._list.push(item);
        this.setData(this._list);
    }

    get list(): T[] {
        return this._list;
    }

    get size(): number {
        return this._list.length;
    }
}
