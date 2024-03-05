import { Component, OnInit } from '@angular/core';
import { IServiceRequest } from '../../interfaces/iservicerequest';
import { ServiceRequestsService } from '../../services/service-requests/service-requests.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-view-asset-service-request',
    templateUrl: './view-asset-service-request.component.html',
    styleUrl: './view-asset-service-request.component.css'
})
export class ViewAssetServiceRequestComponent implements OnInit {

    constructor(private serviceRequestService: ServiceRequestsService, private activatedRoute: ActivatedRoute) { }
    request!: IServiceRequest;

    ngOnInit(): void {
        this.serviceRequestService.getServiceRequestByID(this.activatedRoute.snapshot.params['id']).subscribe((data) => {
            this.request = data as IServiceRequest;
        })
    }
}
