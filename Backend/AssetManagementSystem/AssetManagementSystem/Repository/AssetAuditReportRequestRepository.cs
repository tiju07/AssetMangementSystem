using AssetManagementSystem.Data;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace AssetManagementSystem.Repository
{
    public class AssetAuditReportRequestRepository : IAssetAuditReportRequestRepository
    {
        private readonly AssetManagementSystemContext _context;

        public AssetAuditReportRequestRepository(AssetManagementSystemContext context)
        {
            _context = context;
        }
        public bool CreateAuditRequest(AssetAuditReportRequest request)
        {
            _context.AssetAuditReportRequests.Add(request);
            return Save();
        }

        public ICollection<AssetAuditReportRequest> GetAllAuditRequests()
        {
            return _context.AssetAuditReportRequests.ToList();
        }

        public AssetAuditReportRequest? GetAuditRequestByID(int requestID)
        {
            return _context.AssetAuditReportRequests.AsNoTracking().FirstOrDefault(r => r.RequestID == requestID);
        }

        public bool UpdateAuditRequest(AssetAuditReportRequest request)
        {
            _context.AssetAuditReportRequests.Update(request);
            return Save();
        }
        public bool AssetAuditReportRequestExists(int requestID)
        {
            return _context.AssetAuditReportRequests.Any(r => r.RequestID == requestID);
        }
        public bool Save()
        {
            var result = _context.SaveChanges();
            return result > 0;
        }

        public ICollection<AssetAuditReportRequest> GetAuditRequestByEmployee(int employeeID)
        {
            return _context.AssetAuditReportRequests.Where(a => a.EmployeeID == employeeID).ToList();
        }
    }
}
