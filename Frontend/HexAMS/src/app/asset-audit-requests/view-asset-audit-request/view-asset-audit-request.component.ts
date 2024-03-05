import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuditRequestsService } from '../../services/audit-requests/audit-requests.service';
import { IAuditRequest } from '../../interfaces/iauditrequest';

@Component({
    selector: 'app-view-asset-audit-request',
    templateUrl: './view-asset-audit-request.component.html',
    styleUrl: './view-asset-audit-request.component.css'
})
export class ViewAssetAuditRequestComponent implements OnInit {

    constructor(private auditRequestService: AuditRequestsService, private activatedRoute: ActivatedRoute) { }

    request!: IAuditRequest;

    ngOnInit(): void {
        this.auditRequestService.getAuditRequestByID(this.activatedRoute.snapshot.params['id']).subscribe((data) => {
            this.request = data as IAuditRequest;
        })
    }
}
