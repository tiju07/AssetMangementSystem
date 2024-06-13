using AssetManagementSystem.Models;
using AssetManagementSystem.ViewModels;
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
		public EmployeeAdminViewModel Employee {  get; set; }
		public AssetDto Asset { get; set; }
	}
}
