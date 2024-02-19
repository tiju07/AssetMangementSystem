using AssetManagementSystem.Models;
using System.ComponentModel.DataAnnotations;

namespace AssetManagementSystem.Dto
{
    public class AssetAllocationDetailDto
    {
		[Key]
		public int AssetAllocationID { get; set; }

		[Required]
		public int EmployeeID { get; set; }

		[Required]
		public int AssetID { get; set; }

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
