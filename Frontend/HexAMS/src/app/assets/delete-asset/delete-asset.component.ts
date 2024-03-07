import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetService } from '../../services/asset-catalogue/asset.service';
import { IAsset } from '../../interfaces/iasset';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';

@Component({
    selector: 'app-delete-asset',
    templateUrl: './delete-asset.component.html',
    styleUrl: './delete-asset.component.css',
    providers: [MessageService]
})
export class DeleteAssetComponent {

    constructor(private assetService: AssetService, private activatedRoute: ActivatedRoute, private messageService: MessageService, private router: Router, private location: Location) {
    }

    assetID!: string | null;
    asset!: IAsset;
    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => this.asset = data['data'] as IAsset);
        console.log("Asset: " + JSON.stringify(this.asset));
    }

    deleteAsset() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Asset Deleted Successfully! Redirecting...' });
        // this.assetService.deleteAsset(this.assetID).subscribe({
        //     next: data => {
        //         if (data.status == 200) {
        //             this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Asset Deleted Successfully! Redirecting...' });
        //             setTimeout(() => (this.router.navigate(['/assets'])), 2000);
        //         }
        //         else {
        //             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed Deleting Asset!' });
        //         }
        //     },
        //     error: err => {
        //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed Deleting Asset!' });
        //         console.log("Error: " + err);
        //     }
        // });
    }
    cancel() {
        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Asset Deletion Cancelled! Redirecting...' });
        setTimeout(() => (this.location.back()), 2000);
    }
}