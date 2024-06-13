import { Component, OnInit } from '@angular/core';
import { AuditRequestsService } from '../services/audit-requests/audit-requests.service';
import { IAuditRequest } from '../interfaces/iauditrequest';
import { Column } from '../interfaces/column';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-asset-audit-requests',
    templateUrl: './asset-audit-requests.component.html',
    styleUrl: './asset-audit-requests.component.css'
})
export class AssetAuditRequestsComponent implements OnInit {
    constructor(private auditRequestService: AuditRequestsService, private router: Router, private activatedRoute: ActivatedRoute) { }

    requests!: IAuditRequest[];
    cols!: Column[];
    selectedRequest!: IAuditRequest;

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((data) => {
            this.requests = data['requests'] as IAuditRequest[];
        });
        this.cols = [
            { field: 'requestID', header: 'Request ID' },
            { field: 'employee', header: 'Employee' },
            { field: 'asset', header: 'Asset' },
            { field: 'requestDetails', header: 'Request Details' },
            { field: 'requestStatus', header: 'Request Status' }
        ]
    }

    onRowSelect() {
        this.router.navigate(['/asset-audit-requests', 'view', this.selectedRequest.requestID]);
    }

    getStyleClass(status: string, field: string) {
        if (field == 'requestID') return 'id-col'

        else if (field == 'requestStatus') {
            if (status == 'Open') return 'open';
            if (status == 'Verified') return 'verified';
            if (status == 'Pending') return 'pending';
            if (status == 'Rejected') return 'rejected';
        }
        return ''
    }
}
