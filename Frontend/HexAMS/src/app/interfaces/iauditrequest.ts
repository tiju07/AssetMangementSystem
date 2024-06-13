import { IAsset } from "./iasset";
import { IEmployee } from "./iemployee";

export interface IAuditRequest {
    requestID: number | null;
    employeeID: number | null;
    assetID: number | null;
    requestDetails: string | null;
    requestStatus: string | null;
    asset: IAsset | null;
    employee: IEmployee | null
}



// [Key]
// public int RequestID { get; set; }

// [Required]
// public int EmployeeID { get; set; }

// [Required]
// public int AssetID { get; set; }
// public string? RequestDetails { get; set; }

// [Required]
// public string RequestStatus { get; set; }