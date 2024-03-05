import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../interfaces/icategory';
import { CategoriesService } from '../../services/categories/categories.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-view-category',
    templateUrl: './view-category.component.html',
    styleUrl: './view-category.component.css',
    providers: [ConfirmationService, MessageService]
})
export class ViewCategoryComponent implements OnInit {

    constructor(private activatedRoute: ActivatedRoute, private categoryService: CategoriesService, private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router) { }

    category!: ICategory;

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => this.category = data['data'] as ICategory);
    }

    deleteCategory() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: "none",
            rejectIcon: "none",
            rejectButtonStyleClass: "p-button-text",
            accept: () => {
                // this.categoryService.deleteCategory(this.activatedRoute.snapshot.params['categoryID']).subscribe(data => {
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
