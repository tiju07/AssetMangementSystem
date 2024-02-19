using System.ComponentModel.DataAnnotations;

namespace AssetManagementSystem.Dto
{
	public class EmployeeDto
	{
		[Key]
		public int ID { get; set; }

		[Required]
		public string Name { get; set; }

		[Required]
		[EmailAddress]
		public string Email { get; set; }

		[Required]
		public string Username { get; set; }

		[Required]
		public string Gender { get; set; }

		[Required]
		public string ContactNumber { get; set; }
		public string? Address { get; set; }
	}
}
