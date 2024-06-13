import { IAsset } from "./iasset";
import { IEmployee } from "./iemployee";

export interface IBorrowReturnRequest {
    requestID: number | null;
    employeeID: number | null;
    adminID: number | null;
    assetID: number | null;
    assetRequestType: string | null;
    assetAllocationFrom: Date | null;
    assetAllocationTill: Date | null;
    assetCount: number | null;
    requestDetails: string | null;
    requestStatus: string | null;
    employee: IEmployee | null;
    asset: IAsset | null;
}