using AssetManagementSystem.Models;

namespace AssetManagementSystem.Interfaces
{
    public interface IAssetAuditReportRequestRepository
    {
        public ICollection<AssetAuditReportRequest> GetAllAuditRequests();
        public AssetAuditReportRequest? GetAuditRequestByID(int requestID);
        public ICollection<AssetAuditReportRequest> GetAuditRequestByEmployee(int employeeID);
        //public ICollection<AssetAuditReportRequest> GetAuditRequestByAdmin(int adminID);
        public bool CreateAuditRequest(AssetAuditReportRequest request);
        public bool UpdateAuditRequest(AssetAuditReportRequest request);
        public bool AssetAuditReportRequestExists(int requestID);
        public bool Save();
    }
}
