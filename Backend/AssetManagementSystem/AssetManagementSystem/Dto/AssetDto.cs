using AssetManagementSystem.Models;
using System.ComponentModel.DataAnnotations;

namespace AssetManagementSystem.Dto
{
    public class AssetDto
    {
		[Key]
		public int AssetID { get; set; }
		[Required]
		public string AssetName { get; set; }
		[Required]
		public int AssetCategoryID { get; set; }
		public string? AssetModel { get; set; }
		public string? AssetSpecifications { get; set; }
		public string? AssetImage { get; set; }
		public string? AssetDescription { get; set; }
		[Required]
		public string AssetStatus { get; set; }
		public DateTime? ManufacturingDate { get; set; }
		public DateTime? ExpiryDate { get; set; }
		public decimal? AssetValue { get; set; }
	}
}
