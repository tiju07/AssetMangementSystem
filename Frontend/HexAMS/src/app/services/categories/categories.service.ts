import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ICategory } from '../../interfaces/icategory';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    constructor(private http: HttpClient) { }

    getAllCategories() {
        return this.http.get<ICategory[]>('http://localhost:7234/api/v1/Categories', { withCredentials: true })
    }

    getCategoryByID(id: number) {
        return this.http.get<ICategory>('http://localhost:7234/api/v1/Categories/' + id, { withCredentials: true })
    }

    createCategory(category: ICategory) {
        return this.http.post<any>('http://localhost:7234/api/v1/Categories', category, { withCredentials: true, observe: 'response' })
    }

    updateCategory(id: number, category: ICategory) {
        return this.http.put<any>('http://localhost:7234/api/v1/Categories/' + id, category, { withCredentials: true, observe: 'response' })
    }

    deleteCategory(id: number) {
        return this.http.delete<any>('http://localhost:7234/api/v1/Categories/' + id, { withCredentials: true, observe: 'response' })
    }
}

export const GetCategoryByIDResolver =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
        inject(CategoriesService).getCategoryByID(route.params['id']);
