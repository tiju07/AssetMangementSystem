import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { EmployeesComponent } from './employees/employees.component';
import { AssetsComponent } from './assets/assets.component';
import { AllocationDetailsComponent } from './allocation-details/allocation-details.component';
import { AssetBorrowReturnRequestsComponent } from './asset-borrow-return-requests/asset-borrow-return-requests.component';
import { AssetAuditRequestsComponent } from './asset-audit-requests/asset-audit-requests.component';
import { AssetServiceRequestsComponent } from './asset-service-requests/asset-service-requests.component';
import { ViewEmployeeComponent } from './employees/view-employee/view-employee.component';
import { DeleteEmployeeComponent } from './employees/delete-employee/delete-employee.component';
import { ViewAssetComponent } from './assets/view-asset/view-asset.component';
import { CreateAssetComponent } from './assets/create-asset/create-asset.component';
import { UpdateAssetComponent } from './assets/update-asset/update-asset.component';
import { DeleteAssetComponent } from './assets/delete-asset/delete-asset.component';
import { getAssetByIDResolver } from './services/asset-catalogue/asset.service';
import { AssetCategoriesComponent } from './asset-categories/asset-categories.component';
import { ViewCategoryComponent } from './asset-categories/view-category/view-category.component';
import { GetCategoryByIDResolver } from './services/categories/categories.service';
import { CreateCategoryComponent } from './asset-categories/create-category/create-category.component';
import { UpdateCategoryComponent } from './asset-categories/update-category/update-category.component';
import { CreateAllocationComponent } from './allocation-details/create-allocation/create-allocation.component';
import { UpdateAllocationComponent } from './allocation-details/update-allocation/update-allocation.component';
import { ViewAllocationComponent } from './allocation-details/view-allocation/view-allocation.component';
import { ViewAssetBorrowReturnRequestComponent } from './asset-borrow-return-requests/view-asset-borrow-return-request/view-asset-borrow-return-request.component';
import { CreateAssetBorrowReturnRequestComponent } from './asset-borrow-return-requests/create-asset-borrow-return-request/create-asset-borrow-return-request.component';
import { UpdateAssetBorrowReturnRequestComponent } from './asset-borrow-return-requests/update-asset-borrow-return-request/update-asset-borrow-return-request.component';
import { CreateAssetServiceRequestComponent } from './asset-service-requests/create-asset-service-request/create-asset-service-request.component';
import { UpdateAssetServiceRequestComponent } from './asset-service-requests/update-asset-service-request/update-asset-service-request.component';
import { ViewAssetServiceRequestComponent } from './asset-service-requests/view-asset-service-request/view-asset-service-request.component';
import { ViewAssetAuditRequestComponent } from './asset-audit-requests/view-asset-audit-request/view-asset-audit-request.component';
import { CreateAuditRequestComponent } from './asset-audit-requests/create-audit-request/create-audit-request.component';
import { UpdateAuditRequestComponent } from './asset-audit-requests/update-audit-request/update-audit-request.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'employees', component: EmployeesComponent },
    { path: 'employees/view/:id', component: ViewEmployeeComponent },
    { path: 'employees/delete/:id', component: DeleteEmployeeComponent },
    { path: 'assets', component: AssetsComponent },
    { path: 'assets/view/:id', component: ViewAssetComponent, resolve: { data: getAssetByIDResolver }, },
    { path: 'assets/add', component: CreateAssetComponent },
    { path: 'assets/update/:id', component: UpdateAssetComponent },
    { path: 'assets/delete/:id', component: DeleteAssetComponent, resolve: { data: getAssetByIDResolver }, },
    { path: 'asset-categories', component: AssetCategoriesComponent },
    { path: 'asset-categories/view/:id', component: ViewCategoryComponent, resolve: { data: GetCategoryByIDResolver }, },
    { path: 'asset-categories/add', component: CreateCategoryComponent },
    { path: 'asset-categories/update/:id', component: UpdateCategoryComponent },
    { path: 'allocation-details', component: AllocationDetailsComponent },
    { path: 'allocation-details/view/:id', component: ViewAllocationComponent },
    { path: 'allocation-details/add', component: CreateAllocationComponent },
    { path: 'allocation-details/update/:id', component: UpdateAllocationComponent },
    { path: 'asset-borrow-return-requests', component: AssetBorrowReturnRequestsComponent },
    { path: 'asset-borrow-return-requests/view/:id', component: ViewAssetBorrowReturnRequestComponent },
    { path: 'asset-borrow-return-requests/add', component: CreateAssetBorrowReturnRequestComponent },
    { path: 'asset-borrow-return-requests/update/:id', component: UpdateAssetBorrowReturnRequestComponent },
    { path: 'asset-audit-requests', component: AssetAuditRequestsComponent },
    { path: 'asset-audit-requests/view/:id', component: ViewAssetAuditRequestComponent },
    { path: 'asset-audit-requests/add', component: CreateAuditRequestComponent },
    { path: 'asset-audit-requests/update/:id', component: UpdateAuditRequestComponent },
    { path: 'asset-service-requests', component: AssetServiceRequestsComponent },
    { path: 'asset-service-requests/view/:id', component: ViewAssetServiceRequestComponent },
    { path: 'asset-service-requests/add', component: CreateAssetServiceRequestComponent },
    { path: 'asset-service-requests/update/:id', component: UpdateAssetServiceRequestComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
