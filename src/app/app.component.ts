import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
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
        {headerName: 'Device ID', field: '_id',aggFunc: 'count'},
        {headerName: 'Device name', field: 'name' },
        
        
        // Team INFORMATION
        {field: 'team._id',enableRowGroup: true, enablePivot:true},
        {field: 'team.name',enableRowGroup: true, enablePivot:true},
        {field: 'team.solution',enableRowGroup: true, enablePivot:true},
        {field: 'team.status',enableRowGroup: true, enablePivot:true, filter: 'agSetColumnFilter'},
        {field: 'team.maxDevices',enableRowGroup: true, enablePivot:true, filter: 'agNumberColumnFilter'},
        {field: 'team.maxUsers',enableRowGroup: true, enablePivot:true, filter: 'agNumberCfolumnFilter'},
        {field: 'team.level',enableRowGroup: true, enablePivot:true},


        
        {
            field: 'team.createdAt',
            enableRowGroup: true, 
            enablePivot:true,
            cellRenderer: (data) => {
                return data.value ? (new Date(data.value)).toLocaleDateString() : '';
            },
            sortable:true,
            filter: 'agDateColumnFilter'
        },
        {
            field: 'team.updatedAt',
            enableRowGroup: true,
            enablePivot:true,
            cellRenderer: (data) => {
                return data.value ? (new Date(data.value)).toLocaleDateString() : '';
            },
            sortable:true,
            filter: 'agDateColumnFilter'
        },

        
        
        {
            headerName: 'Device createdAt',
            field: 'createdAt',
            cellRenderer: (data) => {
                return data.value ? (new Date(data.value)).toLocaleDateString() : '';
            },
            sortable:true,
            filter: 'agDateColumnFilter'
        },
        
        {
            headerName: 'Device updatedAt',
            field: 'updatedAt',
            cellRenderer: (data) => {
                return data.value ? (new Date(data.value)).toLocaleDateString() : '';
            },
            sortable:true,
            filter: 'agDateColumnFilter'
        },



        {headerName: "Device status", field: 'status',enableRowGroup:true, enablePivot:true},
        {headerName: 'Device Type',field: 'type',enableRowGroup:true,enablePivot:true},

    ]


    rowData : any
    constructor(private http: HttpClient) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Basic ' + btoa('61c302c2d7af0d00112681a3:ten9rs4mj1go6h8tjt4')
            }),
            params : {
                limit : 5000,
                status : "all"
            }
          };
        this.http.get<any>('https://report.iotfactory.eu/api/alldevices', httpOptions).subscribe(devices=>{
            const data = devices.data
            console.log("Total import : " + data.length)
            for (var device of data){            
                device.createdAt = new Date(device.createdAt).getTime()
                device.updatedAt = new Date(device.updatedAt).getTime()
                device.team.createdAt = new Date(device.team.createdAt).getTime()
                device.team.updatedAt = new Date(device.team.updatedAt).getTime()
            };
            
            this.rowData = data
        })

        //this.rowData = this.http.get<any[]>('http://localhost:8081/devices')
    }

    clearFilters(){
        console.log("Clear Filters pressed")
    }

    // onGridReady(params) {
    //     this.gridApi = params.api
    //     this.gridColumnApi = params.columnApi
    // }
}
 