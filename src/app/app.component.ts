import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    defaultColDef: ColDef = {
        sortable: true,
        filter: true
    };

    

    columnDefs: ColDef[] = [
        {field: 'name'},
        {field: 'solution',rowGroup:true},
        {field: 'createdAt',
            cellRenderer: (data) => {
                return data.value ? (new Date(data.value)).toLocaleDateString() : '';
            },
            sortable:true
        },
        {field: 'status', rowGroup:true},
        {field: 'maxDevices', filter: 'agNumberColumnFilter'}

    ]


    // autoGroupColumnDef: ColDef = {
    //     headerName: 'Name',
    //     field: 'name',
    //     cellRenderer: 'agGroupCellRenderer',
    //     cellRendererParams: {
    //         checkbox: true
    //     }
    // };
    rowData: Observable<any[]>;

    constructor(private http: HttpClient) {
        this.rowData = this.http.get<any[]>('http://localhost:8081/');
    }
}
