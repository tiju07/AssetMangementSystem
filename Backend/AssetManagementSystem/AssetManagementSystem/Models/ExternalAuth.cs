using System.ComponentModel.DataAnnotations;

namespace AssetManagementSystem.Models
{
    public class ExternalAuth
    {
        [Key]
        public int ID { get; set; }

        public int? EmployeeID { get; set; }
        public Employee? Employee { get; set; }

        public int? AdminID { get; set; }
        public Admin? Admin { get; set; }

        public string? Email { get; set; }
        public string? IdToken { get; set; }
        public string? Name { get; set; }
        public string? PhotoUrl { get; set; }
        public string? Provider { get; set; }
    }
}
