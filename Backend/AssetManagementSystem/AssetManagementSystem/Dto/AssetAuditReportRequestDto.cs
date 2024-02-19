using AssetManagementSystem.Models;
using System.ComponentModel.DataAnnotations;

namespace AssetManagementSystem.Dto
{
    public class AssetAuditReportRequestDto
    {
		[Key]
		public int RequestID { get; set; }

		[Required]
		public int EmployeeID { get; set; }

		[Required]
		public int AssetID { get; set; }
		public string? RequestDetails { get; set; }

		[Required]
		public string RequestStatus { get; set; }
	}
}
