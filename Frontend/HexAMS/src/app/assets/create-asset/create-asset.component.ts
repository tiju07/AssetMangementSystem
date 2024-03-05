import { Component } from '@angular/core';
import { AssetService } from '../../services/asset-catalogue/asset.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ICategory } from '../../interfaces/icategory';
import { CategoriesService } from '../../services/categories/categories.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { IAsset } from '../../interfaces/iasset';

@Component({
    selector: 'app-create-asset',
    templateUrl: './create-asset.component.html',
    styleUrl: './create-asset.component.css',
    providers: [MessageService]
})
export class CreateAssetComponent {

    constructor(private assetService: AssetService, private categoryService: CategoriesService, private fb: FormBuilder, private messageService: MessageService, private router: Router) { }

    categories!: ICategory[]


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
        this.categoryService.getAllCategories().subscribe(data => this.categories = data as ICategory[]);
        console.log(this.categories);
    }

    createAsset() {
        if (!this.form.valid) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields!', life: 4000 });

            return
        }
        // this.assetService.createAsset({ assetID: 0, ...this.form.getRawValue() }).subscribe(data => {
        //     if (data.status == 201) {
        //         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Asset Creation Successful! Redirecting...', life: 2000 });
        //         console.log("Success: " + this.form.getRawValue());
        //         const d = data as unknown as IAsset;
        //         this.router.navigate(['/assets' + d.assetID]);
        //     }
        //     else {
        //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed Creating Asset!' });
        //     }
        // });

    }
}
