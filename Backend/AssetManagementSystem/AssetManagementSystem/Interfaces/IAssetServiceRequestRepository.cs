using AssetManagementSystem.Models;

namespace AssetManagementSystem.Interfaces
{
    public interface IAssetServiceRequestRepository
    {
        public Task<ICollection<AssetServiceRequest>> GetAllServiceRequests();
        public Task<AssetServiceRequest> GetServiceRequestByID(int requestID);
        public Task<ICollection<AssetServiceRequest>> GetServiceRequestsByEmployee(int employeeID);
        public Task<bool> CreateServiceRequest(AssetServiceRequest assetServiceRequest);
        public Task<bool> UpdateServiceRequest(AssetServiceRequest assetServiceRequest);
        public Task<bool> ServiceRequestExists(int requestID);
        public Task<bool> Save();
    }
}
