import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AllocationDetailsService } from "../../services/allocation-details/allocation-details.service";
import { inject } from "@angular/core";
import { catchError, map, of } from "rxjs";

export const GetAllAllocationDetails = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AllocationDetailsService).getAllAllocationDetails();
}
export const GetAllocationDetailsByID = (router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AllocationDetailsService).getAllocationDetailByID(router.params['id']).pipe(
        map(res => res),
        catchError(err => of({ error: err })
        ));
}