import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IServiceRequest } from '../interfaces/iservicerequest';
import { Column } from '../interfaces/column';
import { ServiceRequestsService } from '../services/service-requests/service-requests.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtDecryptorService } from '../helpers/jwt-decryptor.service';

@Component({
    selector: 'app-asset-service-requests',
    templateUrl: './asset-service-requests.component.html',
    styleUrl: './asset-service-requests.component.css'
})
export class AssetServiceRequestsComponent implements OnInit {

    constructor(private serviceRequestService: ServiceRequestsService, private router: Router, private activatedRoute: ActivatedRoute, private jwtService: JwtDecryptorService) { }

    cols!: Column[];
    requests!: IServiceRequest[];
    selectedRequest!: IServiceRequest;
    isAdmin = false;

    ngOnInit(): void {
        if (this.jwtService.getRole() == 'Admin') this.isAdmin = true;
        this.cols = [
            { field: 'requestID', header: 'Request ID' },
            { field: 'employee', header: 'Employee' },
            { field: 'asset', header: 'Asset' },
            { field: 'issueType', header: 'Issue Type' },
            { field: 'requestDetails', header: 'Request Details' },
            { field: 'requestStatus', header: 'Request Status' }
        ]
        this.activatedRoute.data.subscribe((data) => {
            this.requests = data['requests'] as IServiceRequest[];
        })
    }

    onRowSelect() {
        this.router.navigate(['/asset-service-requests', 'view', this.selectedRequest.requestID]);
    }

    getStyleClass(status: string, field: string) {
        if (field == 'requestID') return 'id-col';
        else if (field == 'requestStatus') {
            if (status == 'Open') return 'open';
            if (status == 'Servicing') return 'servicing';
            if (status == 'Rejected') return 'rejected';
            if (status == 'Closed') return 'closed';
        }
        return ''
    }
}
