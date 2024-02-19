using AssetManagementSystem.Models;
using System.ComponentModel.DataAnnotations;

namespace AssetManagementSystem.Dto
{
    public class AssetBorrowAndReturnRequestDto
    {
		[Key]
		public int RequestID { get; set; }

		[Required]
		public int EmployeeID { get; set; }

		[Required]
		public int AdminID { get; set; }

		[Required]
		public int AssetID { get; set; }

		[Required]
		public string AssetRequestType { get; set; }
		public DateTime? AssetAllocationFrom { get; set; }
		public DateTime? AssetAllocationTill { get; set; }

		[Required]
		public int AssetCount { get; set; }
		public string? RequestDetails { get; set; }
	}
}
