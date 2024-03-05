import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IServiceRequest } from '../interfaces/iservicerequest';
import { Column } from '../interfaces/column';
import { ServiceRequestsService } from '../services/service-requests/service-requests.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-asset-service-requests',
    templateUrl: './asset-service-requests.component.html',
    styleUrl: './asset-service-requests.component.css'
})
export class AssetServiceRequestsComponent implements OnInit {

    constructor(private serviceRequestService: ServiceRequestsService, private router: Router) { }

    // issueTypes = ['Malfunction', 'Repair'];
    // statuses = ['Open', 'Closed', 'Servicing', 'Rejected'];
    cols!: Column[];
    requests!: IServiceRequest[];
    selectedRequest!: IServiceRequest;

    ngOnInit(): void {
        this.cols = [
            { field: 'requestID', header: 'Request ID' },
            { field: 'employeeID', header: 'Employee ID' },
            { field: 'assetID', header: 'Asset ID' },
            { field: 'issueType', header: 'Issue Type' },
            { field: 'requestDetails', header: 'Request Details' },
            { field: 'requestStatus', header: 'Request Status' }
        ]
        this.serviceRequestService.getAllServiceRequests().subscribe((data) => {
            this.requests = data as IServiceRequest[];
        })
    }

    onRowSelect() {
        this.router.navigate(['/asset-service-requests', 'view', this.selectedRequest.requestID]);
    }
}
