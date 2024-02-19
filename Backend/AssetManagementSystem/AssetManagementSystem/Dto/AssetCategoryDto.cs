using AssetManagementSystem.Models;
using System.ComponentModel.DataAnnotations;

namespace AssetManagementSystem.Dto
{
    public class AssetCategoryDto
    {

		[Key]
		public int CategoryID { get; set; }

		[Required]
		public string CategoryName { get; set; }
		public string? CategoryDescription { get; set; }
    }
}
