using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AssetManagementSystem.Models
{
    public class AssetAllocationDetail
    {
        [Key]
        public int AssetAllocationID { get; set; }
        
        [Required]
        public int EmployeeID { get; set; }
        public Employee Employee { get; set; }
        
        [Required]
        public int AssetID { get; set; }
        public Asset Asset { get; set; }

        [Required]
        public int AssetCount { get; set; }
        public string? AllocationDetails { get; set; }
        
        [Required]
        public DateTime AssetAllocatedFrom { get; set; }

		[Required]
		public DateTime? AssetAllocatedTill { get; set; }

        [Required]
        public string? AllocationStatus { get; set; }
    }
}
