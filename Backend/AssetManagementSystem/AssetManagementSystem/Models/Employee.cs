using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AssetManagementSystem.Models
{
    public class Employee
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

		public byte[]? PasswordHash { get; set; }

		public byte[]? PasswordSalt { get; set; }

		public string? Gender { get; set; }

		public string? ContactNumber { get; set; }
		public string? Address { get; set; }

		public ICollection<AssetAllocationDetail>? AssetAllocationDetails { get; set; }
	}
}
