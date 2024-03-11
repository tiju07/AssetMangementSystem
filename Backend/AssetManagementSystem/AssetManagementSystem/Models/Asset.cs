using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AssetManagementSystem.Models
{
    [Table("AssetCatalogue")]
    public class Asset
    {
        [Key]
        public int AssetID { get; set; }
        [Required]
        public string AssetName { get; set; }
        [Required]
        public int AssetCategoryID { get; set; }
        public AssetCategory AssetCategory { get; set; }
        public string? AssetModel { get; set; }
        public string? AssetSpecifications { get; set; }
        public string? AssetImageURL { get; set; }
        public string? AssetImageFilename { get; set; }
        public string? AssetDescription { get; set; }
        [Required]
        public string AssetStatus { get; set; }
        public DateTime? ManufacturingDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public decimal? AssetValue { get; set; }
    }
}
