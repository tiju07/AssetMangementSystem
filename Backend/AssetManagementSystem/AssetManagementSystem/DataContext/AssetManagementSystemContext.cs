using System;
using System.Collections.Generic;
using AssetManagementSystem.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AssetManagementSystem.Data
{
    public class AssetManagementSystemContext : DbContext
    {
        public AssetManagementSystemContext(DbContextOptions<AssetManagementSystemContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Admin> Admins { get; set; }
        public virtual DbSet<AssetAllocationDetail> AssetAllocationDetails { get; set; }
        public virtual DbSet<AssetAuditReportRequest> AssetAuditReportRequests { get; set; }
        public virtual DbSet<AssetBorrowAndReturnRequest> AssetBorrowAndReturnRequests { get; set; }
        public virtual DbSet<Asset> AssetCatalogue { get; set; }
        public virtual DbSet<AssetCategory> AssetCategories { get; set; }
        public virtual DbSet<AssetServiceRequest> AssetServiceRequests { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<ExternalAuth> ExternalAuth { get; set; }
    }
}
