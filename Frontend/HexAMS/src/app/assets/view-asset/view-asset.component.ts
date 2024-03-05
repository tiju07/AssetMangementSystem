import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAsset } from '../../interfaces/iasset';
import { AssetService } from '../../services/asset-catalogue/asset.service';

@Component({
    selector: 'app-view-asset',
    templateUrl: './view-asset.component.html',
    styleUrl: './view-asset.component.css'
})
export class ViewAssetComponent implements OnInit {

    constructor(private assetService: AssetService, private activatedRoute: ActivatedRoute) { }

    assetID!: string | null;
    asset!: IAsset;
    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => this.asset = data['data'] as IAsset);
    }
}
