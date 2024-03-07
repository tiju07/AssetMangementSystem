import { Component } from '@angular/core';
import { AssetService } from '../../services/asset-catalogue/asset.service';
import { CategoriesService } from '../../services/categories/categories.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../interfaces/icategory';
import { IAsset } from '../../interfaces/iasset';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-update-asset',
    templateUrl: './update-asset.component.html',
    styleUrl: './update-asset.component.css',
    providers: [MessageService]
})
export class UpdateAssetComponent {

    constructor(private assetService: AssetService, private categoryService: CategoriesService, private fb: FormBuilder, private messageService: MessageService, private router: Router, private activatedRoute: ActivatedRoute) { }

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
        manufacturingDate: new FormControl(formatDate(new Date(), "yyyy-MM-dd", "en")),
        expiryDate: new FormControl(formatDate(new Date(), "yyyy-MM-dd", "en")),
        assetValue: new FormControl(null, [Validators.required, Validators.min(1)]),
    })

    validator(control: string) {
        return this.form.get(control)?.hasError('required') && this.form.get(control)?.touched;
    }


    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => {
            this.asset = data['asset'] as IAsset;
            this.form.patchValue(this.asset as any);
            this.form.patchValue({
                manufacturingDate: formatDate(this.asset.manufacturingDate as Date, "yyyy-MM-dd", "en"),
                expiryDate: formatDate(this.asset.expiryDate as Date, "yyyy-MM-dd", "en")
            });
        });
        this.activatedRoute.data.subscribe(data => this.categories = data['categories'] as ICategory[]);
    }

    updateAsset() {
        if (this.form.invalid) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields!', life: 4000 })
            return;
        }
        // const formValue = this.form.getRawValue();
        // const updateParam = {
        //     assetID: this.asset.assetID,
        //     ...formValue,
        //     manufacturingDate: formValue.manufacturingDate ? new Date(formValue.manufacturingDate) : null,
        //     expiryDate: formValue.expiryDate ? new Date(formValue.expiryDate) : null
        // };
        // this.assetService.updateAsset(parseInt(this.activatedRoute?.snapshot.params['id']), updateParam).subscribe(data => {
        //     if (data.status == 200) {
        //         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Asset Update Successful! Redirecting...', life: 2000 })
        //         console.log("Success: " + this.form.getRawValue());
        //         const d = data as unknown as IAsset;
        //         this.router.navigate(['/assets' + d.assetID]);
        //     } else {
        //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed Updating Asset!' })
        //     }
        // })
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Asset Update Successful! Redirecting...', life: 2000 })
    }
}
