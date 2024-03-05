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
}


// [Key]
// public int RequestID { get; set; }

// [Required]
// public int EmployeeID { get; set; }

// [Required]
// public int AdminID { get; set; }

// [Required]
// public int AssetID { get; set; }

// [Required]
// public string AssetRequestType { get; set; }
// public DateTime? AssetAllocationFrom { get; set; }
// public DateTime? AssetAllocationTill { get; set; }

// [Required]
// public int AssetCount { get; set; }
// public string? RequestDetails { get; set; }