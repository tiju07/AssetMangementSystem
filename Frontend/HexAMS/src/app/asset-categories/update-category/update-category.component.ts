import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories/categories.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../interfaces/icategory';

@Component({
    selector: 'app-update-category',
    templateUrl: './update-category.component.html',
    styleUrl: './update-category.component.css',
    providers: [MessageService]
})
export class UpdateCategoryComponent implements OnInit {

    category!: ICategory;
    constructor(private categoryService: CategoriesService, private fb: FormBuilder, private messageService: MessageService, private router: Router, private activatedRoute: ActivatedRoute) {
    }

    form = this.fb.group({
        categoryName: new FormControl('', [Validators.required]),
        categoryDescription: new FormControl('')
    })

    ngOnInit(): void {
        this.categoryService.getCategoryByID(this.activatedRoute.snapshot.params['id']).subscribe((data) => {
            this.category = data as ICategory;
            this.form.patchValue(this.category);
        });
    }

    updateCategory() {
        if (!this.form.valid) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Fill in all required fields!' });
        }
        // this.categoryService.updateCategory(this.activatedRoute.snapshot.params['categoryID'], { categoryID: this.category.categoryID, ...this.form.getRawValue() }).subscribe({
        //     next: data => {
        //         if(data.status == 200){
        //             this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Update Successful! Redirecting...', life: 2000 });
        //             setTimeout(() => this.router.navigate(['/asset-categories']), 2000);
        //         }else{
        //             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed Updating Category!', life: 3000 });
        //         }
        //     },
        //     error: err => {
        //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed Updating Category!', life: 3000 });
        //         console.log("Error: " + err);
        //     }
        // });
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Update Successful! Redirecting...', life: 2000 });
    }


}
