import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IAsset } from '../../interfaces/iasset';
import { filter } from 'rxjs';
import { ActivatedRouteSnapshot, ResolveData, ResolveFn, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AssetService {

    constructor(private http: HttpClient) { }

    getAllAssets(searchQuery: string = '', categoryFilter: string = '') {
        console.log(`Search Query: ${searchQuery == undefined ? '' : searchQuery}, Category Filter: ${categoryFilter == undefined ? '' : categoryFilter}`);
        return this.http.get<IAsset[]>('http://localhost:7234/api/v1/Assets?searchQuery=' + searchQuery + '&categoryFilter=' + categoryFilter, { withCredentials: true })
    }

    getAssetByID(id: number) {
        return this.http.get<IAsset>('http://localhost:7234/api/v1/Assets/' + id, { withCredentials: true })
    }

    createAsset(asset: IAsset) {
        return this.http.post<HttpResponse<IAsset | any>>('http://localhost:7234/api/v1/Assets', asset, { withCredentials: true, observe: 'response' })
    }

    updateAsset(id: number, asset: IAsset) {
        return this.http.put<HttpResponse<IAsset | any>>('http://localhost:7234/api/v1/Assets/' + id, asset, { withCredentials: true, observe: 'response' })
    }

    deleteAsset(id: number) {
        return this.http.delete<HttpResponse<IAsset | any>>('http://localhost:7234/api/v1/Assets/' + id, { withCredentials: true, observe: 'response' })
    }
}

export const getAssetByIDResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AssetService).getAssetByID(route.params['id']);
