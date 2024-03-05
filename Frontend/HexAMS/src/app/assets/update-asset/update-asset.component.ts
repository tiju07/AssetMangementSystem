import { Component } from '@angular/core';
import { AssetService } from '../../services/asset-catalogue/asset.service';
import { CategoriesService } from '../../services/categories/categories.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../interfaces/icategory';
import { IAsset } from '../../interfaces/iasset';

@Component({
    selector: 'app-update-asset',
    templateUrl: './update-asset.component.html',
    styleUrl: './update-asset.component.css',
    providers: [MessageService]
})
export class UpdateAssetComponent {

    constructor(private assetService: AssetService, private categoryService: CategoriesService, private fb: FormBuilder, private messageService: MessageService, private router: Router, private route: ActivatedRoute) { }

    categories!: ICategory[]
    asset!: IAsset;

    form = this.fb.group({
        assetName: new FormControl('', [Validators.required]),
        assetCategoryID: new FormControl(null, [Validators.required]),
        assetModel: new FormControl(''),
        assetSpecifications: new FormControl(''),
        assetImage: new FormControl('', [Validators.required]),
        assetDescription: new FormControl(''),
        assetStatus: new FormControl('', [Validators.required]),
        manufacturingDate: new FormControl(null),
        expiryDate: new FormControl(null),
        assetValue: new FormControl(null, [Validators.required, Validators.min(1)]),
    })

    validator(control: string) {
        return this.form.get(control)?.hasError('required') && this.form.get(control)?.touched;
    }


    ngOnInit(): void {
        this.assetService.getAssetByID(parseInt(this.route.snapshot.params['id'])).subscribe(data => {
            this.asset = data as IAsset;
            this.form.patchValue(this.asset as any);
        });
        this.categoryService.getAllCategories().subscribe(data => this.categories = data as ICategory[]);
        console.log(this.asset);
    }

    updateAsset() {
        if (this.form.invalid) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields!', life: 4000 })
            return;
        }
        this.assetService.updateAsset(parseInt(this.route?.snapshot.params['id']), {assetID:this.asset.assetID, ...this.form.getRawValue()}).subscribe(data => {
            if (data.status == 200) {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Asset Update Successful! Redirecting...', life: 2000 })
                console.log("Success: " + this.form.getRawValue());
                const d = data as unknown as IAsset;
                this.router.navigate(['/assets' + d.assetID]);
            } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed Updating Asset!' })
            }
        })
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Asset Update Successful! Redirecting...', life: 2000 })
    }
}
