import { Component } from '@angular/core';
import { ServiceRequestsService } from '../../services/service-requests/service-requests.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AssetService } from '../../services/asset-catalogue/asset.service';
import { MessageService } from 'primeng/api';
import { IAsset } from '../../interfaces/iasset';
import { IServiceRequest } from '../../interfaces/iservicerequest';

@Component({
    selector: 'app-update-asset-service-request',
    templateUrl: './update-asset-service-request.component.html',
    styleUrl: './update-asset-service-request.component.css'
})
export class UpdateAssetServiceRequestComponent {

    constructor(private serviceRequestService: ServiceRequestsService, private router: Router, private fb: FormBuilder, private assetService: AssetService, private messageService: MessageService, private activatedRoute: ActivatedRoute) { }

    assets!: IAsset[];
    issueTypes = ['Malfunction', 'Repair'];
    statuses = ['Open', 'Servicing', 'Rejected', 'Closed']

    form = this.fb.group({
        requestID: [0],
        employeeID: [1],
        assetID: [null, [Validators.required]],
        issueType: ['', [Validators.required]],
        requestDetails: [''],
        requestStatus: ['', [Validators.required]]
    })

    ngOnInit(): void {
        this.assetService.getAllAssets().subscribe(data => this.assets = data as IAsset[]);
        this.serviceRequestService.getServiceRequestByID(this.activatedRoute.snapshot.params['id']).subscribe((data) => {
            this.form.patchValue(data as any);
        })
    }

    updateRequest() {
        if (!this.form.valid) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all the required fields' });
            return;
        }
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Updated Successfully! Redirecting...', life: 2000 });
        // this.serviceRequestService.updateServiceRequest(this.activatedRoute.snapshot.params['id'], this.form.getRawValue()).subscribe({
        //     next: (data) => {
        //         if (data.status == 200) {
        //             this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Updated Successfully! Redirecting...', life: 2000 });
        //             setTimeout(() => this.router.navigate(['/asset-service-requests', this.activatedRoute.snapshot.params['id']]), 2000);
        //         }
        //         else {
        //             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed Updating Request!' });
        //         }
        //     },
        //     error: (err) => {
        //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed Updating Request!' });
        //     }
        // })
    }
}
