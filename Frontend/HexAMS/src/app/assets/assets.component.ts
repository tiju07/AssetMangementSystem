import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AssetService } from '../services/asset-catalogue/asset.service';
import { IAsset } from '../interfaces/iasset';
import { Observable, map, startWith } from 'rxjs';
import { CategoriesService } from '../services/categories/categories.service';
import { ICategory } from '../interfaces/icategory';


@Component({
    selector: 'app-assets',
    templateUrl: './assets.component.html',
    styleUrl: './assets.component.css'
})
export class AssetsComponent {

    constructor(private assetService: AssetService, private categoryService: CategoriesService) { }

    searchControl = new FormControl('');
    filterControl = new FormGroup({
        categoryID: new FormControl('')
    })

    assets!: any[];
    assetData: any[] = [];
    filteredAssets!: IAsset[];
    filteredAssetData!: Observable<string[]>;

    categories!: ICategory[];

    ngOnInit(): void {
        this.assetService.getAllAssets().subscribe(data => this.assets = data);
        this.assetService.getAllAssets().subscribe(data => data.forEach((d: IAsset) => this.assetData.push(d.assetName)));
        this.categoryService.getAllCategories().subscribe(data => this.categories = data as ICategory[]);
        this.filteredAssetData = this.searchControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
        )


    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        console.log(filterValue);
        return this.assetData.filter(option => option.toLowerCase().includes(filterValue));
    }

    search() {
        var searchQuery = this.searchControl?.value || undefined;
        var filter = this.filterControl.value.categoryID || undefined;
        if (isNaN(filter as any) == true) {
            filter = "";
        }
        console.log(`Search Query: ${searchQuery}, Filter: ${filter}`);
        console.log(this.categories);
        this.assetService.getAllAssets(searchQuery, filter).subscribe(data => this.assets = data);
    }
}
