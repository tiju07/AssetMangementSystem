using AssetManagementSystem.Models;
using AssetManagementSystem.ViewModels;
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
        public string RequestStatus { get; set; }
		public EmployeeAdminViewModel? Employee { get; set; }
		public AssetDto? Asset { get; set; }
    }
}
