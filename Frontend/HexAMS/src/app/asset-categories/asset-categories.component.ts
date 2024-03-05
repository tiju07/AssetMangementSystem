import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories/categories.service';
import { ICategory } from '../interfaces/icategory';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'app-asset-categories',
    templateUrl: './asset-categories.component.html',
    styleUrl: './asset-categories.component.css',
    providers: [ConfirmationService, MessageService]
})
export class AssetCategoriesComponent implements OnInit {

    constructor(private categoryService: CategoriesService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService,) { }

    cols!: Column[];
    categories!: ICategory[];
    selectedCategory!: ICategory;

    ngOnInit() {
        this.categoryService.getAllCategories().subscribe(data => this.categories = data as any as ICategory[]);
        this.cols = [
            { field: 'categoryID', header: 'Category ID' },
            { field: 'categoryName', header: 'Category Name' },
            { field: 'categoryDescription', header: 'Description' }
        ];
    }

    onRowSelect() {
        this.router.navigate(['/asset-categories', 'view', this.selectedCategory.categoryID]);
    }

    deleteCategory(id: number) {
        console.log("Clicked!: " + id);
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: "none",
            rejectIcon: "none",
            rejectButtonStyleClass: "p-button-text",
            accept: () => {
                this.messageService.add({ severity: 'success', key: 'success', summary: 'Successful', detail: 'Category Deleted Successfully! Redirecting...', life: 2000 });
                // this.categoryService.deleteCategory(id).subscribe(data => {
                //     if (data.status == 200) {
                //         this.messageService.add({ severity: 'success', key: 'success', summary: 'Successful', detail: 'Category Deleted Successfully! Redirecting...', life: 2000 });
                //         setTimeout(() => this.router.navigate(['/asset-categories']), 2000);
                //     } else {
                //         this.messageService.add({ severity: 'error', key: 'error', summary: 'Error', detail: 'Error Deleting Category!', life: 3000 });
                //     }
                // });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', key: 'error', summary: 'Error', detail: 'Category Deletion Cancelled!', life: 3000 });
            }
        });
    }

}
