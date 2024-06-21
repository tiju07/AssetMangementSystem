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
        public async Task<bool> CreateAuditRequest(AssetAuditReportRequest request)
        {
            await _context.AssetAuditReportRequests.AddAsync(request);
            return await Save();
        }

        public async Task<ICollection<AssetAuditReportRequest>> GetAllAuditRequests()
        {
            return await _context.AssetAuditReportRequests.ToListAsync();
        }

        public async Task<AssetAuditReportRequest?> GetAuditRequestByID(int requestID)
        {
            return await _context.AssetAuditReportRequests.AsNoTracking().FirstOrDefaultAsync(r => r.RequestID == requestID);
        }

        public async Task<bool> UpdateAuditRequest(AssetAuditReportRequest request)
        {
            _context.AssetAuditReportRequests.Update(request);
            return await Save();
        }
        public async Task<bool> AssetAuditReportRequestExists(int requestID)
        {
            return await _context.AssetAuditReportRequests.AnyAsync(r => r.RequestID == requestID);
        }
        public async Task<bool> Save()
        {
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<ICollection<AssetAuditReportRequest>> GetAuditRequestByEmployee(int employeeID)
        {
            return await _context.AssetAuditReportRequests.Where(a => a.EmployeeID == employeeID).ToListAsync();
        }
    }
}
