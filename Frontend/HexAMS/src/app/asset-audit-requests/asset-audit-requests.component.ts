import { Component, OnInit } from '@angular/core';
import { AuditRequestsService } from '../services/audit-requests/audit-requests.service';
import { IAuditRequest } from '../interfaces/iauditrequest';
import { Column } from '../interfaces/column';
import { Router } from '@angular/router';

@Component({
    selector: 'app-asset-audit-requests',
    templateUrl: './asset-audit-requests.component.html',
    styleUrl: './asset-audit-requests.component.css'
})
export class AssetAuditRequestsComponent implements OnInit {
    constructor(private auditRequestService: AuditRequestsService, private router: Router) { }

    requests!: IAuditRequest[];
    cols!: Column[];
    selectedRequest!: IAuditRequest;

    ngOnInit(): void {
        this.auditRequestService.getAllAuditRequests().subscribe((data) => {
            this.requests = data as IAuditRequest[];
        })
        this.cols = [
            { field: 'requestID', header: 'Request ID' },
            { field: 'employeeID', header: 'Employee ID' },
            { field: 'assetID', header: 'Asset ID' },
            { field: 'requestDetails', header: 'Request Details' },
            { field: 'requestStatus', header: 'Request Status' }
        ]
    }

    onRowSelect() {
        this.router.navigate(['/asset-audit-requests', 'view', this.selectedRequest.requestID]);
    }
}
