using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AssetManagementSystem.Models
{
    public class AssetBorrowAndReturnRequest
    {
        [Key]
        public int RequestID { get; set; }

        [Required]
        public int EmployeeID { get; set; }
        public Employee Employee { get; set; }

        [Required]
        public int AdminID { get; set; }
        public Admin Admin { get; set; }

        [Required]
        public int AssetID { get; set; }
        public Asset Asset { get; set; }

        [Required]
        public string AssetRequestType { get; set; }
        public DateTime? AssetAllocationFrom { get; set; }
        public DateTime? AssetAllocationTill { get; set; }

        [Required]
        public int AssetCount { get; set; }
        public string? RequestDetails { get; set; }
    }
}
