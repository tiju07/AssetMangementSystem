using AssetManagementSystem.Models;

namespace AssetManagementSystem.Interfaces
{
    public interface IAssetAuditReportRequestRepository
    {
        public Task<ICollection<AssetAuditReportRequest>> GetAllAuditRequests();
        public Task<AssetAuditReportRequest?> GetAuditRequestByID(int requestID);
        public Task<ICollection<AssetAuditReportRequest>> GetAuditRequestByEmployee(int employeeID);
        //public ICollection<AssetAuditReportRequest> GetAuditRequestByAdmin(int adminID);
        public Task<bool> CreateAuditRequest(AssetAuditReportRequest request);
        public Task<bool> UpdateAuditRequest(AssetAuditReportRequest request);
        public Task<bool> AssetAuditReportRequestExists(int requestID);
        public Task<bool> Save();
    }
}
