using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AssetManagementSystem.Models
{
    public class AssetServiceRequest
    {
        [Key]
        public int RequestID { get; set; }

        [Required]
        public int EmployeeID { get; set; }
        public Employee Employee { get; set; }

        [Required]
        public int AssetID { get; set; }
        public Asset Asset { get; set; }

        [Required]
        public string IssueType { get; set; }
        public string? RequestDetails { get; set; }
        
        [Required]
        public string RequestStatus { get; set; }

    }
}
