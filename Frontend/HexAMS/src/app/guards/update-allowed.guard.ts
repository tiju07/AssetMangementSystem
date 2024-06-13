import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BorrowReturnRequestsService } from '../services/borrow-return-requests/borrow-return-requests.service';
import { MessageService } from 'primeng/api';
import { ServiceRequestsService } from '../services/service-requests/service-requests.service';
import { AuditRequestsService } from '../services/audit-requests/audit-requests.service';

export const updateAllowedGuard: CanActivateFn = (route, state) => {
  const borrowReturnRequestService = inject(BorrowReturnRequestsService);
  const serviceRequestService = inject(ServiceRequestsService);
  const auditRequestService = inject(AuditRequestsService);
  const messageService = inject(MessageService);
  const router = inject(Router);
  if(state.url.includes('borrow')) {
    borrowReturnRequestService.getBorrowReturnRequestByID(route.params['id']).subscribe({
      next: data => {
        if(data.body?.requestStatus != "Rejected" && data.body?.requestStatus != "Closed") {
          return true;
        }
        return false;
    }});
    router.navigate(['/asset-borrow-return-requests', 'view', route.params['id']]);
    messageService.add({ key: 'error', severity: 'error', summary: 'Error', detail: 'The request cannot be updated!' });
  }
  else if (state.url.includes('service')){
    serviceRequestService.getServiceRequestByID(route.params['id']).subscribe({
      next: data => {
        console.log(data);
        if(data.body?.requestStatus != "Rejected" && data.body?.requestStatus != "Closed") {
          return true;
        }
        return false;
    }});
    router.navigate(['/asset-service-requests', 'view', route.params['id']]);
    messageService.add({ key: 'error', severity: 'error', summary: 'Error', detail: 'The request cannot be updated!' });
  }
  else if (state.url.includes('audit')){
    auditRequestService.getAuditRequestByID(route.params['id']).subscribe({
      next: data => {
        if(data.body?.requestStatus != "Rejected" && data.body?.requestStatus != "Closed") {
          return true;
        }
        return false;
    }});
    router.navigate(['/asset-audit-requests', 'view', route.params['id']]);
    messageService.add({ key: 'error', severity: 'error', summary: 'Error', detail: 'The request cannot be updated!' });
  }
  return false;
};
