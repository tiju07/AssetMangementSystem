import { Component, OnInit } from '@angular/core';
import { ServiceRequestsService } from '../../services/service-requests/service-requests.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { IAsset } from '../../interfaces/iasset';
import { AssetService } from '../../services/asset-catalogue/asset.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-create-asset-service-request',
    templateUrl: './create-asset-service-request.component.html',
    styleUrl: './create-asset-service-request.component.css'
})
export class CreateAssetServiceRequestComponent implements OnInit {
    constructor(private serviceRequestService: ServiceRequestsService, private router: Router, private fb: FormBuilder, private assetService: AssetService, private messageService: MessageService) { }

    assets!: IAsset[];
    issueTypes = ['Malfunction', 'Repair'];

    form = this.fb.group({
        requestID: [0],
        employeeID: [1],
        assetID: [null, [Validators.required]],
        issueType: ['', [Validators.required]],
        requestDetails: [''],
        requestStatus: ['Open']
    })

    ngOnInit(): void {
        this.assetService.getAllAssets().subscribe(data => this.assets = data as IAsset[]);
    }

    createRequest() {
        if (!this.form.valid) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all the required fields' });
            return;
        }
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Createed Successfully! Redirecting...', life: 2000 });
        // this.serviceRequestService.createServiceRequest(this.form.getRawValue()).subscribe({
        //     next: data => {
        //         if (data.status == 201) {
        //             this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Created Successfully! Redirecting...', life: 2000 });
        //             setTimeout(() => this.router.navigate(['/asset-service-requests']), 2000);
        //         } else {
        //             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed Creating Request!' });
        //         }
        //     },
        //     error: err => {
        //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed Creating Request!' });
        //     }
        // });
    }
}
